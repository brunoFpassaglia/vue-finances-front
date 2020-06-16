<template>
  <v-toolbar app fixed color="primary">
    <v-icon @click.stop="$emit('hide', !show)">menu</v-icon>
    <v-toolbar-title>Dashboard</v-toolbar-title>
  </v-toolbar>
</template>

<script>
export default {
  name: 'AppToolbar',
  props: {
    showMenu: Boolean
  },
  model: {
    prop: 'show',
    event: 'hide'
  }
}
</script>
