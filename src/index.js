import { GraphQLServer } from "graphql-yoga";

// Scalar Types - String, Int, Float, Boolean, ID

// Demo user data
const users = [
	{
		id: "1",
		name: "Harish",
		email: "harish@example.com",
		age: 27,
	},
	{
		id: "2",
		name: "Lebron",
		email: "lebron@example.com",
	},
	{
		id: "3",
		name: "Kevin",
		email: "kevin@example.com",
	},
];

const posts = [
	{
		id: "1",
		title: "NBA Cancelled",
		body: "NBA cancelled indefinetely because of corona virus",
		published: true,
	},
	{
		id: "2",
		title: "Formula one restart date",
		body: "Formula one to be restarted in the end of july!",
		published: true,
	},
	{
		id: "3",
		title: "IPL postponed indefinetely",
		body: "IPL postponed until further notice",
		published: true,
	},
];

//  Type definitions (schema)
const typeDefs = `
    type Query {
        me: User!
		post: Post!
		users(query: String): [User!]!
		posts(query: String): [Post!]!
    }

    type User {
        id: ID!
        name: String!
        email: String!
        age: Int
    }

    type Post {
        id: ID!
        title: String!
        body: String!
        published: Boolean!
    }
`;

// Resolvers
const resolvers = {
	Query: {
		me() {
			return {
				id: "123098",
				name: "Mike",
				email: "mike@example.com",
				age: 28,
			};
		},
		post() {
			return {
				id: "AK49",
				title: "asdasd",
				body: "sssss",
				published: true,
			};
		},
		users(parent, args, ctx, info) {
			if (!args.query) {
				return users;
			}

			return users.filter((user) => {
				return user.name.toLowerCase().includes(args.query.toLowerCase());
			});
		},
		posts(parent, args, ctx, info) {
			const query = args.query;
			if (!query) {
				return posts;
			}

			return posts.filter((post) => {
				return (
					post.title.toLowerCase().includes(query.toLowerCase()) ||
					post.body.toLowerCase().includes(query.toLowerCase())
				);
			});
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
