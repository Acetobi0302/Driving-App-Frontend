<template>
  <div class="card bg-secondary">
    <div class="card-header">
      <h1>{{ $tc('ChangePassword') }}</h1>
    </div>
    <div class="card-body">
      <ValidationObserver ref="validator">
        <b-form @submit.stop.prevent="handlePasswordUpdate">
          <b-row>
            <b-col lg="6">
              <base-input
                v-model="form.password"
                :rules="'required|min:6'"
                alternative
                :name="$tc('password')"
                :label="$tc('password')"
                type="password"
                :placeholder="$tc('password')"
                prepend-icon="fas fa-angle-right fa-lg"
              >
              </base-input>
            </b-col>
            <b-col lg="6">
              <base-input
                v-model="confirmedpassword"
                :rules="'required|confirmed:' + $tc('password')"
                alternative
                :name="$tc('ConfirmPassword')"
                type="password"
                :label="$tc('ConfirmPassword')"
                :placeholder="$tc('ConfirmPassword')"
                prepend-icon="fas fa-angle-right fa-lg"
              >
              </base-input>
            </b-col>
          </b-row>
          <div class="float-right">
            <b-button size="sm" variant="primary" type="submit">
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
  name: 'UserPasswordCard',
  components: {
    BaseInput,
  },
  data() {
    return {
      form: {
        password: '',
      },
      confirmedpassword: '',
    }
  },

  methods: {
    async handlePasswordUpdate() {
      const valid = await this.$refs.validator
        .validate()
        .then(function (result) {
          return result
        })
      if (valid) {
        await this.$store.dispatch('updatePassword', this.form)
      }
    },
  },
}
</script>
