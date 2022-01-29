import {
	PropsWithChildren,
	ReactElement,
	ReactNode,
	ValidationMap,
	WeakValidationMap,
} from "react"

/**
 * A different version of React.FC thanks to https://fettblog.eu/typescript-react-why-i-dont-use-react-fc/
 */
export type FunctionComponent<P = {}> = {
	(props: P, context?: any): ReactElement<any, any> | null
	propTypes?: WeakValidationMap<P>
	contextTypes?: ValidationMap<any>
	defaultProps?: Partial<P>
	displayName?: string
}

/**
 * A different version of React.FC thanks to https://fettblog.eu/typescript-react-why-i-dont-use-react-fc/
 */
export type FC<P = {}> = FunctionComponent<P>

/**
 * Signifies that the component's props will potentially include children
 */
export type WithChildren<T = {}> = T & { children?: ReactNode }
