import React, { useState, useContext } from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import { Container } from '@mui/system';
import { styled } from '@mui/material/styles';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import { Link, useNavigate } from 'react-router-dom';
import { toast,ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.min.css'

const SignUp = () => {
    const navigate = useNavigate();

    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")


    async function PostData() {
        try {
            if (!/^(([^<>()\\[\]\\.,;:\s@"]+(\.[^<>()\\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(email)) {
                <ToastContainer
                    position='bottom-right'
                    autoClose={5000}
                    hideProgressBar={true}
                />
                toast('Invalid Email', { position: toast.POSITION.BOTTOM_CENTER })
            } else {
                let res = await fetch("http://localhost:5000/user/register", {
                    method: "post",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({
                        name,
                        email,
                        password
                    })
                })
                console.log(res)
                let data = await res.json()
                if (data.error) {
                    console.log(data.error)
                    toast(data.error,
                        { position: toast.POSITION.TOP_RIGHT })
                } else {
                    console.log(data.message)
                    toast(data.message,
                        { position: toast.POSITION.TOP_RIGHT })
                    navigate('/user/signin')
                }
            }

        } catch (error) {
            console.log(error)
        }

    }

    return (
        <Container>
            <Box style={{ display: "flex", marginTop: "200px" }}>
                <Grid container spacing={4}>
                    <Grid item xs={12} md={4} lg={6}>
                        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."                    </Grid>
                    <Grid item xs={12} md={8} lg={6}>
                        <Card sx={{ minWidth: 275 }}>
                            <CardContent>
                                <div>
                                    <TextField
                                        style={{ width: "90%" }}
                                        id="standard-basic"
                                        label="Name"
                                        variant="standard"
                                        type={"string"}
                                        value={name}
                                        onChange={(e) => setName(e.target.value)}
                                    />
                                    <TextField
                                        style={{ width: "90%" }}
                                        id="standard-basic"
                                        label="Email"
                                        variant="standard"
                                        type={"string"}
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                    />
                                    <TextField
                                        style={{ width: "90%" }}
                                        id="standard-basic"
                                        label="Password"
                                        variant="standard"
                                        type="password"
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                    />
                                </div>
                                <Button
                                    onClick={() => PostData()}
                                    style={{ marginTop: "10px" }} size="medium" variant="contained">
                                    Sign Up</Button>
                                <h5 >
                                    <Link className="linkStyle" to='/signup'>Don't Have an Account?</Link>
                                </h5>
                                <h6 >
                                    <Link className="linkStyle" to='/reset'>Forgot Password?</Link>
                                </h6>
                            </CardContent>
                        </Card>
                    </Grid>
                </Grid>
            </Box>
        </Container>
    );
}

export default SignUp