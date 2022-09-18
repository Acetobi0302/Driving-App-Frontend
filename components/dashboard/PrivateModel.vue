<template>
  <b-modal
    id="privateBooking"
    ref="privateBooking"
    size="lg"
    hide-footer
    @hide="onhide"
  >
    <template #modal-title>
      <h2 v-if="isEdit">
        {{ $tc('Edit') + ' ' + $tc('Private') }}
        <b-button
          v-if="!isDriver && !isDeleted"
          class="p-2 border-0 rounded-circle"
          variant="outline-danger"
          @click="deletemodel"
        >
          <i class="fas fa-trash-alt fa-r17x"
        /></b-button>
      </h2>
      <h2 v-else>{{ $tc('Add') + ' ' + $tc('Private') }}</h2>
    </template>
    <b-card
      type="secondary"
      header-class="ddm"
      class="border-0 mb-0 p-0"
      no-body
    >
      <b-card-body class="px-4 pt-4">
        <PrivateForm
          v-if="!isDriver"
          v-bind="$props"
          @exit="hideModal"
          @refresh="$parent.getBookingList()"
        />
      </b-card-body>
    </b-card>
    <DeleteModel :execute-delelte="deleteBooking" />
  </b-modal>
</template>
<script>
import PrivateForm from '@/components/dashboard/PrivateForm.vue'
export default {
  components: {
    PrivateForm,
  },
  props: {
    event: {
      type: Object,
      default: null,
    },
    isDeleted: {
      type: Boolean,
      default: false,
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
    driverId: {
      type: Number,
      default: null,
    },
  },
  computed: {
    isadmin() {
      return this.$store.state.auth.user.role === 'admin'
    },
    isDriver() {
      return this.$store.state.auth.user.role === 'driver'
    },
  },
  methods: {
    hideModal() {
      this.$nextTick(() => {
        this.$refs.privateBooking.hide()
      })
    },
    deletemodel() {
      this.$root.$emit('bv::show::modal', 'deleteModel')
    },
    async deleteBooking() {
      const res = await this.$store.dispatch('deleteBooking', this.event.id)
      if (res) {
        this.hideModal()
        this.$parent.getBookingList()
      }
    },
    onhide() {
      this.$router.push('dashboard')
    },
  },
}
</script>
<style scoped>
.ddm {
  display: block !important;
  background-color: #d9d9d9;
}
.roud {
  border-radius: 1.375rem !important;
}
</style>
