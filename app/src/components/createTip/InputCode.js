import {ReactCodeJar} from "react-codejar";
import Prism from "prismjs";
import "../../assets/styles/prism-dracula.css";

const InputCode = ({code, setCode, language}) => {

    const highlight = editor => {
        let code = editor.textContent;
        editor.innerHTML = Prism.highlight(
            code,
            language === "JavaScript" ? Prism.languages.javascript : language === "CSS" ? Prism.languages.css : Prism.languages.html,
            language
        );
    };

    return (
        <div className={"input-code"}>
            <ReactCodeJar
                code={code}
                onUpdate={setCode}
                highlight={highlight}
            />
        </div>
    )
}

export default InputCode;