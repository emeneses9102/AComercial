<template>
  <fragment>
    <div class="navbar-container d-flex content align-items-center">

      <!-- Nav Menu Toggler -->
      <ul class="nav navbar-nav d-xl-none">
        <li class="nav-item">
          <b-link
            class="nav-link"
            @click="toggleVerticalMenuActive"
          >
            <feather-icon
              icon="MenuIcon"
              size="21"
            />
          </b-link>
        </li>
      </ul>

      <!-- Left Col -->
      <div class="bookmark-wrapper align-items-center flex-grow-1 d-flex">
        <dark-Toggler class="d-block" />
        <button-component
          v-if="$route.name === routesName.puntoVenta"
          variant="outline-success"
          text-default="Inicio"
          margin-class="ml-1"
          :method-function="()=>$router.push({name: routesName.inicio})"
          block
        />
        <date-time
          v-if="$route.name === routesName.puntoVenta"
          class="ml-1"
        />
        <!-- <state-point-sale
          v-if="$route.name === routesName.puntoVenta"
          class="ml-1"
        /> -->
      </div>

      <b-navbar-nav class="nav align-items-center ml-auto">
        <template v-if="$route.name === routesName.puntoVenta">
          <button-component
            variant="outline-success"
            :text-default="`N° Sesión ${$store.state.boxSession.boxSession._id}`"
            margin-class="mr-2"
            block
          />
        </template>
        <full-screen />
        <b-nav-item-dropdown
          right
          toggle-class="d-flex align-items-center dropdown-user-link"
          class="dropdown-user"
        >
          <template #button-content>
            <div class="d-sm-flex d-none user-nav">
              <p class="user-name font-weight-bolder mb-25 text-capitalize">
                {{ user.usuario }}
              </p>
              <span class="user-status">
                {{ user.nombreRol }}
              </span>
            </div>
            <b-avatar
              size="40"
              variant="light-primary"
              badge
              :src="user.imagen || require('@/assets/images/logo/ico-simsac.png')"
              class="badge-minimal"
              badge-variant="success"
            />
          </template>
          <b-dropdown-item
            link-class="d-flex align-items-center"
            @click="$bvModal.show(modalId)"
          >
            <feather-icon
              size="16"
              icon="LockIcon"
              class="mr-50"
            />
            <span>Cambiar Clave</span>
          </b-dropdown-item>
          <b-dropdown-item
            link-class="d-flex align-items-center"
            @click="closeSession"
          >
            <feather-icon
              size="16"
              icon="LogOutIcon"
              class="mr-50"
            />
            <span>Cerrar Sesión</span>
          </b-dropdown-item>
        </b-nav-item-dropdown>
      </b-navbar-nav>
    </div>
    <div>
      <modal-change-password
        :id="$store.state.authentication.user._id"
        :user-to-change-password="$store.state.authentication.user.usuario || ''"
        :modal-id="modalId"
      />
    </div>
  </fragment>
</template>

<script>
import {
  BLink, BNavbarNav, BNavItemDropdown, BDropdownItem, BAvatar,
} from 'bootstrap-vue'
import { Fragment } from 'vue-fragment'
import routesName from '@/helpers/routesName'
import DarkToggler from '@core/layouts/components/app-navbar/components/DarkToggler.vue'
import ModalChangePassword from '@/components/ModalChangePassword/ModalChangePassword.vue'
import ButtonComponent from '@/components/ButtonComponent/ButtonComponent.vue'
import { mapState } from 'vuex'
import FullScreen from './FullScreen.vue'
import DateTime from './DateTime.vue'
// import StatePointSale from './StatePointSale.vue'

export default {
  components: {
    Fragment,
    BLink,
    BNavbarNav,
    BNavItemDropdown,
    BDropdownItem,
    BAvatar,

    // Navbar Components
    DarkToggler,
    FullScreen,
    // StatePointSale,
    DateTime,
    ModalChangePassword,
    ButtonComponent,
  },
  props: {
    toggleVerticalMenuActive: {
      type: Function,
      default: () => {},
    },
  },
  data() {
    return {
      modalId: 'modal-change-password-global',
      width: 0,
      height: 0,
    }
  },
  computed: {
    ...mapState('authentication', ['user']),
  },
  created() {
    this.resize()
    window.addEventListener('resize', this.resize)
  },
  destroyed() {
    window.removeEventListener('resize', this.resize)
  },
  methods: {
    resize() {
      this.width = getComputedStyle(document.documentElement).width
      this.height = getComputedStyle(document.documentElement).height
    },
    closeSession() {
      this.$store.dispatch('authentication/logout')
      this.$store.commit('rolesAndPermissions/CLEAR_NAVIGATION')
      this.$store.commit('rolesAndPermissions/CLEAR_OPTIONS')
    },
  },
  setup() {
    return {
      routesName,
    }
  },
}
</script>
