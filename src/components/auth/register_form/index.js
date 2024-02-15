import React, { Fragment, useState } from 'react';
import { Button, Field, Control, Input, Column, Section, Help, Label } from "rbx";
import { Redirect } from "react-router-dom";
import UserService from '../../../services/users';

function RegisterForm() {

    // Controlled form
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    // After creating the account, the user is automatically directed to Login.
    const [redirectToLogin, setRedirectToLogin] = useState(false);
    
    // Invalid password or email - Show error to user.
    const [error, setError] = useState(false);

    // Method for the form.
    // Sending data to the API.
    const HandleSubmit = async (evt) => {
        evt.preventDefault();

        try {
            const user = await UserService.register({name: name,email: email,password: password});
                setRedirectToLogin(true);
        } catch (error) {
            setError(true);
        }
    }

    // Directed to '/login'
    if(redirectToLogin)
        return <Redirect to={{pathname: "/login"}}/>



    return (
        <Fragment>
            <Column.Group centered>
            <form onSubmit={HandleSubmit}>
                <Column size={12}>
                    <Field>
                        <Label size="small">Name:</Label>
                        <Control>
                            <Input type="name" 
                            required 
                            name="name" 
                            value={name} 
                            onChange={e => setName(e.target.value)}/>
                        </Control>
                    </Field>
                    <Field>
                        <Label size="small">Email:</Label>
                        <Control>
                            <Input 
                            type="email" 
                            required 
                            name="email"
                            value={email} 
                            onChange={e => setEmail(e.target.value)}/>
                        </Control>
                    </Field>
                    <Field>
                        <Label size="small">Password:</Label>
                    <Control>
                        <Input 
                        type="password" 
                        required 
                        name="password"
                        value={password} 
                        onChange={e => setPassword(e.target.value)}/>
                    </Control>
                    </Field>
                    <Field>
                        <Control>
                            <Column.Group breakpoint="mobile">
                                <Column>
                                    <a className="button is-white has-text-custom-blue"
                                    onClick={e => setRedirectToLogin(true)}
                                    >Login or</a>
                                </Column>
                                <Column>
                                    <Button color="custom-blue" outlined>Register</Button>
                                </Column>
                            </Column.Group>
                        </Control>
                    </Field>
                        {/* Display error to user */}
                        { error && <Help color="danger">Email or Password invalid</Help> }
                </Column>
            </form>
            </Column.Group>
        </Fragment>
    )
}

export default RegisterForm;