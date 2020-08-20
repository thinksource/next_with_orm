import {NextApiHandler} from 'next';
import {getDatabaseConnection} from '../../../lib/db';
import {User} from 'src/entity/User';
import nextConnect from 'next-connect';

const handler = nextConnect()
handler.post()
