<template>
  <div class="wrapper">
    <side-bar>
      <template slot="links">
        <div class="slider-divider"></div>
        <SidebarItem
          :link="{
            name: $tc('Dashboard'),
            path: '/dashboard',
            icon: 'fas fa-tv  text-info',
          }"
        >
        </SidebarItem>
        <SidebarItem
          v-if="!isDriver"
          :link="{
            name: $tc('Students'),
            path: '/students',
            icon: 'fas fa-graduation-cap text-warning',
          }"
        >
        </SidebarItem>
        <SidebarItem
          :link="{
            name: $tc('Accounts'),
            path: '/accounts',
            icon: 'fas fa-wallet text-success',
          }"
        >
        </SidebarItem>
        <!-- <SidebarItem
          :link="{
            name: 'Calander',
            path: '/calander',
            icon: 'fas fa-calendar text-danger',
          }"
        >
        </SidebarItem> -->
        <div>
          <div class="slider-divider"></div>
          <h6 v-if="isadmin" class="navbar-heading py-0 text-muted">
            {{ $tc('Admin') }}
          </h6>
          <SidebarItem
            v-if="isadmin"
            :link="{
              name: $tc('Users'),
              path: '/users',
              icon: 'fas fa-users text-info',
            }"
          >
          </SidebarItem>
          <SidebarItem
            v-if="isadmin"
            :link="{
              name: $tc('Franchise'),
              path: '/franchise',
              icon: 'fas fa-code-branch text-warning',
            }"
          >
          </SidebarItem>
          <SidebarItem
            v-if="isadmin"
            :link="{
              name: $tc('Classes'),
              path: '/classes',
              icon: 'fas fa-car-side text-success',
            }"
          >
          </SidebarItem>
          <SidebarItem
            v-if="isadmin"
            :link="{
              name: $tc('CoursesArt'),
              path: '/courses_art',
              icon: 'fas fa-columns text-primary',
            }"
          >
          </SidebarItem>
          <SidebarItem
            v-if="isadmin"
            :link="{
              name: $tc('CarManagement'),
              path: '/car_management',
              icon: 'fas fa-car text-dark',
            }"
          >
          </SidebarItem>
          <div v-if="isadmin" class="slider-divider"></div>
        </div>
        <!--<SidebarItem
          v-if="isadmin"
          opened
          :link="{
            name: 'Settings',
            icon: 'fab fa-vuejs',
          }"
        >
          <SidebarItem
            opened
            :link="{
              name: 'Car Management',
              path: '/car-management',
              icon: 'fas fa-car text-dark',
            }"
          >
          </SidebarItem>

          <SidebarItem
            opened
            :link="{
              name: 'Users',
              path: '/users',
              icon: 'fas fa-users text-info',
            }"
          >
          </SidebarItem>
          <SidebarItem
            opened
            :link="{
              name: 'Franchise ',
              path: '/franchise',
              icon: 'fas fa-code-branch text-warning',
            }"
          >
          </SidebarItem>
          <SidebarItem
            opened
            :link="{
              name: 'Classes ',
              path: '/classes',
              icon: 'fas fa-car-side text-success',
            }"
          >
          </SidebarItem>
        </SidebarItem>-->
      </template>
    </side-bar>
    <div class="main-content">
      <dashboard-navbar :type="$route.meta.navbarType"></dashboard-navbar>
      <mob-top-navbar :type="$route.meta.navbarType"></mob-top-navbar>
      <div @click="$sidebar.displaySidebar(false)">
        <fade-transition :duration="200" origin="center top" mode="out-in">
          <!-- your content here -->
          <router-view></router-view>
        </fade-transition>
      </div>
      <div class="py-4" />
    </div>
  </div>
</template>
<script>
/* eslint-disable no-new */
import PerfectScrollbar from 'perfect-scrollbar'
import 'perfect-scrollbar/css/perfect-scrollbar.css'

import { FadeTransition } from 'vue2-transitions'
import DashboardContent from '@/components/argon-core/layouts/Content.vue'
import DashboardNavbar from '@/components/argon-core//layouts/DashboardNavbar.vue'
import MobTopNavbar from '@/components/argon-core/layouts/MobTopNavbar.vue'
function hasElement(className) {
  return document.getElementsByClassName(className).length > 0
}

function initScrollbar(className) {
  if (hasElement(className)) {
    new PerfectScrollbar(`.${className}`)
  } else {
    // try to init it later in case this component is loaded async
    setTimeout(() => {
      initScrollbar(className)
    }, 100)
  }
}

export default {
  components: {
    DashboardNavbar,
    // eslint-disable-next-line vue/no-unused-components
    DashboardContent,
    FadeTransition,
    MobTopNavbar,
  },
  computed: {
    isadmin() {
      return this.$store.state.auth.user.role === 'admin'
    },
    isDriver() {
      return this.$store.state.auth.user.role === 'driver'
    },
  },
  mounted() {
    this.initScrollbar()
    const docClasses = document.body.classList
    docClasses.add('g-sidenav-pinned')
    docClasses.add('g-sidenav-show')
  },
  methods: {
    initScrollbar() {
      const isWindows = navigator.platform.startsWith('Win')
      if (isWindows) {
        initScrollbar('sidenav')
      }
    },
  },
}
</script>
<style lang="scss">
body {
  // background-image: linear-gradient(87deg, #f5365c 0, #f56036 100%) !important
  background-image: linear-gradient(
    to bottom,
    #f00004,
    #f2352b,
    #f14f47,
    #ed6660,
    #e77a77,
    #e77a77,
    #e77a77,
    #e77a77,
    #ed6660,
    #f14f47,
    #f2352b,
    #f00004
  );
}
.bg-success {
  background-color: transparent !important;
}
.footer {
  background-color: #686868;
}
.rowclass {
  font-weight: 600;
}
.table th,
.table td {
  padding-top: 0.3rem;
  padding-bottom: 0.3rem;
  vertical-align: middle;
}
.table td.fit,
.table th.fit {
  white-space: nowrap;
  width: 1%;
}
.table-hover tbody tr:hover td,
.table-hover tbody tr:hover th {
  background-color: #ebc9c97a;
}
.bgs-red {
  background-color: transparent;
}
.slider-divider {
  height: 0;
  margin: 0.5rem 1.3rem;
  overflow: hidden;
  border-top: 1px solid #dbdbdb;
}
.mx-input {
  height: calc(1.5em + 1.25rem + 2px) !important;
  color: #9eabba !important;
  border: 0px solid #d8dbdf;
  &:hover,
  &:focus {
    border: solid 2px #00f1f1 !important;
    box-shadow: 0 1px 3px rgba(30, 148, 167, 0.82),
      0 1px 0 rgba(75, 143, 134, 0.58) !important;
  }
}
.mx-datepicker {
  width: -webkit-fill-available !important;
  width: -moz-available !important;
}
.modal-body {
  padding: 0 !important;
}
.modal-footer {
  padding-bottom: 1rem !important;
  padding: 0rem;
}
.modal-header {
  padding-bottom: 0.4rem;
}
.modal-header .close {
  padding-top: 0.75rem;
}
.close {
  font-size: 2.5rem;
}
.card-header {
  padding: 1rem 1.5rem;
}
</style>
