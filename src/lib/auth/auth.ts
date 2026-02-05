import { betterAuth } from "better-auth";
import { mongodbAdapter } from "better-auth/adapters/mongodb";
import { MongoClient } from "mongodb";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { initUserBoard } from "@/lib/initUserBoard";

const client = new MongoClient(process.env.MONGODB_URI!);
const db = client.db();

export const auth = betterAuth({
  database: mongodbAdapter(db, { client }),
  emailAndPassword: {
    enabled: true,
  },
  session: {
    cookieCache: {
      enabled: true,
      maxAge: 60 * 60,
    },
  },
  databaseHooks: {
    user: {
      create: {
        after: async (user) => {
          if (user?.id) await initUserBoard(user.id);
        },
      },
    },
  },
});

export const getSession = async () => {
  return await auth.api.getSession({
    headers: await headers(),
  });
};

export const signOut = async () => {
  const result = await auth.api.signOut({ headers: await headers() });

  if (result.success) {
    redirect("/sign-in");
  }
};
