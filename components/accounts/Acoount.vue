<template>
  <b-card no-body>
    <b-card-header class="border-0 bg-secondary">
      <b-row>
        <b-col>
          <h1 class="mb-0">{{ $tc('Accounts') }}</h1>
        </b-col>
        <b-col sm="3">
          <date-picker
            v-model="date"
            locale="de"
            :clearable="false"
            :editable="false"
            class="input-group input-group-alternative"
            :required="true"
            placeholder="Select date"
            value-type="format"
            range
            @change="getAccounts"
          ></date-picker>
        </b-col>
      </b-row>
    </b-card-header>
    <b-form class="form-horizontal">
      <b-row align-h="between" class="pt-3 m-0">
        <b-col class="pl-5">
          <b-form-group v-if="isadmin">
            <label class="col-5 pl-0 form-control-label text-right">{{
              $tc('Franchise')
            }}</label>
            <b-form-select
              v-model="franchise_id"
              class="col-6"
              :name="$tc('Franchise')"
              :options="franchises"
              @change="getUserList"
            ></b-form-select>
          </b-form-group>
        </b-col>
        <b-col v-if="isadmin" class="pr-3">
          <b-form-group>
            <label class="col-4 pl-0 form-control-label text-right">{{
              $tc('role')
            }}</label>
            <b-form-select
              v-model="role"
              class="col-7"
              name="Role"
              :options="roles"
              @change="getUserList"
            ></b-form-select>
          </b-form-group>
        </b-col>
        <b-col class="pr-3">
          <b-form-group v-if="isadmin">
            <label class="col-4 pl-0 form-control-label text-right">{{
              $tc('Users')
            }}</label>
            <b-form-select
              id="selectuser"
              v-model="user_id"
              class="col-7"
              name="User"
              :options="userlist"
              @change="getAccounts"
            ></b-form-select>
          </b-form-group>
        </b-col>
        <b-col sm="3" class="pr-5">
          <b-form-group>
            <label class="col-7 form-control-label text-right">{{
              $tc('PerPage')
            }}</label>
            <b-form-select
              v-model="perPage"
              class="col-4"
              :name="$tc('PerPage')"
              :options="pageOptions"
            ></b-form-select>
          </b-form-group>
        </b-col>
      </b-row>
    </b-form>
    <b-table
      id="accounts"
      :items="items"
      :fields="fields"
      :current-page="currentPage"
      :per-page="perPage"
      :hover="true"
      show-empty
      striped
      :busy="isBusy"
      :no-border-collapse="true"
      tbody-tr-class="rowclass"
      head-variant="light"
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
      <div class="w-100">
        <b-button
          class="p-2 border-0 rounded-circle"
          variant="outline-dark"
          @click="print"
        >
          <i class="fas fa-print fa-r17x"
        /></b-button>
      </div>
      <b-pagination
        v-model="currentPage"
        class="float-right"
        :total-rows="totalRows"
        :per-page="perPage"
        last-number
        first-number
      ></b-pagination>
    </b-card-footer>
  </b-card>
