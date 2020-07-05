import { from } from 'rxjs'
import { map } from 'rxjs/operators'
import apollo from '@/plugins/apollo'
import CategoriesQuery from './../graphql/Categories.gql'
import CategoryCreate from './../graphql/CategoryCreate.gql'

const categories = ({ operation }) => {
  const queryRef = apollo.watchQuery({
    query: CategoriesQuery,
    variables: { operation: operation ? operation.toUpperCase() : operation }
  })
  return from(queryRef).pipe(map(res => res.data.categories))
}

const categoryCreate = async variables => {
  const response = await apollo.mutate({
    mutation: CategoryCreate,
    variables,
    update: (proxy, { data: { createCategory } }) => {
      try {
        const variables = { operation: createCategory.operation }
        const data = proxy.readQuery({
          query: CategoriesQuery,
          variables
        })
        data.categories = [...data.categories, createCategory]

        proxy.writeQuery({
          query: CategoriesQuery,
          variables,
          data
        })
      } catch (e) {
        console.log('erro na mutation', e)
      }
    }
  })
  return response.data.createCategory
}

export default {
  categories,
  categoryCreate
}
