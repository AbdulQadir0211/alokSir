import React, { useEffect, createContext, useReducer, useContext } from "react"
import { BrowserRouter, Route, Routes, useNavigate } from 'react-router-dom'
import './App.css';
import { Container } from '@mui/material';

//Reducer
import { reducer, initialState } from './reducers/userReducer'

//Screens
import Home from './screens/Home.js';
import SignIn from './screens/signIn.js';
import SignUp from './screens/signUp.js';

//Components
import DrawerAppBar from "./components/Navbar";

export const UserContext = createContext()

const Routing = () => {
  const navigate = useNavigate();
  const { state, dispatch } = useContext(UserContext)

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"))
    if (user) {
      dispatch({ type: "USER", payload: user })
      navigate('/')
    } else {
      navigate('/user/signin')
    }
  }, [])

  return (
    <Routes>
      <Route exact path='/' element={<Home />} />
      <Route exact path='/user/signin' element={<SignIn />} />
      <Route exact path='/user/register' element={<SignUp />} />
    </Routes>
  )
}


function App() {
  const [state, dispatch] = useReducer(reducer, initialState)

  return (
    <UserContext.Provider value={{ state, dispatch }}>
      <BrowserRouter>
        <DrawerAppBar className="navbar"></DrawerAppBar>
        <Container fixed>
          <Routing />
        </Container>
      </BrowserRouter>
    </UserContext.Provider>
  );
}

export default App;
