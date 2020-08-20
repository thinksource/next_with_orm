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
    const connection = await getDatabaseConnection(); // 

    const user = new User();
    user.email = username.replace(/\s/g, "");
    user.password = password;
    if (await user.validate(passwordConfirmation)){
        res.status(400).json({
            error: 'can not create new user',
            reason: user.errors
        })
    }else{
        res.status(200).json(user)
    }
})