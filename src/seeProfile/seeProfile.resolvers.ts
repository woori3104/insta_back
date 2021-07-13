// import client from "../../client";
import { Resolvers } from "../types";

const resolvers: Resolvers = {
  Query: {
    seeProfile: protectedResolver((_, { username }, { loggedInUser, client }) =>
      client.user.findUnique({
        where: { username },
      })
    ),
  },
};

export default resolvers;

function protectedResolver(arg0: (_: any, { username }: { username: any; }, { loggedInUser, client }: { loggedInUser: any; client: any; }) => any): import("../types").Resolver {
    throw new Error("Function not implemented.");
}
