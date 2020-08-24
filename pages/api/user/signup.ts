import {NextApiHandler, NextApiRequest, NextApiResponse} from 'next';
import {getDatabaseConnection} from '../../../lib/db';
import {User} from 'src/entity/User';
import nextConnect from 'next-connect';
import { notDeepStrictEqual } from 'assert';
import { user_validate } from 'lib/Validate';

const handler = nextConnect<NextApiRequest, NextApiResponse>({
    onNoMatch(req, res){
      res.status(405).json({error:`Method ${req.method} Not Allowed`});
    }
  })
handler.post(async (req, res)=>{
    const {username, password, passwordConfirmation} = req.body;
    let db = (await getDatabaseConnection()).manager; 

    const user = new User();
 
    user.email = username.replace(/\s/g, "");
    user.password = password;
    console.log(password)
    console.log(passwordConfirmation)

    if (await user_validate(user, passwordConfirmation)){
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