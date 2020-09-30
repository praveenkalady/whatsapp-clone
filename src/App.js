import React,{ useState,useEffect } from 'react';
import Sidebar from './Sidebar';
import './App.css';
import Chat from './Chat';
import { BrowserRouter as Router,Switch,Route } from 'react-router-dom';
import Login from './Login';
import {connect} from 'react-redux';
function App(props) {
  const [user,setUser] = useState(null);
  return (
    <div className="app">
        {!props.user ? (
          <Login />
        ) : (
          <div className="app__body">
            <Router>
              <Sidebar />
              <Switch>
                <Route exact path="/" component={Chat} />
                <Route exact path="/rooms/:roomId" component={Chat} />
              </Switch>
            </Router>
        </div>
        )}
    </div>
  );
}

export default connect((state,props) =>({
  user:state.auth.user
}))(App);
