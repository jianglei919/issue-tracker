const express = require('express');
require("dotenv").config({path: "api.env"});
const { ApolloServer } = require('apollo-server-express');
const {GraphQLScalarType} = require('graphql');
const {connectToDb, getDbIssues, insertDBIssue} = require('./db.js');
const app = express();

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
        about: getaboutMessage,
        issueList: getIssues,
    },
    Mutation: {
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

const enableCors = (process.env.ENABLE_CORS || 'true') == 'true';
console.log('CORS setting:', enableCors);

const port = process.env.API_PORT;

server.start().then((res) => {
    server.applyMiddleware({ app, path: '/graphql', cors: enableCors });
    connectToDb();
    app.listen(port, function () {
        console.log(`App started on port ${port}`);
    });
});
