const express = require("express")
const cookieParser = require("cookie-parser")
const cors = require("cors")

const app = express()

app.use(express.json())
app.use(cookieParser())
app.use(cors({
    origin: "https://crackit-ai-c0xc.onrender.com",
    credentials: true
}))

/* require all the routes here */
const authRouter = require("./routes/auth.routes")

const interviewRouter = require("./routes/interview.routes")

app.get("/", (req, res) => {

    res.send("Server is working!");

});
// /* using all the routes here */
app.use("/api/auth", authRouter)


console.log("AUTH ROUTER REGISTERED")
app.use("/api/interview", interviewRouter)



module.exports = app
