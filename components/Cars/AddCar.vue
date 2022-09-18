<template>
  <b-modal id="addcar" ref="addcar" size="lg" hide-footer @hide="onhide">
    <template #modal-title>
      <h2>{{ $tc('Add') }} {{ $tc('Car') }}</h2>
    </template>
    <card type="secondary" body-classes="px-lg-4 py-lg-2" class="border-0 mb-0">
      <ValidationObserver v-slot="{ invalid }">
        <b-form @submit.stop.prevent="addcar">
          <b-row>
            <b-col>
              <base-input
                v-model="form.manufacturer"
                alternative
                :name="$tc('manufacturer')"
                :rules="'required'"
                :required="true"
                :label="$tc('manufacturer')"
                class="mb-3"
                :placeholder="$tc('manufacturer')"
                prepend-icon="fas fa-angle-right fa-lg"
              >
              </base-input>
            </b-col>
            <b-col>
              <base-input
                v-model="form.model"
                alternative
                :name="$tc('model')"
                :required="true"
                :label="$tc('model')"
                :rules="'required'"
                class="mb-3"
                :placeholder="$tc('model')"
                prepend-icon="fas fa-angle-right fa-lg"
              >
              </base-input>
            </b-col>
          </b-row>
          <b-row>
            <b-col>
              <base-input
                v-model="form.color"
                alternative
                :rules="'required'"
                :name="$tc('color')"
                :label="$tc('color')"
                :required="true"
                :placeholder="$tc('color')"
                prepend-icon="fas fa-angle-right fa-lg"
              >
              </base-input>
            </b-col>
            <b-col>
              <base-input
                v-model="form.number_plate"
                alternative
                :rules="'required'"
                :name="$tc('NumberPlate')"
                :required="true"
                :label="$tc('NumberPlate')"
                :placeholder="$tc('NumberPlate')"
                prepend-icon="fas fa-angle-right fa-lg"
              >
              </base-input>
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
                  @change="getDriverList"
                ></b-form-select>
              </b-form-group>
            </b-col>
          </b-row>
          <b-row>
            <b-col>
              <b-form-group class="form-control-label" :label="$tc('Driver')">
                <b-form-select
                  v-model="form.user_id"
                  :name="$tc('Driver')"
                  class="form-control-alternative"
                  :options="drivers"
                ></b-form-select>
              </b-form-group>
            </b-col>
            <b-col> </b-col>
          </b-row>
          <div class="modal-footer">
            <b-button type="submit" :disabled="invalid" variant="primary">{{
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
        manufacturer: '',
        model: '',
        color: '',
        number_plate: '',
        franchise_id: null,
        art: null,
        user_id: null,
      },
    }
  },
  computed: {
    arts() {
      return this.$store.state.arts
    },
    drivers() {
      return this.$store.state.drivers
    },
    franchises() {
      return this.$store.state.franchiselist
    },
  },
  methods: {
    async getDriverList() {
      this.form.user_id = null
      await this.$store.dispatch('getDriverList', this.form.franchise_id)
    },
    hideModal() {
      this.$nextTick(() => {
        this.$refs.addcar.hide()
      })
    },
    onhide() {
      this.$store.commit('setDrivers', null)
      this.form = { franchise_id: null, art: null, user_id: null }
    },
    async addcar() {
      // if (this.form.art !== 'manual') {
      //   this.form.user_id = null
      // }
      const response = await this.$store.dispatch('addCar', this.form)
      if (response) {
        this.hideModal()
        this.$parent.getCars()
      }
    },
  },
}
</script>
