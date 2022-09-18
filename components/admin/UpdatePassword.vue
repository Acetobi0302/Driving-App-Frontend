<template>
  <b-modal id="updatePassword" ref="updatePassword" hide-footer @hide="onhide">
    <template #modal-title>
      <h2>{{ $tc('Update') }} {{ $tc('Password') }}</h2>
    </template>
    <card type="secondary" body-classes="px-lg-4 py-lg-2" class="border-0 mb-0">
      <ValidationObserver v-slot="{ invalid }">
        <b-form @submit.stop.prevent="updatePassword">
          <base-input
            v-model="form.password"
            :rules="'required|min:6'"
            alternative
            :name="$tc('password')"
            :label="$tc('password')"
            type="password"
            :required="true"
            :placeholder="$tc('password')"
            prepend-icon="fas fa-angle-right fa-lg"
          >
          </base-input>
          <base-input
            v-model="confirmedpassword"
            :rules="'required|confirmed:' + $tc('password')"
            alternative
            :required="true"
            :name="$tc('ConfirmPassword')"
            type="password"
            :label="$tc('ConfirmPassword')"
            :placeholder="$tc('ConfirmPassword')"
            prepend-icon="fas fa-angle-right fa-lg"
          >
          </base-input>
          <div class="modal-footer">
            <b-button :disabled="invalid" type="submit" variant="primary">{{
              $tc('Update')
            }}</b-button>
          </div>
        </b-form>
      </ValidationObserver>
    </card>
  </b-modal>
</template>
<script>
export default {
  props: {
    user: {
      type: Object,
      default: null,
    },
  },
  data() {
    return {
      confirmedpassword: '',
    }
  },
  computed: {
    form() {
      return this.user
    },
  },
  methods: {
    hideModal() {
      this.$nextTick(() => {
        this.$refs.updatePassword.hide()
      })
    },
    onhide() {
      this.form = {}
      this.confirmedpassword = ''
    },
    async updatePassword() {
      const response = await this.$store.dispatch(
        'updateUserPassword',
        this.form
      )
      if (response) {
        this.hideModal()
      }
    },
  },
}
</script>