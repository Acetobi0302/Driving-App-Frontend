<template>
  <nav
    id="sidenav-main2"
    class="
      navbar navbar-vertical
      fixed-left
      pt-2
      navbar-expand-md navbar-light
      bg-white
    "
    :data="backgroundColor"
  >
    <div class="container-fluid">
      <!--Toggler-->
      <navbar-toggle-button @click.native="showSidebar"> </navbar-toggle-button>
      <router-link class="navbar-brand" to="/">
        <img :src="logo" class="navbar-brand-img" alt="..." />
      </router-link>

      <slot name="mobile-right">
        <ul class="nav align-items-center d-md-none">
          <base-dropdown class="nav-item" menu-on-right tag="li" title-tag="a">
            <a
              slot="title-container"
              class="nav-link nav-link-icon"
              href="#"
              role="button"
              aria-haspopup="true"
              aria-expanded="false"
            >
              <i class="ni ni-bell-55"></i>
            </a>

            <a class="dropdown-item" href="#">Action</a>
            <a class="dropdown-item" href="#">Another action</a>
            <div class="dropdown-divider"></div>
            <a class="dropdown-item" href="#">Something else here</a>
          </base-dropdown>
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
        </ul>
      </slot>
      <slot></slot>
      <div
        v-show="$sidebar.showSidebarDD"
        id="sidenav-collapse-main"
        class="navbar-collapse collapse show"
      >
        <div class="navbar-collapse-header d-md-none">
          <div class="row">
            <div class="col-6 collapse-brand">
              <router-link to="/">
                <img :src="logo" />
              </router-link>
            </div>
            <div class="col-6 collapse-close">
              <navbar-toggle-button
                @click.native="closeSidebar"
              ></navbar-toggle-button>
            </div>
          </div>
        </div>

        <ul class="navbar-nav">
          <slot name="links"> </slot>
        </ul>
      </div>
    </div>
  </nav>
</template>
<script>
import NavbarToggleButton from '@/components/NavbarToggleButton'
export default {
  components: {
    NavbarToggleButton,
  },
  provide() {
    return {
      autoClose: this.autoClose,
    }
  },
  props: {
    type: {
      type: String,
      default: 'light',
      description: 'Sidebar type',
    },
    title: {
      type: String,
      default: 'Sevim Fahrschule',
      description: 'Sidebar title',
    },
    shortTitle: {
      type: String,
      default: 'CT',
      description: 'Sidebar short title',
    },
    logo: {
      type: String,
      default: 'logo.png',
      description: 'Sidebar app logo',
    },
    backgroundColor: {
      type: String,
      default: 'vue',
      validator: (value) => {
        const acceptedValues = [
          '',
          'vue',
          'blue',
          'green',
          'orange',
          'red',
          'primary',
        ]
        return acceptedValues.includes(value)
      },
      description:
        'Sidebar background color (vue|blue|green|orange|red|primary)',
    },
    sidebarLinks: {
      type: Array,
      default: () => [],
      description:
        "List of sidebar links as an array if you don't want to use components for these.",
    },
    autoClose: {
      type: Boolean,
      default: true,
      description:
        'Whether sidebar should autoclose on mobile when clicking an item',
    },
  },
  computed: {
    user() {
      return this.$store.state.auth.user
    },
  },
  beforeDestroy() {
    if (this.$sidebar.showSidebar) {
      this.$sidebar.showSidebar = false
    }
  },
  methods: {
    closeSidebar() {
      this.$sidebar.displaySidebar(false)
    },
    async logout() {
      await this.$auth.logout()
      this.$router.push('/login')
    },
    showSidebar() {
      this.$sidebar.displaySidebar(true)
    },
  },
}
</script>
