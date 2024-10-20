// index.js
require('dotenv').config();

const express = require('express');
const app = express();

const PORT = process.env.PORT || 3000;


const { graphqlHTTP } = require('express-graphql');
const { buildSchema } = require('graphql');

// Define the schema
const schema1 = buildSchema(`
  type Query {
    hello: String
  }
`);

const schema = buildSchema(`
    type User {
      id: ID
      name: String
      email: String
    }
  
    type Query {
      user(id: ID!): User
    }
  `);


// Define the resolvers
// const root = {
//     hello: () => {
//         return 'Hello, world!';
//     },
// };


const users = [
    { id: '1', name: 'John Doe', email: 'john@example.com' },
    { id: '2', name: 'Jane Doe', email: 'jane@example.com' },
];



const root = {
    user: ({ id }) => {
        return users.find(user => user.id === id);
    },
    createUser: ({ input }) => {
        const id = `${users.length + 1}`;
        const newUser = { id, ...input };
        users.push(newUser);
        return newUser;
    },
};



app.use('/graphql', graphqlHTTP({
    schema: schema,
    rootValue: root,
    graphiql: true, // Enable GraphiQL UI
}));

app.get('/', (req, res) => {
    res.send('Hello, World!');
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
