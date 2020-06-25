<template>
  <div>
    <h1>novo lancamento</h1>
  </div>
</template>

<script>
import { mapActions } from 'vuex'

export default {
  name: 'RecordsAdd',
  methods: {
    ...mapActions([
      'setTitle' // also supports payload `this.nameOfAction(amount)`
    ]),
    changeTitle (recordType) {
      let title
      switch (recordType) {
        case 'credit':
          title = 'Novo credito'
          break
        case 'debit':
          title = 'Nova despesa'
          break
        default:
          title = 'Novo lancamento'
          break
      }
      this.setTitle({ title })
    }
  },
  created () {
    this.changeTitle(this.$route.query.type)
  },
  beforeRouteUpdate (to, from, next) {
    this.changeTitle(to.query.type)
    next()
  }
}
</script>

<style>
</style>
