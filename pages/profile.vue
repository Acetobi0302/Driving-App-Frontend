<template>
  <div>
    <div
      class="header pb-6 pt-3 pt-lg-8 d-flex align-items-center profile-header"
    >
      <b-container fluid>
        <!-- Mask -->
        <span class="mask"></span>
         <!--<span class="mask bg-gradient-danger opacity-8"></span>-->
      </b-container>
    </div>

    <b-container fluid class="mt--6">
      <b-row>
        <b-col xl="4" class="order-xl-2 mb-5">
          <user-card />
        </b-col>
        <b-col xl="8" class="order-xl-1">
          <div>
            <user-edit-card  />
          </div>
          <div class="mt-5">
            <user-password-card />
          </div>
        </b-col>
      </b-row>
    </b-container>
  </div>
</template>
<script>
import UserEditCard from '~/components/UserProfile/UserEditCard.vue'
import UserPasswordCard from '~/components/UserProfile/UserPasswordCard.vue'
import UserCard from '~/components/UserProfile/UserCard.vue'
export default {
  components: {
    UserEditCard,
    UserPasswordCard,
    UserCard,
  },
  layout: 'DashboardLayout',
  middleware: 'authenticated',
}
</script>