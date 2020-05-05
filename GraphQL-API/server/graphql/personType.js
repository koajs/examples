import { GraphQLObjectType, GraphQLString } from 'graphql';

const PersonType = new GraphQLObjectType({
  name: 'Person',
  fields: () => ({
    id: { type: GraphQLString },
    name: { type: GraphQLString },
    work: { type: GraphQLString },
    nationality: { type: GraphQLString }
  })
});

module.exports = PersonType;