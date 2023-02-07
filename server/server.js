const express = require('express');
const path = require('path');
// requiring apollo server
const { ApolloServer } = require('apollo-server-express');
const db = require('./config/connection');
// need schemas for graphql
const { typeDefs, resolvers } = require ('./schemas')
// routes aren't here anymore, they're in the App.js
// const routes = require('./routes');


const app = express();
const PORT = process.env.PORT || 3001;
// create new instance of apollo server
const server = new ApolloServer({
  typeDefs,
  resolvers,
});

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// if we're in production, serve client/build as static assets
if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '../client/build/index.html')));
}

// no need for a separate routes file
// app.use(routes);

app.get('/', (req, res) => {
  res.sendFile(path.join(_dirname, '../client/build/index.html'))
});

//create new instance of apollo server with graphql schema
const startApolloServer = async (typeDefs, resolvers) => {
  await server.start();
  server.applyMiddleware({ app });
  
  db.once('open', () => {
    app.listen(PORT, () => {
      console.log(`API server running on port ${PORT}!`);
      console.log(`Use GraphQL at http://localhost:${PORT}${server.graphqlPath}`);
    })
  })
  };

// changed this and added it to the startApolloServer function
// db.once('open', () => {
//   app.listen(PORT, () => console.log(`🌍 Now listening on localhost:${PORT}`));
// });

// start the server
startApolloServer(typeDefs, resolvers);