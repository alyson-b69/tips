import React, { useState } from "react";
import axios from "axios";
import { useHistory } from "react-router-dom";
import API_URL from "../../config/config"
import slugify from "../../utils/slugify"
import {Container, Button, Form} from "react-bootstrap";
import SelectLanguage from "./SelectLanguage";
import InputCode from "./InputCode";


const PostTip = ({userId, token}) => {
    const [language, setLanguage] = useState("JavaScript")
    const [code, setCode] = useState('( Write your tip "here" )');
    const [title, setTitle] = useState("")

    let history = useHistory();

    const handleTitleChange = (e) => {
        e.preventDefault()
        setTitle(e.target.value)
    }

    const handleSubmitPost = (e) => {
        e.preventDefault()

        let data = {
            author_id: userId,
            title: title,
            slug: slugify(title),
            body: code,
        };

        axios.post(API_URL + "/tip", data,{
            method: "POST",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
                token: token,
            }
        }).then((result) => {
            const cat = language === "JavaScript" ? 3 : language === 'HTML' ? 1 : 2;
            let data = {
                tip_id: result.data.insertId,
                category_id: cat
            }
            axios.post(API_URL + "/tip_category", data, {
                method: "POST",
                headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json",
                    token: token,
                }
            }).then(result => {
                if(result.status === 201){
                    history.push("/")
                }
            })

        })
    }

    return (
        <Container className="post-tip">
            <h3>Create a new tip</h3>
            <form>
                <Form.Control type="text" value={title} onChange={handleTitleChange} placeholder="Title"/>
                <SelectLanguage language={language} setLanguage={setLanguage} />
                <InputCode code={code} setCode={setCode} language={language} />
                <Button onClick={handleSubmitPost}>Post a tip</Button>
            </form>
        </Container>
    )
}

export default PostTip