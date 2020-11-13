import React, { useState } from 'react'
import {
	Container,
	Header,
	Content,
	Button,
	ListItem,
	Text,
	Icon,
	Left,
	Body,
	Right,
	Switch
} from 'native-base'

import Page from '../components/layouts/Page'
import useStore, { AppStateInterface } from '../store'
import { TouchableOpacity } from 'react-native-gesture-handler'


export default function ProfileScreen() {
	const [switchValue, setSwitchValue] = useState(false)
	const { logout } = useStore((state: AppStateInterface) =>
		({
			logout: state.doLogout
		}))

	return (
		<Page>
			<ListItem icon>
				<Left>
					<Button style={{ backgroundColor: "#FF9501" }}>
						<Icon active name="airplane" />
					</Button>
				</Left>
				<Body>
					<Text>Airplane Mode</Text>
				</Body>
				<Right>
					<Switch value={switchValue} onValueChange={value => setSwitchValue(value)} />
				</Right>
			</ListItem>
			<ListItem icon>
				<Left>
					<Button style={{ backgroundColor: "#007AFF" }}>
						<Icon active name="wifi" />
					</Button>
				</Left>
				<Body>
					<Text>Wi-Fi</Text>
				</Body>
				<Right>
					<Text>GeekyAnts</Text>
					<Icon active name="arrow-forward" />
				</Right>
			</ListItem>
			<ListItem icon>
				<Left>
					<Button style={{ backgroundColor: "#007AFF" }}>
						<Icon active name="bluetooth" />
					</Button>
				</Left>
				<Body>
					<Text>Bluetooth</Text>
				</Body>
				<Right>
					<Text>On</Text>
					<Icon active name="arrow-forward" />
				</Right>
			</ListItem>
			<ListItem icon>
				<Left>
					<Button style={{}}>
						<Icon active name="log-out" />
					</Button>
				</Left>
				<Body>
					<TouchableOpacity onPress={logout}>
						<Text>Log Out</Text>
					</TouchableOpacity>
				</Body>
			</ListItem>
		</Page>
	)
}