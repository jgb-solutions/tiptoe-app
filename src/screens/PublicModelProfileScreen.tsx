import React, { useState, useEffect } from "react"
import {
	Alert,
	Image,
	FlatList,
	Dimensions,
	StyleSheet,
	ViewStyle,
	TouchableOpacity,
} from "react-native"
import {
	Left,
	Text,
	View,
	Right,
	Header,
	Spinner,
	Container,
	Thumbnail,
} from "native-base"


import { CardField, useConfirmSetupIntent } from '@stripe/stripe-react-native';

import { FontAwesome } from '@expo/vector-icons'

import { useRoute } from "@react-navigation/native"
import { RouteProp, useNavigation } from "@react-navigation/native"
import Modal from "react-native-modal"

import { colors } from "../utils/colors"
import useModel from "../hooks/useModel"
import { formatToUnits } from "../utils/formatNumber"
import PhotoInterface from "../interfaces/PhotoInterface"
import ModelInterface from "../interfaces/ModelInterface"
import CardInterface from "../interfaces/CardInterface"
import PhotoCard from "../components/PhotoCard"
import useToggleFollow from "../hooks/useToggleFollow"
import NegativeResponse from "../components/NegativeResponse"
import SelectPicker from "react-native-form-select-picker"
import { useForm } from "react-hook-form"
import usePaymentIntent from "../hooks/usePaymentIntent"
import useBillingData from "../hooks/useBillingData"
import useStore, { AppStateInterface } from "../store"

type StatsProps = {
	number: number
	title: string
	style?: ViewStyle
}

const Stats = ({ number, title, style }: StatsProps) => (
	<View style={{ alignItems: "center", ...style }}>
		<Text style={{ fontWeight: "bold" }}>
			{number > 999 ? formatToUnits(number) : number}
		</Text>
		<Text>{title}</Text>
	</View>
)

type ButtonProps = {
	style?: ViewStyle
	children: React.ReactNode
	onPress?: () => void
	transparent?: boolean
	disable?: boolean
}

const Button = ({
	children,
	style,
	onPress,
	transparent,
	disable,
}: ButtonProps) => {
	const handleOnPress = () => {
		if (disable) return

		onPress && onPress()
	}

	return (
		<TouchableOpacity
			style={[
				{
					alignItems: "center",
					justifyContent: "center",
					paddingHorizontal: 8,
					paddingVertical: 2,
					borderRadius: 6,
					opacity: disable ? 0.7 : 1,
					backgroundColor: transparent ? "transparent" : undefined,
					...style,
				},
			]}
			onPress={handleOnPress}
		>
			{children}
		</TouchableOpacity>
	)
}

type RouteParamsProps = RouteProp<
	{
		params: {
			hash: string
		}
	},
	"params"
>

const { width: SCREEN_WIDTH } = Dimensions.get("window")

