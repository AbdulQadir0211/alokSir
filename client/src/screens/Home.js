import React, { useState, useContext } from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import { Container } from '@mui/system';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import { Link, useNavigate } from 'react-router-dom';

const Home = () => {
    const [first, setFirst] = useState("")
    const [second, setSecond] = useState("")
    const [third, setThird] = useState("")
    const [fourth, setFourth] = useState("")
    const [fifth, setFifth] = useState("")

    const navigate = useNavigate();


    async function PostData() {
        try {
            let res = await fetch("http://localhost:5000/prediction/model", {
                method: "post",
                headers: {
                    "Content-Type": "application/json",
                    'Accept': 'application/json',
                    "Authorization": localStorage.getItem("jwt")
                },
                body: JSON.stringify({
                    first,
                    second,
                    third,
                    fourth,
                    fifth
                })
            })
            console.log(res)
            let data = await res.json()
            console.log(data)
        } catch (error) {
            console.log(error)
        }

    }

    return (
        <Container>
            <Box style={{ marginTop: "200px", alignItems: "center", justifyContent: "center" }}>
                <Grid container spacing={4} style={{ width: "100%" }}>
                    <Grid item xs={12} md={8} center>
                        <Card sx={{ minWidth: 275 }}>
                            <CardContent>
                                <div>
                                    <TextField
                                        style={{ width: "100%" }}
                                        id="standard-basic"
                                        label="Standard"
                                        variant="standard"
                                        value={first}
                                        onChange={(e) => setFirst(e.target.value)}
                                    />
                                    <TextField
                                        style={{ width: "100%" }}
                                        id="standard-basic"
                                        label="Standard"
                                        variant="standard"
                                        value={second}
                                        onChange={(e) => setSecond(e.target.value)}
                                    />
                                    <TextField
                                        style={{ width: "100%" }}
                                        id="standard-basic"
                                        label="Standard"
                                        variant="standard"
                                        value={third}
                                        onChange={(e) => setThird(e.target.value)}
                                    />
                                    <TextField
                                        style={{ width: "100%" }}
                                        id="standard-basic"
                                        label="Standard"
                                        variant="standard"
                                        value={fourth}
                                        onChange={(e) => setFourth(e.target.value)}
                                    />
                                    <TextField
                                        style={{ width: "100%" }}
                                        id="standard-basic"
                                        label="Standard"
                                        variant="standard"
                                        value={fifth}
                                        onChange={(e) => setFifth(e.target.value)}
                                    />
                                </div>

                                <Button
                                    onClick={() => PostData()}
                                    style={{ marginTop: "10px" }} size="medium" variant="contained">
                                    Predict
                                </Button>
                            </CardContent>
                        </Card>
                    </Grid>
                </Grid>
            </Box>
        </Container>
    )
}

export default Home