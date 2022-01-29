import { createStyles, Grid, Paper } from "@mantine/core"
import { FunctionComponent } from "../../types/components"
import { EPickleChipColor, PICKLE_CHIP_ENUM_TO_COLOR } from "../PickleChip"

//	What a tongue twister!
export type PicturePanelPixelProps = {
	incrementFunc(): void
	color: EPickleChipColor
}

export const PICTURE_PANEL_PIXEL_WIDTH = 20

const useStyles = createStyles((theme, props: PicturePanelPixelProps) => {
	const { color } = props

	const mantineColorName = PICKLE_CHIP_ENUM_TO_COLOR[color]

	return {
		picturePanelPixel: {
			backgroundColor: theme.colors[mantineColorName][6],
			padding: 20,
			fontWeight: 700,
			fontSize: 32,
			width: PICTURE_PANEL_PIXEL_WIDTH,
			height: PICTURE_PANEL_PIXEL_WIDTH,
			display: "flex",
			justifyContent: "center",
			alignItems: "center",
		},
	}
})

export const PicturePanelPixel: FunctionComponent<PicturePanelPixelProps> = (
	props
) => {
	const { classes } = useStyles(props)
	return (
		<Grid.Col span={1}>
			<Paper
				className={classes.picturePanelPixel}
				onClick={props.incrementFunc}
			></Paper>
		</Grid.Col>
	)
}
