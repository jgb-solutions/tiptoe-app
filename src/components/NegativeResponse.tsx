import React, { ReactNode } from "react"
import { View, ViewStyle } from "react-native"

type Props = {
	children: ReactNode
	style?: ViewStyle
}

export default function NegativeResponse({ children, style }: Props) {
	return (
		<View
			style={{
				flex: 1,
				alignItems: "center",
				paddingTop: 12,
				...style
			}}
		>
			{children}
		</View>
	)
}
