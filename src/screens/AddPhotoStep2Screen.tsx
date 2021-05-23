import React, { useState, useEffect } from "react"
import {
	Container,
	Header,
	Content,
	Text,
	Icon,
	Left,
	Right,
	View,
	Body,
	Item,
	Input,
} from "native-base"
import { screenNames } from "../utils/screens"

import SelectPicker from "react-native-form-select-picker"
import useCategories from "../hooks/useCategories"
import { Image, StyleSheet } from "react-native"

import { colors } from "../utils/colors"
import { RouteProp, useNavigation, useRoute } from "@react-navigation/native"
import { TouchableOpacity } from "react-native-gesture-handler"
import { useForm, Controller } from "react-hook-form"
import Textarea from "react-native-textarea"

export interface Credentials {
	uri: string
	category_id: number
	detail: string
	caption: string
}

type RouteParamsProps = RouteProp<
	{
		params: {
			photo: string
		}
	},
	"params"
>

const CATEGORIES = [
	{ id: 1, name: "Nature", slug: "nature" },
	{ id: 2, name: "Sea", slug: "sea" },
]
const DEFAULT_IMAGE =
	"https://cdn4.iconfinder.com/data/icons/ionicons/512/icon-image-512.png"

export default function AddPhotoStep2Screen() {
	const navigation = useNavigation()

	// const { categoriesData } = useCategories()

	const [uri, setUri] = useState<string>(DEFAULT_IMAGE)

	const { control, handleSubmit, formState } = useForm<Credentials>({
		mode: "onBlur",
	})

	const route = useRoute<RouteParamsProps>()
	useEffect(() => {
		setUri(route.params?.photo)
	}, [route])

	const onSubmit = (credentials: Credentials) => {
		console.log(credentials)
		navigation.navigate(screenNames.Home)
	}

	const { isValid } = formState

	return (
		<Container>
			<Header
				iosBarStyle="light-content"
				androidStatusBarColor={colors.black}
				style={{ backgroundColor: colors.pink }}
			>
				<Left style={{ flexDirection: "row", alignItems: "center" }}>
					<Text
						style={{
							fontWeight: "bold",
							color: colors.white,
						}}
					>
						<TouchableOpacity
							onPress={() => navigation.navigate(screenNames.Add)}
						>
							<Icon name="arrow-back" style={{ color: colors.white }} />
						</TouchableOpacity>
					</Text>
				</Left>
				<Body>
					<Text
						style={{ fontSize: 18, fontWeight: "bold", color: colors.white }}
					>
						Add a Photo
					</Text>
				</Body>
				<Right style={{ flex: 1 }}>
					<TouchableOpacity
						onPress={handleSubmit(onSubmit)}
					>
						<Icon
							name="checkmark"
							style={{ color: colors.white }}
						/>
					</TouchableOpacity>
				</Right>
			</Header>
			<Content>
				<Item
					style={[
						styles.items,
						{ height: 100, flexDirection: "row", paddingHorizontal: 10 },
					]}
				>
					<Image source={{ uri: uri }} style={{ height: 70, width: 70 }} />
					<View style={styles.inputContainer}>
						<Controller
							control={control}
							render={({ onChange, onBlur, value }) => (
								<Input
									style={{ paddingLeft: 9 }}
									placeholder="Add a caption"
									value={value}
									onChangeText={(value) => onChange(value)}
								/>
							)}
							name="caption"
							rules={{ required: "The caption is required" }}
						/>
					</View>

					<View style={styles.hidden}>
						<Controller
							control={control}
							render={({ onChange, onBlur, value }) => (
								<Input
									style={{ paddingLeft: 9 }}
									placeholder="Add a caption"
									value={value}
									onChangeText={(value) => onChange(value)}
								/>
							)}
							defaultValue={uri}
							name="uri"
						/>
					</View>
				</Item>

				<Item style={[styles.items, { paddingBottom: 10 }]}>
					<View style={styles.inputContainer}>
						<Controller
							name="category_id"
							control={control}
							render={({ onChange, onBlur, value }) => (
								<SelectPicker
									onValueChange={onChange}
									selected={value}
									placeholder="Select a category"
									placeholderStyle={{
										fontSize: 18,
										color: "#000",
									}}
								>
									{CATEGORIES.map(({ id, name }) => (
										<SelectPicker.Item key={id} label={name} value={id} />
									))}
								</SelectPicker>
							)}
						/>
					</View>
				</Item>

				<Item style={[styles.items, { paddingBottom: 10, height: 100 }]}>
					<View style={styles.inputContainer}>
						<Controller
							name="detail"
							control={control}
							render={({ onChange, onBlur, value }) => (
								<Textarea
									containerStyle={styles.textareaContainer}
									style={styles.textarea}
									onChangeText={(value: string) => onChange(value)}
									defaultValue={value}
									// maxLength={300}
									placeholder={"Add details here"}
									placeholderTextColor={"#c7c7c7"}
									underlineColorAndroid={"transparent"}
								/>
							)}
						/>
					</View>
				</Item>
			</Content>
		</Container>
	)
}

const styles = StyleSheet.create({
	inputContainer: {},
	items: {
		marginBottom: 15,
	},
	label: {
		color: colors.facebook,
		paddingLeft: 9,
	},
	textareaContainer: {
		height: 90,
		padding: 5,
	},
	textarea: {
		textAlignVertical: "top", // hack android
		height: 88,
		fontSize: 18,
		color: "#333",
	},
	hidden: { 
		opacity: 0,
		height: 0,
		flex: 0,
	 },
})
