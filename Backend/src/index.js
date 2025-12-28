import express from "express";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import { clerkMiddleware } from "@clerk/express";
import { serve } from "inngest/express";
import { inngest, functions } from "./config/inngest.js";
import chatRoutes from "./routes/chat.route.js";
import userRoutes from "./routes/user.route.js";

dotenv.config();
const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json()); //for parsing the request body
app.use(clerkMiddleware()); //res.auth will be available in res object
app.use("/api/inngest", serve({ client: inngest, functions }));
app.use("/api/chat", chatRoutes);
app.use("/api/user", userRoutes);


app.get('/', (req, res) => {
    res.send("Hello World!");
});

const startServer = async () => {
    try {
        await connectDB();
        if (process.env.NODE_ENV === "development") {
            app.listen(PORT, () => {
                console.log(`Server running at http://localhost:${PORT}`);
            });
        }
    } catch (error) {
        console.error(error);
    }
}

startServer();

export default app;


