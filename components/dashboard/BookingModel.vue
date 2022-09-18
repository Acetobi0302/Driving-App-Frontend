<template>
  <b-modal
    id="addBooking"
    ref="addBooking"
    size="lg"
    hide-footer
    @hide="onhide"
  >
    <template #modal-title>
      <h2 v-if="isEdit">
        {{ event.title }}
        <b-button
          v-if="!isDriver && !isDeleted"
          class="p-2 border-0 rounded-circle"
          variant="outline-danger"
          @click="deletemodel"
        >
          <i class="fas fa-trash-alt fa-r17x"
        /></b-button>
      </h2>
      <h2 v-else>{{ $tc('Add') + ' ' + $tc('Booking') }}</h2>
    </template>
    <b-card
      type="secondary"
      header-class="ddm"
      class="border-0 mb-0 p-0"
      no-body
    >
      <b-card-header
        v-if="!isDriver && isEdit"
        class="py-0 border-top ddm border-3"
        header-tag="nav"
      >
        <b-row>
          <b-col>
            <b-button
              class="border-0 roud"
              variant="outline-primary"
              to="#"
              :active="$route.hash === '#' || $route.hash === ''"
              block
              >{{ $tc('Edit') }}</b-button
            >
          </b-col>

          <b-col>
            <b-button
              class="border-0 roud"
              variant="outline-primary"
              to="#two"
              :active="$route.hash === '#two' || $route.hash === '#two'"
              block
              >{{ $tc('History') }}</b-button
            >
          </b-col>

          <b-col>
            <b-button
              class="border-0 roud"
              variant="outline-primary"
              to="#three"
              :active="$route.hash === '#three' || $route.hash === '#three'"
              block
              >{{ $tc('Note') }}</b-button
            >
          </b-col>
          <b-col v-if="isadmin">
            <b-button
              class="border-0 roud"
              variant="outline-primary"
              to="#for"
              :active="$route.hash === '#for' || $route.hash === '#for'"
              block
              >{{ $tc('LOG') }}</b-button
            >
          </b-col>
        </b-row>
      </b-card-header>
      <b-card-body class="p-0">
        <StudentBookings v-if="isDriver" v-bind="$props" />
        <div class="tab-content">
          <div
            :class="[
              'tab-pane',
              { active: $route.hash === '#' || $route.hash === '' },
            ]"
            class="px-4 pt-4"
          >
            <BookingForm
              v-if="!isDriver"
              v-bind="$props"
              @exit="hideModal"
              @refresh="$parent.getBookingList()"
            />
          </div>
          <div
            v-if="!isDriver"
            :class="['tab-pane', { active: $route.hash === '#two' }]"
          >
            <StudentBookings v-bind="$props" />
          </div>
          <div
            v-if="!isDriver"
            :class="['tab-pane', { active: $route.hash === '#three' }]"
          >
            <NoteHistory v-bind="$props" />
          </div>
          <div
            v-if="isadmin"
            :class="['tab-pane', { active: $route.hash === '#for' }]"
          >
            <ChangeLogs v-bind="$props" />
          </div>
        </div>
      </b-card-body>
    </b-card>
    <DeleteModel :execute-delelte="deleteBooking" />
  </b-modal>
</template>
<script>
import BookingForm from '@/components/dashboard/BookingForm.vue'
import StudentBookings from '@/components/dashboard/StudentBookings.vue'
import NoteHistory from '@/components/dashboard/NoteHistory.vue'
import ChangeLogs from '@/components/dashboard/ChangeLogs.vue'
export default {
  components: {
    BookingForm,
    StudentBookings,
    NoteHistory,
    ChangeLogs,
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
        this.$refs.addBooking.hide()
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
