<template>
  <v-app-bar
    app
    fixed
    color="primary"
  >
    <v-icon @click.stop="$emit('hide', !showMenu)">menu</v-icon>
    <v-toolbar-title class="ml-4">{{ title || 'Dashboard' }}</v-toolbar-title>
  </v-app-bar>
</template>

<script>
import { mapState } from 'vuex'

export default {
  name: 'AppToolbar',
  props: {
    showMenu: Boolean
  },
  model: {
    prop: 'showModel',
    event: 'hide'
  },

  computed: {
    ...mapState([
      'title'
    ])
  }
}
</script>
