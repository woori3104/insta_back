import * as bcrypt from "bcrypt";
import { Resolvers } from "../../../types";

const resolvers: Resolvers = {
  Mutation: {
    createAccount: async (
      _,
      { firstname, lastname, username, email, password, bio, avatarurl },
      { client }
    ) => {
      try {
        console.log("createAccount start");
        let avatar;
        if (avatarurl) {
            avatar = await uploadToS3(avatarurl, username, "avatars");
        }
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
        return client.user.create({
          data: {
            username,
            email,
            firstname,
            lastname,
            password: uglyPassword,
            bio,
            ...(avatar && { avatarURL: avatar }),
          },
        });
      } catch (e) {
        return e;
      }
    },
  },
};
export default resolvers;
function uploadToS3(avatarurl: any, username: any, arg2: string): any {
    throw new Error("Function not implemented.");
}

