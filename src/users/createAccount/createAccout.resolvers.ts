import * as bcrypt from "bcrypt";
import client from "../../client";
import { uploadToS3 } from "../../shared/shared.utils";

export default {
  Mutation: {
    createAccount: async (
      _: any,
      { firstname, lastname, username, email, password, bio, avatarurl }: 
      { firstname:string, lastname:string, username:string, email:string, password:string, bio:string, avatarurl:any}
    ) => {
      try {
        console.log("createAccount start");
        let avatar: string;
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
        await client.user.create({
          data: {
            username,
            email,
            firstname,
            lastname,
            password: uglyPassword,
            bio,
            ...(avatar && { avatarurl: avatar }),
          },
        });
        return {ok:true};
      } catch (error) {
        console.log(error);
        return { ok: false, error: "Could not create account." };
      }
    },
  },
};

