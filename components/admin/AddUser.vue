<template>
  <b-modal id="adduser" ref="adduser" size="lg" hide-footer @hide="onhide">
    <template #modal-title>
      <h2>{{ $tc('Add') }} {{ $tc('User') }}</h2>
    </template>
    <card type="secondary" body-classes="px-lg-4 py-lg-2" class="border-0 mb-0">
      <ValidationObserver v-slot="{ invalid }">
        <b-form @submit.stop.prevent="adduser">
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
          <b-row>
            <b-col>
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
            </b-col>
            <b-col>
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
            </b-col>
          </b-row>
          <div class="modal-footer">
            <b-button :disabled="invalid" type="submit" variant="primary">{{
              $tc('submit')
            }}</b-button>
          </div>
        </b-form>
      </ValidationObserver>
    </card>
  </b-modal>
</template>
<script>
export default {
  data() {
    return {
      form: {
        username: '',
        phone: '',
        address: '',
        name: '',
        franchise_id: null,
        password: '',
        role: null,
      },
      confirmedpassword: '',
    }
  },
  computed: {
    roles() {
      return this.$store.state.roles
    },
    franchises() {
      return this.$store.state.franchiselist
    },
  },
  methods: {
    hideModal() {
      this.$nextTick(() => {
        this.$refs.adduser.hide()
      })
    },
    onhide() {
      this.form = {
        franchise_id: null,
        role: null,
      }
      this.confirmedpassword = ''
    },
    async adduser() {
      const response = await this.$store.dispatch('addUser', this.form)
      if (response) {
        this.hideModal()
        this.$parent.getUserList()
      }
    },
  },
}
</script>
