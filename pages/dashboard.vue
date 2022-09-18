<template>
  <div>
    <dashboard-header />
    <b-container fluid class="mt--6">
      <b-row>
        <b-col>
          <calander />
        </b-col>
      </b-row>
      <div class="mt-5"></div>
    </b-container>
  </div>
</template>
<script>
import calander from '~/components/dashboard/calander.vue'
import dashboardHeader from '~/components/dashboard/dashboardHeader.vue'
export default {
  components: {
    dashboardHeader,
    calander,
  },
  layout: 'DashboardLayout',
  middleware: 'authenticated',
  async asyncData({ store, params }) {
    if(store.state.auth.user.role !== 'driver'){
    await store.dispatch('getAllFranchise')
    await store.dispatch('getClassesList')
    }
  },
}
</script>
