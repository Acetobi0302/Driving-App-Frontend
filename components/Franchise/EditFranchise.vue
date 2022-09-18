<template>
  <b-modal id="editfranchise" ref="editfranchise" size="lg" hide-footer>
    <template #modal-title>
      <h2>{{ $tc('Update') }} {{ $tc('Franchise') }}</h2>
    </template>
    <card type="secondary" body-classes="px-lg-4 py-lg-2" class="border-0 mb-0">
      <ValidationObserver v-slot="{ invalid }">
        <b-form @submit.stop.prevent="editfranchise">
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
    franchise: {
      type: Object,
      default: null,
    },
  },
  computed: {
    form() {
      return this.franchise
    },
  },
  methods: {
    hideModal() {
      this.$nextTick(() => {
        this.$refs.editfranchise.hide()
      })
    },
    async editfranchise() {
      const response = await this.$store.dispatch('updateFranchise', this.form)
      if (response) {
        this.hideModal()
        this.$parent.getFranchiseList()
      }
    },
  },
}
</script>
