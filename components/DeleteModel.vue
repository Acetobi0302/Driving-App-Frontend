<template>
  <b-modal
    id="deleteModel"
    ref="deleteModel"
    class="modal fade"
    size="sm"
    :modal-class="['modal-mini', 'modal-danger']"
    tabindex="-1"
    role="dialog"
    centered
    :content-class="['bg-gradient-danger']"
  >
    <template #modal-title>
      <h3>{{ $tc('Pleaseconfirm') }}</h3>
    </template>
    <div class="py-3 text-center">
      <i class="fas fa-bell fa-3x"></i>
      <h4 class="heading mt-4">{{ $tc('Pleaseconfirm') }}</h4>
      <p>{{ alertText }}</p>
    </div>
    <template #modal-footer>
      <b-button class="ml-4" variant="secondary" @click="conform">
        {{ $tc('Yes') }}</b-button
      >
      <b-button class="ml-auto mr-4" variant="secondary" @click="hideModal">{{
        $tc('No')
      }}</b-button>
    </template>
  </b-modal>
</template>
<script>
export default {
  props: {
    alertText: {
      type: String,
      default: 'sure you want to delete.!',
    },
    // eslint-disable-next-line vue/require-default-prop
    executeDelelte: {
      type: Function,
    },
  },
  methods: {
    hideModal() {
      this.$nextTick(() => {
        this.$refs.deleteModel.hide()
      })
    },
    conform() {
      this.hideModal()
      this.executeDelelte()
    },
  },
}
</script>