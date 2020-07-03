<template>
  <v-card>
    <v-card-title>{{title}}</v-card-title>
    <v-card-text>
      <v-text-field label="Descricao"></v-text-field>
      <v-select
        v-if="entity === 'category'"
        label="Operacao"
      ></v-select>
      <v-card-actions>
        <v-spacer>
          <v-btn @click="$emit('close')">Cancelar</v-btn>
          <v-btn color="primary">Salvar</v-btn>
        </v-spacer>
      </v-card-actions>
    </v-card-text>
  </v-card>

</template>

<script>
export default {
  name: 'AccountCategoryAdd',
  props: {
    entity: String
  },
  computed: {
    title () {
      return this.entity === 'account' ? 'Nova conta' : 'Nova categoria'
    }
  }

}
</script>

<style>
</style>
