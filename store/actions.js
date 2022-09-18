/* eslint-disable no-unused-vars */
/* eslint-disable node/handle-callback-err */
function showToast(ctx, message, variant = `success`) {
  ctx._vm.$bvToast.toast(`${message}`, {
    title: ` `,
    variant: `${variant}`,
    toaster: 'b-toaster-bottom-right',
    solid: true,
    appendToast: true,
  })
}
export default {
  // user Profile

  async updateProfile({ commit }, data) {
    await this.$axios
      .$put('/api/me', data)
      .then((response) => {
        if (response.success) {
          showToast(
            this,
            this.$i18n.tc('Profile') + ' ' + this.$i18n.tc('Updated'),
            `success`
          )
          commit('updateUser', response.data)
        }
      })
      .catch((error) => {
        if (error.response) {
          showToast(this, error.response.data.username, `danger`)
        } else {
          showToast(this, error, `danger`)
        }
      })
  },
  async updatePassword({ commit }, data) {
    await this.$axios
      .$put('/api/me/password', data)
      .then((response) => {
        if (response.success) {
          showToast(this, 'Password' + this.$i18n.tc('Updated'), `success`)
        }
      })
      .catch((error) => {
        showToast(this, error, `danger`)
      })
  },

  // userlist

  async getUserList({ commit }, { franchiseId, deleted }) {
    await this.$axios
      .$get('/api/users/' + franchiseId, {
        params: {
          deleted,
        },
      })
      .then((response) => {
        if (response.success) {
          commit('setUsers', response.data)
        }
      })
      .catch((error) => {
        showToast(this, error, `danger`)
      })
  },
  async getUserListRole({ commit }, data) {
    await this.$axios
      .$get('/api/userlist', {
        params: {
          role: data.role,
          franchise_id: data.franchise_id,
        },
      })
      .then((response) => {
        if (response.success) {
          commit('setUserList', response.data)
        }
      })
      .catch((error) => {
        showToast(this, error, `danger`)
      })
  },
  async getDriverList({ commit }, franchiseId) {
    await this.$axios
      .$get('/api/driverlist/' + franchiseId)
      .then((response) => {
        if (response.success) {
          commit('setDrivers', response.data)
        }
      })
      .catch((error) => {
        showToast(this, error, `danger`)
      })
  },
  async addUser({ commit }, data) {
    return await this.$axios
      .$post('/api/user', data)
      .then((response) => {
        if (response.success) {
          showToast(this, 'User' + this.$i18n.tc('Created'), `success`)
          return true
        }
        return false
      })
      .catch((error) => {
        if (error.response) {
          showToast(this, error.response.data.username, `danger`)
        } else {
          showToast(this, error, `danger`)
        }
        return false
      })
  },
  async updateUserProfile({ commit }, data) {
    return await this.$axios
      .$put('/api/user/' + data.id, data)
      .then((response) => {
        if (response.success) {
          showToast(this, 'User Profile' + this.$i18n.tc('Updated'), `success`)
          return true
        }
        return false
      })
      .catch((error) => {
        if (error.response) {
          showToast(this, error.response.data.username, `danger`)
        } else {
          showToast(this, error, `danger`)
        }
        return false
      })
  },
  async updateUserPassword({ commit }, data) {
    await this.$axios
      .$put('/api/user/password/' + data.id, data)
      .then((response) => {
        if (response.success) {
          showToast(this, 'Password' + this.$i18n.tc('Updated'), `success`)
        }
      })
      .catch((error) => {
        showToast(this, error, `danger`)
      })
  },
  async deleteUserProfile({ commit }, data) {
    return await this.$axios
      .$delete('/api/user/' + data.id, data)
      .then((response) => {
        if (response.success) {
          showToast(this, 'User' + this.$i18n.tc('Deleted'), `success`)
          return true
        }
        return false
      })
      .catch((error) => {
        showToast(this, error, `danger`)
        return false
      })
  },
  async activeUserProfile({ commit }, data) {
    return await this.$axios
      .$put('/api/user/restore/' + data.id)
      .then((response) => {
        if (response.success) {
          showToast(this, 'User' + this.$i18n.tc('Activated'), `success`)
          return true
        }
        return false
      })
      .catch((error) => {
        showToast(this, error, `danger`)
        return false
      })
  },
  // Franchise
  async getAllFranchise({ commit }, key) {
    await this.$axios
      .$get('/api/franchiselist')
      .then((response) => {
        if (response.success) {
          commit('setFranchiseList', response.data)
        }
      })
      .catch((error) => {
        showToast(this, error, `danger`)
      })
  },
  async getFranchiseList({ commit }, key) {
    await this.$axios
      .$get('/api/franchise')
      .then((response) => {
        if (response.success) {
          commit('setFranchise', response.data)
        }
      })
      .catch((error) => {
        showToast(this, error, `danger`)
      })
  },

  async addFranchise({ commit }, data) {
    return await this.$axios
      .$post('/api/franchise', data)
      .then((response) => {
        if (response.success) {
          showToast(
            this,
            this.$i18n.tc('Franchise') + '' + this.$i18n.tc('Created'),
            `success`
          )
          return true
        }
        return false
      })
      .catch((error) => {
        showToast(this, error, `danger`)
        return false
      })
  },
  async updateFranchise({ commit }, data) {
    return await this.$axios
      .$put('/api/franchise/' + data.id, data)
      .then((response) => {
        if (response.success) {
          showToast(
            this,
            this.$i18n.tc('Franchise') + '' + this.$i18n.tc('Updated'),
            `success`
          )
          return true
        }
        return false
      })
      .catch((error) => {
        showToast(this, error, `danger`)
        return false
      })
  },
  async deleteFranchise({ commit }, data) {
    return await this.$axios
      .$delete('/api/franchise/' + data.id, data)
      .then((response) => {
        if (response.success) {
          showToast(
            this,
            this.$i18n.tc('Franchise') + this.$i18n.tc('Deleted'),
            `success`
          )
          return true
        }
        return false
      })
      .catch((error) => {
        showToast(this, error, `danger`)
        return false
      })
  },

  // Classes
  async getClasses({ commit }, key) {
    await this.$axios
      .$get('/api/classes')
      .then((response) => {
        if (response.success) {
          commit('setClasses', response.data)
        }
      })
      .catch((error) => {
        showToast(this, error, `danger`)
      })
  },
  async getClassesList({ commit }, key) {
    await this.$axios
      .$get('/api/classes')
      .then((response) => {
        if (response.success) {
          commit('setClassesList', response.data)
        }
      })
      .catch((error) => {
        showToast(this, error, `danger`)
      })
  },
  async addClasses({ commit }, data) {
    return await this.$axios
      .$post('/api/classes', data)
      .then((response) => {
        if (response.success) {
          showToast(this, 'Classes' + this.$i18n.tc('Created'), `success`)
          return true
        }
        return false
      })
      .catch((error) => {
        showToast(this, error, `danger`)
        return false
      })
  },
  async updateClasses({ commit }, data) {
    return await this.$axios
      .$put('/api/classes/' + data.id, data)
      .then((response) => {
        if (response.success) {
          showToast(this, 'Classes' + this.$i18n.tc('Updated'), `success`)
          return true
        }
        return false
      })
      .catch((error) => {
        showToast(this, error, `danger`)
        return false
      })
  },
  async deleteClasses({ commit }, data) {
    return await this.$axios
      .$delete('/api/classes/' + data.id, data)
      .then((response) => {
        if (response.success) {
          showToast(this, 'Classes' + this.$i18n.tc('Deleted'), `success`)
          return true
        }
        return false
      })
      .catch((error) => {
        showToast(this, error, `danger`)
        return false
      })
  },

  // Cars
  async getCars({ commit }, franchiseId) {
    await this.$axios
      .$get('/api/car_management/' + franchiseId)
      .then((response) => {
        if (response.success) {
          commit('setCars', response.data)
        }
      })
      .catch((error) => {
        showToast(this, error, `danger`)
      })
  },
  async getCarList({ commit }, data) {
    await this.$axios
      .$get('/api/carlist', {
        params: {
          user_id: data.user_id,
          franchise_id: data.franchise_id,
          art: data.art,
        },
      })
      .then((response) => {
        if (response.success) {
          commit('setCarList', response.data)
        }
      })
      .catch((error) => {
        showToast(this, error, `danger`)
      })
  },
  async getExtraCarList({ commit }, data) {
    await this.$axios
      .$get('/api/extracarlist', {
        params: {
          franchise_id: data,
        },
      })
      .then((response) => {
        if (response.success) {
          commit('setExtraCarList', response.data)
        }
      })
      .catch((error) => {
        showToast(this, error, `danger`)
      })
  },
  async addCar({ commit }, data) {
    return await this.$axios
      .$post('/api/car_management', data)
      .then((response) => {
        if (response.success) {
          showToast(this, 'Car' + this.$i18n.tc('Created'), `success`)
          return true
        }
        return false
      })
      .catch((error) => {
        showToast(this, error, `danger`)
        return false
      })
  },
  async updateCar({ commit }, data) {
    return await this.$axios
      .$put('/api/car_management/' + data.id, data)
      .then((response) => {
        if (response.success) {
          showToast(this, 'Car' + this.$i18n.tc('Updated'), `success`)
          return true
        }
        return false
      })
      .catch((error) => {
        showToast(this, error, `danger`)
        return false
      })
  },
  async deleteCar({ commit }, data) {
    return await this.$axios
      .$delete('/api/car_management/' + data.id, data)
      .then((response) => {
        if (response.success) {
          showToast(this, 'Car' + this.$i18n.tc('Deleted'), `success`)
          return true
        }
        return false
      })
      .catch((error) => {
        showToast(this, error, `danger`)
        return false
      })
  },

  // getCoursesArt
  async getCoursesArts({ commit }, classesId) {
    await this.$axios
      .$get('/api/course_art/' + classesId)
      .then((response) => {
        if (response.success) {
          commit('setCoursesArt', response.data)
        }
      })
      .catch((error) => {
        showToast(this, error, `danger`)
      })
  },
  async getCoursesArtList({ commit }, classesId) {
    await this.$axios
      .$get('/api/course_art/' + classesId)
      .then((response) => {
        if (response.success) {
          commit('setCoursesList', response.data)
        }
      })
      .catch((error) => {
        showToast(this, error, `danger`)
      })
  },
  async addCoursesArt({ commit }, data) {
    return await this.$axios
      .$post('/api/course_art', data)
      .then((response) => {
        if (response.success) {
          showToast(this, 'Course-Art' + this.$i18n.tc('Created'), `success`)
          return true
        }
        return false
      })
      .catch((error) => {
        showToast(this, error, `danger`)
        return false
      })
  },
  async updateCoursesArt({ commit }, data) {
    return await this.$axios
      .$put('/api/course_art/' + data.id, data)
      .then((response) => {
        if (response.success) {
          showToast(this, 'Course-Art' + this.$i18n.tc('Updated'), `success`)
          return true
        }
        return false
      })
      .catch((error) => {
        showToast(this, error, `danger`)
        return false
      })
  },
  async deleteCoursesArt({ commit }, data) {
    return await this.$axios
      .$delete('/api/course_art/' + data.id, data)
      .then((response) => {
        if (response.success) {
          showToast(this, 'Course-Art' + this.$i18n.tc('Deleted'), `success`)
          return true
        }
        return false
      })
      .catch((error) => {
        showToast(this, error, `danger`)
        return false
      })
  },

  // Students
  async getStudents({ commit }, franchiseId) {
    await this.$axios
      .$get('/api/student/' + franchiseId)
      .then((response) => {
        if (response.success) {
          commit('setStudents', response.data)
        }
      })
      .catch((error) => {
        showToast(this, error, `danger`)
      })
  },
  async getStudentList({ commit }, franchiseId) {
    await this.$axios
      .$get('/api/studentlist/' + franchiseId)
      .then((response) => {
        if (response.success) {
          commit('setStudentlist', response.data)
        }
      })
      .catch((error) => {
        showToast(this, error, `danger`)
      })
  },
  async addStudent({ commit }, data) {
    return await this.$axios
      .$post('/api/student', data)
      .then((response) => {
        if (response.success) {
          showToast(this, 'Student' + this.$i18n.tc('Created'), `success`)
          return true
        }
        return false
      })
      .catch((error) => {
        showToast(this, error.response.data.message, `danger`)
        return false
      })
  },
  async updateStudent({ commit }, data) {
    return await this.$axios
      .$put('/api/student/' + data.id, data)
      .then((response) => {
        if (response.success) {
          showToast(this, 'Student' + this.$i18n.tc('Updated'), `success`)
          return true
        }
        return false
      })
      .catch((error) => {
        showToast(this, error.response.data.message, `danger`)
        return false
      })
  },
  async deleteStudent({ commit }, data) {
    return await this.$axios
      .$delete('/api/student/' + data.id, data)
      .then((response) => {
        if (response.success) {
          showToast(this, 'Student' + this.$i18n.tc('Deleted'), `success`)
          return true
        }
        return false
      })
      .catch((error) => {
        showToast(this, error, `danger`)
        return false
      })
  },

  // bookings
  async getBookings({ commit }, data) {
    await this.$axios
      .$get('/api/booking', {
        params: {
          start_date: data.start_date,
          end_date: data.end_date,
          deleted: data.deleted || false,
          car_id: data.car_id,
          student_id: data.student_id,
          driver_id: data.driver_id,
        },
      })
      .then((response) => {
        if (response.success) {
          commit('setBookings', response.data)
        }
      })
      .catch((error) => {
        showToast(this, error, `danger`)
      })
  },
  async getStudentBookings({ commit }, studentId) {
    await this.$axios
      .$get('/api/booking/student', {
        params: {
          student_id: studentId,
        },
      })
      .then((response) => {
        if (response.success) {
          commit('setStudentBookings', response.data)
        }
      })
      .catch((error) => {
        showToast(this, error, `danger`)
      })
  },
  async bookSlot({ commit }, data) {
    return await this.$axios
      .$post('/api/booking', data)
      .then((response) => {
        if (response.success) {
          showToast(this, 'Slot Booked', `success`)
          return true
        }
        return false
      })
      .catch((error) => {
        showToast(this, error.response.data.message, `danger`)
        return false
      })
  },
  async updateSlot({ commit }, data) {
    return await this.$axios
      .$put('/api/booking/' + data.id, data)
      .then((response) => {
        if (response.success) {
          showToast(this, 'Slot' + this.$i18n.tc('Updated'), `success`)
          return true
        }
        return false
      })
      .catch((error) => {
        showToast(this, error.response.data.message, `danger`)
        return false
      })
  },
  async bookBreak({ commit }, data) {
    return await this.$axios
      .$post('/api/break', data)
      .then((response) => {
        if (response.success) {
          showToast(this, 'Slot Booked', `success`)
          return true
        }
        return false
      })
      .catch((error) => {
        showToast(this, error.response.data.message, `danger`)
        return false
      })
  },
  async updateBreak({ commit }, data) {
    return await this.$axios
      .$put('/api/break/' + data.id, data)
      .then((response) => {
        if (response.success) {
          showToast(this, 'Slot' + this.$i18n.tc('Updated'), `success`)
          return true
        }
        return false
      })
      .catch((error) => {
        showToast(this, error, `danger`)
        return false
      })
  },
  async deleteBooking({ commit }, id) {
    return await this.$axios
      .$delete('/api/booking/' + id)
      .then((response) => {
        if (response.success) {
          showToast(this, 'booking' + this.$i18n.tc('Deleted'), `success`)
          return true
        }
        return false
      })
      .catch((error) => {
        showToast(this, error, `danger`)
        return false
      })
  },
  async getNotes({ commit }, bookingId) {
    await this.$axios
      .$get('/api/notes', {
        params: {
          booking_id: bookingId,
        },
      })
      .then((response) => {
        if (response.success) {
          commit('setNotes', response.data)
        }
      })
      .catch((error) => {
        showToast(this, error, `danger`)
      })
  },
  async deleteNote({ commit }, id) {
    return await this.$axios
      .$delete('/api/notes/' + id)
      .then((response) => {
        if (response.success) {
          showToast(
            this,
            this.$i18n.tc('Note') + this.$i18n.tc('Deleted'),
            `success`
          )
          return true
        }
        return false
      })
      .catch((error) => {
        showToast(this, error, `danger`)
        return false
      })
  },
  async getAccounts({ commit }, data) {
    await this.$axios
      .$get('/api/accounts', {
        params: {
          start_date: data.dates[0],
          end_date: data.dates[1],
          user_id: data.user_id,
          role: data.role,
        },
      })
      .then((response) => {
        if (response.success) {
          commit('setAccounts', response.data)
        }
      })
      .catch((error) => {
        showToast(this, error, `danger`)
      })
  },
  async getLogs({ commit }, bookingId) {
    await this.$axios
      .$get('/api/logs', {
        params: {
          booking_id: bookingId,
        },
      })
      .then((response) => {
        if (response.success) {
          commit('setLogs', response.data)
        }
      })
      .catch((error) => {
        showToast(this, error, `danger`)
      })
  },
}
