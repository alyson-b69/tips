import React, {useState, useEffect} from "react";
import axios from "axios"
import API_URL from "../../config/config"
import {Container, CardDeck, Button} from "react-bootstrap";

import TipCard from "../tips/TipCard";


const MyTips = ({username, token, userId}) => {
    const [tips, setTips] = useState([])

    useEffect(()=>{
        axios
            .get(API_URL + "/tip/author/" + userId, {
                method: "GET",
                headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json",
                    token: token
                },
            })
            .then((response) => {
                setTips(response.data);
            });
    }, [userId, token])


    return (
        <Container className="tips-view">
            <div className="title-container">
                <h3><span className="emoji"> 💡 </span> My tips !</h3>
                <Button href="/new-tip"> Create a tip</Button>
            </div>

            <CardDeck className="pl-2 pr-2" key={`${tips.length}_articles`}>
                {tips?.map(tip => {
                    return (
                        <div
                            className="col-12 col-sm-12 col-md-6 col-lg-4 p-1 pb-3 mb-2"
                            key={`tip__${tip.slug}`}
                        >
                            <TipCard tip={tip} username={username} token={token} userId={userId} tips={tips} setTips={setTips} />
                        </div>)
                })}
            </CardDeck>
        </Container>
    )
}

export default MyTips