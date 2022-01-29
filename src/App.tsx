import { AppShell, createStyles, useMantineTheme } from "@mantine/core"
import { PageHeader, PAGE_HEADER_HEIGHT } from "./components/PageHeader"
import { DrawingView } from "./components/DrawingView"
import { EPickleChipColor } from "./components/PickleChip"
import { chunk, shuffle } from "lodash"
import { useState } from "react"
import { PictureData } from "./types/misc"
import { ResultView } from "./components/ResultView"

const ALL_5_CHAR_WORDS: string[] = (
	require("an-array-of-english-words") as string[]
).filter((str) => str.length === 5)

const useStyles = createStyles({
	shell: {
		height: "100%",
	},
})

type ComputedPickleState = {
	pictureData: PictureData
	foundWords: string[]
}

function App() {
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
					onSubmit={(pictureData, wordle) => {
						const rows = chunk(pictureData, 5)

						//	Build the dynamic regexprs for each row
						const regexStrs: string[] = rows.map((row) =>
							row.reduce<string>(
								(workingStr, pixel, position) => {
									const testChar: string =
										wordle.charAt(position)
									switch (pixel) {
										default:
										case EPickleChipColor.Gray: {
											//	We cannot have any of the letters in the word appear here
											return (
												workingStr +
												`[^(${wordle
													.split("")
													.join("|")})]{1}`
											)
										}
										case EPickleChipColor.Green: {
											//	A very specific character must be in this spot
											return workingStr + `${testChar}{1}`
										}
										case EPickleChipColor.Yellow: {
											//	This letter can be any other letter in the wordle, that isn't the one
											//	actually at this location
											return (
												workingStr +
												`([^${testChar}]|(${wordle
													.split("")
													.filter(
														(char) =>
															char !== testChar
													)
													.join("|")}))`
											)
										}
									}
								},
								""
							)
						)

						//	Look to find a match for each row
						const foundWords: string[] = regexStrs.map(
							(regexStr, i) => {
								console.log(`Processing row id ${i}...`)
								const regexp = new RegExp(regexStr)
								const word = shuffle(ALL_5_CHAR_WORDS).find(
									(str) => regexp.test(str)
								)
								if (!word) {
									console.log(
										`Can't make a word for row id ${i}`
									)

									//	Return a replacement string
									return "?????"
								}
								return word
							}
						)

						setComputedState({
							foundWords,
							pictureData,
						})
					}}
				/>
			)}
		</AppShell>
	)
}

export default App
