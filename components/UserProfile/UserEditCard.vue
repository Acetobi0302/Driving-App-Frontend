<template>
  <div class="card bg-secondary">
    <div class="card-header">
      <h1>{{ $tc('Edit') }} {{ $tc('Profile') }}</h1>
    </div>
    <div class="card-body">
      <ValidationObserver v-slot="{ invalid }">
        <b-form ref="profile_form" @submit.prevent="handleProfileUpdate">
          <b-row>
            <b-col lg="6">
              <base-input
                v-model="form.username"
                alternative
                :name="$tc('UserName')"
                :required="true"
                :label="$tc('UserName')"
                :rules="'required'"
                class="mb-3"
                :placeholder="$tc('UserName')"
                prepend-icon="fas fa-angle-right fa-lg"
              >
              </base-input>
              <base-input
                v-model="form.address"
                alternative
                :rules="'required'"
                :name="$tc('Address')"
                :label="$tc('Address')"
                :required="true"
                :placeholder="$tc('Address')"
                prepend-icon="fas fa-angle-right fa-lg"
              >
              </base-input>
            </b-col>
            <b-col lg="6">
              <base-input
                v-model="form.name"
                alternative
                :name="$tc('name')"
                :required="true"
                :label="$tc('name')"
                :rules="'required'"
                class="mb-3"
                :placeholder="$tc('name')"
                prepend-icon="fas fa-angle-right fa-lg"
              >
              </base-input>
              <base-input
                v-model="form.phone"
                alternative
                :rules="'required|integer'"
                :name="$tc('Phone')"
                :required="true"
                :label="$tc('Phone')"
                :placeholder="$tc('Phone')"
                prepend-icon="fas fa-angle-right fa-lg"
              >
              </base-input>
            </b-col>
          </b-row>
          <div class="float-right">
            <b-button
              :disabled="invalid"
              size="sm"
              variant="primary"
              type="submit"
            >
              {{ $tc('Submit') }}
            </b-button>
          </div>
        </b-form>
      </ValidationObserver>
    </div>
  </div>
</template>
<script>
import BaseInput from '~/components/argon-core/Inputs/BaseInput.vue'

export default {
  name: 'UserEditCard',
  components: {
    BaseInput,
  },
  data() {
    return {
      currentuser: this.$store.state.auth.user,
      form: {
        username: this.$store.state.auth.user.username,
        phone: this.$store.state.auth.user.phone,
        address: this.$store.state.auth.user.address,
        name: this.$store.state.auth.user.name,
      },
    }
  },
  methods: {
    async handleProfileUpdate() {
      await this.$store.dispatch('updateProfile', this.form)
    },
  },
}
</script>
