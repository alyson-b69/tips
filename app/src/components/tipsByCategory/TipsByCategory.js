import React, {useState, useEffect} from "react";
import axios from "axios"
import API_URL from "../../config/config"
import {Container, CardDeck, Button} from "react-bootstrap";

import TipCard from "../tips/TipCard";


const TipsByCategory = ({username, token, userId}) => {
    const [tips, setTips] = useState([])
    const categoryName = window.location.pathname.split("/")[2]
    const arrayCategory = [{id:1, name:"html"}, {id: 2, name: "css"},{id: 3, name: "javascript"}]

    const idCategory = arrayCategory.filter(category => category.name === categoryName)[0].id

    useEffect(()=>{
        axios
            .get(API_URL + "/only_view/category/" + idCategory, {
                method: "GET",
                headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json",
                },
            })
            .then((response) => {
                setTips(response.data);
            });
    }, [idCategory])

    return (
        <Container className="tips-view">
            <div className="title-container">
                <h3><span className="emoji"> 💡 </span> {categoryName} tips !</h3>
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

export default TipsByCategory