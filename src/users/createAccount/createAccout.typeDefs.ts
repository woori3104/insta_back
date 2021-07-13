import { gql } from "apollo-server";

export default gql`
  type MutationResponse {
    ok: Boolean!
    error: String
  }
  type Mutation {
    createAccount(
      firstname: String!
      lastname: String
      username: String!
      password: String!
      email: String!
      bio: String
      avatarurl: String
    ): MutationResponse!
  }
`;
