import nextConnect from "next-connect";
import { NextApiHandler, NextApiRequest, NextApiResponse } from "next";
import { Organization } from "src/entity/Organization";
import { getDatabaseConnection } from "lib/db";

const handler  = nextConnect<NextApiRequest, NextApiResponse>(
);

handler.post(async (req, res)=>{
    const {name, brief, website, mailext, member}=req.body;
    const org = new Organization()
    org.name = name
    org.brief = brief
    org.website = website
    org.mailext = mailext
    const db =  (await getDatabaseConnection()).manager
    await db.save(org)
    res.json(org)
})



export default handler;