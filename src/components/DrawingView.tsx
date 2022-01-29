import {
	createStyles,
	useMantineTheme,
	Paper,
	Text,
	Button,
	TextInput,
} from "@mantine/core"
import { useNotifications } from "@mantine/notifications"
import { FunctionComponent } from "../types/components"
import { useState } from "react"
import { PicturePanel } from "./picture-panel/PicturePanel"
import { EPickleChipColor } from "./PickleChip"
import { PictureData } from "../types/misc"
import { WORDLIST } from "../words/wordlist"

const useStyles = createStyles((theme) => ({
	drawingForm: {
		minWidth: 350,
		display: "flex",
		flexDirection: "column",
		padding: theme.spacing.lg,
		alignItems: "center",
	},
}))

export type DrawingFormProps = {
	onSubmit(pictureData: PictureData, wordle: string): void
}

export const DrawingView: FunctionComponent<DrawingFormProps> = (props) => {
	const { classes } = useStyles()
	const theme = useMantineTheme()
	const notifications = useNotifications()

	/*	The array below represents the state of the user picture-entry panel.
		It uses integers 0-2, defined by the `EPickleChipColor` enum. The array
		is to stay 30 items long, each 5 items representing a row in the grid
	*/
	const [pictureData, setPictureData] = useState<PictureData>(
		Array(30).fill(EPickleChipColor.Gray)
	)
	const [wordle, setWorlde] = useState<string>("")

	return (
		<Paper className={classes.drawingForm} shadow={theme.shadows.md}>
			<Text size="xl" weight={700}>
				1. Create Your Drawing
			</Text>
			<Text size="xs" mb={5}>
				Click to cycle through Gray &gt; Yellow &gt; Green.
			</Text>
			<PicturePanel
				value={pictureData}
				onPixelChange={(newState) => setPictureData(newState)}
			/>
			<Text size="xl" weight={700}>
				2. Enter Today's Wordle
			</Text>
			<TextInput
				value={wordle}
				onChange={(e) => setWorlde(e.target.value)}
				mb={15}
			/>
			<Button
				disabled={wordle.length !== 5}
				onClick={() => {
					if (WORDLIST.includes(wordle)) {
						props.onSubmit(pictureData, wordle)
					} else {
						notifications.showNotification({
							title: "❌ Word not found!",
							message:
								"That word isn't in the list of valid words. Please try again",
							color: "red",
							radius: "xs",
						})
					}
				}}
			>
				Generate!
			</Button>
		</Paper>
	)
}
