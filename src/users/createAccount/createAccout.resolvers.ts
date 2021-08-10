import * as bcrypt from "bcrypt";
import client from "../../client";
import { Resolvers } from "../../types";

const resolvers: Resolvers = {
  Mutation: {
    createAccount: async (
      _: any,
      { firstname, username, email, password, bio, avatarurl }: 
      { firstname:string, username:string, email:string, password:string, bio:string, avatarurl:any}
    ) => {
      console.log("createAccount start");
      try {
        //check if username or email are already on DB.
        const existingUser = await client.user.findFirst({
          where: {
            OR: [
              {
                username,
              },
              {
                email,
              },
            ],
          },
        });
        if (existingUser) {
          throw new Error("This username/password is already taken.");
        }
        // hash password
        const uglyPassword = await bcrypt.hash(password, 10);
        await client.user.create({
          data: {
            username,
            email,
            firstname,
            password: uglyPassword,
            bio,
          },
        });
        console.log("createAccount End")
        return {ok:true};
      } catch (error) {
        console.log(error);
        return { ok: false, error: "Could not create account." };
      }
    },
  },
};

export default resolvers;