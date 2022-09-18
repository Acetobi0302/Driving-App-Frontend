<template>
  <ValidationObserver v-slot="{ invalid }">
    <b-overlay
      variant="white"
      :opacity="0.3"
      blur="1rem"
      rounded="sm"
      :show="calBusy"
      class="position-clock"
    >
      <b-form @submit.stop.prevent="bookSlot">
        <b-row>
          <b-col>
            <b-form-group class="form-control-label" :label="$tc('Franchise')">
              <b-form-select
                v-model="form.franchise_id"
                :name="$tc('Franchise')"
                rules="required"
                class="form-control-alternative"
                :options="franchises"
                required
                disabled
              ></b-form-select>
            </b-form-group>
          </b-col>
          <b-col>
            <b-form-group class="form-control-label" :label="$tc('Driver')">
              <b-form-select
                v-model="form.driver_id"
                :name="$tc('Driver')"
                class="form-control-alternative"
                :options="drivers"
                disabled
              ></b-form-select>
            </b-form-group>
          </b-col>
        </b-row>
        <b-row>
          <b-col>
            <b-form-group class="form-control-label" :label="$tc('Private')">
              <b-form-select
                v-model="form.private"
                :name="$tc('Private')"
                rules="required"
                class="form-control-alternative"
                :options="privates"
                required
              ></b-form-select>
            </b-form-group>
          </b-col>
          <b-col>
            <ValidationProvider
              v-slot="{ errors }"
              :name="$tc('Date')"
              rules="required"
            >
              <label class="form-control-label">{{ $tc('Date') }}</label>
              <date-picker
                v-model="form.date"
                locale="de"
                :clearable="false"
                :editable="false"
                :disabled="!isEdit"
                class="input-group input-group-alternative"
                :required="true"
                placeholder="Select date"
                value-type="format"
              ></date-picker>
              <span
                id="error"
                class="invalid-feedback"
                style="display: block"
                >{{ errors[0] }}</span
              >
              <input v-show="false" v-model="form.date" type="text" />
            </ValidationProvider>
          </b-col>
        </b-row>
        <b-row class="pb-3">
          <b-col>
            <ValidationProvider
              v-slot="{ errors }"
              name="Start Time"
              rules="required"
            >
              <label class="form-control-label">{{ $tc('StartTime') }}</label>
              <date-picker
                v-model="start"
                locale="de"
                :hour-options="hours"
                format="HH:mm"
                value-type="format"
                type="time"
                placeholder="HH:mm"
                :clearable="false"
                :editable="false"
                class="input-group input-group-alternative"
                :required="true"
                @change="getTimeChange"
              ></date-picker>
              <span
                id="error"
                class="invalid-feedback"
                style="display: block"
                >{{ errors[0] }}</span
              >
              <input v-show="false" v-model="start" type="text" />
            </ValidationProvider>
          </b-col>
          <b-col>
            <ValidationProvider
              v-slot="{ errors }"
              name="End Time"
              rules="required"
            >
              <label class="form-control-label">{{ $tc('EndTime') }}</label>
              <date-picker
                v-model="end"
                locale="de"
                :clearable="false"
                :editable="false"
                class="input-group input-group-alternative"
                :required="true"
                :hour-options="hours"
                format="HH:mm"
                value-type="format"
                type="time"
                placeholder="HH:mm"
              ></date-picker>
              <span
                id="error"
                class="invalid-feedback"
                style="display: block"
                >{{ errors[0] }}</span
              >
              <input v-show="false" v-model="end" type="text" />
            </ValidationProvider>
          </b-col>
        </b-row>
        <div class="modal-footer">
          <b-button
            v-if="!isDeleted"
            type="submit"
            :disabled="invalid || loading"
            variant="primary"
          >
            <b-spinner v-if="loading" class="mx-2" small></b-spinner
            ><span v-if="!loading">{{
              isEdit ? $tc('save') : $tc('submit')
            }}</span></b-button
          >
        </div>
      </b-form>
    </b-overlay>
  </ValidationObserver>
</template>
<script>
import { ModelSelect } from 'vue-search-select'
export default {
  components: {
    // eslint-disable-next-line vue/no-unused-components
    ModelSelect,
  },
  props: {
    event: {
      type: Object,
      default: null,
    },
    isEdit: {
      type: Boolean,
      default: true,
    },
    revert: {
      type: Function,
      default: null,
    },
    franchiseId: {
      type: Number,
      default: null,
    },
    isDeleted: {
      type: Boolean,
      default: false,
    },
    driverId: {
      type: Number,
      default: null,
    },
  },
  data() {
    return {
      course: null,
      minis: 30,
      calBusy: false,
      loading: false,
      classes_id: null,
      start: null,
      art: null,
      end: null,
      hours: Array.from({ length: 19 }).map((_, i) => i + 5),
      form: {
        id: null,
        art: null,
        student_id: null,
        franchise_id: null,
        car_id: null,
        date: null,
        start: null,
        end: null,
        private: 0,
        note: null,
        paid: false,
        driver_id: null,
        course_id: null,
      },
    }
  },
  computed: {
    drivers() {
      return this.$store.state.drivers
    },
    privates() {
      return this.$store.state.privates
    },
    franchises() {
      return this.$store.state.franchiselist
    },
  },
  mounted() {
    this.$nextTick(function () {
      this.form.driver_id = this.driverId
      this.form.franchise_id = this.franchiseId
      this.form.date = this.event.startStr.slice(0, 10)
      this.start = this.event.startStr.slice(11, 16)
      this.end = this.event.endStr.slice(11, 16)
      if (this.isEdit) {
        this.calBusy = true
        this.form.private = this.event.extendedProps.private
        this.form.id = this.event.id
        this.calBusy = false
      }
    })
  },
  methods: {
    hideModal() {
      this.$nextTick(() => {
        // this.revert()
        this.$refs.addBooking.hide()
      })
    },
    onhide() {},
    async bookSlot() {
      this.loading = true
      this.form.start = this.form.date + ' ' + this.start + ':00'
      this.form.end = this.form.date + ' ' + this.end + ':00'
      let response
      if (this.isEdit) {
        response = await this.$store.dispatch('updateBreak', this.form)
      } else {
        response = await this.$store.dispatch('bookBreak', this.form)
      }
      if (response) {
        this.loading = false
        this.$emit('exit')
        this.$emit('refresh')
      }
      this.loading = false
    },
  },
}
</script>
<style>
.selection {
  height: calc(1.5em + 1.25rem + 2px);
}
.ui.dropdown,
.ui.dropdown input {
  line-height: 1.3rem !important;
}
.ui.selection.dropdown > .dropdown.icon {
  top: 0.8rem !important;
}
.trito {
  box-shadow: 0 1px 3px rgb(87 87 99 / 40%), 0 1px 0 rgb(0 0 0 / 2%) !important;
  border: 0 !important;
  font-size: 0.875rem !important;
  color: #8898aa !important;
  font-size: 0.875rem !important;
  font-weight: 400 !important;
  border-radius: 0.375rem !important;
}
</style>
