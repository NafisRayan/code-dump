import { connect } from "@/lib/mongodb";
import User from "@/models/user";
import NextAuth from "next-auth/next";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import bcrypt from "bcryptjs";
import Student from "@/models/student";
import Parent from "@/models/parent";
import { setCookie } from 'cookies-next';

export const authOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {},
      async authorize(credentials) {
        const { email, password } = credentials;

        try {
          await connect();
          
          const student = await Student.findOne({ "contactInfo.email": email });
          console.log(student);
          if (!student) {
            const parent = await Parent.findOne({ "contactInfo.email": email });
            if (!parent) {
              throw new Error("No user found");
            }
            const matchedPassword = await bcrypt.compare(
              password,
              parent.password
            );
            console.log(parent)
            if (!matchedPassword) {
              throw new Error("Invalid password");
            }
            return parent;
          }
          console.log(password);
          console.log(student.password);
          // const matchedPassword = await bcrypt.compare(
          //   password,
          //   student.password
          // );
          // if (!matchedPassword) {
          //   throw new Error("Invalid password");
          // }
          return student;
        } catch (error) {
          throw new Error(error.message);
        }

        // try {
        //   await connect();
        //   const user = await User.findOne({ email });

        //   if (!user) {
        //     throw new Error("No user found");
        //   }

        //   const matchedPassword = await bcrypt.compare(password, user.password);
        //   if (!matchedPassword) {
        //     throw new Error("Invalid password");
        //   }

        //   return user;
        // } catch (error) {
        //   throw new Error(error.message);
        // }
      },
    }),
    // GoogleProvider({
    //   clientId: process.env.GOOGLE_CLIENT_ID,
    //   clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    // }),
  ],
  pages: {
    signIn: "/login",
  },
  callbacks: {
    // async signIn(user, account, profile) {
    //   const credentials = user.credentials;
    //   if (user.account.provider === "credentials") {
    //     return true;
    //   }
    //   if (user.account.provider === "google") {
    //     const { email, name, image } = user.user;

    //     await connect();
    //     const existingUser = await User.findOne({
    //       email,
    //     });

    //     if (!existingUser) {
    //       try {
    //         const res = await fetch(`${process.env.NEXTAUTH_URL}/api/providerToDatabase`, {
    //           method: "POST",
    //           headers: {
    //             "Content-Type": "application/json",
    //           },
    //           body: JSON.stringify({ email, name, image }),
    //         });

    //         if (res.ok) {
    //           return true;
    //         }
    //       } catch (error) {
    //         console.log("first error", error);
    //         return false;
    //       }
    //     } else {
    //       return true;
    //     }
    //   }
    // },
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.role = user.role;
      }
      return token;
    },
    async session({ session, token }) {
      session.user.role = token.role;
      session.user.id = token.id;
      setCookie(session, {
        name: 'userRole',
        value: token.role,
        path: '/',
        httpOnly: true,
        maxAge: 31536000000, 
      });
      console.log(`User session updated: role=${token.role}, id=${token.id}`);
      return session;
    },
  },
  session: {
    strategy: "jwt",
  },
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
