import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import vuetify from './plugins/vuetify'

// clip
import VueClipboard from 'vue-clipboard2'
VueClipboard.config.autoSetContainer = true // add this line
Vue.use(VueClipboard)

// Auth and permission
import './permission'

// global css
import './styles/index.scss'

Vue.config.productionTip = false

// mount function to Vue prototype, so you can use this.$message component
import { EventBus } from './utils/event-bus'

Vue.prototype.$message = {
  success: (msg = 'Success') => EventBus.$emit('app.message', msg, 'success'),
  error: (msg = 'Error') => EventBus.$emit('app.message', msg, 'error'),
  warning: (msg = 'Warning') => EventBus.$emit('app.message', msg, 'warning')
}
if (window.ethereum !== undefined) {
  // const chainId = await window.ethereum.request({ method: 'eth_chainId' })
  // handleChainChanged(chainId)

  window.ethereum.on('chainChanged', handleChainChanged)
}

function handleChainChanged(chainId) {
  // We recommend reloading the page, unless you must do otherwise
  // window.location.reload()
  console.log(chainId)
  if (chainId !== '0x13881') {
  // if (chainId !== 80001) {
    Vue.prototype.$message.warning('please change your metamask chain to polygon Mumbai')
  } else {
    window.location.reload()
  }
}
Vue.prototype.$handleChainChanged = handleChainChanged

new Vue({
  router,
  store,
  vuetify,
  render: h => h(App)
}).$mount('#app')
