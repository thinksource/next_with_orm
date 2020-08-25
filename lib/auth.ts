import { NextApiResponse, NextApiHandler, NextApiRequest, NextPageContext } from "next";
import { verify } from 'jsonwebtoken';
import Router from 'next/router';

export const GUID ='274a5db6-334f-41b8-a87c-2609bc69e94e'

export const authenticated = (fn: NextApiHandler) => async (
    req: NextApiRequest,
    res: NextApiResponse
  ) =>{
    verify(req.cookies.auth!, GUID, async function(err, decoded) {
        if (!err && decoded) {
          return await fn(req, res);
        }
        const message='Sorry you are not authenticated' 
        res.status(401).json({message})
    });
}

export async function myGet(url: string, ctx: NextPageContext) {
    const cookie = ctx.req?.headers.cookie;

    const resp = await fetch(url, {
        headers: {
            cookie: cookie!
        }
    });

    // if(resp.status === 401 && !ctx.req) {
    //     Router.replace('/login');
    //     return {};
    // }

    if(resp.status === 401 && ctx.req) {
        ctx.res?.writeHead(302, {
            Location: 'http://localhost:3000/login'
        });
        ctx.res?.end();
        return;
    }

    const json = await resp.json();
    return json;
}
