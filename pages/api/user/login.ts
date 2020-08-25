import {NextApiHandler, NextApiRequest, NextApiResponse} from 'next';
import {getDatabaseConnection, dbManager} from '../../../lib/db';
import {User, pwhash, UserRole} from 'src/entity/User';
import nextConnect from 'next-connect';
import { EntityManager } from 'typeorm';
import {sign, verify} from 'jsonwebtoken';
import { user_validate } from 'lib/Validate';
import cookie from 'cookie'
import { GUID } from 'lib/auth'


// const authenticated = (fn:any) => async (req: NextApiRequest, res: NextApiResponse)=>{
//     verify(req.headers.authorization!, GUID, async (err, decode)=>{
//         if (!err && decode){
//             return fn(req, res)
//         }
//         res.status(401).json({message: "sorry you are not authenticated"})
//     })
//     return fn(req, res)
// }

const handler = nextConnect<NextApiRequest, NextApiResponse>()
handler.post(async (req, res)=>{
    let message:string;
    const db: EntityManager = (await getDatabaseConnection()).manager;
    const {username, password} = req.body;
    const result = await db.findOne(User, {"email": username})
    if(result){
        const pw_hash = pwhash(password, result.salt)
        if(pw_hash === result.password){
            const claims = {email: result.email, id: result.id, role: result.role}
            // if(claims.role == UserRole.blocked){
            //     let message = "inactive role can not login"
            //     res.status(401).json({message})
            // }
            const jwt = sign(claims, GUID, {expiresIn: '2h'})
            
            const auth_cookie = cookie.serialize('auth', jwt, {
                httpOnly: true,
                sameSite: 'strict',
                maxAge: 3600,
                path: '/'
            })
            res.setHeader('Set-Cookie', auth_cookie)
            res.status(200).json({authToken: jwt})
        }else{
            message = "can not authority"
            res.status(401).json({message})
        }
    }else{
        message = "can not find the email address";
        res.status(401).json({message})
    }

})

export default handler
