import { AppShell, Button, createStyles, useMantineTheme } from "@mantine/core"
import { PageHeader } from "./components/PageHeader"
import { DrawingView } from "./components/DrawingView"
import { useState } from "react"
import {
	ComputedPickleState,
	computePickleState,
} from "./words/computePickleState"
import { ResultView } from "./components/ResultView"
import { FunctionComponent } from "./types/components"
import { FiHelpCircle } from "react-icons/fi"
import { HelpModal } from "./components/HelpModal"

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
	const [isHelpModalOpen, setIsHelpModalOpen] = useState<boolean>(false)

	return (
		<AppShell
			header={<PageHeader />}
			styles={{
				body: {
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

			<Button
				leftIcon={<FiHelpCircle />}
				color="dark"
				mt={theme.spacing.md * 2}
				onClick={() => setIsHelpModalOpen(true)}
			>
				What's Pickle?
			</Button>
			<HelpModal
				isOpen={isHelpModalOpen}
				onClose={() => setIsHelpModalOpen(false)}
			/>
		</AppShell>
	)
}

export default App
