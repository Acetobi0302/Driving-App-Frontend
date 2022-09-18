<template>
  <div>
    <b-table
      :items="items"
      :fields="fields"
      :current-page="currentPage"
      :per-page="perPage"
      :hover="true"
      :busy="isBusy"
      show-empty
      stacked="md"
      striped
      tbody-tr-class="rowclass"
      :no-border-collapse="true"
      head-variant="light"
      small
      responsive
      ><template #table-busy>
        <div class="text-center text-danger my-2">
          <b-spinner class="align-middle"></b-spinner>
          <strong>Loading...</strong>
        </div>
      </template>
      <template #cell(#)="row">
        <div class="td-action" style="display: flex">
          {{ row.index + 1 + perPage * (currentPage - 1) }}
        </div>
      </template>
      <template #cell(course_fees)="row">
        <b-badge
          pill
          style="font-size: 100%"
          :variant="row.item.paid ? 'success' : 'danger'"
          >{{ row.item.course_fees }}</b-badge
        >
      </template>
      <template #cell(action)="row">
        <div class="td-action">
          <b-button
            class="p-2 border-0 rounded-circle"
            variant="outline-danger"
            @click="deletenote(row.item.id)"
          >
            <i class="fas fa-trash-alt fa-r17x"
          /></b-button>
        </div>
      </template>
    </b-table>
    <b-card-footer class="pt-3 pb-1 d-flex justify-content-end">
      <b-pagination
        v-model="currentPage"
        :total-rows="totalRows"
        :per-page="perPage"
        last-number
        first-number
      ></b-pagination>
    </b-card-footer>
  </div>
</template>
<script>
export default {
  props: {
    event: {
      type: Object,
      default: null,
    },
    isEdit: {
      type: Boolean,
      default: true,
    },
  },
  data() {
    return {
      student_id: null,
      currentPage: 1,
      perPage: 10,
      filter: null,
      franchise_id: null,
      isBusy: false,
      fields: [
        { key: '#' },
        { key: 'users.name', label: this.$tc('UserName'), sortable: true },
        { key: 'note', label: this.$tc('Note'), sortable: true },
        {
          key: 'created_at',
          label: this.$tc('Date'),
          sortable: true,
          formatter: (value) => {
            return value.slice(0, 10)
          },
        },
        {
          key: 'action',
          label: this.$tc('action'),
          sortable: false,
          tdClass: 'text-center',
          thClass: 'text-center',
        },
      ],
    }
  },
  computed: {
    items() {
      return this.$store.state.notes
    },
    totalRows() {
      return this.items.length
    },
  },
  mounted() {
    this.$nextTick(async function () {
      if (this.isEdit) {
        this.booking_id = this.event.id
        await this.$store.dispatch('getNotes', this.booking_id)
      }
    })
  },
  methods: {
    async deletenote(id) {
      this.isBusy = true
      console.log(id)
      const res = await this.$store.dispatch('deleteNote', id)
      if (res) {
        this.booking_id = this.event.id
        await this.$store.dispatch('getNotes', this.booking_id)
      }
      this.isBusy = false
    },
  },
}
</script>
<style>
.borderbottom {
  border-bottom: 4px solid #e9ecef !important;
}
</style>
