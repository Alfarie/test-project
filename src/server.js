import {ApolloServer, gql} from 'apollo-server'
import {printSchema} from 'graphql'

const books = [
  {
    title: 'Harry Potter and the Chamber of Secrets',
    author: 'J.K. Rowling',
  },
  {
    title: 'Jurassic Park',
    author: 'Michael Crichton',
  },
]

const typeDefs = gql`
    type Book {
        title: String
        author: String
    }

    type Query {
        books: [Book]
    }
  
    extend type Book {
        snid: ID
    }
`

const resolvers = {
  Query: {
    books: (obj, args, context, {schema}) => {
      console.log(printSchema(schema))
      return books
    },
  },
}

const server = new ApolloServer({
  typeDefs,
  resolvers,
})

server.listen().then(({ url }) => {
  console.log(`🚀  Server ready at ${url}`)
})
