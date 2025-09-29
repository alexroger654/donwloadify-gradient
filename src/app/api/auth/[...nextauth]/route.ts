import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";
import mongoose from "mongoose";
import { Admin } from "@/lib/models/Admin";


const handler = NextAuth({
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        username: { label: "Username", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        await mongoose.connect(process.env.MONGODB_URI || "");

        const admin = await Admin.findOne({ username: credentials?.username });

        console.log(admin, "================================")
        if (!admin) return null;

           // Plain text password comparison
    if (credentials!.password !== admin.password) {
        return null;
      }
  

        // const match = await bcrypt.compare(credentials!.password, admin.password);
        // if (!match) return null;

        return { id: admin._id.toString(), name: admin.username };
      },
    }),
  ],
  session: {
    strategy: "jwt", // session stored as JWT
  },
  pages: {
    signIn: "/admin/login", // custom login page
  },
});

export { handler as GET, handler as POST };
