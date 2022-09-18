<template>
  <div
    class="
      sidenav
      navbar navbar-vertical
      fixed-left
      navbar-expand-xs navbar-light
      bg-white
    "
    :data="backgroundColor"
    @mouseover="mouseover"
    @mouseleave="mouseleave"
  >
    <div ref="sidebarScrollArea" class="scrollbar-inner">
      <div class="sidenav-header d-flex justify-content-center">
        <a class="navbar-brand" to="/">
          <img :src="logo" class="navbar-brand-img" alt="Sidebar logo" />
        </a>
        <div
          class="pr-3 sidenav-toggler"
          :class="{
            active: $sidebar.showSidebar,
            'sidenav-toggler-dark': type === 'default',
            'sidenav-toggler-light': type === 'light',
          }"
          @click="toggleSidebar"
        >
          <div class="sidenav-toggler-inner">
            <i class="sidenav-toggler-line"></i>
            <i class="sidenav-toggler-line"></i>
            <i class="sidenav-toggler-line"></i>
          </div>
        </div>
      </div>
      <slot></slot>
      <div class="navbar-inner">
        <ul class="navbar-nav">
          <slot name="links">
            <SidebarItem
              v-for="(link, index) in sidebarLinks"
              :key="link.name + index"
              :link="link"
            >
              <SidebarItem
                v-for="(subLink, index2) in link.children"
                :key="subLink.name + index2"
                :link="subLink"
              >
              </SidebarItem>
            </SidebarItem>
          </slot>
        </ul>
        <slot name="links-after"></slot>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: 'Sidebar',
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
  methods: {
    beforeDestroy() {
      if (this.$sidebar.showSidebar) {
        this.$sidebar.showSidebar = false
      }
    },
    toggleSidebar() {
      this.$sidebar.showSidebar = !this.$sidebar.showSidebar
      this.$sidebar.toggleMinimize(!this.$sidebar.showSidebar)
    },
    mouseover() {
      this.$sidebar.onMouseEnter()
    },
    mouseleave() {
      this.$sidebar.onMouseLeave()
    },
  },
}
</script>
