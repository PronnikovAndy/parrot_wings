import React, {useEffect} from 'react';
import Menu from './components/Menu';
import Signin from "./components/Signin";
import Signup from "./components/Signup";
import {useDispatch} from "react-redux";
import {signin} from './Store/Actions';
import Main from "./components/Main";

function App() {
    const dispatch = useDispatch();
    useEffect(() => {
        const token = localStorage.getItem("access_token");
        console.log('token', token);

        if(token) {
            dispatch(signin.success(token));
        }
    }, [dispatch]);

  return (
    <>
      <Menu />
      <Main />
      <main>
          <Signin />
          <Signup />
      </main>
    </>
  );
}

export default App;
