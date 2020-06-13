<template>
  <v-container fill-height>
    <v-layout justify-center align-center>
      <v-flex xs12 sm6 md4 lg8 xl3>
        <v-card class="elevation-10">
          <v-toolbar color="primary" dark>
            <v-toolbar-title>Login</v-toolbar-title>
          </v-toolbar>

          <v-card-text>
            <v-form>
              <v-text-field
                v-model.trim="$v.user.email.$model"
                :error-messages="emailErrors"
                :success="!$v.user.email.$invalid"
                prepend-icon="email"
                name="email"
                label="Email"
                type="email"
              ></v-text-field>
              <v-text-field
                v-model.trim="$v.user.password.$model"
                :error-messages="passwordErrors"
                prepend-icon="lock"
                name="password"
                label="Senha"
                type="password"
                counter="6"
              ></v-text-field>
            </v-form>

            <v-btn block depressed @click="log">Criar Conta</v-btn>
          </v-card-text>

          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="primary" large :disabled="$v.$invalid" @click="submit">Login</v-btn>
          </v-card-actions>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import { required, email, minLength } from 'vuelidate/lib/validators'
export default {
  name: 'Login',
  data () {
    return {
      user: {
        email: '',
        password: ''
      }
    }
  },
  validations: {
    user: {
      email: {
        required,
        email
      },
      password: {
        required,
        minLength: minLength(6)
      }
    }
  },
  computed: {
    emailErrors () {
      const errors = []
      const email = this.$v.user.email
      if (!email.$dirty) {
        return errors
      }
      !email.required && errors.push('Email obrigatorio')
      !email.email && errors.push('Insira um email valido')
      return errors
    },
    passwordErrors () {
      const errors = []
      const password = this.$v.user.password
      if (!password.$dirty) {
        return errors
      }
      !password.required && errors.push('Senha obrigatorio')
      !password.minLength && errors.push('Insira uma senha valido')
      return errors
    }
  },
  methods: {
    log () {
      console.log('Vuelidate:', this.$v)
    },
    submit () {
      console.log('submitado', this.user)
    }
  }
}
</script>