</template>
<script>
// eslint-disable-next-line import/no-named-as-default
import 'jspdf-autotable'
import { jsd } from '@/mixins/jsPDFInvoiceTemplate.js'
export default {
  mixins: [jsd],
  data() {
    return {
      currentPage: 1,
      perPage: 10,
      date: [
        new Date().toJSON().slice(0, 10),
        new Date().toJSON().slice(0, 10),
      ],
      role: null,
      franchise_id: null,
      user_id: null,
      pageOptions: [5, 10, 20, 50],
      isBusy: false,
    }
  },
  computed: {
    userlist() {
      return this.$store.state.userlist
    },
    fields() {
      let field = [
        { key: '#' },
        {
          key: 'paid_at',
          label: this.$tc('Date'),
          sortable: true,
        },
        { key: 'time', label: this.$tc('time'), sortable: true },
        {
          key: 'student_name',
          label: this.$tc('StuddentName'),
          sortable: true,
        },
        { key: 'course_name', label: this.$tc('CourseName'), sortable: true },
        { key: 'course_fees', label: this.$tc('Fees'), sortable: true },
        { key: 'amount', label: this.$tc('Amount'), sortable: true },
      ]
      if (this.role === 'driver') {
        field = [
          { key: '#' },
          {
            key: 'student_name',
            label: this.$tc('StuddentName'),
            sortable: true,
          },
          { key: 'course_name', label: this.$tc('CourseName'), sortable: true },
          {
            key: 'number_plate',
            label: this.$tc('NumberPlate'),
            sortable: true,
          },
          {
            key: 'course_time_duration',
            label: this.$tc('CourseTimeDuration'),
            sortable: true,
          },
        ]
      }
      return field
    },
    roles() {
      return this.$store.state.roles
    },
    franchises() {
      return this.$store.state.franchiselist
    },
    items() {
      return this.$store.getters.getAccounts
    },
    isadmin() {
      return this.$store.state.auth.user.role === 'admin'
    },
    totalRows() {
      return this.items.length
    },
  },
  mounted() {
    this.$nextTick(async function () {
      if (!this.isadmin) {
        this.user_id = this.$store.state.auth.user.id
        this.role = this.$store.state.auth.user.role
        await this.getAccounts()
      } else {
        await this.$store.dispatch('getAllFranchise')
      }
    })
  },
  methods: {
    async getAccounts() {
      this.isBusy = true
      if (this.date != null && this.user_id != null && this.role != null) {
        await this.$store.dispatch('getAccounts', {
          dates: this.date,
          user_id: this.user_id,
          role: this.role,
        })
      } else {
        await this.$store.commit('setAccounts', null)
      }
      this.isBusy = false
    },
    print() {
      let fields
      let total
      let totalMin

      let selectedText
      if (this.isadmin) {
        const skillsSelect = document.getElementById('selectuser')
        selectedText = skillsSelect.options[skillsSelect.selectedIndex].text
      } else {
        selectedText = this.$store.state.auth.user.name
      }
      if (this.role === 'driver') {
        totalMin = this.items.reduce(
          (sum, record) => sum + parseInt(record.course_time_duration),
          0
        )
        const hours = Math.floor(totalMin / 60)
        const minutes = totalMin % 60
        total =
          'Total : ' +
          (hours !== 0 ? hours + ' Stunden ' : '') +
          (minutes !== 0 ? minutes + ' Minuten ' : '')
        fields = [
          { header: '#', dataKey: 'count' },
          { header: this.$tc('StuddentName'), dataKey: 'student_name' },
          { header: this.$tc('CourseName'), dataKey: 'course_name' },
          { header: this.$tc('NumberPlate'), dataKey: 'course_fees' },
          {
            header: this.$tc('CourseTimeDuration'),
            dataKey: 'course_time_duration',
          },
        ]
      } else {
        total = this.items.reduce(
          (sum, record) => sum + parseInt(record.amount),
          0
        )
        total = 'Total : ' + total + ' € '
        fields = [
          { header: '#', dataKey: 'count' },
          { header: this.$tc('Date'), dataKey: 'paid_at' },
          { header: this.$tc('time'), dataKey: 'time' },
          { header: this.$tc('StuddentName'), dataKey: 'student_name' },
          { header: this.$tc('CourseName'), dataKey: 'course_name' },
          { header: this.$tc('Fees'), dataKey: 'course_fees' },
          { header: this.$tc('Amount'), dataKey: 'amount' },
        ]
      }
      const propsObject = {
        body: this.items,
        columns: fields,
        fileName: 'Invoice 2021',
        contact: {
          label: ' User: ' + selectedText,
        },
        invoice: {
          invDate:
            'Date: ' +
            (this.date[0] !== this.date[1] ? this.date : this.date[0]),
          invTotal: total,
          row2: totalMin ? '( ' + totalMin + ' Minuten )' : '',
        },
      }

      this.jsPDFInvoiceTemplate(propsObject)
    },
    async getUserList() {
      this.user_id = null
      this.$store.commit('setAccounts', null)
      if (this.franchise_id != null && this.role != null) {
        await this.$store.dispatch('getUserListRole', {
          role: this.role,
          franchise_id: this.franchise_id,
        })
      }
    },
  },
}
</script>
<style scoped>
.fa-r17x {
  font-size: 1.7em;
}
</style>