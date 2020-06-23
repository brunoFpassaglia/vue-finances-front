<template>
  <v-list>
    <record-list-item
      v-for="record in records"
      :key="record.id"
      :record="record"
    >
    </record-list-item>
  </v-list>
</template>

<script>
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
  }
}
</script>

<style>
</style>
