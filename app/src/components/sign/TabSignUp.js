import React, { useState } from "react";
import API_URL from "../../config/config";
import {Button} from "react-bootstrap";

const TabSignUp = ({ activeTab, displaySignIn }) => {
    const [email, setEmail] = useState("");
    const [username, setUsername] = useState("");
    const [firstname, setFirstname] = useState("");
    const [lastname, setLastname] = useState("");
    const [password, setPassword] = useState("");
    const [password2, setPassword2] = useState("");
    const [formError, setFormError] = useState("");

    const handleSignUp = (e) => {
        e.preventDefault();
        e.persist();
        if (password === password2) {
            fetch(`${API_URL}/subscribe`, {
                method: "post",
                headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    username,
                    firstname,
                    lastname,
                    email,
                    password,
                }),
            })
                .then((res) => {
                    setFormError("");
                    setEmail("");
                    setUsername("");
                    setFirstname("");
                    setLastname("");
                    setPassword("");
                    setPassword2("");
                    return res.json();
                })
                .then((res) => {
                    if (res === "User added") {
                        displaySignIn("Your account has been created, please log in");
                    } else {
                        if (res.errors) {
                            return setFormError(res.errors.errors[0].msg);
                        } else if (res.err) {
                            return setFormError(res.err.sqlMessage);
                        } else if (res.duplicate) {
                            return setFormError(res.duplicate);
                        } else {
                            return setFormError(res.statusText);
                        }
                    }
                });
        } else {
            setPassword("");
            setPassword2("");
            setFormError("Passwords are not the same");
        }
    };

    function handleEmailChange(e) {
        e.persist();
        setEmail(e.target.value);
    }

    function handleUsernameChange(e) {
        e.persist();
        setUsername(e.target.value);
    }

    function handleFirstnameChange(e) {
        e.persist();
        setFirstname(e.target.value);
    }

    function handleLastnameChange(e) {
        e.persist();
        setLastname(e.target.value);
    }

    function handlePasswordChange(e) {
        e.persist();
        setPassword(e.target.value);
    }

    function handlePassword2Change(e) {
        e.persist();
        setFormError("");
        setPassword2(e.target.value);
    }

    return (
        <div
            className={"tab " + (activeTab === "sign-up" ? "active" : "")}
            id="tab-sign-up"
        >
            <form id="form-sign-up" onSubmit={handleSignUp} autoComplete="off">
                <p>
                    <input
                        type="text"
                        name="username"
                        id="up_username"
                        autoComplete="off"
                        value={username}
                        onChange={handleUsernameChange}
                        placeholder="Choose your username"
                        required
                    />
                </p>
                <p>
                    <input
                        type="text"
                        name="firstname"
                        id="up_firstname"
                        autoComplete="off"
                        value={firstname}
                        onChange={handleFirstnameChange}
                        placeholder="Enter your firstname"
                        required
                    />
                </p>
                <p>
                    <input
                        type="text"
                        name="lastname"
                        id="up_lastname"
                        autoComplete="off"
                        value={lastname}
                        onChange={handleLastnameChange}
                        placeholder="Enter your lastname"
                        required
                    />
                </p>
                <p>
                    <input
                        type="text"
                        name="email"
                        id="up_email"
                        autoComplete="off"
                        value={email}
                        onChange={handleEmailChange}
                        placeholder="Enter your email"
                        required
                    />
                </p>

                <p>
                    <input
                        type="password"
                        name="password"
                        id="up_password"
                        autoComplete="off"
                        value={password}
                        onChange={handlePasswordChange}
                        placeholder="Choose your password"
                        minLength="8"
                        maxLength="12"
                        required
                    />
                </p>
                <p>
                    <input
                        type="password"
                        name="password2"
                        id="up_password2"
                        autoComplete="off"
                        value={password2}
                        placeholder="Repeat your password"
                        onChange={handlePassword2Change}
                        minLength="8"
                        maxLength="12"
                        required
                    />
                </p>
                <p>
                    <Button type="submit"  > Join tips & tricks </Button>
                </p>
                <p className="error">{formError ?? ""}</p>
            </form>
        </div>
    );
};

export default TabSignUp;
