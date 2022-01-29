import { createStyles, Text } from "@mantine/core"
import { LogoChips } from "./LogoChips"

const useStyles = createStyles((theme) => {
	return {
		logoChipWrapper: {
			width: 225,
			display: "flex",
			[`@media (max-width: ${theme.breakpoints.xs}px)`]: {
				display: "none",
			},
		},

		logoWrapper: {
			width: 300,
			display: "flex",
			alignItems: "center",
		},
		logoTextWrapper: {
			marginRight: 5,
			fontSize: theme.fontSizes.xl,
			[`@media (min-width: ${theme.breakpoints.xs}px)`]: {
				display: "none",
			},
		},
	}
})

export const Logo = () => {
	const { classes } = useStyles()

	return (
		<div className={classes.logoWrapper}>
			<Text
				className={classes.logoTextWrapper}
				weight={700}
				color="green"
			>
				Pickle 🥒
			</Text>
			<div className={classes.logoChipWrapper}>
				<LogoChips />
			</div>
		</div>
	)
}
