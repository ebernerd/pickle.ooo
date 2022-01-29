import { Button, createStyles, Grid, Header } from "@mantine/core"
import { Logo } from "./Logo"
import { FiGithub } from "react-icons/fi"

export const PAGE_HEADER_HEIGHT = 75

const useStyles = createStyles((theme) => ({
	buttons: {
		display: "flex",
		justifyContent: "flex-end",
	},
}))

export const PageHeader = () => {
	const { classes } = useStyles()

	return (
		<Header height={PAGE_HEADER_HEIGHT} padding="xs">
			<Grid style={{ height: "100%" }}>
				<Grid.Col span={4}>
					<Logo />
				</Grid.Col>
				<Grid.Col span={4} offset={4}>
					<div className={classes.buttons}>
						<Button
							leftIcon={<FiGithub style={{ marginTop: 2 }} />}
							onClick={() =>
								window.open(
									"https://github.com/ebernerd/pickle.ooo",
									"_blank",
									"noreferrer noopener"
								)
							}
						>
							View on Github
						</Button>
					</div>
				</Grid.Col>
			</Grid>
		</Header>
	)
}
