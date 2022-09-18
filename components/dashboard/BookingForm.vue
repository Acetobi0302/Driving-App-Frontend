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
          <b-col>
            <ValidationProvider
              v-slot="{ errors }"
              name="Student"
              rules="required"
            >
              <label class="form-control-label">{{ $tc('Student') }}</label>
              <model-select
                v-model="form.student_id"
                :options="studentlist"
                :name="$tc('Student')"
                class="trito"
                :placeholder="'select ' + $tc('Student')"
              >
              </model-select>
              <span
                id="error"
                class="invalid-feedback"
                style="display: block"
                >{{ errors[0] }}</span
              >
              <input v-show="false" v-model="form.student_id" type="text" />
            </ValidationProvider>
          </b-col>
        </b-row>
        <b-row>
          <b-col>
            <b-form-group
              class="form-control-label"
              :label="$tc('ClassesName')"
            >
              <b-form-select
                v-model="classes_id"
                :name="$tc('ClassesName')"
                rules="required"
                class="form-control-alternative"
                :options="classes"
                required
                :disabled="isEdit"
                @change="getCoursesArts"
              ></b-form-select>
            </b-form-group>
          </b-col>
          <b-col>
            <b-form-group class="form-control-label" :label="$tc('CourseName')">
              <b-form-select
                v-model="course"
                :name="$tc('CourseName')"
                rules="required"
                class="form-control-alternative"
                :options="coursesList"
                required
                @change="getCourseChange"
              ></b-form-select>
            </b-form-group>
          </b-col>
          <b-col>
            <b-form-group class="form-control-label" :label="$tc('Car')">
              <b-form-select
                v-model="form.car_id"
                :name="$tc('Car')"
                rules="required"
                class="form-control-alternative"
                :options="carList"
                required
              ></b-form-select>
            </b-form-group>
          </b-col>
        </b-row>
        <b-row>
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
                disabled
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
        <b-row class="pt-3">
          <b-col>
            <base-input
              v-model="minis"
              alternative
              :name="$tc('Duration')"
              :label="$tc('Duration')"
              :placeholder="$tc('Duration')"
              prepend-icon="fas fa-angle-right fa-lg"
              disabled
            >
            </base-input>
          </b-col>
          <b-col>
            <base-input
              v-model="form.amount"
              alternative
              :name="$tc('Amount')"
              type="number"
              :rules="'integer|min_value:1'"
              :label="$tc('Amount')"
              :placeholder="$tc('Amount')"
              prepend-icon="fas fa-angle-right fa-lg"
            >
            </base-input>
          </b-col>
          <b-col>
            <b-form-group style="margin-top: 2.2rem">
              <label class="pl-0 mr-2 form-control-label text-right">{{
                $tc('Paid')
              }}</label>
              <label
                class="switch"
                style="vertical-align: middle; margin-bottom: 0.3rem"
              >
                <input id="togBtn" v-model="form.paid" type="checkbox" />
                <div class="slider round">
                  <!--ADDED HTML -->
                  <span class="on">{{ $tc('Yes') }}</span>
                  <span class="off">{{ $tc('No') }}</span>
                  <!--END-->
                </div>
              </label>
            </b-form-group>
          </b-col>
        </b-row>
        <b-row>
          <b-col>
            <base-input
              v-model="form.note"
              alternative
              :name="$tc('Note')"
              :label="$tc('Note')"
              :placeholder="$tc('Note')"
              prepend-icon="fas fa-angle-right fa-lg"
            >
            </base-input>
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
        amount: null,
        student_id: null,
        franchise_id: null,
        car_id: null,
        date: null,
        start: null,
        end: null,
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
    franchises() {
      return this.$store.state.franchiselist
    },
    studentlist() {
      return this.$store.state.studentlist
    },
    coursesList() {
      return this.$store.state.coursesList
    },
    classes() {
      return this.$store.getters.getClassesList
    },
    carList() {
      return this.$store.state.carList
    },
  },
  mounted() {
    this.$nextTick(async function () {
      this.form.driver_id = this.driverId
      this.form.franchise_id = this.franchiseId
      this.form.date = this.event.startStr.slice(0, 10)
      this.start = this.event.startStr.slice(11, 16)
      this.end = this.endDate()
      if (this.isEdit) {
        this.calBusy = true
        this.classes_id = this.event.extendedProps.class_id
        await this.getCoursesArts()
        const obj = this.coursesList.find(
          (o) => (o.value && o.value.id) === this.event.extendedProps.course_id
        )
        if (obj) {
          this.course = obj.value
          await this.getCourseChange()
          this.form.car_id = this.event.extendedProps.car_id
          this.art = this.event.extendedProps.course_art
        } else {
          this.form.car_id = null
          this.art = null
        }
        this.form.student_id = this.event.extendedProps.student_id
        this.form.paid = this.event.extendedProps.paid
        this.form.amount = this.event.extendedProps.amount
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
    async getCoursesArts() {
      this.calBusy = true
      this.course = null
      this.form.car_id = null
      await this.$store.dispatch('getCoursesArtList', this.classes_id)
      this.calBusy = false
    },
    async getCourseChange() {
      this.calBusy = true
      this.form.car_id = null
      this.minis = this.course.course_time_duration
      this.art = this.course.art
      this.end = this.endDate()
      await this.$store.dispatch('getCarList', {
        user_id: this.form.driver_id,
        franchise_id: this.form.franchise_id,
        art: this.art,
      })
      this.calBusy = false
    },
    getTimeChange() {
      this.end = this.endDate()
    },
    async bookSlot() {
      this.loading = true
      if (this.form.amount === '') {
        this.form.amount = null
      }
      this.form.course_id = this.course.id
      this.form.start = this.form.date + ' ' + this.start + ':00'
      this.form.end = this.form.date + ' ' + this.end + ':00'
      this.form.note =
        this.form.note != null ? this.form.note.trim() : this.form.note
      let response
      if (this.isEdit) {
        response = await this.$store.dispatch('updateSlot', this.form)
      } else {
        response = await this.$store.dispatch('bookSlot', this.form)
      }
      if (response) {
        this.loading = false
        this.$emit('exit')
        this.$emit('refresh')
      }
      this.loading = false
    },
    endDate() {
      let hours = parseInt(this.start.slice(0, 2)) + Math.floor(this.minis / 60)
      let minutes = parseInt(this.start.slice(3, 5)) + (this.minis % 60)
      if (minutes > 60) {
        hours = hours + Math.floor(minutes / 60)
        minutes = minutes % 60
      }
      if (minutes === 60) {
        hours = hours + 1
        minutes = '00'
      }
      minutes = minutes + ''
      hours = hours + ''
      minutes = minutes.length === 1 ? '0' + minutes : minutes
      hours = hours.length === 1 ? '0' + hours : hours
      return hours + ':' + minutes
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
  display: inline-block !important;
  box-shadow: 0 1px 3px rgb(87 87 99 / 40%), 0 1px 0 rgb(0 0 0 / 2%) !important;
  border: 0 !important;
  font-size: 0.875rem !important;
  color: #8898aa !important;
  font-size: 0.875rem !important;
  font-weight: 400 !important;
  border-radius: 0.375rem !important;
}
</style>
