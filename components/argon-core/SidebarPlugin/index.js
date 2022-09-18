import Sidebar from './SideBar.vue'
import SidebarItem from './SidebarItem.vue'

const SidebarStore = {
  showSidebar: false,
  sidebarLinks: [],
  isMinimized: false,
  breakpoint: 1200,
  hovered: false,
  showSidebarDD: false,
  sidebarLinksDD: [],
  isMinimizedDD: false,
  displaySidebarDD(value) {
    this.showSidebarDD = value
  },
  toggleMinimizeDD() {
    document.body.classList.toggle('sidebar-mini')
    // we simulate the window Resize so the charts will get updated in realtime.
    const simulateWindowResize = setInterval(() => {
      window.dispatchEvent(new Event('resize'))
    }, 180)

    // we stop the simulation of Window Resize after the animations are completed
    setTimeout(() => {
      clearInterval(simulateWindowResize)
    }, 1000)

    this.isMinimized = !this.isMinimized
  },
  displaySidebar(value) {
    if (window.innerWidth > this.breakpoint) {
      return
    }
    this.isMinimized = !value
    this.showSidebar = value
    const docClasses = document.body.classList
    if (value) {
      docClasses.add('g-sidenav-pinned')
      docClasses.add('g-sidenav-show')
      docClasses.remove('g-sidenav-hidden')
    } else {
      docClasses.add('g-sidenav-hidden')
      docClasses.remove('g-sidenav-pinned')
      docClasses.remove('g-sidenav-show')
    }
  },
  toggleMinimize() {
    this.isMinimized = !this.isMinimized
    const docClasses = document.body.classList
    if (this.isMinimized) {
      docClasses.remove('g-sidenav-pinned')
    } else {
      docClasses.add('g-sidenav-pinned')
    }
    if (this.hovered) {
      docClasses.add('g-sidenav-show')
    }
  },
  onMouseEnter() {
    this.hovered = true
    if (this.isMinimized) {
      document.body.classList.add('g-sidenav-show')
      document.body.classList.remove('g-sidenav-hidden')
    }
  },
  onMouseLeave() {
    this.hovered = false
    if (this.isMinimized) {
      const docClasses = document.body.classList
      docClasses.remove('g-sidenav-show')
      docClasses.add('g-sidenav-hide')
      setTimeout(() => {
        docClasses.remove('g-sidenav-hide')
        docClasses.add('g-sidenav-hidden')
      }, 300)
    }
  },
}

const SidebarPlugin = {
  install(Vue, options) {
    if (options && options.sidebarLinks) {
      SidebarStore.sidebarLinks = options.sidebarLinks
    }
    const app = new Vue({
      data: {
        sidebarStore: SidebarStore,
      },
    })
    Vue.prototype.$sidebar = app.sidebarStore
    Vue.component('SideBar', Sidebar)
    Vue.component('SidebarItem', SidebarItem)
  },
}

export default SidebarPlugin
