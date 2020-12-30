const SelectLanguage = ({language, setLanguage}) => {

    const handleOptionChange = (e) => {
        setLanguage(e.target.value)
    }

    return (
        <div className={"select-language"}>
            <div className="radio">
                <label>
                    <input type="radio" value="JavaScript" checked={language === "JavaScript"} onChange={handleOptionChange} />
                    JavaScript
                </label>
            </div>
            <div className="radio">
                <label>
                    <input type="radio" value="HTML" checked={language === "HTML"} onChange={handleOptionChange} />
                    HTML
                </label>
            </div>
            <div className="radio">
                <label>
                    <input type="radio" value="CSS" checked={language === "CSS"} onChange={handleOptionChange} />
                    CSS
                </label>
            </div>
        </div>
    )
}

export default SelectLanguage