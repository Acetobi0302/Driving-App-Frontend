<template>
  <base-nav
    id="nav-bar-main"
    container-classes="container-fluid"
    class="navbar-top navbar-expand"
    :class="{ 'navbar-dark': type === 'default' }"
  >
    <a
      href="#"
      aria-current="page"
      class="
        h4
        mb-0
        text-white text-uppercase
        d-none d-lg-inline-block
        active
        router-link-active
      "
    >
      {{ $tc($route.name) }}
    </a>
    <!-- Navbar links -->
    <b-navbar-nav class="align-items-center ml-md-auto">
      <!-- This item dont have <b-nav-item> because item have data-action/data-target on tag <a>, wich we cant add -->
    </b-navbar-nav>
    <b-navbar-nav class="ml-auto">
      <b-nav-form>
        <li class="nav-item">
          <a
            class="nav-link nav-link-icon"
            target="_blank"
            href="https://www.fahrschule-sevim.de/uber-uns/"
          >
            <span class="nav-link nav-link-inner--text">
              {{ $tc('AboutUs') }}</span
            >
          </a>
        </li>
        <li class="nav-item">
          <a
            class="nav-link nav-link-icon"
            target="_blank"
            href="https://www.fahrschule-sevim.de/kontakt/"
          >
            <span class="nav-link nav-link-inner--text">{{
              $tc('ContactUs')
            }}</span>
          </a>
        </li>
        <base-dropdown
          menu-on-right
          class="nav-item"
          tag="li"
          title-tag="a"
          title-classes="nav-link pr-0"
        >
          <a
            slot="title-container"
            href="#"
            class="nav-link pr-0"
            @click.prevent
          >
            <b-media no-body class="align-items-center">
              <span class="avatar avatar-sm rounded-circle">
                <img alt="Image placeholder" src="user.png" />
              </span>
              <b-media-body class="ml-2 d-none d-lg-block">
                <span class="mb-0 text-sm font-weight-bold">{{
                  user.name
                }}</span>
              </b-media-body>
            </b-media>
          </a>

          <div>
            <b-dropdown-item to="/profile">
              <i class="fas fa-user fa-2x"></i>
              <span>{{ $tc('Myprofile') }}</span>
            </b-dropdown-item>
            <div class="dropdown-divider"></div>
            <b-dropdown-item @click="logout">
              <i class="fas fa-running fa-2x"></i>
              <span>{{ $tc('Logout') }}</span>
            </b-dropdown-item>
          </div>
        </base-dropdown>
      </b-nav-form>
    </b-navbar-nav>
  </base-nav>
</template>
<script>
import { CollapseTransition } from 'vue2-transitions'
import BaseNav from '@/components/argon-core/Navbar/BaseNav.vue'

export default {
  components: {
    // eslint-disable-next-line vue/no-unused-components
    CollapseTransition,
    BaseNav,
  },
  props: {
    type: {
      type: String,
      default: 'default', // default|light
      description:
        'Look of the dashboard navbar. Default (Green) or light (gray)',
    },
  },
  data() {
    return {
      activeNotifications: false,
      showMenu: false,
      searchModalVisible: false,
      searchQuery: '',
    }
  },
  computed: {
    user() {
      return this.$store.state.auth.user
    },
    routeName() {
      const { name } = this.$route
      return this.capitalizeFirstLetter(name)
    },
  },
  methods: {
    capitalizeFirstLetter(string) {
      return string.charAt(0).toUpperCase() + string.slice(1)
    },
    toggleNotificationDropDown() {
      this.activeNotifications = !this.activeNotifications
    },
    closeDropDown() {
      this.activeNotifications = false
    },
    async logout() {
      await this.$auth.logout()
      this.$router.push('/login')
    },
  },
}
</script>
<style>
@media (max-width: 800px) {
  #nav-bar-main {
    display: none;
  }
}
</style>