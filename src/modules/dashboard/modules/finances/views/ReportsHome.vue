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

      <v-flex
        xs12
        sm6
        lg6
        xl6
        v-for="chart in charts"
        :key="chart.title"
      >
        <v-card>
          <v-card-text>
            <h2 class="font-weight-light md-4">{{ chart.title }}</h2>
            <canvas :ref="chart.refId"></canvas>
          </v-card-text>
        </v-card>
      </v-flex>
    </v-layout>
  </div>
</template>

<script>
import Chart from 'chart.js'
import ToolbarByMonth from '../components/ToolbarByMonth.vue'
import RecordsService from '../services/records-service'
import { Subject } from 'rxjs'
import { mergeMap } from 'rxjs/operators'
import { mapActions, mapState } from 'vuex'
import { generateChartConfigs } from '@/utils'
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
      this.monthSubject$.next(month)
    },

    setRecords () {
      this.subscriptions.push(
        this.monthSubject$.pipe(
          mergeMap(month => RecordsService.records({ month }))
        ).subscribe(records => {
          this.records = records
          this.setCharts()
        })
      )
    },

    setCharts () {
      const chartIncomesExpensesConfigs = generateChartConfigs({
        type: 'bar',
        items: this.records,
        keyToGroup: 'type',
        keyOfValue: 'amount',
        aliases: { CREDIT: 'Receitas', DEBIT: 'Despesas' },
        backgroundColors: [
          this.$vuetify.theme.themes.dark.primary,
          this.$vuetify.theme.themes.dark.error
        ]
      })

      if (this.chartIncomesExpenses) {
        this.chartIncomesExpenses.data.datasets = chartIncomesExpensesConfigs.data.datasets
        this.chartIncomesExpenses.update()
      } else {
        this.chartIncomesExpenses = this.createChart('chartIncomesExpenses', chartIncomesExpensesConfigs)
      }

      const chartCategoryConfigs = generateChartConfigs({
        type: 'doughnut',
        items: this.records.filter(r => r.type === 'DEBIT'),
        keyToGroup: 'category.description',
        keyOfValue: 'amount'

      })
      if (this.chartCategoryConfigs) {
        this.chartCategoryConfigs.data.datasets = chartCategoryConfigs.data.datasets
        this.chartCategoryConfigs.data.labels = chartCategoryConfigs.data.labels

        this.chartCategoryConfigs.update()
      } else {
        this.chartCategoryConfigs = this.createChart('chartCategory', chartCategoryConfigs)
      }
    },

    createChart (chartId, options) {
      const ref = Array.isArray(this.$refs[chartId]) ? this.$refs[chartId][0]
        : this.$refs[chartId]

      const ctx = ref.getContext('2d')
      return new Chart(ctx, options)
    }
  },
  data () {
    return {
      chartIncomesExpenses: undefined,
      chartCategory: undefined,
      monthSubject$: new Subject(),
      records: [],
      subscriptions: [],
      charts: [
        { title: 'Receitas vs Despesas', refId: 'chartIncomesExpenses' },
        { title: 'Despesa por categoria', refId: 'chartCategory' }
      ]
    }
  },

  destroyed () {
    this.subscriptions.forEach(s => s.unsubscribe())
  },
  created () {
    this.setTitle({ title: 'relatorios' })
    this.setRecords()
  },
  computed: {
    ...mapState('finances', ['month'])
  }

}
</script>

<style>
</style>
