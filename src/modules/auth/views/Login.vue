<template>
  <v-container fill-height>
    <v-layout justify-center align-center>
      <v-flex xs12 sm6 md4 lg8 xl3>
        <v-card class="elevation-10">
          <v-toolbar color="primary" dark>
            <v-toolbar-title>{{ texts.toolbar }}</v-toolbar-title>
            <v-spacer></v-spacer>
            <v-progress-circular indeterminate color="white" width="2" v-show="isLoading"></v-progress-circular>
          </v-toolbar>

          <v-card-text>
            <v-form>
              <v-text-field
                v-model.trim="$v.user.name.$model"
                :error-messages="nameErrors"
                :success="!$v.user.name.$invalid"
                name="name"
                prepend-icon="mdi-account-box"
                label="Nome"
                type="text"
                v-if="!isLogin"
              ></v-text-field>
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
                counter="5"
              ></v-text-field>
            </v-form>

            <v-btn block depressed @click="isLogin = !isLogin">{{ texts.button }}</v-btn>
          </v-card-text>

          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="primary" large :disabled="$v.$invalid" @click="submit">Login</v-btn>
          </v-card-actions>
          <v-snackbar v-model="showSnackBar" :top="true" :right="true">
            {{ error }}
            <v-btn color="pink" text icon @click="showSnackBar = false">
              <v-icon>close</v-icon>
            </v-btn>
          </v-snackbar>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import { required, email, minLength } from 'vuelidate/lib/validators'
import AuthService from './../services/auth-services'
import { formatError } from './../../../utils'
export default {
  name: 'Login',
  data () {
    return {
      user: {
        name: '',
        email: '',
        password: ''
      },
      isLogin: true,
      isLoading: false,
      showSnackBar: false,
      error: undefined
    }
  },
  validations () {
    const validations = {
      user: {
        email: {
          required,
          email
        },
        password: {
          required,
          minLength: minLength(5)
        }
      }
    }
    if (this.isLogin) { return validations }
    return {
      user: {
        ...validations.user,
        name: {
          required,
          minLength: minLength(3)
        }
      }
    }
  },
  computed: {
    texts () {
      return this.isLogin ? { toolbar: 'Entrar', button: 'Criar conta' } : { toolbar: 'Cadastrar', button: 'Entrar' }
    },
    nameErrors () {
      const errors = []
      const name = this.$v.user.name
      if (!name.$dirty) {
        return errors
      }
      !name.minLength && errors.push('Seu nome deve ter no minimo 3 caracteres')
      return errors
    },
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
    async submit () {
      this.isLoading = true
      // if isLogin is active, calls login mutation, else calls signup
      try {
        this.isLogin ? await AuthService.login(this.user) : await AuthService.signup(this.user)
        this.$router.push(this.$route.query.redirect || '/dashboard')
      } catch (error) {
        this.error = formatError(error.message)
        this.showSnackBar = true
      } finally {
        this.isLoading = false
      }
    }
  }
}
</script>
