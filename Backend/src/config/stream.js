import {StreamChat} from "stream-chat";

const streamClient = StreamChat.getInstance(process.env.STREAM_API_KEY, process.env.STREAM_API_SECRET);

export const usertStreamUser = async (userData)=>{
    try {
        await streamClient.upsertUser({
            id: userData.clerkId,
            name: userData.name,
            email: userData.email,
            image: userData.image,
        });
    } catch (error) {
        console.log(error);
    }
}

export const deleteStreamUser = async (clerkId)=>{
    try {
        await streamClient.deleteUser(clerkId);
    } catch (error) {
        console.log(error);
    }
}

export const generateStreamToken = async (userId)=>{
    try {
        const token = streamClient.createToken(userId.toString());
        return token;
    } catch (error) {
        console.log(error);
        return null;
    }
}
