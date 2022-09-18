<template>
  <b-card no-body class="card-profile" alt="Image placeholder" img-top>
    <b-row class="justify-content-center">
      <b-col lg="3" class="order-lg-2">
        <div class="card-profile-image">
          <a href="#">
            <b-img src="user.png" rounded="circle" />
          </a>
        </div>
      </b-col>
    </b-row>

    <b-card-header class="text-center border-0 pt-8 pt-md-8 pb-0 pb-md-4">
    </b-card-header>

    <b-card-body class="pt-0">
      <div class="text-center">
        <h5 class="h3">
          {{ user.name }}<span class="font-weight-light"></span>
        </h5>
        <div class="h5 font-weight-300">
          <i class="ni location_pin mr-2"></i>{{ user.address }}
        </div>
        <div class="h5 mt-4">
          <i class="ni business_briefcase-24 mr-2"></i>{{ user.phone }}
        </div>
        <hr class="my-4" />
        <p>{{ user.username }}</p>
      </div>
    </b-card-body>
  </b-card>
</template>
<script>
export default {
  computed: {
    user() {
      return this.$store.state.auth.user
    },
  },
}
</script>
<style  scoped>
@media (max-width: 800px) {
  .card-profile {
    margin-top: 4rem;
  }
}
</style>
