const express = require('express');
const { ApolloServer, gql } = require('apollo-server-express');

require("dotenv").load();
require("./config/db");

const { gqlGetContactById, gqlGetInteractionById } = require('./resolvers/dbHelpers')

const {
  demo,
  getContactById,
  getContactRoles,
  getContacts,
  getPositionLevels,
  getJobPostings,
  getAllUsers,
  getStatuses,
  getJobApplicationById
} = require('./resolvers/query');
const {
  addContact,
  addContactRole,
  addContactType,
  addJobPosting,
  addPositionLevel,
  addUser,
  addStatus,
  addReferral,
  addJobApplication,

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

  """
  *ContactType* refers to "Phone", "Email", "Text", etc.
  """
  type ContactType {
    typeId: Int
    type: String
  }

  type PositionLevel {
    positionId: Int
    position: String
  }

  type Interaction {
    interactionId: Int
    appId: Int
    contact: Contact
    contactType: String     # ex. phone call, text, etc.
    description: String
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
    contacts: [Contact]
    interactions: [Interaction] 
    status: String                  # based on the status table
    offer: Int                      # Will be null until it is given
  }

  
  type Status {
    statusId: Int
    status: String
  }
  
  type Query {
    demo: String
    getContactById(id: Int): Contact
    getContactRoles: [ContactRole]
    getContacts: [Contact]
    getPositionLevels: [PositionLevel]
    getJobPostings: [JobPosting]
    getAllUsers: [User]
    getStatuses: [Status]
    getJobApplicationById(jobAppId: Int): JobApplication
  }

  type Mutation {
    addContactRole(role: String): ContactRole
    addContact(name: String, phoneNumber: String, email: String, roleId: Int): Contact
    addContactType(type: String): ContactType
    addJobPosting(jobPost: JobPostInput): JobPosting
    addPositionLevel(position: String): PositionLevel
    addUser(name: String, username: String, phoneNumber: String, email: String, positionId: Int): User
    addStatus(newStatus: String): Status
    addReferral(name: String, phoneNumber: String, email: String, jobAppId: Int): Contact
    addJobApplication(userId: Int!, postingId: Int!, time: String!, referralId: Int): JobApplication     # time should be type Date or Timestamp
    addInteraction(details: InteractionInput): Interaction
  }
`;

// Provide resolver functions for your schema fields
const resolvers = {
  Query: {
    demo,
    getContactById,
    getContacts,
    getContactRoles,
    getPositionLevels,
    getJobPostings,
    getAllUsers,
    getStatuses,
    getJobApplicationById
  },
  Interaction: {
    contact: obj => {
      console.log("OBJ HERE!", obj)
      return gqlGetContactById(obj.contact)
    }
  },
  JobApplication: {
    contacts: obj => {
      let contacts = obj.contacts.map(contactId => gqlGetContactById(contactId))
      return Promise.all(contacts);
    },
    interactions: obj => { 
      let interactions = obj.interactions.map(interactionId => gqlGetInteractionById(interactionId));
      return Promise.all(interactions);
    }
  },
  Mutation: {
    addContactRole,
    addContact,
    addContactType,
    addJobPosting,
    addPositionLevel,
    addUser,
    addStatus,
    addReferral,
    addJobApplication,
  }
};

const server = new ApolloServer({ typeDefs, resolvers });

const app = express();
server.applyMiddleware({ app });

app.listen({ port: 4000 }, () =>
  console.log(`🚀 Server ready at http://localhost:4000${server.graphqlPath}`)
);