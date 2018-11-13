const express = require('express');
const { ApolloServer, gql } = require('apollo-server-express');

// Construct a schema, using GraphQL schema language
const typeDefs = gql`
  type Query {
    hello: String
  }

  input ContactInput {
    name: String
    phoneNumber: String       # Create a PhoneNumber scalar
    email: String             # Create an Email scalar
  }

  input JobPostInput {
    companyName: String
    jobPosting: String        # URL
    jobTitle: String
    jobDescription: String
    jobRequirement: String    
    dateApplied: String       # Date
    followUpDate: String      # Date
    lastContact: String       # Date
    salaryOffered: Int
  }

  type Contact {
    name: String
    phoneNumber: String       # Create a PhoneNumber scalar
    email: String             # Create an Email scalar
  }

  type JobDetails {
    companyName: String
    jobPosting: String        # URL
    jobTitle: String
    jobDescription: String
    jobRequirement: String    
    dateApplied: String       # Date
    followUpDate: String      # Date
    lastContact: String       # Date
    salaryOffered: Int
    referral: Contact
    companyContact: Contact
  }

  type Mutation {
    addJobPost(details: JobPostInput!, referral: ContactInput, companyContact: ContactInput): JobDetails
  }
`;

// Provide resolver functions for your schema fields
const resolvers = {
  Query: {
    hello: () => 'Hello world!',
  },
  Mutation: {
    addJobPost: (_, args) => args
  }
};

const server = new ApolloServer({ typeDefs, resolvers });

const app = express();
server.applyMiddleware({ app });

app.listen({ port: 4000 }, () =>
  console.log(`🚀 Server ready at http://localhost:4000${server.graphqlPath}`)
);