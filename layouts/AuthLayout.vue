<template>
  <div class="main-content">
    <base-nav
      v-model="showMenu"
      :transparent="true"
      menu-classes="justify-content-end"
      class="navbar-horizontal navbar-main navbar-top navbar-dark"
      expand="lg"
    >
      <div slot="brand" class="navbar-wrapper">
        <img src="logo.png" />
      </div>

      <div>
        <div class="navbar-collapse-header">
          <b-row>
            <b-col cols="6" class="collapse-brand">
              <img src="logo.png" />
            </b-col>
            <b-col cols="6" class="collapse-close">
              <button
                type="button"
                class="navbar-toggler"
                @click="showMenu = false"
              >
                <span></span>
                <span></span>
              </button>
            </b-col>
          </b-row>
        </div>
        <b-navbar-nav class="align-items-lg-center ml-lg-auto">
          <b-nav-item>
            <i class="fas fa-key"></i>
            <span>{{ $tc('Signin') }}</span>
          </b-nav-item>
        </b-navbar-nav>
      </div>
    </base-nav>

    <div class="main-content">
      <zoom-center-transition :duration="pageTransitionDuration" mode="out-in">
        <router-view></router-view>
      </zoom-center-transition>
    </div>

    <footer id="footer-main" class="py-5">
      <b-container>
        <b-row align-v="center" class="justify-content-xl-between">
          <b-col xl="6">
            <div class="copyright text-center text-xl-left text-white">
              © {{ year }}
              <a
                href="https://www.fahrschule-sevim.de/home/"
                class="font-weight-bold ml-1 text-white"
                target="_blank"
                >Sevim Fahrschule</a
              >
            </div>
          </b-col>
          <b-col xl="6" class="col-xl-6">
            <b-nav
              class="nav-footer justify-content-center justify-content-xl-end"
            >
              <b-nav-item
                class="text-white"
                href="https://www.fahrschule-sevim.de/uber-uns/"
                target="_blank"
              >
                {{ $tc('AboutUs') }}
              </b-nav-item>
              <b-nav-item
                class="text-white"
                href="https://www.fahrschule-sevim.de/karriere/"
                target="_blank"
              >
                {{ $tc('ContactUs') }}
              </b-nav-item>
            </b-nav>
          </b-col>
        </b-row>
      </b-container>
    </footer>
  </div>
</template>
<script>
import { ZoomCenterTransition } from 'vue2-transitions'

export default {
  components: {
    ZoomCenterTransition,
  },
  beforeRouteUpdate(to, from, next) {
    // Close the mobile menu first then transition to next page
    if (this.showMenu) {
      this.closeMenu()
      setTimeout(() => {
        next()
      }, this.menuTransitionDuration)
    } else {
      next()
    }
  },
  props: {
    backgroundColor: {
      type: String,
      default: 'black',
    },
  },
  data() {
    return {
      showMenu: false,
      menuTransitionDuration: 250,
      pageTransitionDuration: 200,
      year: new Date().getFullYear(),
      pageClass: 'login-page',
    }
  },
  computed: {
    title() {
      return `${this.$route.name} Page`
    },
  },
  watch: {
    $route: {
      immediate: true,
      handler() {
        this.updateBackground()
      },
    },
  },
  beforeDestroy() {
    this.removeBackgroundColor()
  },
  methods: {
    toggleNavbar() {
      document.body.classList.toggle('nav-open')
      this.showMenu = !this.showMenu
    },
    closeMenu() {
      document.body.classList.remove('nav-open')
      this.showMenu = false
    },
    setBackgroundColor() {
      document.body.classList.add('bg-default')
    },
    removeBackgroundColor() {
      document.body.classList.remove('bg-default')
    },
    updateBackground() {
      if (!this.$route.meta.noBodyBackground) {
        this.setBackgroundColor()
      } else {
        this.removeBackgroundColor()
      }
    },
  },
}
</script>
<style lang="scss" scoped>
$scaleSize: 0.8;
@keyframes zoomIn8 {
  from {
    opacity: 0;
    transform: scale3d($scaleSize, $scaleSize, $scaleSize);
  }
  100% {
    opacity: 1;
  }
}

.nav-link {
  color: white;
}
.main-content .zoomIn {
  animation-name: zoomIn8;
}
@keyframes zoomOut8 {
  from {
    opacity: 1;
  }
  to {
    opacity: 0;
    transform: scale3d($scaleSize, $scaleSize, $scaleSize);
  }
}

.main-content .zoomOut {
  animation-name: zoomOut8;
}
</style>
