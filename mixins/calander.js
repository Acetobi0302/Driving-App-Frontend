import dayGridPlugin from '@fullcalendar/daygrid'
import timeGridPlugin from '@fullcalendar/timegrid'
import interactionPlugin from '@fullcalendar/interaction'

export const calanderData = {
  data() {
    return {
      deleted: false,
      currentEvents: [],
      franchise_id: null,
      selectedEvent: {},
      title: 'Calander',
      alertText: null,
      driver_id: null,
      student_id: null,
      car_id: null,
      privatebook: false,
      startWDate: null,
      endWDate: null,
      isEdit: false,
      revert: null,
      calBusy: false,
      editable: true,
      selectable: true,
      callMethod: false,
    }
  },
  computed: {
    calendarOptions() {
      return {
        selectConstraint: 'businessHours',
        eventConstraint: 'businessHours',
        slotMinTime: '5:00:00',
        slotMaxTime: '24:00:00',
        // displayEventTime: false,
        themeSystem: 'bootstrap',
        locale: 'de',
        hiddenDays: [0],
        timeFormat: 'HH:mm',
        axisFormat: 'HH:mm',
        slotLabelFormat: [
          {
            hour: '2-digit',
            minute: '2-digit',
            hour12: false,
          },
        ],
        plugins: [
          dayGridPlugin,
          timeGridPlugin,
          interactionPlugin, // needed for dateClick
        ],
        headerToolbar: false,
        businessHours: {
          // days of week. an array of zero-based day of week integers (0=Sunday)
          daysOfWeek: [1, 2, 3, 4, 5, 6], // Monday - Thursday

          startTime: '5:00', // a start time (10am in this example)
          endTime: '24:00', // an end time (6pm in this example)
        },
        datesSet: this.hendleTitle,
        initialView: 'timeGridWeek',
        events: this.events,
        eventDisplay: 'block',
        editable: this.editable,
        dragRevertDuration: 1,
        eventDurationEditable: false,
        selectable: this.editable,
        selectMirror: true,
        allDaySlot: false,
        dayMaxEvents: 0,
        moreLinkContent(args) {
          return args.num
        },
        weekends: true,
        height: 'auto',
        select: this.handleDateSelect,
        eventClick: this.handleEventClick,
        eventDrop: this.handleEventChange,
        eventOverlap: false,
        eventMouseEnter: this.handleEventHover,
      }
    },
    events() {
      return this.$store.getters.getEvents
    },
    drivers() {
      return this.$store.state.drivers
    },
    franchises() {
      return this.$store.state.franchiselist
    },
    extraCarList() {
      return this.$store.state.extraCarList
    },
    isadmin() {
      return this.$store.state.auth.user.role === 'admin'
    },
    studentlist() {
      return this.$store.state.studentlist
    },
    isDriver() {
      return this.$store.state.auth.user.role === 'driver'
    },
  },
  mounted() {
    this.$nextTick(async function () {
      this.franchise_id = this.$store.state.auth.user.franchise_id

      if (this.isDriver) {
        this.editable = false
        this.selectable = false
        this.driver_id = this.$store.state.auth.user.id
        await this.$store.dispatch('getBookings', {
          start_date: this.startWDate,
          car_id: this.car_id,
          end_date: this.endWDate,
          driver_id: this.driver_id,
        })
      } else {
        await this.getDriverList()
      }
    })
  },
  watch: {
    deleted(newVal, oldVal) {
      if (newVal !== oldVal) {
        this.getBookingList()
      }
    },
    student_id(newVal, oldVal) {
      if (newVal !== oldVal) {
        this.getBookingList()
      }
    },
  },
  methods: {
    async getDriverList() {
      await this.$store.commit('setBookings', null)
      this.driver_id = null
      await this.$store.dispatch('getDriverList', this.franchise_id)
      await this.$store.dispatch('getStudentList', this.franchise_id)
      await this.$store.dispatch('getExtraCarList', this.franchise_id)
    },
    async getBookingList() {
      await this.$store.commit('setBookings', null)
      if (
        this.driver_id != null ||
        this.car_id != null ||
        this.student_id != null
      ) {
        this.calBusy = true
        await this.$store.dispatch('getBookings', {
          start_date: this.startWDate,
          end_date: this.endWDate,
          deleted: this.deleted,
          car_id: this.car_id,
          driver_id: this.driver_id,
          student_id: this.student_id,
        })
        this.calBusy = false
      } else {
        await this.$store.commit('setBookings', null)
      }
    },
    handleDateSelect(selectInfo) {
      if (this.franchise_id == null) {
        this.alertText = this.$tc('PleaseSelectFranchise')
        this.$root.$emit('bv::show::modal', 'alertModel')
      } else if (this.driver_id == null) {
        this.alertText = this.$tc('PleaseSelectDriver')
        this.$root.$emit('bv::show::modal', 'alertModel')
      } else {
        const calendarApi = selectInfo.view.calendar
        calendarApi.unselect()
        this.selectedEvent = selectInfo
        this.isEdit = false
        if (this.privatebook) {
          this.$root.$emit('bv::show::modal', 'privateBooking')
        } else {
          this.$root.$emit('bv::show::modal', 'addBooking')
        }
      }
    },
    handleEventClick(clickInfo) {
      if (this.franchise_id == null) {
        this.alertText = this.$tc('PleaseSelectFranchise')
        this.$root.$emit('bv::show::modal', 'alertModel')
      } else if (this.driver_id == null) {
        this.alertText = this.$tc('PleaseSelectDriver')
        this.$root.$emit('bv::show::modal', 'alertModel')
      } else {
        this.selectedEvent = clickInfo.event
        this.isEdit = true
        if (this.privatebook) {
          this.$root.$emit('bv::show::modal', 'privateBooking')
        } else {
          this.$root.$emit('bv::show::modal', 'addBooking')
        }
      }
    },
    showEdit() {
      this.isEdit = true
      this.$root.$emit('bv::show::modal', 'addBooking')
    },
    handleEventChange(info) {
      this.callMethod = false
      this.revert = info.revert()
      if (this.franchise_id == null) {
        this.alertText = this.$tc('PleaseSelectFranchise')
        this.$root.$emit('bv::show::modal', 'alertModel')
      } else if (this.driver_id == null) {
        this.alertText = this.$tc('PleaseSelectDriver')
        this.$root.$emit('bv::show::modal', 'alertModel')
      } else {
        this.callMethod = true
        this.alertText = this.$tc('SureYou')
        this.selectedEvent = info.event
        this.$root.$emit('bv::show::modal', 'alertModel')
      }
    },
    handleEventHover({ event, jsEvent, view }) {
      // console.log(event)
      // console.log(view)
    },
    hendleTitle(js) {
      this.startWDate = js.startStr.slice(0, 10)
      this.endWDate = js.endStr.slice(0, 10)
      this.title = js.view.title
    },
    handleNext(arg) {
      this.$refs.fullCalendar.getApi().next()
      this.getBookingList()
    },
    handlePrev(arg) {
      this.$refs.fullCalendar.getApi().prev()
      this.getBookingList()
    },
    handleToday(arg) {
      this.$refs.fullCalendar.getApi().today()
      this.getBookingList()
    },
    handleWeek(arg) {
      this.editable = true
      this.$refs.fullCalendar.getApi().changeView('timeGridWeek')
      this.getBookingList()
    },
    handleDay(arg) {
      this.editable = true
      this.$refs.fullCalendar.getApi().changeView('timeGridDay')
      this.getBookingList()
    },
    handleMonth(arg) {
      this.editable = false
      this.$refs.fullCalendar.getApi().changeView('dayGridMonth')
      this.getBookingList()
    },
  },
}
