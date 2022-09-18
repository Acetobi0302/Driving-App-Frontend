<template>
  <div>
    <b-form class="form-horizontal">
      <b-row align-h="between" class="pt-2 m-0">
        <b-col>
          <b-form-group v-if="isadmin">
            <label
              class="col-3 pl-0 form-control-label text-white text-right"
              >{{ $tc('Franchise') }}</label
            >
            <b-form-select
              v-model="franchise_id"
              class="col-8"
              :name="$tc('Franchise')"
              :options="franchises"
              @change="getDriverList"
            ></b-form-select>
          </b-form-group>
          <b-form-group v-if="!isadmin && !isDriver" style="margin-top: 0.2rem">
            <label class="pl-0 text-white mr-2 form-control-label text-right">{{
              $tc('Private')
            }}</label>
            <label
              class="switch"
              style="vertical-align: middle; margin-bottom: 0.3rem"
            >
              <input id="togBtn" v-model="privatebook" type="checkbox" />
              <div class="slider round">
                <!--ADDED HTML -->
                <span class="on">{{ $tc('Yes') }}</span>
                <span class="off">{{ $tc('No') }}</span>
                <!--END-->
              </div>
            </label>
          </b-form-group>
        </b-col>
        <b-col>
          <b-form-group v-if="!isDriver">
            <label
              class="col-3 pl-0 form-control-label text-white text-right"
              >{{ $tc('Student') }}</label
            >
            <model-select
              v-model="student_id"
              class="col-8 trito"
              :options="studentlist"
              :name="$tc('Student')"
              :placeholder="'select ' + $tc('Student')"
            >
            </model-select>
          </b-form-group>
        </b-col>
        <b-col>
          <b-form-group v-if="!isDriver">
            <label
              class="col-3 pl-0 form-control-label text-white text-right"
              >{{ $tc('Car') }}</label
            >
            <b-form-select
              v-model="car_id"
              class="col-8"
              :name="$tc('Car')"
              :options="extraCarList"
              @change="getBookingList"
            ></b-form-select>
          </b-form-group>
        </b-col>
        <b-col>
          <b-form-group v-if="!isDriver">
            <label
              class="col-3 pl-0 form-control-label text-white text-right"
              >{{ $tc('Driver') }}</label
            >
            <b-form-select
              v-model="driver_id"
              class="col-8"
              name="Driver"
              :options="drivers"
              @change="getBookingList"
            ></b-form-select>
          </b-form-group>
        </b-col>
      </b-row>
      <b-row align-h="between" class="m-0">
        <b-col v-if="isadmin" cols="2" class="pl-2">
          <b-form-group style="margin-top: 0.2rem">
            <label class="pl-0 text-white mr-2 form-control-label text-right">{{
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
        <b-col v-if="isadmin" cols="2" class="pl-2">
          <b-form-group style="margin-top: 0.2rem">
            <label class="pl-0 text-white mr-2 form-control-label text-right">{{
              $tc('Private')
            }}</label>
            <label
              class="switch"
              style="vertical-align: middle; margin-bottom: 0.3rem"
            >
              <input id="togBtn" v-model="privatebook" type="checkbox" />
              <div class="slider round">
                <!--ADDED HTML -->
                <span class="on">{{ $tc('Yes') }}</span>
                <span class="off">{{ $tc('No') }}</span>
                <!--END-->
              </div>
            </label>
          </b-form-group>
        </b-col>
      </b-row>
    </b-form>
    <b-card no-body>
      <b-card-header class="border-0 bg-secondary">
        <div class="row justify-content-center align-items-center">
          <div class="col-md-4 align-self-center">
            <button class="btn btn-default btn-sm" @click="handlePrev">
              <i class="fas fa-angle-left"></i>
            </button>
            <button class="btn btn-default btn-sm" @click="handleNext">
              <i class="fas fa-angle-right fa-lg"></i>
            </button>
            <button class="btn btn-default btn-sm" @click="handleToday">
              {{ $tc('Today') }}
            </button>
          </div>
          <div class="col-md-4 align-self-center text-lg-center">
            <h1 id="externalTitle" class="mb-0">{{ title }}</h1>
          </div>
          <div class="col-md-4 align-self-center text-lg-right">
            <button class="btn btn-default btn-sm" @click="handleMonth">
              {{ $tc('Month') }}
            </button>
            <button class="btn btn-default btn-sm" @click="handleWeek">
              {{ $tc('Week') }}
            </button>
            <button class="btn btn-default btn-sm" @click="handleDay">
              {{ $tc('Day') }}
            </button>
          </div>
        </div>
      </b-card-header>
      <b-overlay variant="dark" :show="calBusy" class="position-clock">
        <FullCalendar
          ref="fullCalendar"
          class="demo-app-calendar"
          :options="calendarOptions"
        >
          <template #eventContent="arg">
            <b class="d-block w-100">
              {{ arg.timeText }}
              <span
                v-if="
                  arg.event.extendedProps.notecount != null &&
                  arg.event.extendedProps.notecount != 0
                "
                class="pr-2 float-right"
                style="font-size: 13px; color: yellow"
              >
                <i class="fas fa-comment-dots"></i>
              </span>
              <span
                v-if="
                  arg.event.extendedProps.paid && arg.event.extendedProps.exam
                "
                class="pr-2 float-right"
                style="font-size: 13px; color: yellow"
              >
                <i class="fas fa-euro-sign"></i>
              </span>
            </b>
            <p v-if="driver_id == null" class="mb-0 efs">
              {{ arg.event.extendedProps.driver_name }}
            </p>
            <p v-else class="mb-0 efs">{{ arg.event.title }}</p>
            <p class="mb-0 efs">{{ arg.event.extendedProps.course_name }}</p>
          </template>
        </FullCalendar>
      </b-overlay>
      <AlertModel
        :alert-text="alertText"
        :call-method="callMethod"
        :execute-method="showEdit"
      />
      <BookingModel
        :franchise-id="franchise_id"
        :driver-id="driver_id"
        :event="selectedEvent"
        :is-deleted="deleted"
        :is-edit="isEdit"
        :revert="revert"
      />
      <PrivateModel
        :franchise-id="franchise_id"
        :driver-id="driver_id"
        :event="selectedEvent"
        :is-deleted="deleted"
        :is-edit="isEdit"
        :revert="revert"
      />
    </b-card>
  </div>
</template>
<script>
import FullCalendar from '@fullcalendar/vue'
import { ModelSelect } from 'vue-search-select'
import BookingModel from '@/components/dashboard/BookingModel.vue'
import PrivateModel from '@/components/dashboard/PrivateModel.vue'
import { calanderData } from '@/mixins/calander.js'
export default {
  components: {
    ModelSelect,
    PrivateModel,
    FullCalendar,
    BookingModel,
  },
  mixins: [calanderData],
}
</script>
<style scoped>
.card-body {
  padding: 0;
  flex: 1 1 auto;
  padding-bottom: 2rem;
}
.slider.round {
  border: solid white 2px;
}
.switch {
  height: 36px;
}
@media screen and (min-width: 768px) {
  .btn-sm {
    font-size: 1rem;
  }
}
@media screen and (max-width: 768px) {
  .fc {
    height: auto;
  }
  .card {
    height: auto;
  }
}
</style>
<style>
.fc .fc-timegrid-slot {
  height: 2.7em;
}
.fc .fc-daygrid-day-frame {
  height: 8rem;
}
.fc .fc-daygrid-more-link {
  position: relative;
  z-index: 4;
  cursor: pointer;
  border: 6px solid blueviolet;
  border-radius: 2rem;
  background-color: #8a2be2;
  color: white;
  padding-left: 4px;
  padding-right: 4px;
}
.fc .fc-daygrid-day-bottom {
  font-size: 1rem;
  text-align: center;
  padding-top: 14%;
}
.position-clock {
  top: 0 !important;
}
.efs {
  font-size: 0.8rem !important;
}
</style>
