<template>
  <b-card no-body>
    <b-card-header class="border-0 bg-secondary">
      <h1 class="mb-0">
        {{ $tc('UsersList') }}
        <b-button
          class="float-right"
          variant="primary"
          @click="addnewuser($event.target)"
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
              @change="getUserList"
            ></b-form-select>
          </b-form-group>
        </b-col>
        <b-col cols="2" class="pl-3">
          <b-form-group style="margin-top: 0.2rem">
            <label class="pl-0 mr-2 form-control-label text-right">{{
              $tc('Deleted')
            }}</label>
            <label
              class="switch"
              style="vertical-align: middle; margin-bottom: 0.3rem"
            >
              <input id="togBtn" v-model="deleted" type="checkbox" />
              <div class="slider round">
                <!--ADDED HTML -->
                <span class="on">{{ $tc('Yes') }}</span>
                <span class="off">{{ $tc('No') }}</span>
                <!--END-->
              </div>
            </label>
          </b-form-group>
        </b-col>
        <b-col cols="3" class="pr-5">
          <b-form-group>
            <label class="col-5 form-control-label text-right">{{
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
            class="mr-1"
            @click="edituser(row.item, row.index, $event.target)"
          >
            {{ $tc('Edit') }}
          </b-button>
          <b-button
            variant="primary"
            class="mr-1"
            @click="updatePassword(row.item, row.index, $event.target)"
          >
            {{ $tc('ChangePassword') }}
          </b-button>
          <b-button
            v-if="row.item.deleted_at === null"
            variant="danger"
            class="mr-1"
            @click="deletemodel(row.item, row.index, $event.target)"
          >
            {{ $tc('Delete') }}
          </b-button>
          <b-button
            v-else
            variant="success"
            class="mr-1"
            @click="activeModel(row.item, row.index, $event.target)"
          >
            {{ $tc('AktivUser') }}
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

    <EditUser :user="selectedUser" />
    <AddUser />
    <UpdatePassword :user="selectedUser" />
    <DeleteModel :alert-text="alertText" :execute-delelte="deleteUser" />
  </b-card>
</template>
<script>
import AddUser from '~/components/admin/AddUser.vue'
import EditUser from '~/components/admin/EditUser.vue'
import UpdatePassword from '~/components/admin/UpdatePassword.vue'

export default {
  components: {
    AddUser,
    EditUser,
    UpdatePassword,
  },
  data() {
    return {
      currentPage: 1,
      filter: null,
      perPage: 5,
      deleted: false,
      alertText: null,
      franchise_id: null,
      pageOptions: [5, 10, 20, 50],
      isBusy: false,
      totlefiltered: 0,
      selectedUser: {},
      fields: [
        { key: '#' },
        { key: 'username', label: this.$tc('UserName'), sortable: true },
        { key: 'name', label: this.$tc('name'), sortable: true },
        { key: 'address', label: this.$tc('Address'), sortable: true },
        { key: 'phone', label: this.$tc('Phone'), sortable: false },
        { key: 'role', label: this.$tc('role'), sortable: false },
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
    items() {
      return this.$store.getters.getUsers
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
  watch: {
    deleted(newVal, oldVal) {
      if (newVal !== oldVal) {
        this.getUserList()
      }
    },
  },
  methods: {
    async getUserList() {
      this.isBusy = true
      await this.$store.dispatch('getUserList', {
        franchiseId: this.franchise_id,
        deleted: this.deleted,
      })
      this.isBusy = false
    },
    async deleteUser() {
      let res
      if (this.selectedUser.deleted_at === null) {
        res = await this.$store.dispatch('deleteUserProfile', this.selectedUser)
      } else {
        res = await this.$store.dispatch('activeUserProfile', this.selectedUser)
      }
      if (res) {
        this.getUserList()
      }
    },
    edituser(item, index, button) {
      this.selectedUser = JSON.parse(JSON.stringify(item))
      this.$root.$emit('bv::show::modal', 'edituser', button)
    },
    addnewuser(button) {
      this.$root.$emit('bv::show::modal', 'adduser', button)
    },
    updatePassword(item, index, button) {
      this.selectedUser = JSON.parse(JSON.stringify(item))
      this.$root.$emit('bv::show::modal', 'updatePassword', button)
    },
    deletemodel(item, index, button) {
      this.selectedUser = JSON.parse(JSON.stringify(item))
      this.$root.$emit('bv::show::modal', 'deleteModel', button)
    },
    activeModel(item, index, button) {
      this.selectedUser = JSON.parse(JSON.stringify(item))
      this.alertText = 'sure to Active user ?'
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