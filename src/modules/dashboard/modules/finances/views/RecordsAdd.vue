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
          <NumericDisplay
            :color="color"
            v-model="$v.record.amount.$model"
          ></NumericDisplay>
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
                  width="290px"
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
                      :color="color"
                      @click="cancelDateDialog"
                    >Cancelar</v-btn>
                    <v-btn
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
                >
                  <v-list-item
                    slot="append-item"
                    ripple
                    @click="add('account')"
                  >
                    <v-list-item-action>
                      <v-icon>add</v-icon>
                    </v-list-item-action>
                    <v-list-item-title>Conta</v-list-item-title>

                  </v-list-item>
                  <v-divider
                    slot="prepend-item"
                    class="mt-2"
                  ></v-divider>
                </v-select>
                <v-select
                  label="category"
                  name="Categoria"
                  prepend-icon="class"
                  :items="categories"
                  item-text="description"
                  item-value="id"
                  v-model="$v.record.categoryId.$model"
                >

                  <v-list-item
                    slot="append-item"
                    ripple
                    @click="add('category')"
                  >
                    <v-list-item-action>
                      <v-icon>add</v-icon>
                    </v-list-item-action>
                    <v-list-item-title>Categoria</v-list-item-title>

                  </v-list-item>
                  <v-divider
                    slot="prepend-item"
                    class="mt-2"
                  ></v-divider>

                </v-select>

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
            :disabled="$v.$invalid"
          >
            <v-icon>check</v-icon>
          </v-btn>

          <v-dialog
            v-model="showAccountCategoryDialog"
            max-width="350px"
          >
            <AccountCategoryAdd v-if="showAccountCategoryDialog" :entity="entity" @close="showAccountCategoryDialog = false"/>
          </v-dialog>
        </v-flex>

      </v-layout>
    </v-container>
  </div>
</template>

<script>
import NumericDisplay from '../components/NumericDisplay.vue'
import AccountCategoryAdd from '../components/AccountCategoryAdd.vue'
import { mapActions } from 'vuex'
import moment from 'moment'
import { decimal, minLength, required } from 'vuelidate/lib/validators'
import AccountsService from '../services/accounts-service'
import CategoriesService from '../services/category-service'
import RecordsService from '../services/records-service'

export default {
  components: {
    NumericDisplay,
    AccountCategoryAdd
  },
  name: 'RecordsAdd',
  data () {
    return {
      accounts: [],
      categories: [],
      record: {
        type: this.$route.query.type.toUpperCase(),
        amount: 0,
        date: moment().format('YYYY-MM-DD'),
        accountId: '',
        categoryId: '',
        description: '',
        tags: '',
        note: ''
      },
      showDateDialog: false,
      dateDialogValue: moment().format('YYYY-MM-DD'),
      showAccountCategoryDialog: false,
      entity: ''
    }
  },
  computed: {
    formattedDate () {
      return moment(this.record.date).format('DD/MM/YYYY')
    },
    color () {
      switch (this.record.type) {
        case 'CREDIT':
          return 'primary'
        case 'DEBIT':
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
    add (entity) {
      this.showAccountCategoryDialog = true
      this.entity = entity
    },
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
    async submit () {
      try {
        const record = await RecordsService.createRecord(this.record)
        console.log('record criado', record)
        this.$router.push('/dashboard/records')
      } catch (e) {
        console.log('ERror creating REcord', e)
      }
    },
    cancelDateDialog () {
      this.showDateDialog = false
      this.dateDialogValue = this.record.date
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
    this.record.categoryId = ''
    this.categories = await CategoriesService.categories({ operation: type })
    next()
  }
}
</script>

<style>
</style>
