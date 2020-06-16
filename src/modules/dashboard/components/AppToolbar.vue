<template>
  <v-app-bar app fixed color="primary">
    <v-icon @click.stop="$emit('hide', !showMenu)">menu</v-icon>
    <v-toolbar-title>Dashboard</v-toolbar-title>
  </v-app-bar>
</template>

<script>
export default {
  name: 'AppToolbar',
  props: {
    showMenu: Boolean
  },
  model: {
    prop: 'showModel',
    event: 'hide'
  }
}
</script>
