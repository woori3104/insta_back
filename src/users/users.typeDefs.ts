import { gql } from "apollo-server";

export default gql`
  type user {
    id: Int!
    username: String!
    firstname: String!
    lastname: String
    email: String!
    name: String!
    password: String!
    bio: String
    avatarurl: String
  }
`;
