// components/Auth/Signup/Signup.tsx
import React, {useState} from "react";
import AuthInputField from "../AuthInputField/AuthInputField";
import { createUserWithEmailAndPassword } from 'firebase/auth';

import '../Auth.css';
import {FIREBASE_AUTH} from "@/FirebaseConfig";

interface FormData {
    TgAlias: string;
    email: string;
    password: string;
}

const Signup: React.FC = () => {
    const [formData, setFormData] = useState<FormData>({
        TgAlias: '',
        email: '',
        password: '',
    });

    const handleChange = (e: React.FormEvent<HTMLInputElement>) => {
        const {name, value} = e.target as HTMLInputElement;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        await createUserWithEmailAndPassword(FIREBASE_AUTH, formData.email, formData.password);
        console.log('REGISTER Form submitted:', formData);
    };

    return (
        <form onSubmit={handleSubmit}>
            {/*<AuthInputField*/}
            {/*    label="TgAlias"*/}
            {/*    name="TgAlias"*/}
            {/*    value={formData.TgAlias}*/}
            {/*    placeholder="Enter your Tg Alias"*/}
            {/*    onChange={handleChange}*/}
            {/*/>*/}
            <AuthInputField
                type="email"
                label="Email"
                name="email"
                value={formData.email}
                placeholder="Enter your email"
                onChange={handleChange}
            />
            <AuthInputField
                type="password"
                label="Password"
                name="password"
                value={formData.password}
                placeholder="Enter your password"
                onChange={handleChange}
            />
            <button type="submit">Signup</button>
        </form>
    );
}

export default Signup;
