const Query = {
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
  users(parent, args, { db }, info) {
    if (!args.query) {
      return db.users;
    }

    return db.users.filter((user) => {
      return user.name.toLowerCase().includes(args.query.toLowerCase());
    });
  },
  posts(parent, args, { db }, info) {
    const query = args.query;
    if (!query) {
      return db.posts;
    }

    return db.posts.filter((post) => {
      return (
        post.title.toLowerCase().includes(query.toLowerCase()) ||
        post.body.toLowerCase().includes(query.toLowerCase())
      );
    });
  },
  comments(parent, args, { db }, info) {
    return db.comments;
  },
};

export { Query as default };
