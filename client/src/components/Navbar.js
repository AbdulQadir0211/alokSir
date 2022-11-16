import React, { useContext } from "react";
import PropTypes from 'prop-types';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';
import Drawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import MenuIcon from '@mui/icons-material/Menu';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { Container } from '@mui/system';

import { Link, useNavigate } from 'react-router-dom';
import { UserContext } from '../App';
const drawerWidth = 240;

function DrawerAppBar(props) {
    const { window } = props;
    const [mobileOpen, setMobileOpen] = React.useState(false);

    const navigate = useNavigate();
    const { state, dispatch } = useContext(UserContext)

    const handleDrawerToggle = () => {
        setMobileOpen(!mobileOpen);
    };

    const drawer = (
        <Box onClick={handleDrawerToggle} sx={{ textAlign: 'center' }}>
            <Typography variant="h6" sx={{ my: 2 }}>
                <Link to={state ? "/" : "/user/signin"}>
                    GEC Pvt. Ltd.
                </Link>
            </Typography>
            <Divider />
            {
                state ?
                    <List>
                        <ListItem key={"Sign Out"} disablePadding>
                            <Link to={"/user/signin"}>
                                <ListItemButton
                                    onClick={() => {
                                        navigate('/user/signin')
                                        dispatch({ type: "CLEAR" })
                                        localStorage.clear()
                                    }}
                                    sx={{ textAlign: 'center' }}>
                                    <ListItemText primary={"Sign Out"} />
                                </ListItemButton>
                            </Link>
                        </ListItem>
                    </List>
                    :
                    <List>
                        <ListItem key={"Sign In"} disablePadding>
                            <Link to={"/user/signin"}>
                                <ListItemButton sx={{ textAlign: 'center' }}>
                                    <ListItemText primary={"Sign In"} />
                                </ListItemButton>
                            </Link>
                        </ListItem>
                        <ListItem key={"Register"} disablePadding>
                            <Link to={"/user/register"}>
                                <ListItemButton sx={{ textAlign: 'center' }}>
                                    <ListItemText primary={"Register"} />
                                </ListItemButton>
                            </Link>
                        </ListItem>
                    </List>
            }
        </Box>
    );

    const container = window !== undefined ? () => window().document.body : undefined;

    return (
        <Box sx={{ display: 'flex' }}>
            <AppBar component="nav">
                <Container>
                    <Toolbar>
                        <IconButton
                            color="inherit"
                            aria-label="open drawer"
                            edge="start"
                            onClick={handleDrawerToggle}
                            sx={{ mr: 2, display: { sm: 'none' } }}
                        >
                            <MenuIcon />
                        </IconButton>
                        <Typography
                            variant="h6"
                            component="div"
                            sx={{ flexGrow: 1, display: { xs: 'none', sm: 'block' } }}
                        >
                            <Link to={state ? "/" : "/user/signin"}>
                                GEC Pvt. Ltd.
                            </Link>
                        </Typography>
                        {
                            state ?
                                <Box sx={{ display: { xs: 'none', sm: 'block' } }}>
                                    <Link to="/user/signin">
                                        <Button
                                            onClick={() => {
                                                navigate('/user/signin')
                                                dispatch({ type: "CLEAR" })
                                                localStorage.clear()
                                            }}
                                            key={"Sign Out"} sx={{ color: '#fff' }}>
                                            Sign Out
                                        </Button>
                                    </Link>
                                </Box>
                                :
                                <>
                                    <Box sx={{ display: { xs: 'none', sm: 'block' } }}>
                                        <Link to="/user/signin">
                                            <Button key={"Sign In"} sx={{ color: '#fff' }}>
                                                Sign In
                                            </Button>
                                        </Link>
                                    </Box>
                                    <Box sx={{ display: { xs: 'none', sm: 'block' } }}>
                                        <Link to="/user/register">
                                            <Button key={"Register"} sx={{ color: '#fff' }}>
                                                Register
                                            </Button>
                                        </Link>
                                    </Box>
                                </>
                        }
                    </Toolbar>
                </Container>
            </AppBar>
            <Box component="nav">
                <Drawer
                    container={container}
                    variant="temporary"
                    open={mobileOpen}
                    onClose={handleDrawerToggle}
                    ModalProps={{
                        keepMounted: true, // Better open performance on mobile.
                    }}
                    sx={{
                        display: { xs: 'block', sm: 'none' },
                        '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
                    }}
                >
                    {drawer}
                </Drawer>
            </Box>
        </Box>
    );
}

DrawerAppBar.propTypes = {
    window: PropTypes.func,
};

export default DrawerAppBar;
