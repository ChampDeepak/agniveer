import { Inngest } from "inngest";
import connectDB from "../config/db.js";
import User from "../model/user.model.js";

// Create a client to send and receive events
export const inngest = new Inngest({ id: "agni" });

const syncUser = inngest.createFunction(
    {id: "sync-user"},
    {event: "clerk/user.created"},
    async ({event}) => {
        await connectDB();
        const user = await User.create({
            email: event.data.email_addresses[0]?.email_address,
            name: event.data.first_name + " " + event.data.last_name,
            image: event.data.image_url,
            clerkId: event.data.id,
        });
    }
    //Todo things here 
);

const deleteUserFromDB = inngest.createFunction(
    {id: "delete-user"},
    {event: "clerk/user.deleted"},
    async ({event}) => {
        await connectDB();
        const user = await User.deleteOne({clerkId: event.data.id});
    }
    //Todo things here 
);



// Create an empty array where we'll export future Inngest functions
export const functions = [syncUser, deleteUserFromDB];