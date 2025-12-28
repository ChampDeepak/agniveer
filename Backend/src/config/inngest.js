import { Inngest } from "inngest";
import connectDB from "../config/db.js";
import User from "../model/user.model.js";
import { usertStreamUser } from "./stream.js";
import { deleteStreamUser } from "./stream.js";

// Create a client to send and receive events
export const inngest = new Inngest({ id: "agni" });

const syncUser = inngest.createFunction(
    { id: "sync-user" },
    { event: "clerk/user.created" },
    async ({ event }) => {
        await connectDB();
        const user = await User.create({
            email: event.data.email_addresses[0]?.email_address,
            name: event.data.first_name + " " + event.data.last_name,
            image: event.data.image_url,
            clerkId: event.data.id,
        });

        await usertStreamUser({
            clerkId: event.data.id,
            name: event.data.first_name + " " + event.data.last_name,
            image: event.data.image_url,
            email: event.data.email_addresses[0]?.email_address,
        });
    }
);

const deleteUserFromDB = inngest.createFunction(
    { id: "delete-user" },
    { event: "clerk/user.deleted" },
    async ({ event }) => {
        await connectDB();
        const user = await User.deleteOne({ clerkId: event.data.id });
        await deleteStreamUser(event.data.id);
    }
);



// Create an empty array where we'll export future Inngest functions
export const functions = [syncUser, deleteUserFromDB];