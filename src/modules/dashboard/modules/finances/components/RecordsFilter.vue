<template>
  <div>
    <v-layout row>
      <v-flex xs6>
        <v-btn
          icon
          @click="showFilterDialog = true"
        >
          <v-icon>filter_list</v-icon>
        </v-btn>

      </v-flex>
      <v-flex xs6>
        <v-btn icon>
          <v-icon>close</v-icon>
        </v-btn>
      </v-flex>
      <v-dialog
        v-model="showFilterDialog"
      >
        <v-card>
          <v-card-title>
            <h3 class="headline">Filtros</h3>
            <v-spacer></v-spacer>
            <v-btn
              icon
              @click="showFilterDialog = false"
            >
              <v-icon>close</v-icon>
            </v-btn>
            <v-btn
              icon
              @click="submit"
            >
              <v-icon>check</v-icon>
            </v-btn>
          </v-card-title>

          <v-card-text>
            <v-list three-line>
              <v-list-item>
                <v-list-item-content>
                  <v-list-item-title>Tipo de lancamento</v-list-item-title>

                  <v-list-item-subtitle>
                    <v-select
                      placeholder="Todos os lancamentos"
                      chips
                      deletable-chips
                      :items="operations"
                      item-text="description"
                      item-value="value"
                      @change="localFilters.type = $event"
                    ></v-select>
                  </v-list-item-subtitle>
                </v-list-item-content>
              </v-list-item>
              <v-list-item>
                <v-list-item-content>
                  <v-list-item-title>Conta</v-list-item-title>

                  <v-list-item-subtitle>
                    <v-select
                      placeholder="Todas as contas"
                      chips
                      deletable-chips
                      :items="accounts"
                      item-text="description"
                      item-value="id"
                      multiple
                      @change="localFilters.accountsIds = $event"
                    ></v-select>
                  </v-list-item-subtitle>
                </v-list-item-content>
              </v-list-item>
              <v-list-item>
                <v-list-item-content>
                  <v-list-item-title>Categoria</v-list-item-title>

                  <v-list-item-subtitle>
                    <v-select
                      placeholder="Todas as categorias"
                      chips
                      deletable-chips
                      multiple=""
                      :items="categories"
                      item-text="description"
                      item-value="id"
                      @change="localFilters.categoriesIds = $event"
                    ></v-select>
                  </v-list-item-subtitle>
                </v-list-item-content>
              </v-list-item>
            </v-list>
          </v-card-text>
        </v-card>
      </v-dialog>

    </v-layout>
  </div>
</template>

<script>
import AccountsService from '@/modules/dashboard/modules/finances/services/accounts-service'
import CategoriesService from '@/modules/dashboard/modules/finances/services/category-service'
export default {
  name: 'RecordsFilter',
  data () {
    return {
      showFilterDialog: false,
      accounts: [],
      categories: [],
      operations: [
        { description: 'Receita', value: 'CREDIT' },
        { description: 'Despesa', value: 'DEBIT' }
      ],
      subscriptions: [],
      localFilters: {
        type: undefined,
        accountsIds: [],
        categoriesIds: []
      }

    }
  },
  created () {
    this.setItems()
  },
  destroyed () {
    this.subscriptions.forEach(s => s.unsubscribe())
  },
  methods: {
    submit () {
      console.log('submit', this.localFilters)
    },
    setItems () {
      this.subscriptions.push(
        AccountsService.accounts().subscribe(accounts =>
          (this.accounts = accounts))
      )
      this.subscriptions.push(
        CategoriesService.categories().subscribe(categories =>
          (this.categories = categories))
      )
    }
  }
}
</script>

<style>
</style>
