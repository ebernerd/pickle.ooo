import { Grid, Paper } from "@mantine/core"
import { FunctionComponent } from "../../types/components"
import { PicturePanelPixel } from "./PicturePanelPixel"
import { chunk } from "lodash"

export type PicturePanelProps = {
	value: number[]
	onPixelChange(newState: number[]): void
}

export const PicturePanel: FunctionComponent<PicturePanelProps> = (props) => {
	/*	This callback is a utility function to make mutating the
		`puctureEntryPanelState` easier, allowing mutation of the array
		on a positional basis
	*/
	const incrementPictureEntryPanelPixel = (position: number) => {
		const stateCopy = [...props.value]
		stateCopy[position] = (stateCopy[position] + 1) % 3
		props.onPixelChange(stateCopy)
	}

	return (
		<Paper mb={20}>
			{chunk(props.value, 5).map((row, ri) => (
				<Grid key={ri} columns={5}>
					{row.map((color, pi) => (
						<PicturePanelPixel
							key={pi}
							color={color}
							incrementFunc={() =>
								incrementPictureEntryPanelPixel(ri * 5 + pi)
							}
						/>
					))}
				</Grid>
			))}
		</Paper>
	)
}
