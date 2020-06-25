<template>
  <div>
    <h1>Lancamentos</h1>
    <record-list/>
  </div>
</template>

<script>
import { mapActions } from 'vuex'
import RecordList from '../components/RecordList'
export default {
  name: 'RecordsHome',
  components: {
    RecordList
  },
  methods: {
    ...mapActions(['setTitle'])
  },
  created () {
    this.setTitle({ title: 'Lancamentos' })
  }
}
</script>
