<template>
  <b-modal
    id="addclasses"
    ref="addclasses"
    size="lg"
    hide-footer
    @hide="onhide"
  >
    <template #modal-title>
      <h2>{{ $tc('Add') }} {{ $tc('Classes') }}</h2>
    </template>
    <card type="secondary" body-classes="px-lg-4 py-lg-2" class="border-0 mb-0">
      <ValidationObserver v-slot="{ invalid }">
        <b-form @submit.stop.prevent="addclasses">
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
            <b-button type="submit" :disabled="invalid" variant="primary"
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
        name: '',
      },
    }
  },
  computed: {
    classess() {
      return this.$store.state.classeslist
    },
  },
  methods: {
    hideModal() {
      this.$nextTick(() => {
        this.$refs.addclasses.hide()
      })
    },
    onhide() {
      this.form = {}
    },
    async addclasses() {
      const response = await this.$store.dispatch('addClasses', this.form)
      if (response) {
        this.hideModal()
        this.$parent.getClasses()
      }
    },
  },
}
</script>