const express = require('express');
const { ApolloServer, gql } = require('apollo-server-express');

require("dotenv").load();
require("./config/db");


// Construct a schema, using GraphQL schema language
const typeDefs = gql`
  
  input ContactInput {
    name: String
    phoneNumber: String       # Create a PhoneNumber scalar
    email: String             # Create an Email scalar
  }

  input JobPostInput {
    company_name: String!
    post_link: String!        # URL
    title: String!
    description: String
    requirement: String
    salary_range_start: Int
    salary_range_end: Int
    position_level_id: Int   # DB pkey for position level
  }

  input InteractionInput {
    appId: Int!           # DB IDs
    contactId: Int!
    contactTypeId: Int!
    statusId: Int!
    description: String
    followUpDate: String  # Date Type
  }

  type Contact {
    referenceId: Int          # DB pkey; used for reference
    name: String
    phoneNumber: String       # Create a PhoneNumber scalar
    email: String             # Create an Email scalar
  }

  type Interaction {
    appId: Int
    contact: Contact
    contactType: String     # ex. phone call, text, etc.
    description: String
    status: String          # interviewing, offer, accepted
    followUpDate: String    # Date
  }

  type JobPosting {
    id: Int
    company_name: String
    post_link: String         # URL
    title: String
    description: String
    requirement: String
    salary_range_start: Int
    salary_range_end: Int
    position_level: String    # 'junior', 'senior', etc.
  }

  type JobApplication {
    id: Int
    dateApplied: String     # Date
    referral: Contact
    jobPosting: JobPosting!
  }

  type JobAppStatus {
    jobApplication: JobApplication
    status: String
    followUpDate: String            # Date
    offer: Int                      # Will be null until it is given
    contacts: [Contact]
    interactions: [Interaction] 
  }

  type Query {
    hello: String
  }

  # type Mutation {
  #   addReferral(name: String, phoneNumber: String, email: String): Contact
  #   addContact(name: String, phoneNumber: String, email: String): Contact
  #   addJobPosting(jobPost: JobPostInput): JobPosting
  #   addJobApplication(postingId: Int!, time: String!, referralId: Int): JobApplication     # time should be type Date or Timestamp
  #   addInteraction(details: InteractionInput): Interaction
  # }
`;

// Provide resolver functions for your schema fields
const resolvers = {
  Query: {
    hello: () => 'Hello world!',
  },
  // Mutation: {
  //   addJobPost: (_, args) => args
  // }
};

const server = new ApolloServer({ typeDefs, resolvers });

const app = express();
server.applyMiddleware({ app });

app.listen({ port: 4000 }, () =>
  console.log(`🚀 Server ready at http://localhost:4000${server.graphqlPath}`)
);