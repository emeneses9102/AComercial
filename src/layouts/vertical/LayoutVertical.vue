<template>
  <layout-vertical>

    <router-view />

    <template #navbar="{ toggleVerticalMenuActive }">
      <navbar :toggle-vertical-menu-active="toggleVerticalMenuActive" />
    </template>

    <template slot="breadcrumb">
      <b-row
        v-if="$route.meta.breadcrumb || $route.meta.pageTitle"
        class="content-header"
      >
        <b-col
          class="content-header-left mb-2"
          cols="12"
          md="12"
        >
          <b-row class="breadcrumbs-top">
            <b-col cols="12">
              <h2 class="content-header-title float-left pr-1 mb-0">
                {{ $route.meta.pageTitle }}
              </h2>
              <div class="breadcrumb-wrapper">
                <b-breadcrumb>
                  <b-breadcrumb-item to="/">
                    <feather-icon
                      icon="HomeIcon"
                      size="16"
                      class="align-text-top"
                    />
                  </b-breadcrumb-item>
                  <b-breadcrumb-item
                    v-for="item in $route.meta.breadcrumb"
                    :key="item.text"
                    :active="item.active"
                    :to="item.to"
                  >
                    {{ item.text }}
                  </b-breadcrumb-item>
                </b-breadcrumb>
              </div>
            </b-col>
          </b-row>
        </b-col>
      </b-row>
    </template>

    <div
      slot="footer"
      class="d-none"
    />

  </layout-vertical>
</template>

<script>
import LayoutVertical from '@core/layouts/layout-vertical/LayoutVertical.vue'
import {
  BRow, BCol, BBreadcrumb, BBreadcrumbItem,
} from 'bootstrap-vue'
import Navbar from '../components/Navbar.vue'

export default {
  components: {
    LayoutVertical,
    Navbar,
    BRow,
    BCol,
    BBreadcrumb,
    BBreadcrumbItem,
  },
}
</script>
