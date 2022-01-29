import {
	Button,
	createStyles,
	Grid,
	Paper,
	useMantineTheme,
} from "@mantine/core"
import { chunk } from "lodash"
import { FunctionComponent } from "../types/components"
import { PictureData } from "../types/misc"
import { PickleChip } from "./PickleChip"

const useStyles = createStyles((theme) => ({
	resultView: {
		minWidth: 350,
		display: "flex",
		flexDirection: "column",
		padding: theme.spacing.lg,
		alignItems: "center",
	},
}))

export type ResultViewProps = {
	pictureData: PictureData
	foundWords: string[]

	onReset(): void
}

export const ResultView: FunctionComponent<ResultViewProps> = ({
	pictureData,
	foundWords,
	onReset,
}) => {
	const { classes } = useStyles()
	const theme = useMantineTheme()

	//	Split the picture data up into rows of 5
	const rows = chunk(pictureData, 5)
	const wordsWithPictureData = rows.map((row, i) => ({
		pictureData: row,
		word: foundWords[i],
	}))

	return (
		<Paper className={classes.resultView} shadow={theme.shadows.md}>
			<Paper mb={20}>
				{wordsWithPictureData.map((word, iw) => (
					<Grid key={iw} columns={5}>
						{word.word.split("").map((letter, ic) => (
							<PickleChip
								key={ic}
								letter={letter}
								color={word.pictureData[ic]}
							/>
						))}
					</Grid>
				))}
			</Paper>
			<Button onClick={onReset}>Do another!</Button>
		</Paper>
	)
}
