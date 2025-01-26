import express from "express";
import { sendMessage } from "../handler/chat.js";

const ChatRouter = express.Router();

ChatRouter.get("/", (_req, res) => {
    res.render("chat", { title: "DataNerd - Chat" });
});

ChatRouter.get("/:query", async (req, res) => {
    const userQuery = req.params.query; 

    console.log("Requête reçue:", userQuery);

    if (!userQuery) {
        return res.status(400).send({ error: "Message is required" });
    }

    if (userQuery.length > 200) { 
        return res.status(400).send({
            error: "Message too long. Please keep it under 200 characters.",
        });
    }

    try {
        // You can add a function to handle the user query here
        const chatBotResponse = await sendMessage(userQuery);
        console.log("Réponse du chatbot:", chatBotResponse);

        return res.status(200).send({ response: chatBotResponse });
    } catch (error) {
        console.error("Erreur lors du traitement de la requête :", error);
        return res.status(500).send({ error: "Internal server error." });
    }
});

// // This route is for testing purposes only

// ChatRouter.post("/chat", async (req, res) => {
//     console.log("Request received at /chat:", req.body);

//     const userMessage = req.body.message;
//     if (!userMessage) {
//         return res.status(400).send({ error: "Message is required" });
//     }

//     try {
//         const chatBotResponse = await sendMessage(userMessage);
//         console.log("Réponse du chatbot:", chatBotResponse);

//         return res.status(200).send({ response: chatBotResponse });
//     } catch (error) {
//         console.error("Erreur lors du traitement de la requête :", error);
//         return res.status(500).send({ error: "Internal server error." });
//     }
// });

export { ChatRouter };
