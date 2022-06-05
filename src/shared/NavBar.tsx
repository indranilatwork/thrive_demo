import {useState , useEffect} from 'react';
import { AppBar, Toolbar, Typography, Button } from '@mui/material'
import { getData } from '../services/api/axiosServices'
import { useTheme } from '../services/theme/themeContext'


export const NavBar = () => {

    const {theme , toggleTheme} = useTheme();

    useEffect(() => {
        internalThemeToggle();
      }, [theme]);


    const internalThemeToggle = () => {
        let body = document.body;
        body.className = `${theme}`;
    };

    const themeToggleHandler = () => {
        toggleTheme();
    };

    return (
        <>
            <AppBar position="static" className="element-color">
                <Toolbar>
                    <Typography variant="h6" component="div" sx={{ flexGrow: 1 }} className="title-font padding-left-15">
                        Where in the world?
                    </Typography>
                    <Button color="inherit" onClick={themeToggleHandler} className="text-font">
                        <i className={`fas  margin-right ${ theme==='dark' ? 'fa-moon' : 'fa-sun'}`} ></i> {theme === 'dark' ? 'Dark' : 'Light'} Mode
                    </Button>
                </Toolbar>
            </AppBar>
        </>
    )
}
