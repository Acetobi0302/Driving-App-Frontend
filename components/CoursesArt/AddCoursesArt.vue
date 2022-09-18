<template>
  <b-modal
    id="addcoursesArt"
    ref="addcoursesArt"
    size="lg"
    hide-footer
    @hide="onhide"
  >
    <template #modal-title>
      <h2>{{ $tc('Add') }} {{ $tc('CoursesArt') }}</h2>
    </template>
    <card type="secondary" body-classes="px-lg-4 py-lg-2" class="border-0 mb-0">
      <ValidationObserver v-slot="{ invalid }">
        <b-form @submit.stop.prevent="addcoursesArt">
          <b-row>
            <b-col>
              <base-input
                v-model="form.course_name"
                alternative
                :name="$tc('CourseName')"
                :rules="'required'"
                :required="true"
                :label="$tc('CourseName')"
                class="mb-3"
                :placeholder="$tc('CourseName')"
                prepend-icon="fas fa-angle-right fa-lg"
              >
              </base-input>
            </b-col>
            <b-col>
              <base-input
                v-model="form.fees"
                alternative
                :name="$tc('Fees')"
                :required="true"
                :label="$tc('Fees')"
                type="number"
                :rules="'required|integer'"
                class="mb-3"
                :placeholder="$tc('Fees')"
                prepend-icon="fas fa-angle-right fa-lg"
              >
              </base-input>
            </b-col>
          </b-row>
          <b-row>
            <b-col>
              <base-input
                v-model="form.course_time_duration"
                alternative
                :rules="'required|integer'"
                :name="$tc('CourseTimeDuration')"
                :label="$tc('CourseTimeDuration')"
                :required="true"
                type="number"
                :placeholder="$tc('CourseTimeDuration')"
                prepend-icon="fas fa-angle-right fa-lg"
              >
              </base-input>
            </b-col>
            <b-col>
              <b-form-group
                class="form-control-label"
                :label="$tc('ClassesName')"
              >
                <b-form-select
                  v-model="form.classes_id"
                  :name="$tc('ClassesName')"
                  rules="required"
                  class="form-control-alternative"
                  :options="classes"
                  required
                ></b-form-select>
              </b-form-group>
            </b-col>
          </b-row>
          <b-row>
            <b-col>
              <b-form-group class="form-control-label" :label="$tc('art')">
                <b-form-select
                  v-model="form.art"
                  :name="$tc('art')"
                  rules="required"
                  class="form-control-alternative"
                  :options="arts"
                  required
                ></b-form-select>
              </b-form-group>
            </b-col>
            <b-col>
              <b-form-group style="margin-top: 2.2rem">
                <label class="pl-0 mr-2 form-control-label text-right">{{
                  $tc('Exam')
                }}</label>
                <label class="switch" style="vertical-align: middle">
                  <input id="togBtn" v-model="form.exam" type="checkbox" />
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
          <div class="modal-footer">
            <b-button :disabled="invalid" type="submit" variant="primary"
              >Add</b-button
            >
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
        course_name: '',
        fees: '',
        course_time_duration: '',
        art: null,
        exam: false,
        classes_id: null,
      },
    }
  },
  computed: {
    arts() {
      return this.$store.state.arts
    },
    classes() {
      return this.$store.getters.getClassesList
    },
  },
  methods: {
    hideModal() {
      this.$nextTick(() => {
        this.$refs.addcoursesArt.hide()
      })
    },
    onhide() {
      this.form = {
        art: null,
        classes_id: null,
        exam: false,
      }
    },
    async addcoursesArt() {
      const response = await this.$store.dispatch('addCoursesArt', this.form)
      if (response) {
        this.hideModal()
        this.$parent.getCoursesArts()
      }
    },
  },
}
</script>