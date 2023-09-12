import { 
	openKkiapayWidget, 
	removeKkiapayListener, 
	addFailedListener, 
	addFeedbackListener, 
	addPaymentAbortedListener, 
	addSuccessListener,
	addPaymentEndListener,
	addKkiapayCloseListener,
} from 'kkiapay'

export default defineNuxtPlugin(({}) => {
	
	return {
		provide: {
			openKkiapayWidget,
			removeKkiapayListener,
			addSuccessListener,
			addFailedListener,
			addFeedbackListener,
			addPaymentAbortedListener,
			addPaymentEndListener,
			addKkiapayCloseListener,
		}
	}
})


declare module '#app' {
	interface NuxtApp {
		openKkiapayWidget: typeof openKkiapayWidget,
		removeKkiapayListener: typeof removeKkiapayListener,
		addSuccessListener: typeof addSuccessListener,
		addFailedListener: typeof addFailedListener,
		addPaymentAbortedListener: typeof addPaymentAbortedListener,
		addPaymentEndListener: typeof addPaymentEndListener,
		addKkiapayCloseListener: typeof addKkiapayCloseListener,
	}
}