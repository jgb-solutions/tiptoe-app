import React from "react"
import { FlatList } from "react-native"
import { WebView } from "react-native-webview"

import {
	Container,
	Content,
	Header,
	Button,
	ListItem,
	Text,
	Icon,
	Left,
	Body,
	Right,
	Switch,
} from "native-base"
import Page from "../components/layouts/Page"

export default function TermsConditionScreen() {
	return (
		<Page leftStyle={{ flex: 0.65 }} noRight noContent>
			<WebView source={{ uri: "https://tiptoe.app/terms-condition" }} />
		</Page>
	)
}
