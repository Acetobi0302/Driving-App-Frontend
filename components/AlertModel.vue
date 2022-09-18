<template>
  <b-modal
    id="alertModel"
    ref="alertModel"
    class="modal fade"
    size="sm"
    :modal-class="['modal-mini', 'modal-danger']"
    tabindex="-1"
    role="dialog"
    centered
    :content-class="['bg-gradient-danger']"
  >
    <template #modal-title>
      <h3>Alert</h3>
    </template>
    <div class="text-center">
      <h4 class="heading mt-4">{{ alertText }}</h4>
    </div>
    <template #modal-footer>
      <b-button
        v-if="callMethod"
        class="mt-3 ml-4"
        variant="secondary"
        @click="conform"
        >YES</b-button
      >
      <b-button
        v-if="callMethod"
        class="mt-3 ml-auto mr-4"
        variant="secondary"
        @click="hideModal"
        >NO</b-button
      >
      <b-button
        v-if="!callMethod"
        class="mt-3 mr-4"
        variant="secondary"
        @click="hideModal"
        >Close</b-button
      >
    </template>
  </b-modal>
</template>
<script>
export default {
  // eslint-disable-next-line vue/require-prop-types
  props: {
    alertText: {
      type: String,
      default: '!',
    },
    callMethod: {
      type: Boolean,
      default: false,
    },
    // eslint-disable-next-line vue/require-default-prop
    executeMethod: {
      type: Function,
    },
  },
  methods: {
    hideModal() {
      this.$nextTick(() => {
        this.$refs.alertModel.hide()
      })
    },
    conform() {
      this.hideModal()
      if (this.callMethod) {
        this.executeMethod()
      }
    },
  },
}
</script>
