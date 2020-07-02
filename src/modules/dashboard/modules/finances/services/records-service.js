import apollo from '../../../../../plugins/apollo'
import moment from 'moment'

import RecordsQuery from '../graphql/Records.gql'
import TotalBalanceQuery from '../graphql/TotalBalance.gql'
import RecordCreateMutation from '../graphql/RecordCreate.gql'

const records = async variables => {
  const response = await apollo.query({
    query: RecordsQuery,
    variables
  })
  return response.data.records
}

const createRecord = async variables => {
  const response = await apollo.mutate({
    mutation: RecordCreateMutation,
    variables
  })
  return response.data.createRecord
}

const totalBalance = async () => {
  const response = await apollo.query({
    query: TotalBalanceQuery,
    variables: {
      date: moment().format('YYYY-MM-DD')
    }
  })
  return response.data.totalBalance
}
export default {
  records,
  createRecord,
  totalBalance
}
