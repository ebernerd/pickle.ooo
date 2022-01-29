export const WORDLIST: string[] = (
	require("an-array-of-english-words") as string[]
).filter((str) => str.length === 5)
