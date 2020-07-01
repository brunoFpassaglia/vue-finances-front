<template>

  <v-card :color="color">
    <v-card-title>
      <v-spacer></v-spacer>

      <h1 class="display-2 pt-3">{{ display }}</h1>
    </v-card-title>
    <v-card-text>
      <v-layout
        row
        wrap
        justify-end
      >
        <v-flex
          xs4
          pa-3
          v-for="button in buttons"
          :key="button"
        >
          <!-- number buttons -->
          <v-btn
            :color="color"
            class="headline"
            @click="change(button, 'add')"
          >{{ button }}</v-btn>
        </v-flex>
        <v-flex
          xs4
          pa-1
        >
          <v-btn icon @click="change">
            <v-icon>backspace</v-icon>
          </v-btn>
        </v-flex>
      </v-layout>
    </v-card-text>
  </v-card>
</template>

<script>
import formatCurrencyMixin from '@/mixins/format-currency'
export default {
  name: 'NumericDisplay',
  mixins: [formatCurrencyMixin],
  props: {
    color: String,
    value: Number
  },
  data () {
    return {
      buttons: [
        7, 8, 9, 4, 5, 6, 1, 2, 3, 0
      ]
    }
  },
  computed: {
    display () {
      return this.formatCurrency(this.value || 0)
    }
  },
  methods: {
    change (btnValue, operation) {
      const currentValue = this.value.toFixed(2)
      const total = operation === 'add' ? (+(currentValue + btnValue) * 10) : (currentValue.slice(0, -1) / 10)
      this.$emit('input', total)
    }
  }

}
</script>

<style>
</style>
