<template>
  <b-card no-body>
    <b-card-header class="border-0 bg-secondary">
      <h1 class="mb-0">
        {{ $tc('FranchiseList') }}
        <b-button
          class="float-right"
          variant="primary"
          @click="addFranchise($event.target)"
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
            name="search"
            class="mb-3"
            type="search"
            placeholder="Type to Search"
            prepend-icon="fas fa-search"
          >
          </base-input>
        </b-col>
        <b-col cols="3" class="pr-5">
          <b-form-group>
            <label class="col-7 form-control-label text-right">Per Page</label>
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
      show-empty
      striped
      :busy="isBusy"
      :no-border-collapse="true"
      tbody-tr-class="rowclass"
      head-variant="light"
      @filtered="onFiltered"
      ><template #table-busy>
        <div class="text-center text-danger my-2">
          <b-spinner class="align-middle"></b-spinner>
          <strong>Loading...</strong>
        </div>
      </template>
      <template #cell(#)="row">
        <div class="td-action">
          {{ row.index + 1 + perPage * (currentPage - 1) }}
        </div>
      </template>
      <template #cell(action)="row">
        <div class="td-action">
          <b-button
            variant="primary"
            class="mr-1"
            @click="editFranchise(row.item, row.index, $event.target)"
          >
            {{ $tc('Edit') }}
          </b-button>
          <b-button
            variant="danger"
            class="mr-1"
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

    <EditFranchise :franchise="selectedFranchise" />
    <AddFranchise />
    <DeleteModel :execute-delelte="deleteFranchise" />
  </b-card>
</template>
<script>
import AddFranchise from '~/components/Franchise/AddFranchise.vue'
import EditFranchise from '~/components/Franchise/EditFranchise.vue'

export default {
  components: {
    AddFranchise,
    EditFranchise,
  },
  data() {
    return {
      currentPage: 1,
      filter: null,
      perPage: 5,
      totlefiltered: 0,
      pageOptions: [5, 10, 20, 50],
      isBusy: false,
      selectedFranchise: {},
      fields: [
        { key: '#' },
        { key: 'name', label: this.$tc('name'), sortable: true },
        { key: 'address', label: this.$tc('Address'), sortable: true },
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
      return this.$store.getters.getFranchise
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
    async getFranchiseList() {
      this.isBusy = true
      await this.$store.dispatch('getFranchiseList')
      this.isBusy = false
    },
    async deleteFranchise() {
      const res = await this.$store.dispatch(
        'deleteFranchise',
        this.selectedFranchise
      )
      if (res) {
        this.getFranchiseList()
      }
    },
    editFranchise(item, index, button) {
      this.selectedFranchise = JSON.parse(JSON.stringify(item))
      this.$root.$emit('bv::show::modal', 'editfranchise', button)
    },
    addFranchise(button) {
      this.$root.$emit('bv::show::modal', 'addfranchise', button)
    },
    deletemodel(item, index, button) {
      this.selectedFranchise = JSON.parse(JSON.stringify(item))
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
