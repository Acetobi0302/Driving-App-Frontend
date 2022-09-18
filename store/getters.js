export default {
  getUsers: (state) => {
    return state.users
  },
  getFranchise: (state) => {
    return state.franchise
  },
  getClasses: (state) => {
    return state.classes
  },
  getClassesList: (state) => {
    return state.classesList
  },
  getCars: (state) => {
    return state.cars
  },
  getStudents: (state) => {
    return state.students
  },
  getCoursesArts: (state) => {
    return state.coursesarts
  },
  getEvents: (state) => {
    return state.bookings
  },
  getAccounts: (state) => {
    let accounts = state.accounts
    accounts = accounts.map((obj) => ({
      ...obj,
      time: obj.paid_at != null ? obj.paid_at.slice(11, 16) : '',
      paid_at: obj.paid_at != null ? obj.paid_at.slice(0, 10) : '',
    }))
    return accounts
  },
  getStudentBookings: (state) => {
    let studentBookings = state.studentBookings
    studentBookings = studentBookings.map((obj) => ({
      ...obj,
      time: obj.start != null ? obj.start.slice(11, 16) : '',
    }))
    return studentBookings
  },
}
