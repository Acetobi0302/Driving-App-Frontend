<template>
  <b-card no-body>
    <b-card-header class="border-0 bg-secondary">
      <h1 class="mb-0">
        {{ $tc('CarsList') }}
        <b-button
          class="float-right"
          variant="primary"
          @click="addnewcar($event.target)"
          >{{ $tc('New') }}</b-button
        >
      </h1>
    </b-card-header>
    <b-form class="form-horizontal">
      <b-row align-h="between" class="pt-3 m-0">
        <b-col cols="3" class="pl-5">
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
              @change="getCars"
            ></b-form-select>
          </b-form-group>
        </b-col>
        <b-col cols="3" class="pr-1"> </b-col>
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
      striped
      stacked="md"
      :no-border-collapse="true"
      tbody-tr-class="rowclass"
      head-variant="light"
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
        <div
          v-if="row.item.role != 'admin'"
          class="td-action"
          style="display: flex"
        >
          <b-button
            variant="primary"
            class="mr-1"
            @click="editcar(row.item, row.index, $event.target)"
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

    <EditCar :car="selectedCar" />
    <AddCar />
    <DeleteModel :execute-delelte="deleteCar" />
  </b-card>
</template>
<script>
import AddCar from '~/components/Cars/AddCar.vue'
import EditCar from '~/components/Cars/EditCar.vue'

export default {
  components: {
    AddCar,
    EditCar,
  },
  data() {
    return {
      currentPage: 1,
      filter: null,
      franchise: null,
      driver: null,
      franchise_id: null,
      perPage: 5,
      totlefiltered: 0,
      pageOptions: [5, 10, 20, 50],
      isBusy: false,
      selectedCar: {},
      fields: [
        { key: '#' },
        {
          key: 'manufacturer',
          label: this.$tc('manufacturer'),
          sortable: true,
        },
        { key: 'model', label: this.$tc('model'), sortable: true },
        { key: 'color', label: this.$tc('color'), sortable: true },
        {
          key: 'number_plate',
          label: this.$tc('NumberPlate'),
          sortable: true,
        },
        { key: 'art', label: this.$tc('art'), sortable: true },
        {
          key: 'franchise.name',
          label: this.$tc('FranchiseName'),
          sortable: true,
        },
        { key: 'users.name', label: this.$tc('Driver'), sortable: true },
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
      return this.$store.getters.getCars
    },
    totalRows() {
      if (this.filter == null) {
        return this.items.length
      } else {
        return this.totlefiltered
      }
    },
    franchises() {
      return this.$store.state.franchiselist
    },
  },
  methods: {
    async getCars() {
      this.isBusy = true
      await this.$store.dispatch('getCars', this.franchise_id)
      this.isBusy = false
    },
    async deleteCar() {
      const res = await this.$store.dispatch('deleteCar', this.selectedCar)
      if (res) {
        this.getCars()
      }
    },
    async editcar(item, index, button) {
      await this.$store.dispatch('getDriverList', item.franchise_id)
      this.selectedCar = JSON.parse(JSON.stringify(item))
      this.$root.$emit('bv::show::modal', 'editcar', button)
    },
    addnewcar(button) {
      this.$store.commit('setDrivers', null)
      this.$root.$emit('bv::show::modal', 'addcar', button)
    },
    deletemodel(item, index, button) {
      this.selectedCar = JSON.parse(JSON.stringify(item))
      this.$root.$emit('bv::show::modal', 'deleteModel', button)
    },
    onFiltered(filteredItems) {
      this.totlefiltered = filteredItems.length
      this.currentPage = 1
    },
  },
}
</script>