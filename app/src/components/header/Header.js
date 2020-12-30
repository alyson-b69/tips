import {Navbar, Nav, NavDropdown, Button} from "react-bootstrap"
import React, {useContext} from "react";
import { UserContext } from "../../context/UserContext";

const Header = ({username}) => {
    const { setLogged } = useContext(UserContext);
    const pageActu = window.location.pathname

    const resetLocalStorage = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("id");
        localStorage.removeItem("name");
        localStorage.removeItem("isLogged");
        setLogged(false);
    };

    const logout = () => {
        resetLocalStorage();
    };

    return (
        <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
            <Navbar.Brand href="/">TIPS & TRICKS</Navbar.Brand>
            <Navbar.Toggle aria-controls="responsive-navbar-nav" />
            <Navbar.Collapse id="responsive-navbar-nav">
                <Nav className="mr-auto">
                    <Nav.Link className={pageActu === "/" && "active"} href="/">All tips</Nav.Link>
                    <Nav.Link className={pageActu === "/category/javascript" && "active"} href="/category/javascript">JavaScript Tips</Nav.Link>
                    <Nav.Link className={pageActu === "/category/html" && "active"} href="/category/html">HTML Tips</Nav.Link>
                    <Nav.Link className={pageActu === "/category/css" && "active"} href="/category/css">CSS Tips</Nav.Link>
                </Nav>
                <Nav>
                    {username ?  <NavDropdown title={`Hey ${username}`} id="collasible-nav-dropdown">
                        <NavDropdown.Item href="/my-account"><span className="emoji"> 👤 </span> My account</NavDropdown.Item>
                        <NavDropdown.Item href="/my-tips"><span className="emoji"> 💡 </span> My tips</NavDropdown.Item>
                        <NavDropdown.Item href="/my-favorites"><span className="emoji"> ❤️ </span> My favorites</NavDropdown.Item>
                        <NavDropdown.Divider />
                        <NavDropdown.Item href="/" onClick={logout}>Log out</NavDropdown.Item>
                    </NavDropdown> : <Button href="/log">Connexion</Button>}

                </Nav>
            </Navbar.Collapse>
        </Navbar>
    )
}

export default Header