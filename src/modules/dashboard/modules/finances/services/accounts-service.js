import apollo from '@/plugins/apollo'
import { from } from 'rxjs'
import { map } from 'rxjs/operators'
import AccountsQuery from './../graphql/Accounts.gql'
import AccountCreate from './../graphql/AccountCreate.gql'

const accounts = () => {
  const queryRef = apollo.watchQuery({
    query: AccountsQuery
  })
  return from(queryRef).pipe(map(res => res.data.accounts))
}

const accountCreate = async variables => {
  const response = await apollo.mutate({
    mutation: AccountCreate,
    variables,
    update: (proxy, { data: { createAccount } }) => {
      try {
        const data = proxy.readQuery({
          query: AccountsQuery
        })
        data.accounts = [...data.accounts, createAccount]

        proxy.writeQuery({
          query: AccountsQuery,
          data
        })
      } catch (e) {
        console.log('erro na mutation', e)
      }
    }
  })
  return response.data.createAccount
}

export default {
  accounts,
  accountCreate
}
