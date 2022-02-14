import Vue from 'vue'
import { openKkiapayWidget, addKkiapayListener, removeKkiapayListener } from 'kkiapay'

Vue.prototype.$openKkiapayWidget = openKkiapayWidget
Vue.prototype.$addKkiapayListener = addKkiapayListener
Vue.prototype.$removeKkiapayListener
 = removeKkiapayListener
