import { Toast } from "native-base"

const showToast = (message = "default message", options = {}) => {
	Toast.show({
		text: message,
		// buttonText: 'OK',
		duration: 4000,
		// position: "top"
		...options,
	})
}

export { showToast }
