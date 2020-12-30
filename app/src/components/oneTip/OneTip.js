import { Container} from "react-bootstrap";
import React, {useState} from "react";
import {ReactCodeJar} from "react-codejar";
import Prism from "prismjs";
import "../../assets/styles/prism-dracula.css";
import Moment from "react-moment"
import { RiTimeLine } from "react-icons/ri"
import { IoMdPricetag } from "react-icons/io"
import {FaUser} from "react-icons/fa"


const OneTip = (props) => {
    const tip = props.location.state.detail;
    const category = props.location.state.category;
    const [code, setCode] = useState(tip.body)

    const highlight = editor => {
        let code = editor.textContent;
        editor.innerHTML = Prism.highlight(
            code,
            category[1] === "CSS" ? Prism.languages.css : category[1] === "HTML" ? Prism.languages.html : Prism.languages.javascript,
            category[1].toLowerCase()
        );
    };

       return (
        <Container className="tips-view">
            <h3>{tip.title}</h3>
            <div className={"single-code"}>
                <ReactCodeJar
                    code={code}
                    onUpdate={setCode}
                    highlight={highlight}
                />
            </div>

            <div className="footer-card-meta">
                <div className="footer-category">
                    <IoMdPricetag />{" "}
                    <a href={`/category/${category[1].toLowerCase()}`} alt={category[1]}>{category? category[1] : ""}</a>
                </div>
                <div className="footer-category">
                    <FaUser />{" "}
                    <a href={`/user/${tip.author_username}`} alt={tip.author_username}>{tip.author_username}</a>
                </div>
                <div className="footer-category">
                    <RiTimeLine />
                    <Moment format="DD/MM/YYYY">{tip.created_at}</Moment>
                </div>

            </div>

        </Container>
    )
}

export default OneTip