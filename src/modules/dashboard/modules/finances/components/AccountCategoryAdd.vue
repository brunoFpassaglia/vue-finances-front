<template>
  <v-card>
    <v-card-title class="headline">{{title}}</v-card-title>
    <v-card-text>
      <v-text-field label="Descricao" v-model="$v.item.description.$model"></v-text-field>
      <v-select
        v-if="entity === 'category'"
        label="Operacao"
        v-model="$v.item.operation.$model"
        :items="operations"
        item-text="description"
        item-value="value"
      ></v-select>
      <v-card-actions>
        <v-spacer>
          <v-btn @click="$emit('close')">Cancelar</v-btn>
          <v-btn color="primary" @click="save" :disabled="$v.$invalid">Salvar</v-btn>
        </v-spacer>
      </v-card-actions>
    </v-card-text>
  </v-card>

</template>

<script>
import { required, minLength } from 'vuelidate/lib/validators'
import AccountsService from '../services/accounts-service'
import CategoriesService from '../services/category-service'
export default {
  name: 'AccountCategoryAdd',
  props: {
    entity: String
  },
  data () {
    return {
      item: {
        description: '',
        operation: ''
      },
      operations: [
        { description: 'Receita', value: 'CREDIT' },
        { description: 'Despesa', value: 'DEBIT' }
      ]
    }
  },
  validations () {
    const validations = {
      item: {
        description: {
          required,
          minLength: minLength(3)
        }
      }
    }

    if (this.entity === 'account') { return validations }

    return {
      item: {
        ...validations.item,
        operation: { required }
      }
    }
  },
  methods: {
    async save () {
      let promise
      switch (this.entity) {
        case 'account':
          promise = AccountsService.accountCreate(this.item)
          break

        default:
          promise = CategoriesService.categoryCreate(this.item)
          break
      }
      const item = await promise
      this.$emit('saved', item)
    }
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
