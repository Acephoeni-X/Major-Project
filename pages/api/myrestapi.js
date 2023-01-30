import express from 'express';
import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcrypt'

const app = express();
app.use(express.json());

const prisma = new PrismaClient();

const salt = bcrypt.genSaltSync(10);

// SignUP POST
app.post("/signup", async (req, res) => {
    const { username, password, email } = req.body;
    const hashPass = await bcrypt.hash(password, salt);
    const user = await prisma.user.create({
        data: {
            username: username,
            password: hashPass,
            email: email
        }
    });
    res.json(user);
})

// Login GET authenticate with Cookie
app.get("/login", async (req, res) => {
    const { username, password } = req.body;
    const user = await prisma.user.findUnique({
        where: {
            username: username,
        },
    });
    let resultBcrypt = await bcrypt.compare(password, user.password);
    if (resultBcrypt) {
        res.cookie("aces_token", jwtAccessToken, { maxAge: 1000 * 60 * 60 * 24, httpOnly: true });
        res.json(user);
    } else {
        res.sendStatus(401);
    }
});

// Check Cookie for authentication
app.get("/checkcookie", async (req, res) => {
    const userCookie = req.cookies;
    console.log(userCookie);
    res.json({
        "cookie": userCookie
    })
})