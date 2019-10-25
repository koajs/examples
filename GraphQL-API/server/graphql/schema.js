import { GraphQLSchema, GraphQLObjectType, GraphQLString} from 'graphql';
const personGraphQLType =  require('./personType');
import mongoose from 'mongoose';
let Person = mongoose.model('Person');
import Mutations from './mutations';
const RootQuery = new GraphQLObjectType({
  name: 'RootQueryType',
  fields: {
    person: {
      type: personGraphQLType,
      args: { id: { type: GraphQLString }},
      resolve(parent, args) {
        return Person.findById(args.id)
      }
    }
  }
})

module.exports = new GraphQLSchema({
  query: RootQuery,
  mutation: Mutations
});