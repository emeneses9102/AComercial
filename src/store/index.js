import Vue from 'vue'
import Vuex from 'vuex'

// Modules
import app from './app'
import appConfig from './app-config'
import verticalMenu from './vertical-menu'
import authentication from './authentication'
import rolesAndPermissions from './rolesAndPermissions'
import pointSale from './point-sale'
import boxSession from './box-session'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    app,
    appConfig,
    verticalMenu,
    authentication,
    rolesAndPermissions,
    pointSale,
    boxSession,
  },
  strict: process.env.DEV,
})
