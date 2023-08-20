import { useState } from "react";

import { signInWithGooglePopup, createUserDocumentFromAuth, signInAuthWithEmailAndPassword } from '../../utils/firebase/firebase.utils'
import FormInput from "../form-input/form-input.component";

import './sign-in-form.style.scss'
import Button from "../button/button.component";

const defaultFormFields = {
    email: '',
    password: ''
}

const SignInForm = () => {
    const [formField, setFormField] = useState(defaultFormFields);
    const { email, password } = formField;

    const resetFormField = () => {
        setFormField(defaultFormFields);
    }

    const signInWithGoogle = async () => {
        const { user } = await signInWithGooglePopup();
        await createUserDocumentFromAuth(user);
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        try {
            const response = await signInAuthWithEmailAndPassword(
                email,
                password
            )
            console.log(response);
            resetFormField();
        } catch (error) {
            switch (error.code) {
                case 'auth/wrong-password':
                    alert('Incorrect password for email');
                    break;
                case 'auth/user-not-found':
                    alert('No user associate with this email');
                    break;
                default:
                    console.log(error);
            }
        }
    }

    const handleChange = (event) => {
        const { name, value } = event.target

        setFormField({ ...formField, [name]: value })

    }
    return (
        <div className="sign-up-container">
            <h2>Already have an account?</h2>
            <h3>Sign In With Your Email and Password</h3>
            <form onSubmit={handleSubmit}>

                <FormInput
                    label="Email"
                    type="email"
                    required
                    onChange={handleChange}
                    name="email"
                    value={email}
                />

                <FormInput
                    label="Password"
                    type="password"
                    required
                    onChange={handleChange}
                    name="password"
                    value={password}
                />

                <div className="buttons-container">
                    <Button type="submit">Sign In</Button>
                    <Button type="button" buttonType='google' onClick={signInWithGoogle}>google Sign In</Button>
                </div>
            </form>
        </div>
    );
}

export default SignInForm;