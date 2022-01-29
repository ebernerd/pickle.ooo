import { createStyles, Grid, Paper, Text, useMantineTheme } from "@mantine/core"
import { EPickleChipColor, PICKLE_CHIP_ENUM_TO_COLOR } from "./PickleChip"

const { Col } = Grid

const useStyles = createStyles((theme) => {
	return {
		logoTile: {
			color: "#FFFFFF",
			width: 30,
			height: 30,
			display: "flex",
			justifyContent: "center",
			alignItems: "center",
			userSelect: "none",
		},
		logoGridWrapper: {
			width: 225,
			display: "flex",
		},
		logoWrapper: {
			width: 300,
			display: "flex",
			alignItems: "center",
		},
		logoEmoji: {
			marginRight: 5,
			fontSize: theme.fontSizes.xl,
		},
	}
})

const LogoChip = (props: { color: EPickleChipColor; letter: string }) => {
	const { classes } = useStyles()
	const theme = useMantineTheme()
	return (
		<Col span={1} sx={{ padding: 3 }}>
			<Paper
				className={classes.logoTile}
				style={{
					backgroundColor:
						theme.colors[PICKLE_CHIP_ENUM_TO_COLOR[props.color]][6],
				}}
			>
				<Text color="#FFFFFF">{props.letter}</Text>
			</Paper>
		</Col>
	)
}

export const Logo = () => {
	const { classes } = useStyles()
	const pickleLetters = "PICKLE".split("")
	const oooLetters = "OOO".split("")

	return (
		<div className={classes.logoWrapper}>
			<Text className={classes.logoEmoji}>🥒</Text>
			<div className={classes.logoGridWrapper}>
				{pickleLetters.map((letter, i) => (
					<LogoChip
						key={i}
						letter={letter}
						color={EPickleChipColor.Green}
					/>
				))}
				{/*oooLetters.map((letter, i) => (
					<LogoChip
						key={i}
						letter={letter}
						color={EPickleChipColor.Yellow}
					/>
				))*/}
			</div>
		</div>
	)
}
