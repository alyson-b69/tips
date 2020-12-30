import {useState, useEffect} from "react";
import axios from "axios";
import API_URL from "../../config/config"
import {Card, Button} from "react-bootstrap"
import {ReactCodeJar} from "react-codejar";
import { Link } from "react-router-dom";
import Prism from "prismjs";
import "../../assets/styles/prism-dracula.css";
import Moment from "react-moment"
import { RiTimeLine } from "react-icons/ri"
import { IoMdPricetag } from "react-icons/io"
import {FaUser, FaHeart, FaRegHeart, FaTrashAlt} from "react-icons/fa"

const TipCard = ({tip, username, userId, token, tips, setTips}) => {
    const link = "/tip/" + tip.slug;
    const [likedBy, setLikedBy] = useState([])
    const [category, setCategory] = useState(null)
    const path = window.location.pathname
    const [code, setCode] = useState(tip.body)

    useEffect(()=> {
        if(username){
            axios.get(API_URL + "/like/tip/" + tip.tip_id, {
                method: "GET",
                headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json",
                    token: token,
                }})
                .then(response => {
                    let likedUsername = []
                    response.data.map(item => {
                        return likedUsername.push(item.username)
                    })
                    setLikedBy(likedUsername)}
                )
        }


        axios.get(API_URL + "/only_view/tip_category/tip/" + tip.tip_id, {
            method: "GET",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
                token: token,
            }})
            .then(response => {
                setCategory([response.data[0]?.id, response.data[0]?.name ])}
            )

    }, [tip.tip_id, token, username])

    const handleDislike = () => {
        let data = {
            user_id: parseInt(userId),
            tip_id: parseInt(tip.tip_id),
        }

        axios.delete(API_URL + "/like", {
            method: "DELETE",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
                token: token,
            },
            data: data,
        }).then(result => {
            if (result.status === 202) {
                const index = likedBy.indexOf(username)
                let newLikedBy = [...likedBy]
                if(index > -1) {
                    newLikedBy.splice(index, 1)
                    setLikedBy(newLikedBy)
                }
            }
        })

    }

    const handleLike = () => {
        let data = {
            user_id: userId,
            tip_id: tip.tip_id,
        }
        axios.post(API_URL + "/like", data, {
            method: "POST",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
                token: token,
            }}).then(result => {
                if (result.status === 201) {
                    let newLikedBy = [...likedBy, username]
                  setLikedBy(newLikedBy)
                }
        })
    }

    const handleDeleteTip = (e) => {
        e.preventDefault()

        const data = {
            tip_id: tip.tip_id
        }

        axios.delete(API_URL + "/tip_category/tip",   {
            method: "DELETE",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
                token: token,
            }, data: data,
        }).then(() => {
            axios.delete(API_URL + "/like/tip",   {
                method: "DELETE",
                headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json",
                    token: token,
                },
                data:data,
            }).then(()=> {
                axios.delete(API_URL + "/tip", {
                    method: "DELETE",
                    headers: {
                        Accept: "application/json",
                        "Content-Type": "application/json",
                        token: token,
                    },
                    data: data,
                }).then(result => {
                    if (result.status === 202) {
                        const newTips = [...tips]
                        const index = newTips.map(e => e.tip_id).indexOf(tip.tip_id)
                        newTips.splice(index, 1)
                        setTips(newTips)
                    }
                })
            })
        })
    }

if (!category || category?.length < 1 ){
    return (
        <Card className="h-100">
            Loading ...
        </Card>
    )
} else {
        let highlight = (editor) => {
        let code = editor.textContent;
        editor.innerHTML = Prism.highlight(
            code,
            category[1] === "JavaScript" ? Prism.languages.javascript : category[1] === "HTML" ? Prism.languages.html : Prism.languages.css,
            category[1].toLowerCase()
        );
    };

        return (
            <Card className="h-100">
                <Link to={{ pathname: link, state: { detail: tip, category: category, username: username, userId: userId, token: token} }}>
                    <div className={"card-code"}>
                        <ReactCodeJar
                            code={code.length > 100 ? code.slice(0,100) + " [ ... ]  " : code}
                            highlight={highlight}
                            onUpdate={setCode}
                        />
                    </div>
                </Link>
                <Card.Body>
                    <Card.Title>
                        <Link to={{ pathname: link, state: { detail: tip, category: category, username: username, userId: userId, token: token} }}>
                            {tip.title}
                        </Link>
                    </Card.Title>
                    {path === "/my-tips" && parseInt(tip.author_id) === parseInt(userId) ? (
                        <Button variant="delete" onClick={handleDeleteTip}>
                            <FaTrashAlt />
                        </Button>
                    ) : (
                        ""
                    )}
                </Card.Body>

                <Card.Footer>
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
                        {username ? likedBy.includes(username) ?
                            <div className="footer-category">
                                <FaHeart fontSize="1.3em" color="#de1051" onClick={handleDislike}/>
                            </div> : <div className="footer-category"> <FaRegHeart fontSize="1.3em" color="#de1051" onClick={handleLike}/> </div> : ""}

                    </div>
                </Card.Footer>

            </Card>
        )
}

}

export default TipCard