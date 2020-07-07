<template>
  <div>
    <TotalBalance class="mb-2"></TotalBalance>
    <ToolbarByMonth
      format="MM-YYYY"
      @month="changeMonth"
      :color="toolbarColor"
      :showSlot="true"
    >
      <RecordsFilter></RecordsFilter>
    </ToolbarByMonth>
    <v-card>
      <v-card-text
        class="text-center"
        v-if="mappedRecordsLenth === 0"
      >
        <v-icon
          size="100"
          color="grey"
        >assignment</v-icon>
        <p>Nenhum lancamneto no periodo</p>

      </v-card-text>
      <v-list v-else>
        <template v-for="(records, date, index) in mappedRecords">
          <v-subheader :key="date">{{ date }}</v-subheader>
          <record-list-item
            v-for="record in records"
            :key="record.id"
            :record="record"
          >
          </record-list-item>
          <v-divider :key="`${date}-${index}`"></v-divider>
        </template>
      </v-list>
      <v-footer class="pa-2">
        <v-flex class="text-right">
          <h1 class="font-weight-light">
            <span>saldo do mes</span>
            <strong class="ml-12">{{ totalAmount }}</strong>
          </h1>
        </v-flex>
      </v-footer>
    </v-card>
  </div>
</template>

<script>
import RecordsFilter from './RecordsFilter.vue'
import TotalBalance from './TotalBalance.vue'
import ToolbarByMonth from './ToolbarByMonth.vue'
import moment from 'moment'
import { groupBy } from '@/utils'
import RecordListItem from './RecordListItem.vue'
import RecordsService from '../services/records-service'
import { Subject } from 'rxjs'
import { mergeMap } from 'rxjs/operators'
export default {
  name: 'RecordList',
  components: {
    RecordListItem,
    ToolbarByMonth,
    TotalBalance,
    RecordsFilter
  },
  data () {
    return {
      records: [],
      monthSubject$: new Subject()
    }
  },
  computed: {
    mappedRecords () {
      return groupBy(this.records, 'date', (record, dateKey) => {
        return moment(record[dateKey]).format('DD-MM-YY')
      })
    },
    totalAmount () {
      return this.records.reduce((sum, record) => sum + record.amount, 0)
    },
    mappedRecordsLenth () {
      return Object.keys(this.mappedRecords).length
    },

    toolbarColor () {
      return this.totalAmount <= 0 ? 'error' : 'primary'
    }
  },
  methods: {
    changeMonth (month) {
      this.monthSubject$.next({ month })
    },
    setRecords (month) {
      this.monthSubject$.pipe(
        mergeMap(variables => RecordsService.records(variables))
      ).subscribe(records => (this.records = records))
    }
  },
  created () {
    this.setRecords()
  }
}
</script>

<style>
</style>
