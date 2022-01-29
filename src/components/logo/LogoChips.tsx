import { Grid, Paper, useMantineTheme, Text, createStyles } from "@mantine/core"
import { EPickleChipColor, PICKLE_CHIP_ENUM_TO_COLOR } from "../PickleChip"

const useStyles = createStyles((theme) => {
	return {
		logoChip: {
			color: "#FFFFFF",
			width: 30,
			height: 30,
			display: "flex",
			justifyContent: "center",
			alignItems: "center",
			userSelect: "none",
		},
	}
})

const LogoChip = (props: { color: EPickleChipColor; letter: string }) => {
	const { classes } = useStyles()
	const theme = useMantineTheme()
	return (
		<Grid.Col span={1} sx={{ padding: 3 }}>
			<Paper
				className={classes.logoChip}
				style={{
					backgroundColor:
						theme.colors[PICKLE_CHIP_ENUM_TO_COLOR[props.color]][6],
				}}
			>
				<Text color="#FFFFFF">{props.letter}</Text>
			</Paper>
		</Grid.Col>
	)
}

export const LogoChips = () => (
	<>
		{"PICKLE".split("").map((letter, i) => (
			<LogoChip key={i} letter={letter} color={EPickleChipColor.Green} />
		))}
	</>
)