export default function PublicModelProfileScreen() {
	const navigation = useNavigation()
	const route = useRoute<RouteParamsProps>()
	const hash = route.params.hash
	const [thumbWidth, setThumbWidth] = useState(SCREEN_WIDTH - 24)
	const [viewPaymentMethod, setViewPaymentMethod] = useState<boolean>(false)
	const [selectedCard, setSelectedCard] = useState<string>()

	const { currentUser } = useStore((state: AppStateInterface) => ({
		currentUser: state.authData.user,
	}))


	const { cards } = useBillingData();
	const { client_secret } =  usePaymentIntent();

	const [secret, setSecret] = useState<string>(client_secret);


	useEffect(() => {
		setSecret(client_secret)
	}, [])

	useEffect(() => {
		client_secret && setSecret(client_secret)
	}, [client_secret])

	const {
		toggleFollow,
		data: toggleFollowData,
		loading: toggleFollowLoading,
	} = useToggleFollow()


	const { control, handleSubmit, errors,  watch, getValues, reset } = useForm<any>({
		mode: "onBlur",
	})

	const { modelData, modelLoading, modelError, refetchModel } = useModel(hash)

	const [model, setModel] = useState<ModelInterface | undefined>()
	const [currentPhoto, setCurrentPhoto] = useState<PhotoInterface | null>()


	const { confirmSetupIntent, loading } = useConfirmSetupIntent();

	const  onSubmit = async () => {
		// Gather the customer's billing information (e.g., email)
		const billingDetails = {
			email: currentUser?.email,
		};
		// Create a setup intent on the backend
		
		const { setupIntent, error } = await confirmSetupIntent(secret, {
			type: 'Card',
			billingDetails,
		});
	
		if (error) {
			console.log(error)
		}
				
		if(setupIntent ||  selectedCard)
		{
			toggleFollow({ 
				payment_method: selectedCard !== "new" ? selectedCard : setupIntent?.paymentMethodId ,
				modele_id: modelData.modele.id, 
				stripe_price: modelData?.getModelPrice?.price_id
			})
		}


		if (toggleFollowData?.toggleFollow.success) {
			alert(
				"Congratulation!!! Now you can see picture and video of this model."
			)
			setViewPaymentMethod(false)
		}
		// setViewPaymentMethod(false)
	}

	React.useEffect(() => {
		if (modelData) {
			setModel(modelData.modele)
		}
	}, [modelData])

	React.useEffect(() => {
		if (toggleFollowData) {
			refetchModel()
		}
	}, [toggleFollowData])

	const handleToggleFollow = () => {
		// TO DO FOR PAYMENT CHECK
		if (!modelData.modele.followed_by_me) {
			setViewPaymentMethod(true)
		} else {
			Alert.alert(
				'Unfollow this model',
				'If you unfollow this model, you will not be able to see her picture and video anymore',
				[
					{
						text: 'Cancel',
						onPress: () => console.log('Cancel Pressed'),
						style: 'cancel'
					},
					{
						text: 'OK', onPress: () => toggleFollow({ modele_id: modelData.modele.id })
					}
				],
				{ cancelable: false }
			)


		}
	}

	const goBack = () => navigation.goBack()

	const goToPhoto = (photo: PhotoInterface) => {
		setCurrentPhoto(photo)
	}

	return (
		<Container>
			<Header
				iosBarStyle="light-content"
				androidStatusBarColor={colors.black}
				style={{ backgroundColor: colors.pink }}
			>
				<Left style={{ flexDirection: "row", alignItems: "center" }}>
					<Button transparent onPress={goBack}>
						<FontAwesome name="arrow-left" size={24} color={colors.white} />
					</Button>

					<Text
						style={{
							fontWeight: "bold",
							color: colors.white,
						}}
					>
						{model?.stage_name}
					</Text>
				</Left>
				<Right style={{ flex: 1 }}>
					<Button transparent onPress={() => alert("pressed more")}>
						<FontAwesome name="ellipsis-v" size={24} color={colors.white} />
					</Button>
				</Right>
			</Header>

			{modelLoading ? (
				<Spinner color={colors.pink} />
			) : modelError ? (
				<NegativeResponse>
					<Text>An error occurred</Text>
					<Button
						style={{
							borderWidth: 1,
							borderColor: colors.pink,
							marginTop: 12,
							padding: 12,
						}}
						onPress={() => refetchModel()}
					>
						<Text>Retry?</Text>
					</Button>
				</NegativeResponse>
			) : (
				<FlatList
					showsVerticalScrollIndicator={false}
					ListHeaderComponent={() => (
						<>
							{modelLoading ? (
								<Spinner color={colors.pink} />
							) : modelError ? (
								<Text>An error occurred</Text>
							) : (
								<View style={{ padding: 12 }}>
									<View
										style={{
											flexDirection: "row",
											justifyContent: "space-between",
											alignItems: "center",
											marginBottom: 8,
										}}
									>
										<Thumbnail
											large
											source={{ uri: modelData.modele.poster }}
											style={{}}
										/>

										<View
											style={{
												flex: 1,
												marginLeft: 48,
												flexDirection: "row",
												justifyContent: "flex-end",
												alignItems: "center",
											}}
										>
											<Stats
												title={`Post${modelData.modele.photos.length !== 1 ? "s" : ""
													}`}
												number={modelData.modele.photos.length}
											/>
											<Stats
												style={{ marginLeft: 12 }}
												title={`Follower${modelData.modele.followers.length !== 1 ? "s" : ""
													}`}
												number={modelData.modele.followers.length}
											/>
										</View>
									</View>

									<View style={{ marginBottom: 24, marginLeft: 20 }}>
										<Text>{modelData.modele.stage_name}</Text>
										<Text>{modelData.modele.bio}</Text>
									</View>

									<View style={{ flexDirection: "row", marginBottom: 24 }}>
										<Button
											style={{
												flex: 1,
												backgroundColor: colors.pink,
												borderColor: modelData.modele.followed_by_me
													? colors.pink
													: colors.white,
												borderWidth: 1,
												height: 40
											}}
											onPress={() => !viewPaymentMethod ? handleToggleFollow() : setViewPaymentMethod(false)}
											disable={toggleFollowLoading}
										>
											<Text style={{ color: colors.white }}>
												{modelData.modele.followed_by_me
													? "Unfollow"
													: !viewPaymentMethod
														? "Follow"
														: "Cancel"}
											</Text>
										</Button>

										<Button
											style={{
												marginLeft: 4,
												borderColor: colors.pink,
												borderWidth: 1,
											}}
										>
											<FontAwesome name="arrow-down" size={24} />
										</Button>
									</View>
								</View>
							)}

							{viewPaymentMethod ? (
								<View style={{ padding: 15 }}>
									{ !modelData?.getModelPrice?.price_id ? 
										<Text style={{ color: colors.darkGrey }}>
											This model don't have any price yet and connot be folllow at this time.
										</Text>
										:
										<>
											<Text
												style={{
													marginBottom: 10,
													fontWeight: "bold",
													color: colors.darkGrey,
												}}
											>
												Please, select your payment method
											</Text>
		
											<SelectPicker
												dismissable
												doneButtonText="Done"
												onValueChange={(e) => setSelectedCard(e)}
												selected={selectedCard}
												style={{
													flexDirection: "row",
													justifyContent: "flex-start",
													borderWidth: 1,
													borderColor: "#fce3e9",
													borderRadius: 5,
													height: 45,
												}}
												placeholder="Pay with an existant card"
												placeholderStyle={{
													textAlign: "left",
													fontSize: 18,
												}}
											>
												{cards && cards.map((card: CardInterface, idx: number) =>
														<SelectPicker.Item
															key={idx}
															label={`xxxx xxxx xxxx ${card.last4}`}
															value={card.id}
														/>
													)
												}
												<SelectPicker.Item
													label={`Pay with a new card`}
													value={`new`}
												/>
											</SelectPicker>
		
											{(selectedCard && selectedCard === "new"   ) && (
												<>
													<Text
														style={{
															marginTop: 30,
															// marginBottom: ,
															color: colors.darkGrey,
														}}
													>
														Pay with a new card
													</Text>
												
													<CardField
														postalCodeEnabled={true}
														placeholder={{
															number: '4242 4242 4242 4242',
														}}
														cardStyle={{
															backgroundColor: '#FFFFFF',
															textColor: '#000000',
															borderWidth: 1,
															borderColor: "#fce3e9",
															borderRadius: 5,
														}}
														style={{
															width: '100%',
															height: 45,
															marginVertical: 30,
														}}
													/>
													
												</>
											)}
		
											{selectedCard && 
												<Button
													style={{
														flex: 1,
														backgroundColor: colors.pink,
														width: "30%",
														marginTop: 20,
														paddingTop: 7,
														paddingBottom: 7,
													}}
													onPress={handleSubmit(onSubmit)}
													disable={toggleFollowLoading} 
												>
													<Text style={{ color: colors.white }}>Follow Now</Text>
												</Button>
											}
										</> 
									}
								</View>
							) : (
								!modelData.modele.followed_by_me && (
									<View style={{ paddingLeft: 15, paddingRight: 15 }}>
										<View
											style={{
												padding: 10,
												borderRadius: 10,
											}}
										>
											<Text style={{ color: colors.darkGrey }}>
												To be able to view the photos and video of this model,
												you have to be a follower first.
											</Text>

											<Text style={{ marginTop: 10, color: colors.darkGrey }}>
												To follow this model, please click on the follow button
												and pay $15 every month that you can cancel anytime.
											</Text>
										</View>
									</View>
								)
							)}

							{currentPhoto && (
								<Modal
									isVisible
									useNativeDriver
									onBackButtonPress={() => setCurrentPhoto(null)}
									onBackdropPress={() => setCurrentPhoto(null)}
								>
									<View style={{ borderRadius: 15, overflow: "hidden" }}>
										<PhotoCard hideHeader photo={currentPhoto} />
									</View>
								</Modal>
							)}
						</>
					)}
					numColumns={3}
					onLayout={(event) => setThumbWidth(event.nativeEvent.layout.width)}
					ListEmptyComponent={() => (
						<NegativeResponse>
							<Text>That model has no photos yet.</Text>
						</NegativeResponse>
					)}
					data={modelData.modele.photos}
					keyExtractor={(photo) => photo.id}
					renderItem={({ item: photo }: { item: PhotoInterface }) => (
						<View>
							{modelData.modele.followed_by_me && (
								<TouchableOpacity
									style={{
										borderWidth: 1,
										borderColor: colors.pink,
									}}
									onPress={() => goToPhoto(photo)}
								>
									<Image
										source={{ uri: photo.uri }}
										style={{
											width: thumbWidth / 3,
											height: thumbWidth / 3,
										}}
										resizeMode="cover"
									/>
								</TouchableOpacity>
							)}
						</View>
					)}
				/>
			)}
		</Container>
	)
}

const styles = StyleSheet.create({
	inputContainer: {
		flex: 1,
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "space-around",
	},
	inputLeft: {
		width: "30%",
		color: colors.pink,
		fontWeight: "bold",
	},
	inputRight: {
		textAlign: "right"
	},
})
