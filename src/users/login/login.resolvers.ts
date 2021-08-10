import * as bcrypt from "bcrypt";
import * as jwt from "jsonwebtoken";
import client from "../../client";
import { Resolvers } from "../../types";


const resolvers: Resolvers = {
  Mutation: {
    login: async (_: any, { username, password }: {username:string, password:string}) => {
      console.log("login start");
      const user = await client.user.findFirst({ where: { username } });
      if (!user) {
        return {
          ok: false,
          error: "User not found.",
        };
      }
      const passwordOk:String = await bcrypt.compare(password, user.password);
      if (!passwordOk) {
        return {
          ok: false,
          error: "Incorrect password.",
        };
      }
      const token: String = await jwt.sign({ id: user.id }, process.env.SECRET_KEY);
      console.log("login Error");
      return {
        ok: true,
        token,
      };
    },
  },
};
export default resolvers;