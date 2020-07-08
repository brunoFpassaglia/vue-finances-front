<template>
  <div>
    <h1>Relatorios</h1>
    <v-layout
      row
      wrap
    >
      <v-flex xs12>
        <ToolbarByMonth
          format="MM-YYYY"
          color="primary"
          :month="month"
          @month="changeMonth"
        ></ToolbarByMonth>
      </v-flex>
    </v-layout>
  </div>
</template>

<script>
import ToolbarByMonth from '../components/ToolbarByMonth.vue'
import { mapActions, mapState } from 'vuex'
export default {
  components: {
    ToolbarByMonth
  },
  name: 'ReportsHome',
  methods: {
    ...mapActions(['setTitle']),
    ...mapActions('finances', ['setMonth']),
    changeMonth (month) {
      this.setMonth({ month })
    }
  },
  created () {
    this.setTitle({ title: 'relatorios' })
  },
  computed: {
    ...mapState('finances', ['month'])
  }

}
</script>

<style>
</style>
