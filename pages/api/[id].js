import { addAccountAddress, allTransactions, check, checkCookie, getAllAcount, logIn, signUp, transactionPost } from "@/allapifun/allapifun";

export default function handler(req, res) {
    const { query: { id }, method } = req;
    console.log(id, method);

    switch (id) {
        case 'signup':
            if (method == 'POST') {
                console.log("first")
                signUp(req, res);
            } else {
                // res.setHeader('Allow', ['POST']);
                res.status(405).end(`Method ${method} Not Allowed`);
            }
            break;
        case 'login':
            if (method == 'GET') {
                logIn(req, res);
            } else {
                res.setHeader('Allow', ['GET']);
                res.status(405).end(`Method ${method} Not Allowed`);
            }
            break;
        case 'addaccountaddress':
            if (method == 'POST') {
                checkCookie(req, res, addAccountAddress);
            }
            else {
                res.setHeader('Allow', ['POST']);
                res.status(405).end(`Method ${method} Not Allowed`);
            }
            break;
        case 'getallacount':
            if (method == 'GET') {
                checkCookie(req, res, getAllAcount);
            }
            else {
                res.setHeader('Allow', ['GET']);
                res.status(405).end(`Method ${method} Not Allowed`);
            }
            break;
        case 'transactionpost':
            if (method == 'POST') {
                checkCookie(req, res, transactionPost);
            }
            else {
                res.setHeader('Allow', ['GET']);
                res.status(405).end(`Method ${method} Not Allowed`);
            }
        case 'alltransactions':
            if (method == 'GET') {
                checkCookie(req, res, allTransactions);
            }
            else {
                res.setHeader('Allow', ['GET']);
                res.status(405).end(`Method ${method} Not Allowed`);
            }
            break;
        case 'checkcookie':
            if (method == 'GET') {
                checkCookie(req, res);
            } else {
                res.setHeader('Allow', ['GET']);
                res.status(405).end(`Method ${method} Not Allowed`);
            }
            break;
        case 'check':
            if (method == 'GET') {
                check(req, res);
            } else {
                res.setHeader('Allow', ['GET']);
                res.status(405).end(`Method ${method} Not Allowed`);
            }
            break;
        default:
            res.status(404).end(`No endpoint with ${id} exist`);
    }

}