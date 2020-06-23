<template>
  <v-list-item>
    <v-icon :class="amountColor(record.amount)">
      {{ recordIcon(record.type) }}
    </v-icon>
    <v-list-item-content>
      <v-list-item-title :class="amountColor(record.amount)">
        {{ record.description }}
      </v-list-item-title>
      <v-list-item-subtitle>
        {{ record.category.description }} | {{ record.account.description }}
      </v-list-item-subtitle>
    </v-list-item-content>

    <v-list-item-action>
      <span :class="amountColor(record.amount)">
        {{ record.amount }}
      </span>
    </v-list-item-action>
  </v-list-item>
</template>

<script>
import formatCurrencyMixin from '@/mixins/format-currency'
export default {
  name: 'RecordListItem',
  mixins: [formatCurrencyMixin],
  props: {
    record: Object
  },
  methods: {
    amountColor (amount) {
      return amount < 0 ? 'error--text text--lighten-1' : 'primary--text text--lighten-1'
    },
    recordIcon (type) {
      return type === 'CREDIT' ? 'arrow_upward' : 'arrow_downward'
    }
  }
}
</script>

<style>
</style>
