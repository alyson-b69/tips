import {useContext, useState, useEffect} from "react"
import {UserContext} from "./context/UserContext";
import { Switch, Route, Redirect } from "react-router-dom";

import Header from "./components/header/Header"
import Footer from "./components/footer/Footer";
import PostTip from "./components/createTip/PostTip"
import Sign from "./components/sign/Sign"
import Tips from "./components/tips/Tips"
import OneTip from "./components/oneTip/OneTip"
import MyFavorites from "./components/myFavorites/MyFavorites"
import MyTips from "./components/myTips/MyTips";
import TipsByCategory from "./components/tipsByCategory/TipsByCategory";

function App() {
    const {userName} = useContext(UserContext);
    const [token, setToken] = useState(localStorage.getItem("token"));
    const [userId, setUserId] = useState(localStorage.getItem("id"));
    const [username, setUsername] = useState(localStorage.getItem("name"));

    useEffect(()=>{
        setUsername(userName)
    }, [userName])

    const PrivateRoute = ({ component: Component, ...rest }) => {
        return (
            <Route
                {...rest}
                render={() => (userName != null ? <Component username={username} setUsername={setUsername} token={token} setToken={setToken} userId={userId} setUseId={setUserId} /> : <Redirect to="/log" />)}
            />
        );
    };

  return (
    <div className="App">
      <Header username={username}/>
      <main>
          <Switch>
              <Route exact path="/" render={()=> (<Tips username={username} userId={userId} token={token}/>)}/>
              <Route path="/log" render={()=> <Sign setToken={setToken} setUserId={setUserId} />}/>
              <Route path="/tip/:tip_slug" component={OneTip} />
              <Route path="/category/:category_name" render={()=> (<TipsByCategory username={username} userId={userId} token={token} />)} />
              <PrivateRoute path="/new-tip" component={PostTip} username={username} setUsername={setUsername} token={token} setToken={setToken} userId={userId} setUseId={setUserId}/>
              <PrivateRoute path="/my-favorites" component={MyFavorites} username={username} setUsername={setUsername} token={token} setToken={setToken} userId={userId} setUseId={setUserId}/>
              <PrivateRoute path="/my-tips" component={MyTips} username={username} setUsername={setUsername} token={token} setToken={setToken} userId={userId} setUseId={setUserId} />
          </Switch>

      </main>
        <Footer />
    </div>
  );
}

export default App;
