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
      <template #cell(amount)="row">
        <b-badge
          pill
          style="font-size: 100%"
          :variant="row.item.paid ? 'success' : 'danger'"
          >{{ row.item.amount }}</b-badge
        >
      </template>
    </b-table>
    <b-card-footer class="pt-3 pb-1 d-flex justify-content-end">
      <div class="w-100" style="display: -webkit-box">
        <b-button
          v-if="!isDriver"
          class="p-1 border-0 rounded-circle"
          variant="outline-dark"
          @click="print"
        >
          <i class="fas fa-print fa-2x"
        /></b-button>
        <b-form-group v-if="!isDriver" class="pr-1">
          <label
            class="switch"
            style="vertical-align: middle; margin-bottom: 0.3rem"
          >
            <input id="togBtn" v-model="alldata" type="checkbox" />
            <div class="slider round">
              <!--ADDED HTML -->
              <span class="on">{{ $tc('All') }}</span>
              <span class="off">{{ $tc('Future') }}</span>
              <!--END-->
            </div>
          </label>
        </b-form-group>
        <b-badge pill variant="success">
          <span class="h4 text-light"
            >{{ $tc('Paid') }} :
            <span class="text-success">{{ amounts.paid }}</span>
          </span></b-badge
        >
        <b-badge pill variant="danger">
          <span class="h4 text-light"
            >{{ $tc('Remainings') }} :
            <span class="text-danger">{{ amounts.unpaid }}</span></span
          ></b-badge
        >
      </div>
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
import 'jspdf-autotable'
import { jsd } from '@/mixins/jsPDFInvoiceTemplate.js'
export default {
  mixins: [jsd],
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
      alldata: true,
      franchise_id: null,
      isBusy: false,
      fields: [
        { key: '#' },
        { key: 'date', label: this.$tc('Date'), sortable: true },
        { key: 'time', label: this.$tc('time'), sortable: true },
        // { key: 'franchise_name', label: this.$tc('Franchise'), sortable: true },
        { key: 'driver_name', label: this.$tc('Driver'), sortable: true },
        { key: 'course_name', label: this.$tc('CourseName'), sortable: true },
        { key: 'course_fees', label: this.$tc('Fees'), sortable: true },
        { key: 'amount', label: this.$tc('Amount'), sortable: true },
      ],
    }
  },
  computed: {
    items() {
      return this.$store.getters.getStudentBookings
    },
    totalRows() {
      return this.items.length
    },
    isDriver() {
      return this.$store.state.auth.user.role === 'driver'
    },
    amounts() {
      if (!this.totalRows) {
        return {
          paid: null,
          unpaid: null,
        }
      }
      const total = this.items.reduce(
        (sum, record) => sum + parseInt(record.course_fees),
        0
      )
      const paid = this.items
        .filter(({ amount }) => amount !== null)
        .reduce((sum, record) => sum + parseInt(record.amount), 0)
      return {
        paid,
        unpaid: total - paid,
      }
    },
  },
  mounted() {
    this.$nextTick(async function () {
      if (this.isEdit) {
        this.student_id = this.event.extendedProps.student_id
        await this.$store.dispatch('getStudentBookings', this.student_id)
      }
    })
  },
  methods: {
    print() {
      const fields = [
        { header: '#', dataKey: 'count' },
        { header: this.$tc('Date'), dataKey: 'date' },
        { header: this.$tc('time'), dataKey: 'time' },
        // { header: this.$tc('Franchise'), dataKey: 'franchise_name' },
        { header: this.$tc('Driver'), dataKey: 'driver_name' },
        { header: this.$tc('CourseName'), dataKey: 'course_name' },
        // { header: this.$tc('Fees'), dataKey: 'course_fees' },
        // { header: this.$tc('Amount'), dataKey: 'amount' },
      ]
      const d = new Date()
      let printdata = this.items.filter(
        (item) => item.date >= d.toISOString().split('T')[0]
      )
      printdata = this.alldata ? this.items : printdata
      const propsObject = {
        body: printdata,
        columns: fields,
        fileName: this.$tc('Student') + d.getTime(),
        invoice: {
          invDesc:
            'Montag - Freitag: 09.00 - 19.00 Uhr + Samstags: 10.00 - 15.00 Uhr Absage von Fahrstunden NUR persönlich oder telefonisch! Eingeplante Fahrstunden, die NICHT eingehalten werden können, müssen 2 WERKTAGE (Samstage zählen hierbei NICHT zu den Werktagen) vorher abgesagt werden. Ansonsten werden 70% der Fahrstunde angerechnet.',
        },
        contact: {
          label: this.$tc('Student') + ' : ' + this.event.title,
        },
      }
      this.jsPDFInvoiceTemplate(propsObject)
    },
  },
}
</script>
<style scoped>
.borderbottom {
  border-bottom: 4px solid #e9ecef !important;
}
.fa-r17x {
  font-size: 1.5em;
}
.off {
  left: 65%;
}
</style>
