const express = require('express');
const { ApolloServer } = require('apollo-server-express');
const {connectToDb, getDbIssues, insertDBIssue} = require('./db.js');
const app = express();
app.use(express.static('public'));
app.listen(3000, function () {
    console.log('App started on port 3000');
});

app.get("/", (req, res) => { res.sendFile(Path.resolve(__dirname, "index.html")) });

const mySchema = `
    scalar GraphQLDate
    type Issue {
      id: Int!
      title: String!
      status: String!
      owner: String
      effort: Int
      created: GraphQLDate
      due: GraphQLDate
    }


    input IssueInputs {
      title: String
      status: String
      owner: String
      effort: Int
      created: String
      due: String
    }

    type Mutation{
      setAboutMessage(message: String!): String
      addIssue(issue: IssueInputs!): Issue
    }


    ##### Top level declarations
    type Query {
      about: String!
      issueList: [Issue!]!
    }`;



let msg = 'Issue Tracker API v1.0';
const resolvers = {
    Query: {
        // about: () => 'Issue Tracker API v1.0',
        // issueList: () => {
        //     return issues;
        // },
        about: getaboutMessage,
        issueList: getIssues,
    },
    Mutation: {
        // setAboutMessage: (_, {message}) => {
        //     aboutMessage = message;
        //     return aboutMessage;
        // },

        setAboutMessage,
        addIssue,
    },
};

function getaboutMessage() {
    return msg;
}

async function getIssues() {
    return await getDbIssues(); // InitialIssues;
}

function setAboutMessage(_, { message }) {
    msg = message;
    return msg;
}

async function addIssue(_, { issue }) {
    // InitialIssues.push(issue);
    const newIssue = await insertDBIssue(issue);
    return newIssue;
}

const server = new ApolloServer({
    typeDefs: mySchema,
    resolvers,
});

server.start().then(() => {
    server.applyMiddleware({ app, path: '/graphql' });
    // app.listen(4000, function () {
    //     console.log('App started on port 4000');
    // });
    
    connectToDb();
});
