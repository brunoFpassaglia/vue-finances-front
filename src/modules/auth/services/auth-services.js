import apollo, { onLogin } from '../../../plugins/apollo'
import LoginMutation from './../graphql/Login.gql'
import SignupMutation from './../graphql/Signup.gql'
import UserQuery from './../graphql/User.gql'
const login = async (variables) => {
  const response = await apollo.mutate({
    mutation: LoginMutation,
    variables
  })
  const login = response.data.login
  await onLogin(apollo, login.token)
  return login
}

const signup = async (variables) => {
  const response = await apollo.mutate({
    mutation: SignupMutation,
    variables
  })
  const signup = response.data.signup
  await onLogin(apollo, signup.token)
  return signup
}
const user = async (options = {}) => {
  const response = await apollo.query({
    query: UserQuery,
    ...options
  })
  return response.data.user
}
export default {
  login,
  signup,
  user
}
