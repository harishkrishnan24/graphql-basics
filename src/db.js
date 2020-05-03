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

const db = {
  users,
  posts,
  comments,
};

export { db as default };
