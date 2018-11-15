const express = require('express');
const { ApolloServer, gql } = require('apollo-server-express');

require("dotenv").load();
const db = require("./config/db");

const {
  getContactById,
  getContactRoles,
  getContacts,
  getPositionLevels,
  getJobPostings
} = require('./resolvers/query');
const {
  addContact,
  addContactRole,
  addJobPosting,
  addPositionLevel,
  addUser
} = require('./resolvers/mutation');

// Construct a schema, using GraphQL schema language
const typeDefs = gql`
  
  input ContactInput {
    name: String
    phoneNumber: String       # Create a PhoneNumber scalar
    email: String             # Create an Email scalar
  }

  input JobPostInput {
    companyName: String!
    postLink: String!        # URL
    title: String!
    description: String
    requirement: String
    salaryRangeStart: Int
    salaryRangeEnd: Int
    positionLevelId: Int   # DB pkey for position level
  }

  input InteractionInput {
    appId: Int!           # DB IDs
    contactId: Int!
    contactTypeId: Int!
    statusId: Int!
    description: String
    followUpDate: String  # Date Type
  }

  type User {
    userId: Int
    name: String
    username: String
    phoneNumber: String
    email: String
    position: String
  }

  type Contact {
    referenceId: Int          # DB pkey; used for reference
    name: String
    phoneNumber: String       # Create a PhoneNumber scalar
    email: String             # Create an Email scalar
    role: String              # Should be an enum later
  }

  type ContactRole {
    roleId: Int
    role: String
  }

  type PositionLevel {
    positionId: Int
    position: String
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
    companyName: String
    postLink: String         # URL
    title: String
    description: String
    requirement: String
    salaryRangeStart: Int
    salaryRangeEnd: Int
    positionLevel: String    # 'junior', 'senior', etc.
  }

  type JobApplication {
    id: Int
    dateApplied: String     # Date
    referral: Contact
    jobPosting: JobPosting!
    user: User
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
    getContactById(id: Int): Contact
    getContactRoles: [ContactRole]
    getContacts: [Contact]
    getPositionLevels: [PositionLevel]
    getJobPostings: [JobPosting]
    # getJobAppStatus(jobAppId: Int): JobAppStatus
  }

  type Mutation {
    addContactRole(role: String): ContactRole
    addContact(name: String, phoneNumber: String, email: String, roleId: Int): Contact
    addJobPosting(jobPost: JobPostInput): JobPosting
    addPositionLevel(position: String): PositionLevel
    addUser(name: String, username: String, phoneNumber: String, email: String, positionId: Int): User 
  #   addReferral(name: String, phoneNumber: String, email: String): Contact
  #   addJobApplication(postingId: Int!, time: String!, referralId: Int): JobApplication     # time should be type Date or Timestamp
  #   addInteraction(details: InteractionInput): Interaction
  }
`;

// Provide resolver functions for your schema fields
const resolvers = {
  Query: {
    getContactById,
    getContacts,
    getContactRoles,
    getPositionLevels,
    getJobPostings
  },
  Mutation: {
    addContactRole,
    addContact,
    addJobPosting,
    addPositionLevel,
    addUser
  }
};

const server = new ApolloServer({ typeDefs, resolvers });

const app = express();
server.applyMiddleware({ app });

app.listen({ port: 4000 }, () =>
  console.log(`🚀 Server ready at http://localhost:4000${server.graphqlPath}`)
);