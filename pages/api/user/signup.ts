import {NextApiHandler, NextApiRequest, NextApiResponse} from 'next';
import {getDatabaseConnection} from '../../../lib/db';
import {User} from 'src/entity/User';
import nextConnect from 'next-connect';
import { notDeepStrictEqual } from 'assert';

const handler = nextConnect<NextApiRequest, NextApiResponse>({
    onNoMatch(req, res){
      res.status(405).json({error:`Method ${req.method} Not Allowed`});
    }
  })
handler.post(async (req, res)=>{
    const {username, password, passwordConfirmation} = req.body;
    
    console.log("=========================")
    let db = (await getDatabaseConnection()).manager; //

    const user = new User();
 
    user.email = username.replace(/\s/g, "");
    user.password = password;

    if (await user.validate(passwordConfirmation)){
        await db.save(user)
        res.status(200).json(user)
    }else{
        res.status(400).json({
            error: 'cannot create new user',
            reason: user.errors
        })
    }
})

export default handler;