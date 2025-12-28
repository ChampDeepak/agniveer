import express from "express";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import {clerkMiddleware} from "@clerk/express";
import {serve} from "inngest/express";
import {inngest, functions} from "./config/inngest.js";

dotenv.config();
const app = express();
const port = process.env.PORT || 3000;

app.use(express.json()); //for parsing the request body
app.use(clerkMiddleware()); //res.auth will be available in res object
app.use("/api/inngest", serve({ client: inngest, functions }));


app.get('/', (req,res)=>{
    res.send("Hello World!");
}); 

const startServer = async () => {
    try 
    {
        await connectDB();
        if(process.env.NODE_ENV === "development")
        {
            app.listen(port, () => 
            {
            console.log(`Server running at http://localhost:${port}`); 
            });
        }
    } catch (error) 
    {
        console.error(error);
    }
}

startServer();

export default app; 


