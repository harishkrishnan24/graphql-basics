import { GraphQLServer } from "graphql-yoga";
import uuidv4 from "uuid/v4";

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
    author: "1",
  },
  {
    id: "2",
    title: "Formula one restart date",
    body: "Formula one to be restarted in the end of july!",
    published: true,
    author: "2",
  },
  {
    id: "3",
    title: "IPL postponed indefinetely",
    body: "IPL postponed until further notice",
    published: true,
    author: "3",
  },
];

const comments = [
  {
    id: "1",
    text: "Really! Its been a quarter since this has happened",
    author: "1",
    post: "1",
  },
  {
    id: "2",
    text: "Was waiting for this whole year",
    author: "2",
    post: "2",
  },
  {
    id: "3",
    text: "What will I watch without cricket!",
    author: "3",
    post: "3",
  },
];

//  Type definitions (schema)
const typeDefs = `
    type Query {
        me: User!
		post: Post!
		users(query: String): [User!]!
		posts(query: String): [Post!]!
		comments: [Comment!]!
	}
	
	type Mutation {
		createUser(name: String!, email: String!, age: Int): User!
		createPost(title: String!, body: String!, published: Boolean!, author: ID!): Post!
		createComment(text: String!, author: ID!, post: ID!): Comment!
	}

    type User {
        id: ID!
        name: String!
        email: String!
		age: Int
		posts: [Post!]!
		comments: [Comment!]!
    }

    type Post {
        id: ID!
        title: String!
        body: String!
		published: Boolean!
		author: User!
		comments: [Comment!]!
	}
	
	type Comment {
		id: ID!
		text: String!
		author: User!
		post: Post!
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
    comments(parent, args, ctx, info) {
      return comments;
    },
  },
  Mutation: {
    createUser(parent, args, ctx, info) {
      const emailTaken = users.some((user) => user.email === args.email);
      if (emailTaken) {
        throw new Error("Email taken.");
      }

      const user = {
        id: uuidv4(),
        email: args.email,
        name: args.name,
        age: args.age,
      };

      users.push(user);

      return user;
    },
    createPost(parent, args, ctx, info) {
      const userExists = users.some((user) => user.id === args.author);
      if (!userExists) {
        throw new Error("User does not exists.");
      }

      const post = {
        id: uuidv4(),
        title: args.title,
        body: args.body,
        published: args.published,
        author: args.author,
      };

      posts.push(post);

      return post;
    },
    createComment(parent, args, ctx, info) {
      const userExists = users.some((user) => user.id === args.author);
      const postExists = posts.some(
        (post) => post.id === args.post && post.published
      );
      if (!userExists || !postExists) {
        throw new Error("Unable to find user and post.");
      }

      const comment = {
        id: uuidv4(),
        text: args.text,
        author: args.author,
        post: args.post,
      };

      comments.push(comment);

      return comment;
    },
  },
  Post: {
    author(parent, args, ctx, info) {
      return users.find((user) => user.id === parent.author);
    },
    comments(parent, args, ctx, info) {
      return comments.filter((comment) => comment.post === parent.id);
    },
  },
  User: {
    posts(parent, args, ctx, info) {
      return posts.filter((post) => post.author === parent.id);
    },
    comments(parent, args, ctx, info) {
      return comments.filter((comment) => comment.author === parent.id);
    },
  },
  Comment: {
    author(parent, args, ctx, info) {
      return users.find((user) => user.id === parent.author);
    },
    post(parent, args, ctx, info) {
      return posts.find((post) => post.id === parent.post);
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
