<template>
  <v-toolbar color="primary">
    <v-layout align-center>
      <v-flex xs1>
        <div class="text-left">
          <v-btn icon @click="decrement">
            <v-icon>
              chevron_left
            </v-icon>
          </v-btn>
        </div>
      </v-flex>
      <v-flex>
        <v-toolbar-title class="text-center"><span>{{ currentMonth }}</span></v-toolbar-title>
      </v-flex>
      <v-flex xs1>
        <div class="text-right">
          <v-btn icon @click="increment">
            <v-icon>
              chevron_right
            </v-icon>
          </v-btn>
        </div>
      </v-flex>
    </v-layout>
  </v-toolbar>
</template>

<script>
import moment from 'moment'
export default {
  name: 'ToolbarByMonth',
  props: {
    format: {
      type: String
    }
  },
  data () {
    return {
      date: moment()
    }
  },
  computed: {
    currentMonth () {
      return this.date.format('MMMM YYYY')
    }
  },
  methods: {
    emit () {
      this.$emit('month', this.date.format(this.format))
    },
    decrement () {
      this.date = this.date.clone().subtract(1, 'month')
      this.emit()
    },
    increment () {
      this.date = this.date.clone().add(1, 'month')
      this.emit()
    }
  },
  created () {
    this.emit()
  }

}
</script>

<style>
</style>
