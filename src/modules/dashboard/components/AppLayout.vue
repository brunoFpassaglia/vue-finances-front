<template>
  <div>
    <app-toolbar v-model="drawer"/>
    <app-menu v-model="drawer"/>
  </div>
</template>

<script>
import AppToolbar from './AppToolbar'
import AppMenu from './AppMenu'
export default {
  name: 'AppLayout',
  components: {
    AppToolbar,
    AppMenu
  },
  data () {
    return {
      drawer: false
    }
  }
}
</script>
