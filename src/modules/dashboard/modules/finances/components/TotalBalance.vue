<template>
  <div class="">
    <v-card :color="color">
      <v-card-title primary-title>
        <div class="text-center ma-auto">
          <p class="subheading">Saldo atual</p>
          <h1 class="display-2">{{ totalInCurrency }}</h1>
        </div>
      </v-card-title>
    </v-card>
  </div>
</template>

<script>
import formatCurrencyMixin from '@/mixins/format-currency'
import RecordsService from './../services/records-service'
export default {
  name: 'TotalBalance',
  mixins: [formatCurrencyMixin],
  data () {
    return {
      total: 0
    }
  },
  async created () {
    this.total = await RecordsService.totalBalance()
  },
  computed: {
    color () {
      return this.total <= 0 ? 'error' : 'primary'
    },
    totalInCurrency () {
      return this.formatCurrency(this.total)
    }
  }
}
</script>

<style>
</style>
