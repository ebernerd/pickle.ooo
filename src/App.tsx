import { AppShell, createStyles, useMantineTheme } from "@mantine/core"
import { PageHeader, PAGE_HEADER_HEIGHT } from "./components/PageHeader"
import { DrawingView } from "./components/DrawingView"
import { useState } from "react"
import {
	ComputedPickleState,
	computePickleState,
} from "./words/computePickleState"
import { ResultView } from "./components/ResultView"
import { FunctionComponent } from "./types/components"

const useStyles = createStyles({
	shell: {
		height: "100%",
	},
})

const App: FunctionComponent = () => {
	const { classes } = useStyles()
	const theme = useMantineTheme()

	//	When this state is `null`, the assumption is that the user hasn't put in the drawing/wordle word yet.
	const [computedState, setComputedState] =
		useState<ComputedPickleState | null>(null)

	return (
		<AppShell
			header={<PageHeader />}
			styles={{
				body: {
					height: `calc(100% - ${PAGE_HEADER_HEIGHT}px)`,
					background: "#f2f2f2",
					paddingTop: theme.spacing.md,
				},
				main: {
					display: "flex",
					flexDirection: "column",
					alignItems: "center",
				},
			}}
			className={classes.shell}
		>
			{computedState !== null ? (
				<ResultView
					{...computedState}
					onReset={() => setComputedState(null)}
				/>
			) : (
				<DrawingView
					onSubmit={(pictureData, wordle) =>
						setComputedState(
							computePickleState(pictureData, wordle)
						)
					}
				/>
			)}
		</AppShell>
	)
}

export default App
