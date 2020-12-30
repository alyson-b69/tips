const TabsLinks = ({ activeTab, displaySignIn, displaySignUp }) => {
    return (
        <ul>
            <li>
                <button
                    className={"tab-link " + (activeTab === "sign-in" ? "active" : "")}
                    id="sign-in"
                    onClick={displaySignIn}
                >
                    LOGIN
                </button>
            </li>
            <li>
                <button
                    className={"tab-link " + (activeTab === "sign-up" ? "active" : "")}
                    id="sign-up"
                    onClick={displaySignUp}
                >
                    SIGN UP
                </button>
            </li>
        </ul>
    );
};

export default TabsLinks;
