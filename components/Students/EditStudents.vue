<template>
  <b-modal id="editstudent" ref="editstudent" size="lg" hide-footer>
    <template #modal-title>
      <h2>{{ $tc('Update') }} {{ $tc('Student') }}</h2>
    </template>
    <card type="secondary" body-classes="px-lg-4 py-lg-2" class="border-0 mb-0">
      <ValidationObserver v-slot="{ invalid }">
        <b-form @submit.stop.prevent="editstudent">
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
            <b-col> </b-col>
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
    student: {
      type: Object,
      default: null,
    },
  },
  computed: {
    franchises() {
      return this.$store.state.franchiselist
    },
    isadmin() {
      return this.$store.state.auth.user.role === 'admin'
    },
    form() {
      return this.student
    },
  },
  methods: {
    hideModal() {
      this.$nextTick(() => {
        this.$refs.editstudent.hide()
      })
    },
    async editstudent() {
      // if (!this.isadmin) {
      //   this.form.franchise_id = this.$store.state.auth.user.franchise_id
      // }
      const response = await this.$store.dispatch('updateStudent', this.form)
      if (response) {
        this.hideModal()
        this.$parent.getStudents()
      }
    },
  },
}
</script>
