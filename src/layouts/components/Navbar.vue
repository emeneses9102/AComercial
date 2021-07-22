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
      </div>

      <b-navbar-nav class="nav align-items-center ml-auto">
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
              :src="require('@/assets/images/logo/ico-simsac.png')"
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
            @click="()=>$store.dispatch('authentication/logout')"
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
        :user-to-change-password="$store.state.authentication.user.usuario"
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
import DarkToggler from '@core/layouts/components/app-navbar/components/DarkToggler.vue'
import ModalChangePassword from '@/components/ModalChangePassword/ModalChangePassword.vue'
import { mapState } from 'vuex'
import FullScreen from './FullScreen.vue'

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
    ModalChangePassword,
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
    }
  },
  computed: {
    ...mapState('authentication', ['user']),
  },
}
</script>
