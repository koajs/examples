import { GraphQLObjectType, GraphQLString } from 'graphql';
import mongoose from 'mongoose';
const personGraphQLType =  require('./personType');
const Person = mongoose.model('Person');

const Mutation = new GraphQLObjectType({
  name: 'Mutation',
  fields: {
    addPerson: {
      type: personGraphQLType,
      args: {
        name: { type: GraphQLString },
        work: { type: GraphQLString },
        nationality: { type: GraphQLString }
      },
      resolve(parent, args) {
        const newPerson = new Person({
          name: args.name,
          work: args.work,
          nationality: args.nationality
        })

        return newPerson.save();
      }
    },
    updatePerson: {
      type: personGraphQLType,
      args: {
        id: { type: GraphQLString },
        name: { type: GraphQLString },
        work: { type: GraphQLString },
        nationality: { type: GraphQLString }
      },
      resolve(parent, args) {
        return Person.findById(args.id)
          .then(person => {
            person.name = args.name
            person.work = args.work,
            person.nationality = nationality

            return person.save()

          })
          .then(updatedPerson => updatedPerson)
          .catch(err => console.log(err))
      }
    },
    removePerson: {
      type: personGraphQLType,
      args: {
        id: { type: GraphQLString }
      },
      resolve(parent, args) {
        return Person.findOneAndDelete(args.id).exec()
          .then(person => person.remove())
          .then(deletedPerson => deletedPerson)
          .catch(err => console.log(err))
      }
    }
  }
});

export default Mutation;