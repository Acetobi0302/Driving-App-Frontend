<template>
  <b-card no-body>
    <b-card-header class="border-0 bg-secondary">
      <h1 class="mb-0">
        {{ $tc('StudentsList') }}
        <b-button
          class="float-right"
          variant="primary"
          @click="addnewstudent($event.target)"
          >{{ $tc('New') }}</b-button
        >
      </h1>
    </b-card-header>
    <b-form class="form-horizontal">
      <b-row align-h="between" class="pt-3 m-0">
        <b-col cols="4" class="pl-5">
          <base-input
            v-model="filter"
            alternative
            :name="$tc('Search')"
            class="mb-3"
            type="search"
            :placeholder="$tc('TypeToSearch')"
            prepend-icon="fas fa-search"
          >
          </base-input>
        </b-col>
        <b-col cols="3" class="pr-1">
          <b-form-group>
            <label class="col-4 pl-0 form-control-label text-right">{{
              $tc('Franchise')
            }}</label>
            <b-form-select
              v-model="franchise_id"
              class="col-7"
              :name="$tc('Franchise')"
              :options="franchises"
              @change="getStudents"
            ></b-form-select>
          </b-form-group>
        </b-col>
        <b-col cols="2" class="pr-1"></b-col>
        <b-col cols="3" class="pr-5">
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
      :items="items"
      :fields="fields"
      :current-page="currentPage"
      :per-page="perPage"
      :hover="true"
      :filter="filter"
      :busy="isBusy"
      show-empty
      stacked="md"
      striped
      tbody-tr-class="rowclass"
      :no-border-collapse="true"
      head-variant="light"
      small
      responsive
      @filtered="onFiltered"
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
      <template #cell(action)="row">
        <div class="td-action">
          <b-button
            variant="primary"
            class="mr-1 mb-1"
            @click="editstudent(row.item, row.index, $event.target)"
          >
            {{ $tc('Edit') }}
          </b-button>
          <b-button
            variant="danger"
            class="mr-1 mb-1"
            @click="deletemodel(row.item, row.index, $event.target)"
          >
            {{ $tc('Delete') }}
          </b-button>
        </div>
      </template>
    </b-table>

    <b-card-footer class="pt-4 pb-1 d-flex justify-content-end">
      <b-pagination
        v-model="currentPage"
        :total-rows="totalRows"
        :per-page="perPage"
        last-number
        first-number
      ></b-pagination>
    </b-card-footer>

    <EditStudent :student="selectedStudent" />
    <AddStudent />
    <DeleteModel :execute-delelte="deleteStudent" />
  </b-card>
</template>
<script>
import AddStudent from '~/components/Students/AddStudents.vue'
import EditStudent from '~/components/Students/EditStudents.vue'

export default {
  components: {
    AddStudent,
    EditStudent,
  },
  data() {
    return {
      currentPage: 1,
      filter: null,
      perPage: 5,
      franchise_id: null,
      pageOptions: [5, 10, 20, 50],
      isBusy: false,
      totlefiltered: 0,
      selectedStudent: {},
      fields: [
        { key: '#' },
        { key: 'sid', label: this.$tc('SudentID'), sortable: true },
        { key: 'first_name', label: this.$tc('FirstName'), sortable: true },
        { key: 'last_name', label: this.$tc('LastName'), sortable: true },
        {
          key: 'franchise.name',
          label: this.$tc('FranchiseName'),
          sortable: true,
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
    isadmin() {
      return this.$store.state.auth.user.role === 'admin'
    },
    items() {
      return this.$store.getters.getStudents
    },
    franchises() {
      return this.$store.state.franchiselist
    },
    totalRows() {
      if (this.filter == null) {
        return this.items.length
      } else {
        return this.totlefiltered
      }
    },
  },
  methods: {
    async getStudents() {
      this.isBusy = true
      await this.$store.dispatch('getStudents', this.franchise_id)
      this.isBusy = false
    },
    async deleteStudent() {
      const res = await this.$store.dispatch(
        'deleteStudent',
        this.selectedStudent
      )
      if (res) {
        this.getStudents()
      }
    },
    editstudent(item, index, button) {
      this.selectedStudent = JSON.parse(JSON.stringify(item))
      this.$root.$emit('bv::show::modal', 'editstudent', button)
    },
    addnewstudent(button) {
      this.$root.$emit('bv::show::modal', 'addstudent', button)
    },
    deletemodel(item, index, button) {
      this.selectedStudent = JSON.parse(JSON.stringify(item))
      this.$root.$emit('bv::show::modal', 'deleteModel', button)
    },
    onFiltered(filteredItems) {
      // Trigger pagination to update the number of buttons/pages due to filtering
      this.totlefiltered = filteredItems.length
      this.currentPage = 1
    },
  },
}
</script>