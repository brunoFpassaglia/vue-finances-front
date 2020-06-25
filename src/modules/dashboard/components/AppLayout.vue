<template>
  <div>
    <app-toolbar v-model="drawer" />
    <app-menu v-model="drawer" />

    <v-container grid-list-md>
      <v-layout>
        <v-flex xs12>
          <slot/>
        </v-flex>
      </v-layout>
    </v-container>
    <AppFloatingButton></AppFloatingButton>
  </div>
</template>

<script>
import AppFloatingButton from './AppFloatingButton.vue'
import AppToolbar from './AppToolbar'
import AppMenu from './AppMenu'
export default {
  name: 'AppLayout',
  components: {
    AppToolbar,
    AppMenu,
    AppFloatingButton
  },
  data () {
    return {
      drawer: false
    }
  }
}
</script>
