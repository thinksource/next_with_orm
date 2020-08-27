import {GetServerSideProps, GetServerSidePropsContext, NextPage} from 'next';
import * as React from "react";
import axios from 'axios'
// import {withSession} from '../lib/withSession';
import {User} from '../src/entity/User';
import {userForm} from '../hooks/userForm';
import qs from 'querystring';

const SignIn: NextPage<{ user: User }> = (props) => {
    const {form} = userForm({
        initFormData: { username: '', password: ''},
        fields: [
            {label: 'email address', type: 'text', key: 'username'},
            {label: 'password', type: 'password', key: 'password'}
        ],
        buttons: <button type="submit">login</button>,
        submit: {
            request: formData =>
                axios.post(`/api/user/login`, formData),
            success: () => {
                window.alert('登录成功');
                const query = qs.parse(window.location.search.substr(1));
                window.location.href = query.returnTo?.toString() || '/';
            }
        }
    });
    return (
        <>
            {props.user && <div>当前登录用户为 {props.user.email}</div>}
            <h1>登录</h1>
            {form}
        </>
    );
};

export default SignIn;

export const getServerSideProps: GetServerSideProps = async (ctx: GetServerSidePropsContext) => {
    // const user = ctx.req.
    return {
        props: {
            user: JSON.parse(JSON.stringify(user))
        }
    };
};
