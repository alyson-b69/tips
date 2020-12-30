import React, {useState, useEffect} from "react";
import axios from "axios"
import API_URL from "../../config/config"
import {Container, CardDeck, Button} from "react-bootstrap";

import TipCard from "./TipCard";


const Tips = ({username, token, userId}) => {
    const [tips, setTips] = useState([])

    useEffect(()=>{
        axios
            .get(API_URL + "/only_view/tip", {
                method: "GET",
                headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json",
                },
            })
            .then((response) => {
                setTips(response.data);
            });
    }, [])

    return (
        <Container className="tips-view">
            <div className="title-container">
                <h3><span className="emoji"> 💡 </span> All tips !</h3>
                {username && <Button href="/new-tip"> Create a tip</Button>}
            </div>
            <CardDeck className="pl-2 pr-2" key={`${tips.length}_articles`}>
                {tips?.map(tip => {
                    return (
                        <div
                            className="col-12 col-sm-12 col-md-6 col-lg-4 p-1 pb-3 mb-2"
                            key={`tip__${tip.slug}`}
                        >
                            <TipCard tip={tip} username={username} token={token} userId={userId}/>
                        </div>)
                })}
            </CardDeck>
        </Container>
    )
}

export default Tips