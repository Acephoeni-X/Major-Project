import express from 'express';
import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import { serialize } from 'cookie';

const app = express();
app.use(express.json());

const prisma = new PrismaClient();

const salt = bcrypt.genSaltSync(10);

const jwtToken = (value) => {
    const giveToken = jwt.sign({ "user_id": value },
        process.env.VERIFICATIONTOKEN, { expiresIn: '1d' })
    return giveToken;

}

export async function signUp(req, res) {

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

}


export async function logIn(req, res) {

    const { username, password } = req.body;
    console.log(username, password);
    const user = await prisma.user.findUnique({
        where: {
            username: username,
        },
    });
    console.log(user)
    let resultBcrypt = await bcrypt.compare(password, user.password);
    const jwtAccessToken = jwtToken(user.id);
    console.log(resultBcrypt);

    const options = {
        maxAge: 1000 * 60 * 60 * 24,
        httpOnly: true
    }

    if (resultBcrypt) {
        res.setHeader('Set-Cookie', serialize("aces_token", jwtAccessToken, options))
        // res.cookie("aces_token", jwtAccessToken, { maxAge: 1000 * 60 * 60 * 24, httpOnly: true });
        res.json(user);
    } else {
        res.sendStatus(401);
    }

}



// check if the account user auth with meta mask already present?
// if not then add the eth address
// checks when user had some value and directed to dashboard, call on backend in dasboard
export async function addAccountAddress(req, res, user_id) {
    const { address } = req.body;
    const accountResult = await prisma.accountid.findUnique({
        where: {
            user_id: user_id,
            account_id: address
        }
    });
    if (!accountResult) {
        await prisma.accountid.create({
            data: {
                account_id: address,
                user_id: user_id
            }
        });
        await res.json({
            message: "Account added",
            status: true
        });
    }
    else {
        res.json({
            message: "Account was already in knowledge"
        });
    }
}



// GET all Accounts from a particular user
export async function getAllAcount(req, res, user_id) {
    // const { user_id } = req.body;
    const accounts = await prisma.accountid.findMany({
        where: {
            user_id: user_id
        }
    });
    await res.json({
        accounts: accounts
    });
}


// POST transactions
// checks the eth connected with the browser as it is in use

export async function transactionPost(req, res, user_id) {
    const { transaction_eth, transaction_from, transaction_time, transaction_to } = req.body;
    await prisma.transactions.create({
        data: {
            transaction_eth,
            transaction_time,
            transaction_from,
            transaction_to
        }
    })
}


// GET all transactions
export async function allTransactions(req, res, user_id) {
    const { transaction_from } = req.body;
    const alltrans = await prisma.transactions.findMany({
        where: {
            transaction_from
        }
    });
    await res.json({
        alltrans
    });
}


export async function ethPrice(req, res, user_id) {
    let { balance } = req.body;
    let data = await (
        await fetch(
            "https://min-api.cryptocompare.com/data/price?fsym=ETH&tsyms=INR"
        )
    ).json();
    balance = parseFloat(balance);
    let inr = parseFloat(data.INR);
    // let ok = JSON.stringify(req);
    console.log(balance);
    // res.status(200).json({ price: ok });
    res.status(200).json({ price: balance * inr });
}



export async function getTransHistory(req, res) {
    let { address } = JSON.parse(req.body);
    let data = await (
        await fetch(
            `https://api-goerli.etherscan.io/api?module=account&action=txlist&address=${address}&startblock=0&endblock=99999999&offset=10&sort=asc&apikey=${process.env.ETHERSCAN_API}`
        )
    ).json();
    res.status(200).json({ data: data["result"].reverse() });
}



export async function checkCookie(req, res, fun) {

    // const userCookie = req.headers.cookie;
    const token = req.headers.cookie?.replace(/aces_token=/g, '');
    try {
        const { user_id } = jwt.verify(token, process.env.VERIFICATIONTOKEN)
        // console.log(user_id);
        if (user_id) {
            fun(req, res, user_id);
        }
        // res.json({
        //     "user_id": user_id
        // })
    } catch (e) {
        throw new Error('Authentication token is invalid, please log in with valid credentials!');
    }
}

export async function check(req, res) {

    // const userCookie = req.headers.cookie;
    const token = req.headers.cookie?.replace(/name=tusharmkj; aces_token=/g, '');
    console.log(token);
    try {
        const { user_id } = jwt.verify(token, process.env.VERIFICATIONTOKEN)
        // console.log(user_id);
        // if (user_id) {
        //     fun(req, res, user_id);
        // }
        console.log("first")
        res.json({
            "user_id": user_id
        })
    } catch (e) {
        throw new Error(`Authentication token is invalid, please log in with valid credentials! ${e}`);
    }
}