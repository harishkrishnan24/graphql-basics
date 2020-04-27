import { GraphQLServer } from "graphql-yoga";

//  Type definitions (schema)
const typeDefs = `
    type Query {
        hello: String!
        name: String!
        location: String!
        bio: String!
    }
`;

// Resolvers
const resolvers = {
	Query: {
		hello() {
			return "Hello GraphQL";
		},
		name() {
			return "Harish Krishnan";
		},
		location() {
			return "Coimbatore";
		},
		bio() {
			return "Full Stack Developer";
		},
	},
};

const server = new GraphQLServer({
	typeDefs,
	resolvers,
});

server.start(() => {
	console.log("The server is up!");
});
