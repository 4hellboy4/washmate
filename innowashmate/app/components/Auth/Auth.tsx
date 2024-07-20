import React, {useState} from "react";
import AuthInputField from "./AuthInputField/AuthInputField";

import './Auth.css'

interface FormData {
  username: string;
  email: string;
  password: string;
}

const Auth: React.FC = () => {
    const [formData, setFormData] = useState<FormData>({
        username: '',
        email: '',
        password: '',
    });

    const handleChange = (e: React.FormEvent<HTMLInputElement>) => {
        const { name, value } = e.target as HTMLInputElement;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        console.log('Form submitted:', formData);
    };


    return (
        <div className="auth">
            <div className="auth_block">
                <form onSubmit={handleSubmit}>
                    <AuthInputField
                        label="Username"
                        name="username"
                        value={formData.username}
                        placeholder="Enter your username"
                        onChange={handleChange}
                    />
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
                    <button type="submit">Submit</button>
                </form>
            </div>
        </div>
    );
}

export default Auth;
