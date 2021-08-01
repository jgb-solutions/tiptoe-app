import React, { useState, useEffect } from "react"
import { Container, Header, Content, Text, Icon, Left, Right, View, Body, Item, Input } from "native-base"
import { screenNames } from "../utils/screens"

import SelectPicker from "react-native-form-select-picker"
import useCategories from "../hooks/useCategories"
import { Image, StyleSheet } from "react-native"

import { colors } from "../utils/colors"
import { RouteProp, useNavigation, useRoute } from "@react-navigation/native"
import { TouchableOpacity } from "react-native-gesture-handler"
import { useForm, Controller } from "react-hook-form"
import Textarea from "react-native-textarea"
import { SCREEN_WIDTH } from "../utils/constants"

export interface Credentials {
	type: string
	category_id: number
	caption: string
}

type RouteParamsProps = RouteProp<
	{
		params: {
			photo: any
		}
	},
	"params"
>

const DEFAULT_IMAGE =
	"https://cdn4.iconfinder.com/data/icons/ionicons/512/icon-image-512.png"

export default function AddPhotoStep2Screen() {
	const navigation = useNavigation()

	const { categoriesData } = useCategories()

	const route = useRoute<RouteParamsProps>()
	const [image, setImage] = useState<any>(DEFAULT_IMAGE)

	const { control, handleSubmit, formState, watch } = useForm<Credentials>({
		mode: "onBlur",
		defaultValues: route.params?.photo,
	})

	useEffect(() => {
		setImage(route.params?.photo)
	}, [route])

	const onSubmit = (credentials: Credentials) => {
		const payload = {
			...image,
			...credentials,
			type: image?.asset?.mediaType
		}

		navigation.navigate(screenNames.AddPhotoStep3, {
			photo: payload
		})

		// alert(JSON.stringify(payload))
		// navigation.navigate(screenNames.Home)
	}

	const { isValid } = formState

	// console.log(image)

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
							onPress={() =>
								navigation.navigate(screenNames.Add, {
									...image,
									caption: watch("caption"),
									category_id: watch("category_id"),
								})
							}
						>
							<Icon name="arrow-back" style={{ color: colors.white }} />
						</TouchableOpacity>
					</Text>
				</Left>
				<Body>
					<Text style={{ fontSize: 18, fontWeight: "bold", color: colors.white }}>
						Media info
					</Text>
				</Body>
				<Right style={{ flex: 1 }}>
					<TouchableOpacity onPress={handleSubmit(onSubmit)}>
						<Icon name="arrow-forward" style={{ color: colors.white }} />
					</TouchableOpacity>
				</Right>
			</Header>
			<Content>
				<Image
					source={{ uri: image?.asset?.uri }}
					style={{
						width: SCREEN_WIDTH * .9,
						height: SCREEN_WIDTH * .9,
						alignSelf: 'center'
					}}
				/>

				<Item style={[styles.items, { paddingBottom: 10 }]}>
					<View style={styles.inputContainer}>
						<Controller
							name="category_id"
							rules={{ required: "Please select a category" }}
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
									{categoriesData?.categories.map(({ id, name }: any) => (
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
							name="caption"
							rules={{ required: "Say something about this" }}
							control={control}
							render={({ onChange, onBlur, value }) => (
								<Textarea
									containerStyle={styles.textareaContainer}
									style={styles.textarea}
									onChangeText={(value: string) => onChange(value)}
									defaultValue={value}
									// maxLength={300}
									placeholder={"Add your caption here"}
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
