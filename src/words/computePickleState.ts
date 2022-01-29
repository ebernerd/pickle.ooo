import { PictureData } from "../types/misc"
import { chunk, shuffle } from "lodash"
import { WORDLIST } from "./wordlist"
import { EPickleChipColor } from "../components/PickleChip"

/**
 * Represents a completed pickle drawing with words
 */
export type ComputedPickleState = {
	pictureData: PictureData
	foundWords: string[]
}

/**
 * Converts a list of pixels and a given word to a list of Wordle-
 * compatible words.
 */
export const computePickleState = (
	pictureData: PictureData,
	wordle: string
): ComputedPickleState => {
	const rows = chunk(pictureData, 5)

	//	Build the dynamic regexprs for each row
	const regexStrs: string[] = rows.map((row) =>
		row.reduce<string>((workingStr, pixel, position) => {
			const testChar: string = wordle.charAt(position)
			switch (pixel) {
				default:
				case EPickleChipColor.Gray: {
					//	We cannot have any of the letters in the word appear here
					return workingStr + `[^(${wordle.split("").join("|")})]{1}`
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
						`(${wordle
							.split("")
							.filter((char) => char !== testChar)
							.join("|")}){1}`
					)
				}
			}
		}, "")
	)

	//	Look to find a match for each row
	const foundWords: string[] = regexStrs.map((regexStr, i) => {
		console.log(`Processing row id ${i} [ ${regexStr} ]`)
		const regexp = new RegExp(regexStr)
		const word = shuffle(WORDLIST).find((str) => regexp.test(str))
		if (!word) {
			console.log(`Can't make a word for row id ${i}`)

			//	Return a replacement string
			return "?????"
		}
		return word
	})

	return {
		foundWords,
		pictureData,
	}
}
