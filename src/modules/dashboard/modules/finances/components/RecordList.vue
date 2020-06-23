<template>
  <v-card>
    <v-list>
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
</template>

<script>
import moment from 'moment'
import { groupBy } from '@/utils'
import RecordListItem from './RecordListItem.vue'
import RecordsService from '../services/records-service'
export default {
  name: 'RecordList',
  components: {
    RecordListItem
  },
  data () {
    return {
      records: []
    }
  },
  async created () {
    this.records = await RecordsService.records()
    console.log('Records:', this.records)
    console.log('Records grouped', this.mappedRecords)
  },
  computed: {
    mappedRecords () {
      return groupBy(this.records, 'date', (record, dateKey) => {
        return moment(record[dateKey]).format('DD-MM-YY')
      })
    },
    totalAmount () {
      return this.records.reduce((sum, record) => sum + record.amount, 0)
    }
  }
}
</script>

<style>
</style>
