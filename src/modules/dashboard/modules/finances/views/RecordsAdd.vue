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
                <v-select
                  label="account"
                  name="Conta"
                  prepend-icon="account_balance"
                ></v-select>
                <v-select
                  label="category"
                  name="Categoria"
                  prepend-icon="class"
                ></v-select>

                <v-text-field
                  name="description"
                  label="Descricao"
                  prepend-icon="description"
                  type="text"
                ></v-text-field>
                <v-text-field
                  name="tags"
                  label="Tags"
                  prepend-icon="label"
                  type="text"
                ></v-text-field>
                <v-text-field
                  name="note"
                  label="Observacao"
                  prepend-icon="note"
                  type="text"
                ></v-text-field>
              </v-form>
            </v-card-text>
          </v-card>
        </v-flex>

      </v-layout>
    </v-container>
  </div>
</template>

<script>
import { mapActions } from 'vuex'
import moment from 'moment'
import { decimal, minLength, required } from 'vuelidate/lib/validators'

export default {
  name: 'RecordsAdd',
  data () {
    return {
      record: {
        type: this.$route.query.type,
        amount: 0,
        date: moment().format('YYYY-MM-DD'),
        accountId: '',
        categoryId: '',
        description: '',
        tags: '',
        note: ''
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
    }
  },
  created () {
    this.changeTitle(this.$route.query.type)
  },
  beforeRouteUpdate (to, from, next) {
    const { type } = to.query
    this.changeTitle(type)
    this.record.type = type
    next()
  }
}
</script>

<style>
</style>
