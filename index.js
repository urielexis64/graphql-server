import {ApolloServer, UserInputError, gql} from "apollo-server";
import {v1 as uuid} from "uuid";
import axios from "axios";

const typeDefs = gql`
	enum YesNo {
		YES
		NO
	}

	type Address {
		street: String!
		city: String!
	}

	type Person {
		name: String!
		phone: String
		address: Address!
		id: ID!
	}

	type Query {
		peopleCount: Int!
		allPeople(phone: YesNo): [Person]!
		findPerson(name: String!): Person
	}

	type Mutation {
		addPerson(name: String!, phone: String, street: String, city: String): Person
		editNumber(name: String!, phone: String): Person
	}
`;

const resolvers = {
	Query: {
		peopleCount: () => people.length,
		allPeople: async (root, args) => {
			const {data: peopleFromRESTAPI} = await axios.get("http://localhost:3000/people");
			if (!args.phone) return peopleFromRESTAPI;
			const byPhone = (person) => (args.phone === "YES" ? person.phone : !person.phone);
			return peopleFromRESTAPI.filter(byPhone);
		},
		findPerson: async (root, args) => {
			const {name} = args;
			const {data: peopleFromRESTAPI} = await axios.get("http://localhost:3000/people");
			return peopleFromRESTAPI.find((person) => person.name === name);
		},
	},

	Mutation: {
		addPerson: (root, args) => {
			if (people.find((person) => person.name === args.name)) {
				throw new UserInputError("Person already exists", {
					invalidArgs: args.name,
				});
			}

			const person = {...args, id: uuid()};
			people.push(person);
			return person;
		},

		editNumber: (root, args) => {
			const person = people.find((person) => person.name === args.name);
			if (!person) {
				throw new UserInputError("Person not found", {
					invalidArgs: args.name,
				});
			}

			person.phone = args.phone;
			return person;
		},
	},

	Person: {
		address: (root) => {
			const {street, city} = root;
			return {street, city};
		},
	},
};

const server = new ApolloServer({typeDefs, resolvers});

server.listen().then(({url}) => {
	console.log(`Server ready at ${url}`);
});
