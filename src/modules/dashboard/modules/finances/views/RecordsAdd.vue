<template>
  <div>
    <v-container text-center>
      <v-layout
        row
        wrap
      >
        <v-flex
          xs12
          sm6
          md4
          lg4
        >
          <p>amount</p>
        </v-flex>
        <v-flex
          xs12
          sm6
          md8
          lg8
        >
          <v-card>
            <v-card-text>
              <v-form>

                <v-dialog
                  ref="dateDialog"
                  :return-value.sync="record.date"
                  v-model="showDateDialog"
                  persistent
                  lazy
                  width="290px"
                  full-width
                >

                  <template v-slot:activator="{ on }">
                    <v-text-field
                      name="date"
                      label="Vencimento"
                      prepend-icon="event"
                      type="text"
                      readonly
                      :value="formattedDate"
                      v-on="on"
                    ></v-text-field>
                  </template>

                  <v-date-picker
                    :color="color"
                    locale="pt-br"
                    scrollable
                    v-model="dateDialogValue"
                  >
                    <v-spacer></v-spacer>
                    <v-btn
                      flat
                      :color="color"
                      @click="cancelDateDialog"
                    >Cancelar</v-btn>
                    <v-btn
                      flat
                      :color="color"
                      @click="$refs.dateDialog.save(dateDialogValue)"
                    >Ok</v-btn>
                  </v-date-picker>

                </v-dialog>

                <v-select
                  label="account"
                  name="Conta"
                  prepend-icon="account_balance"
                  :items="accounts"
                  item-text="description"
                  item-value="id"
                  v-model="$v.record.accountId.$model"
                ></v-select>
                <v-select
                  label="category"
                  name="Categoria"
                  prepend-icon="class"
                  :items="categories"
                  item-text="description"
                  item-value="id"
                  v-model="$v.record.categoryId.$model"
                ></v-select>

                <v-text-field
                  name="description"
                  label="Descricao"
                  prepend-icon="description"
                  type="text"
                  v-model="$v.record.description.$model"
                ></v-text-field>
                <v-text-field
                  name="tags"
                  label="Tags"
                  prepend-icon="label"
                  type="text"
                  v-model="record.tags"
                ></v-text-field>
                <v-text-field
                  name="note"
                  label="Observacao"
                  prepend-icon="note"
                  type="text"
                  v-model="record.note"
                ></v-text-field>
              </v-form>
            </v-card-text>
          </v-card>
          <v-btn
            color="secondary"
            large
            fab
            class="mt-4"
            @click="$router.back()"
          >
            <v-icon>close</v-icon>
          </v-btn>
          <v-btn
            :color="color"
            large
            fab
            class="mt-4"
            @click="submit"
          >
            <v-icon>check</v-icon>
          </v-btn>
        </v-flex>

      </v-layout>
    </v-container>
  </div>
</template>

<script>
import { mapActions } from 'vuex'
import moment from 'moment'
import { decimal, minLength, required } from 'vuelidate/lib/validators'
import AccountsService from '../services/accounts-service'
import CategoriesService from '../services/category-service'

export default {
  name: 'RecordsAdd',
  data () {
    return {
      accounts: [],
      categories: [],
      record: {
        type: this.$route.query.type,
        amount: 0,
        date: moment().format('YYYY-MM-DD'),
        accountId: '',
        categoryId: '',
        description: '',
        tags: '',
        note: ''
      },
      showDateDialog: false,
      dateDialogValue: moment().format('YYYY-MM-DD')
    }
  },
  computed: {
    formattedDate () {
      return moment(this.record.date).format('DD/MM/YYYY')
    },
    color () {
      switch (this.record.type) {
        case 'credit':
          return 'primary'
        case 'debit':
          return 'error'
        default:
          return 'blue'
      }
    }
  },
  validations: {
    record: {
      type: { required },
      date: { required },
      accountId: { required },
      categoryId: { required },
      description: { required, minLength: minLength(6) },
      amount: {
        required,
        decimal,
        different: (value) =>
          value !== 0
      }
    }
  },
  methods: {
    ...mapActions([
      'setTitle' // also supports payload `this.nameOfAction(amount)`
    ]),
    changeTitle (recordType) {
      let title
      switch (recordType) {
        case 'credit':
          title = 'Novo credito'
          break
        case 'debit':
          title = 'Nova despesa'
          break
        default:
          title = 'Novo lancamento'
          break
      }
      this.setTitle({ title })
    },
    submit () {
      return 0
    }
  },
  async created () {
    this.changeTitle(this.$route.query.type)
    this.accounts = await AccountsService.accounts()
    this.categories = await CategoriesService.categories({ operation: this.$route.query.type })
  },
  async beforeRouteUpdate (to, from, next) {
    const { type } = to.query
    this.changeTitle(type)
    this.record.type = type
    this.categories = await CategoriesService.categories({ operation: type })
    next()
  }
}
</script>

<style>
</style>
