<template>
  <b-modal
    id="addstudent"
    ref="addstudent"
    size="lg"
    hide-footer
    @hide="onhide"
  >
    <template #modal-title>
      <h2>{{ $tc('Add') }} {{ $tc('Student') }}</h2>
    </template>
    <card type="secondary" body-classes="px-lg-4 py-lg-2" class="border-0 mb-0">
      <ValidationObserver v-slot="{ invalid }">
        <b-form @submit.stop.prevent="addstudent">
          <b-row>
            <b-col>
              <base-input
                v-model="form.sid"
                alternative
                :name="$tc('SudentID')"
                :rules="'required'"
                :required="true"
                :label="$tc('SudentID')"
                class="mb-3"
                :placeholder="$tc('SudentID')"
                prepend-icon="fas fa-angle-right fa-lg"
              >
              </base-input>
            </b-col>
            <b-col>
              <base-input
                v-model="form.first_name"
                alternative
                :name="$tc('FirstName')"
                :required="true"
                :label="$tc('FirstName')"
                :rules="'required'"
                class="mb-3"
                :placeholder="$tc('FirstName')"
                prepend-icon="fas fa-angle-right fa-lg"
              >
              </base-input>
            </b-col>
          </b-row>
          <b-row>
            <b-col>
              <base-input
                v-model="form.last_name"
                alternative
                :rules="'required'"
                :name="$tc('LastName')"
                :label="$tc('LastName')"
                :required="true"
                :placeholder="$tc('LastName')"
                prepend-icon="fas fa-angle-right fa-lg"
              >
              </base-input>
            </b-col>
            <b-col>
              <b-form-group
                class="form-control-label"
                :label="$tc('Franchise')"
              >
                <b-form-select
                  v-model="form.franchise_id"
                  rules="required"
                  :name="$tc('Franchise')"
                  class="form-control-alternative"
                  :options="franchises"
                  required
                ></b-form-select> </b-form-group
            ></b-col>
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
        sid: '',
        first_name: '',
        last_name: '',
        franchise_id: null,
      },
      confirmedpassword: '',
    }
  },
  computed: {
    franchises() {
      return this.$store.state.franchiselist
    },
    isadmin() {
      return this.$store.state.auth.user.role === 'admin'
    },
  },
  methods: {
    hideModal() {
      this.$nextTick(() => {
        this.$refs.addstudent.hide()
      })
    },
    onhide() {
      this.form = {
        franchise_id: null,
      }
    },
    async addstudent() {
      // if (!this.isadmin) {
      //   this.form.franchise_id = this.$store.state.auth.user.franchise_id
      // }
      const response = await this.$store.dispatch('addStudent', this.form)
      if (response) {
        this.hideModal()
        this.$parent.getStudents()
      }
    },
  },
}
</script>
