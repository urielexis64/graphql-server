import {ApolloServer, gql} from "apollo-server";

const people = [
	{
		name: "John",
		phone: "555-555-5555",
		street: "123 Main St",
		city: "Anytown",
		id: "31312ddd-asdqwe-123123",
	},
	{
		name: "John",
		phone: "555-555-5555",
		street: "123 Main St",
		city: "Anytown",
		id: "31312ddd-asdqwe-123123",
	},
	{
		name: "John",
		phone: "555-555-5555",
		street: "123 Main St",
		city: "Anytown",
		id: "31312ddd-asdqwe-123123",
	},
];

const typeDefs = gql`
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
		allPeople: [Person]!
		findPerson(name: String!): Person
	}
`;

const resolvers = {
	Query: {
		peopleCount: () => people.length,
		allPeople: () => people,
		findPerson: (root, args) => {
			const {name} = args;
			return people.find((person) => person.name === name);
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
