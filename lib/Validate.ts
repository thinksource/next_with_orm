import { getDatabaseConnection } from "./db";
import { Connection } from "typeorm";
import { User } from "src/entity/User";



export async function user_validate(user: User, pw: string){
    const errors = new Array();
    user.errors=errors
    if(user.password !== pw) errors.push('password do not match of two input');
    if(user.email.length == 0) errors.push('username can not empty');
    if(user.password.length == 0) errors.push('password can not empty');
    try{
    let conn : Connection= await getDatabaseConnection()
    const found = await conn.manager.findOne(User, {"email": user.email}).catch(e=>{console.log(e)});
    console.log(found);
    if (found)
        errors.push('user email already exist')
    else
        console.log("saving now")    
    }catch(e){
        console.log(e)
    }
    return  errors? true: false;
}