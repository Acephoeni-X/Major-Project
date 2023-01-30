import { serialize } from 'cookie'

export default async function handler(req, res) {
    if (req.method == "GET") {
        const userCookie = req.headers.cookie;
        // res.headers.setCookie("aces_token", "jwtAccessToken", { maxAge: 1000 * 60 * 60 * 24, httpOnly: true });
        const options = {
            maxAge: 1000 * 60 * 60 * 24,
            httpOnly: true
        }
        // res.setHeader('Set-Cookie', serialize("name", "tusharmkj", options))
        res.json({
            "cookie": userCookie
        })
    } else {
        res.send(401);
    }
}