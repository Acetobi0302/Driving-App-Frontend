<template>
  <div>
    <base-header class="pb-6 pt-3 bgs-red pt-lg-7 d-flex align-items-center">
      <!-- Card stats -->

      <div class="row align-items-center">
        <div class="col-lg-6 col-7">
          <h6 class="h2 text-white d-inline-block mb-0"></h6>
        </div>
      </div>
    </base-header>
    <b-container fluid class="mt--6">
      <b-row>
        <b-col>
          <FranchiseList />
        </b-col>
      </b-row>
      <div class="mt-5"></div>
    </b-container>
  </div>
</template>
<script>
import FranchiseList from '~/components/Franchise/FranchiseList.vue'
export default {
  components: {
    FranchiseList,
  },
  layout: 'DashboardLayout',
  middleware: 'authenticated',
  async asyncData({ store, params }) {
    await store.dispatch('getFranchiseList')
  },
}
</script>
