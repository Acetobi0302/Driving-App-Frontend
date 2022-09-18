<template>
  <b-modal
    id="addfranchise"
    ref="addfranchise"
    size="lg"
    hide-footer
    @hide="onhide"
  >
    <template #modal-title>
      <h2>{{ $tc('Add') }} {{ $tc('Franchise') }}</h2>
    </template>
    <card type="secondary" body-classes="px-lg-4 py-lg-2" class="border-0 mb-0">
      <ValidationObserver v-slot="{ invalid }">
        <b-form @submit.stop.prevent="addfranchise">
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

          <div class="modal-footer">
            <b-button type="submit" :disabled="invalid" variant="primary">{{
              $tc('Submit')
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
        address: '',
        name: '',
      },
    }
  },
  computed: {
    franchises() {
      return this.$store.state.franchiselist
    },
  },
  methods: {
    hideModal() {
      this.$nextTick(() => {
        this.$refs.addfranchise.hide()
      })
    },
    onhide() {
      this.form = {}
    },
    async addfranchise() {
      const response = await this.$store.dispatch('addFranchise', this.form)
      if (response) {
        this.hideModal()
        this.$parent.getFranchiseList()
      }
    },
  },
}
</script>
