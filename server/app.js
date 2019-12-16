const express = require('express');
const graphqlHTTP = require('express-graphql');
const mongoose = require('mongoose');
const cors = require('cors');
const schema = require('./schema/schema');


const app = express();


app.use(cors());

// todo - url
const mongoDBConnectionURL = '';


mongoose.connect(
  mongoDBConnectionURL,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  },
  (err) => {
    if (err) {
      console.log(err);
    } else {
      console.log('Connected to mongodb database');
    }
});


app.use('/graphql', graphqlHTTP({
  schema,
  graphiql: true,
}));


app.listen(4000, () => {
  console.log('Server is listening on port 4000');
});
