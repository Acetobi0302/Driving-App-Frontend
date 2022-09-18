<template>
  <b-modal id="editclasses" ref="editclasses" size="lg" hide-footer>
    <template #modal-title>
      <h2>{{ $tc('Update') }} {{ $tc('Classes') }}</h2>
    </template>
    <card type="secondary" body-classes="px-lg-4 py-lg-2" class="border-0 mb-0">
      <ValidationObserver v-slot="{ invalid }">
        <b-form @submit.stop.prevent="editclasses">
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
  props: {
    classes: {
      type: Object,
      default: null,
    },
  },
  computed: {
    form() {
      return this.classes
    },
  },
  methods: {
    hideModal() {
      this.$nextTick(() => {
        this.$refs.editclasses.hide()
      })
    },
    async editclasses() {
      const response = await this.$store.dispatch('updateClasses', this.form)
      if (response) {
        this.hideModal()
        this.$parent.getClasses()
      }
    },
  },
}
</script>