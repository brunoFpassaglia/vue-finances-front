<template>
  <v-toolbar :color="color">
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
      <v-flex xs8 offset-xs1>
        <v-toolbar-title class="text-center"><span>{{ currentMonth }}</span></v-toolbar-title>
      </v-flex>
      <v-flex xs1 text-right v-if="showSlot">
        <slot/>
      </v-flex>
      <v-flex xs1 :class="arrowRightClass">
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
    },
    color: String,
    showSlot: {
      type: Boolean,
      default: false
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
    },
    arrowRightClass () {
      return !this.showSlot ? 'offset-xs1' : ''
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
