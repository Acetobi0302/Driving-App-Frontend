<template>
  <b-modal id="edituser" ref="edituser" size="lg" hide-footer>
    <template #modal-title>
      <h2>{{ $tc('Update') }} {{ $tc('User') }}</h2>
    </template>
    <card type="secondary" body-classes="px-lg-4 py-lg-2" class="border-0 mb-0">
      <ValidationObserver v-slot="{ invalid }">
        <b-form @submit.stop.prevent="edituser">
          <b-row>
            <b-col>
              <base-input
                v-model="form.username"
                alternative
                :name="$tc('UserName')"
                :rules="'required'"
                :required="true"
                :label="$tc('UserName')"
                class="mb-3"
                :placeholder="$tc('UserName')"
                prepend-icon="fas fa-angle-right fa-lg"
              >
              </base-input>
            </b-col>
            <b-col>
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
            </b-col>
          </b-row>
          <b-row>
            <b-col>
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
            <b-col>
              <base-input
                v-model="form.phone"
                alternative
                :rules="'required'"
                :name="$tc('Phone')"
                :required="true"
                :label="$tc('Phone')"
                :placeholder="$tc('Phone')"
                prepend-icon="fas fa-angle-right fa-lg"
              >
              </base-input>
            </b-col>
          </b-row>
          <b-row>
            <b-col>
              <b-form-group class="form-control-label" :label="$tc('role')">
                <b-form-select
                  v-model="form.role"
                  :name="$tc('role')"
                  rules="required"
                  class="form-control-alternative"
                  :options="roles"
                  required
                ></b-form-select>
              </b-form-group>
            </b-col>
            <b-col>
              <b-form-group
                class="form-control-label"
                :label="$tc('Franchise')"
              >
                <b-form-select
                  v-model="form.franchise_id"
                  :name="$tc('Franchise')"
                  rules="required"
                  class="form-control-alternative"
                  :options="franchises"
                  required
                ></b-form-select>
              </b-form-group>
            </b-col>
          </b-row>
          <div class="modal-footer">
            <b-button :disabled="invalid" type="submit" variant="primary">{{
              $tc('save')
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
  computed: {
    roles() {
      return this.$store.state.roles
    },
    franchises() {
      return this.$store.state.franchiselist
    },
    form() {
      return this.user
    },
  },
  methods: {
    hideModal() {
      this.$nextTick(() => {
        this.$refs.edituser.hide()
      })
    },
    async edituser() {
      const response = await this.$store.dispatch(
        'updateUserProfile',
        this.form
      )
      if (response) {
        this.hideModal()
        this.$parent.getUserList()
      }
    },
  },
}
</script>
