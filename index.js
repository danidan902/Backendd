import express from 'express'
import mongoose from 'mongoose'
import dotenv from 'dotenv'
import cors from 'cors'
import Contact from './models/Contact.js'

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

//  Middleware
app.use(cors({
  origin: "https://danidanportfolio.vercel.app",
  methods: ["GET", "POST", "OPTIONS"],
  allowedHeaders: ["Content-Type"],
  credentials: true
}));

app.use(express.json());

//   MongoDB Connected

mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
.then(() => console.log("✅ MongoDB connected!"))
.catch((err) => console.error("❌ MongoDB failed:", err))

    // API route to handle form

app.post("/api/contact", async(req, res) => {
    const{name, email, password, message} = req.body;

    try{
        const newContact = new Contact({name, email, password, message});
        await newContact.save();
        res.status(200).json({success: true, data: newContact});

    } catch(err) {
        console.error("Error saving contact:", err);
        res.status(500).json({success: false, message: "Something went wrong!"})

    }
});

app.listen(PORT, () => {
    console.log(`🚀 Server running on http://localhost:${PORT}`)
})


