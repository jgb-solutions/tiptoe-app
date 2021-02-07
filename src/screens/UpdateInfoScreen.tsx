import React from "react"
import { useNavigation } from "@react-navigation/native"
import { screenNames } from '../utils/screens'

// Local imports
import Page from "../components/layouts/Page"

export default function UpdateInfoScreen() {
	const navigation = useNavigation()
	

	return (
		<Page onPressLeft={()=> navigation.navigate('TabNavigation', {screen: screenNames.Home})} rightStyle={{ flex: 0.55 }}  noContent>
			
		</Page>
	)
}
