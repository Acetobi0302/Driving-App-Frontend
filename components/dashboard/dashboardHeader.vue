<template>
  <base-header class="pb-6 pt-3 bgs-red pt-lg-7 d-flex align-items-center">
    <!-- Card stats -->
    <b-row v-if="false">
      <b-col xl="3" md="6">
        <stats-card
          title="Total traffic"
          type="gradient-red"
          sub-title="350,897"
          icon="fas fa-users"
          class="mb-4"
        >
        </stats-card>
      </b-col>
      <b-col xl="3" md="6">
        <stats-card
          title="Total traffic"
          type="gradient-orange"
          sub-title="2,356"
          icon="fas fa-graduation-cap"
          class="mb-4"
        >
        </stats-card>
      </b-col>
      <b-col xl="3" md="6">
        <stats-card
          title="Sales"
          type="gradient-green"
          sub-title="924"
          icon="fas fa-code-branch"
          class="mb-4"
        >
        </stats-card>
      </b-col>
      <b-col xl="3" md="6">
        <stats-card
          title="Performance"
          type="gradient-info"
          sub-title="49,65%"
          icon="fas fa-car-side"
          class="mb-4"
        >
        </stats-card>
      </b-col>
    </b-row>
  </base-header>
</template>
<script>
// Components
import StatsCard from '@/components/argon-core/Cards/StatsCard'
export default {
  components: {
    StatsCard,
  }
}
</script>
