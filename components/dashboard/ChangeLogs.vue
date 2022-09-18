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
      currentPage: 1,
      perPage: 10,
      filter: null,
      franchise_id: null,
      isBusy: false,
      fields: [
        { key: '#' },
        { key: 'users.name', label: this.$tc('UserName'), sortable: true },
        {
          key: 'change_date',
          sortable: true,
          label: this.$tc('ChangeDate'),
          formatter: (value, key, item) => {
            return value.slice(0, 10) + ' ~ ' + value.slice(10, 16)
          },
        },
        { key: 'date', label: this.$tc('Date'), sortable: true },
        { key: 'type', label: this.$tc('Action'), sortable: true },
        {
          key: 'start',
          sortable: true,
          label: this.$tc('StartTime'),

          formatter: (value, key, item) => {
            return value ? value.slice(10, 16) : value
          },
        },
        {
          key: 'end',
          sortable: true,
          label: this.$tc('EndTime'),
          formatter: (value, key, item) => {
            return value ? value.slice(10, 16) : value
          },
        },
        { key: 'amount', label: this.$tc('Amount'), sortable: true },
      ],
    }
  },
  computed: {
    items() {
      return this.$store.state.logs
    },
    totalRows() {
      return this.items.length
    },
  },
  mounted() {
    this.$nextTick(async function () {
      if (this.isEdit) {
        await this.$store.dispatch('getLogs', this.event.id)
      }
    })
  },
}
</script>
<style>
.borderbottom {
  border-bottom: 4px solid #e9ecef !important;
}
</style>
