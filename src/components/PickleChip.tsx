import { createStyles, Grid, Paper, Text } from "@mantine/core"
import { FunctionComponent } from "../types/components"

export const enum EPickleChipColor {
	Gray = 0,
	Yellow = 1,
	Green = 2,
}

export const PICKLE_CHIP_ENUM_TO_COLOR: Record<EPickleChipColor, string> = {
	[EPickleChipColor.Green]: "green",
	[EPickleChipColor.Gray]: "gray",
	[EPickleChipColor.Yellow]: "yellow",
}

export type PickleChipProps = {
	color: EPickleChipColor
	letter: string
}

const useStyles = createStyles((theme, props: PickleChipProps) => {
	const { color } = props

	const PICKLE_CHIP_WIDTH = 50

	const mantineColorName = PICKLE_CHIP_ENUM_TO_COLOR[color]

	return {
		pickleChip: {
			backgroundColor: theme.colors[mantineColorName][6],
			padding: 20,
			fontWeight: 700,
			fontSize: 32,
			width: PICKLE_CHIP_WIDTH,
			height: PICKLE_CHIP_WIDTH,
			display: "flex",
			justifyContent: "center",
			alignItems: "center",
		},
	}
})

/**
 * A PickleChip is a letter tile shown in the grid
 */
export const PickleChip: FunctionComponent<PickleChipProps> = (props) => {
	const { classes } = useStyles(props)

	return (
		<Grid.Col span={1}>
			<Paper className={classes.pickleChip}>
				<Text size="xl" weight={700} color="#FFFFFF">
					{props.letter.toUpperCase()}
				</Text>
			</Paper>
		</Grid.Col>
	)
}
