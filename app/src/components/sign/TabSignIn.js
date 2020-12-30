import React, { useEffect, useState, useContext } from "react";
import { useHistory } from "react-router-dom";
import API_URL from "../../config/config";
import { UserContext } from "../../context/UserContext";
import {Button} from "react-bootstrap"

const TabSignIn = ({
                       activeTab,
                       successMessage,
                       setTokenApp,
                       setUserIdApp,
                   }) => {

    let history = useHistory();
    const { setToken, setUserId, setUserName, setLogged } = useContext(
        UserContext
    );
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [successMessageRender, setSuccessMesssageRender] = useState(null);

    useEffect(() => {
        if (typeof successMessage !== "object") {
            setSuccessMesssageRender(successMessage);
        }
    }, [successMessage]);

    const handleSignIn = (e) => {
        e.preventDefault();
        e.persist();
        fetch(`${API_URL}/login`, {
            method: "post",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ username, password }),
        })
            .then((res) => {
                return res.json();
            })
            .then((res) => {
                setToken(res.token);
                setUserId(res.id);
                setTokenApp(res.token);
                setUserIdApp(res.id);
                setUserName(res.username);
                setLogged(true);
                localStorage.setItem("token", res.token);
                localStorage.setItem("id", res.id);
                localStorage.setItem("name", res.username);
                localStorage.setItem("isLogged", true);
            })
            .then(() => {
                history.push("/");
            })
            .catch((err) => {
                console.log(err);
            });
    };

    function handleUsernameChange(e) {
        e.persist();
        setUsername(e.target.value);
    }

    function handlePasswordChange(e) {
        e.persist();
        setPassword(e.target.value);
    }

    return (
        <div
            className={"tab " + (activeTab === "sign-in" ? "active" : "")}
            id="tab-sign-in"
        >
            <form id="form-sign-in" onSubmit={handleSignIn}>
                <p>
                    <input
                        type="text"
                        name="username"
                        id="in_username"
                        placeholder="Username"
                        onChange={handleUsernameChange}
                        value={username}
                        required
                    />
                </p>
                <p>
                    <input
                        type="password"
                        name="password"
                        id="in_password"
                        placeholder="Password"
                        onChange={handlePasswordChange}
                        value={password}
                        minLength="8"
                        maxLength="24"
                        required
                    />
                </p>

                <Button type="submit" > Login </Button>

                <p className="error">
                    {successMessageRender ? successMessageRender : ""}
                </p>
            </form>
        </div>
    );
};

export default TabSignIn;
