import {
	Anchor,
	Button,
	Divider,
	Group,
	Modal,
	Text,
	useMantineTheme,
} from "@mantine/core"
import { FiGlobe, FiTwitter } from "react-icons/fi"
import { FunctionComponent } from "../types/components"
import { LogoChips } from "./logo/LogoChips"

export type HelpModalProps = {
	isOpen: boolean
	onClose(): void
}

export const HelpModal: FunctionComponent<HelpModalProps> = ({
	isOpen,
	onClose,
}) => {
	const theme = useMantineTheme()

	return (
		<Modal
			opened={isOpen}
			onClose={onClose}
			title={
				<Text>
					What's{" "}
					<div style={{ display: "inline-flex" }}>
						<LogoChips />
					</div>
					?
				</Text>
			}
		>
			{" "}
			<Divider mt={theme.spacing.lg} mb={theme.spacing.md} />
			<Text>
				Pickle is a tool that lets you generate pictures using Wordle as
				your canvas.
			</Text>
			<Text mt={theme.spacing.md}>
				Enter the picture you wish to generate, and a target Wordle word
				to generate the picture for. The results will be a set of words
				that, when put into Wordle for the given word, will generate the
				picture you gave it.
			</Text>
			<Text mt={theme.spacing.md}>
				A good explanation can be found on{" "}
				<Anchor
					href="https://ezb.sh/posts/introducing-pickle-ooo"
					target="_blank"
					rel="noreferrer noopener"
				>
					my blog
				</Anchor>
				.
			</Text>
			<Text mt={theme.spacing.md}>
				🥒 Made by <b>ezb</b> (Eric Bernard), 2022.
			</Text>
			<Divider mt={theme.spacing.lg} mb={theme.spacing.md} />
			<Group position="center">
				<Button
					leftIcon={<FiGlobe />}
					onClick={() => window.open("https://ezb.sh", "_blank")}
				>
					My Website
				</Button>
				<Button
					leftIcon={<FiTwitter />}
					onClick={() =>
						window.open("https://twitter.com/ebernerd", "_blank")
					}
				>
					My Twitter
				</Button>
			</Group>
		</Modal>
	)
}
