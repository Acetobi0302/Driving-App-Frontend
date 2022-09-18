<template>
  <b-card no-body>
    <b-card-header class="border-0 bg-secondary">
      <h1 class="mb-0">
        {{ $tc('CoursesArtList') }}
        <b-button
          class="float-right"
          variant="primary"
          @click="addnewcoursesArt($event.target)"
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
              $tc('ClassesName')
            }}</label>
            <b-form-select
              v-model="classes_id"
              :name="$tc('ClassesName')"
              class="col-7"
              :options="classes"
              @change="getCoursesArts"
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
        <div class="td-action">
          {{ row.index + 1 + perPage * (currentPage - 1) }}
        </div>
      </template>
      <template #cell(action)="row">
        <div class="td-action">
          <b-button
            variant="primary"
            class="mr-1 mb-1"
            @click="editcoursesArt(row.item, row.index, $event.target)"
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

    <EditCoursesArt :courses-art="selectedCoursesArt" />
    <AddCoursesArt />
    <DeleteModel :execute-delelte="deleteCoursesArt" />
  </b-card>
</template>
<script>
import AddCoursesArt from '~/components/CoursesArt/AddCoursesArt.vue'
import EditCoursesArt from '~/components/CoursesArt/EditCoursesArt.vue'

export default {
  components: {
    AddCoursesArt,
    EditCoursesArt,
  },
  data() {
    return {
      currentPage: 1,
      filter: null,
      perPage: 5,
      classes_id: null,
      pageOptions: [5, 10, 20, 50],
      isBusy: false,
      totlefiltered: 0,
      selectedCoursesArt: {},
      fields: [
        { key: '#' },
        { key: 'course_name', label: this.$tc('CourseName'), sortable: true },
        { key: 'fees', label: this.$tc('Fees'), sortable: true },
        {
          key: 'course_time_duration',
          label: this.$tc('CourseTimeDuration'),
          sortable: true,
        },
        { key: 'art', label: this.$tc('art'), sortable: true },
        {
          key: 'classes.name',
          label: this.$tc('ClassesName'),
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
      return this.$store.getters.getCoursesArts
    },
    classes() {
      return this.$store.getters.getClassesList
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
    async getCoursesArts() {
      this.isBusy = true
      await this.$store.dispatch('getCoursesArts', this.classes_id)
      this.isBusy = false
    },
    async deleteCoursesArt() {
      const res = await this.$store.dispatch(
        'deleteCoursesArt',
        this.selectedCoursesArt
      )
      if (res) {
        this.getCoursesArts()
      }
    },
    editcoursesArt(item, index, button) {
      this.selectedCoursesArt = JSON.parse(JSON.stringify(item))
      this.$root.$emit('bv::show::modal', 'editcoursesArt', button)
    },
    addnewcoursesArt(button) {
      this.$root.$emit('bv::show::modal', 'addcoursesArt', button)
    },
    deletemodel(item, index, button) {
      this.selectedCoursesArt = JSON.parse(JSON.stringify(item))
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
