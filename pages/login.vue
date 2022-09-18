<template>
  <div>
    <!-- Header -->
    <div class="header py-6 py-lg-6 pt-lg-8">
      <b-container>
        <div class="header-body text-center mb-7">
          <b-row class="justify-content-center">
            <b-col xl="5" lg="6" md="8" class="px-5"> </b-col>
          </b-row>
        </div>
      </b-container>
    </div>
    <!-- Page content -->
    <b-container class="mt--8 pb-5">
      <b-row class="justify-content-center">
        <b-col lg="5" md="7">
          <b-card no-body class="bg-secondary border-0 mb-0">
            <b-card-header class="bg-transparent pb-1">
              <h3 class="text-muted text-center mt-1 mb-1">
                {{ $tc('Signin') }}
              </h3>
            </b-card-header>
            <b-card-body class="px-lg-5 py-lg-5">
              <ValidationObserver v-slot="{ invalid }">
                <b-form role="form" @submit.prevent="login">
                  <base-input
                    v-model="model.username"
                    alternative
                    class="mb-3"
                    :name="$tc('Email')"
                    :rules="{ required: true }"
                    prepend-icon="fas fa-envelope fa-lg"
                    :placeholder="$tc('Email')"
                  >
                  </base-input>

                  <base-input
                    v-model="model.password"
                    alternative
                    class="mb-3"
                    :name="$tc('Password')"
                    :rules="{ required: true, min: 6 }"
                    prepend-icon="fas fa-unlock-alt fa-lg"
                    type="password"
                    :placeholder="$tc('Password')"
                  >
                  </base-input>
                  <b-form-checkbox v-model="model.rememberMe">{{
                    $tc('Rememberme')
                  }}</b-form-checkbox>
                  <div class="text-center">
                    <b-button
                      :disabled="invalid"
                      variant="danger"
                      type="submit"
                      class="my-4"
                      >{{ $tc('Signin') }}</b-button
                    >
                  </div>
                </b-form>
              </ValidationObserver>
            </b-card-body>
          </b-card>
        </b-col>
      </b-row>
    </b-container>
  </div>
</template>
<script>
export default {
  layout: 'AuthLayout',
  middleware: 'notAuthenticated',
  data() {
    return {
      model: {
        username: '',
        password: '',
        rememberMe: false,
      },
    }
  },
  methods: {
    async login() {
      try {
        await this.$auth.loginWith('local', {
          data: {
            username: this.model.username,
            password: this.model.password,
          },
        })
        this.$router.push('/dashboard')
      } catch (err) {
        // eslint-disable-next-line no-console
        console.log(err)
      }
    },
  },
}
</script>
<style>
.bg-default {
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
.bg-default2 {
  background: linear-gradient(
    240deg,
    rgba(208, 10, 16, 0.96) 0%,
    rgb(210, 75, 82) 34%,
    rgb(197, 197, 197) 100%
  );
}
</style>
