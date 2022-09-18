export default {
  updateUser(state, data) {
    if (data) {
      state.auth.user = data
    }
  },
  setUsers(state, data) {
    if (data) {
      state.users = data
    } else {
      state.users = []
    }
  },
  setUserList(state, data) {
    if (data) {
      let arr = [{ name: 'Select ' + this.$i18n.tc('User'), id: null }]
      arr = arr.concat(data)
      arr.forEach((obj) => renameKey(obj, 'name', 'text'))
      arr.forEach((obj) => renameKey(obj, 'id', 'value'))
      state.userlist = arr
    } else {
      state.userlist = [
        { text: 'Select ' + this.$i18n.tc('User'), value: null },
      ]
    }
  },
  setCars(state, data) {
    if (data) {
      state.cars = data
    } else {
      state.cars = []
    }
  },
  setCarList(state, data) {
    if (data) {
      let arr = [{ number_plate: 'Select ' + this.$i18n.tc('Car'), id: null }]
      arr = arr.concat(data)
      arr.forEach((obj) => renameKey(obj, 'number_plate', 'text'))
      arr.forEach((obj) => renameKey(obj, 'id', 'value'))
      state.carList = arr
    } else {
      state.carList = [{ text: 'Select ' + this.$i18n.tc('Car'), value: null }]
    }
  },
  setExtraCarList(state, data) {
    if (data) {
      let arr = [{ number_plate: 'Select ' + this.$i18n.tc('Car'), id: null }]
      arr = arr.concat(data)
      arr.forEach((obj) => renameKey(obj, 'number_plate', 'text'))
      arr.forEach((obj) => renameKey(obj, 'id', 'value'))
      state.extraCarList = arr
    } else {
      state.extraCarList = [
        { text: 'Select ' + this.$i18n.tc('Car'), value: null },
      ]
    }
  },
  setDrivers(state, data) {
    if (data) {
      let arr = [{ name: 'Select ' + this.$i18n.tc('Driver'), id: null }]
      arr = arr.concat(data)
      arr.forEach((obj) => renameKey(obj, 'name', 'text'))
      arr.forEach((obj) => renameKey(obj, 'id', 'value'))
      state.drivers = arr
    } else {
      state.drivers = [
        { text: 'Select ' + this.$i18n.tc('Driver'), value: null },
      ]
    }
  },
  setFranchiseList(state, data) {
    if (data) {
      let arr = [{ name: 'Select ' + this.$i18n.tc('Franchise'), id: null }]
      arr = arr.concat(data)
      arr.forEach((obj) => renameKey(obj, 'name', 'text'))
      arr.forEach((obj) => renameKey(obj, 'id', 'value'))
      state.franchiselist = arr
    } else {
      state.franchiselist = [
        { name: 'Select ' + this.$i18n.tc('Franchise'), id: null },
      ]
    }
  },
  setFranchise(state, data) {
    if (data) {
      state.franchise = data
    } else {
      state.franchise = []
    }
  },
  setClasses(state, data) {
    if (data) {
      state.classes = data
    } else {
      state.classes = []
    }
  },
  setClassesList(state, data) {
    if (data) {
      let arr = [{ name: 'Select ' + this.$i18n.tc('Classes'), id: null }]
      arr = arr.concat(data)
      arr.forEach((obj) => renameKey(obj, 'name', 'text'))
      arr.forEach((obj) => renameKey(obj, 'id', 'value'))
      state.classesList = arr
    } else {
      state.classesList = [
        { text: 'Select ' + this.$i18n.tc('Classes'), value: null },
      ]
    }
  },
  setCoursesArt(state, data) {
    if (data) {
      state.coursesarts = data
    } else {
      state.coursesarts = []
    }
  },
  setStudents(state, data) {
    if (data) {
      state.students = data
    } else {
      state.students = []
    }
  },
  setStudentlist(state, data) {
    if (data) {
      let arr = [{ first_name: 'Select ' + this.$i18n.tc('Student'), id: null }]
      arr = arr.concat(data)
      arr.forEach((obj) => renameKey(obj, 'first_name', 'text'))
      arr.forEach((obj) => renameKey(obj, 'id', 'value'))
      state.studentlist = arr
    } else {
      state.studentlist = [
        { text: 'Select ' + this.$i18n.tc('Student'), value: null },
      ]
    }
  },
  setCoursesList(state, data) {
    if (data) {
      const res = []
      res.push({ text: 'Select ' + this.$i18n.tc('Course'), value: null })
      for (const key in data) {
        const obj = data[key]
        res.push({ text: obj.course_name, value: obj })
      }
      state.coursesList = res
    } else {
      state.coursesList = [
        { text: 'Select ' + this.$i18n.tc('Course'), value: null },
      ]
    }
  },
  setBookings(state, data) {
    if (data) {
      state.bookings = data
    } else {
      state.bookings = []
    }
  },
  setNotes(state, data) {
    if (data) {
      state.notes = data
    } else {
      state.notes = []
    }
  },
  setStudentBookings(state, data) {
    if (data) {
      state.studentBookings = data
    } else {
      state.studentBookings = []
    }
  },
  setAccounts(state, data) {
    if (data) {
      state.accounts = data
    } else {
      state.accounts = []
    }
  },
  setLogs(state, data) {
    if (data) {
      state.logs = data
    } else {
      state.logs = []
    }
  },
}
function renameKey(obj, oldKey, newKey) {
  obj[newKey] = obj[oldKey]
  delete obj[oldKey]
}
