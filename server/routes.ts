import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertMessageSchema } from "@shared/schema";

export async function registerRoutes(app: Express): Promise<Server> {
  // API endpoint for contact form submissions
  app.post("/api/messages", async (req, res) => {
    try {
      const messageData = insertMessageSchema.parse(req.body);
      
      // Add timestamp
      const message = {
        ...messageData,
        createdAt: new Date().toISOString()
      };
      
      // Store the message (for a real implementation, this would be saved to a database)
      // This route uses in-memory storage for demo purposes
      const result = await storage.createMessage(message);
      
      res.status(200).json({
        message: "Message sent successfully",
        data: result
      });
    } catch (error) {
      console.error("Message submission error:", error);
      res.status(400).json({
        message: "Invalid message data",
        error: error instanceof Error ? error.message : "Unknown error"
      });
    }
  });

  // API endpoint to get messages (admin functionality)
  app.get("/api/messages", async (req, res) => {
    try {
      const messages = await storage.getMessages();
      res.status(200).json(messages);
    } catch (error) {
      console.error("Error fetching messages:", error);
      res.status(500).json({
        message: "Error retrieving messages",
        error: error instanceof Error ? error.message : "Unknown error"
      });
    }
  });

  const httpServer = createServer(app);

  return httpServer;
}
