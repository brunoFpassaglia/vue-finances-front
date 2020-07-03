<template>
  <v-speed-dial
    v-model="fab"
    fixed
    bottom
    right
    direction="top"
    transition="slide-y-reverse-transition"
  >
    <template v-slot:activator>
      <v-btn
        v-model="fab"
        color="primary"
        fab
      >
        <v-icon>add</v-icon>
        <v-icon>remove</v-icon>
      </v-btn>
    </template>

    <v-btn
      fab
      small
      color="error"
      title="Nova despesa"
      @click="addRecord('DEBIT')"
    >
      <v-icon>remove</v-icon>
    </v-btn>
    <v-btn
      fab
      small
      color="primary"
      title="Nova receita"
      @click="addRecord('CREDIT')"
    >
      <v-icon>add</v-icon>
    </v-btn>
  </v-speed-dial>
</template>

<script>
export default {
  name: 'AppFloatingButton',
  data () {
    return {
      fab: false
    }
  },
  methods: {
    addRecord (type) {
      this.$router.push({
        name: 'addRecords',
        query: { type }
      })
    }
  }
}
</script>

<style>
</style>
