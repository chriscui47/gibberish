
import {AppBar, Button, ButtonGroup, Container, createStyles, DialogActions, DialogContent, IconButton, List, ListItem, ListItemText, Menu, MenuItem, Paper, styled, SwipeableDrawer, Switch, Typography, useMediaQuery} from "@material-ui/core";
import Toolbar from "@material-ui/core/Toolbar";
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Redirect } from 'react-router';
import HomeIcon from '@material-ui/icons/Home';
import { makeStyles } from '@material-ui/core/styles';
import AddCircleIcon from '@material-ui/icons/AddCircle';
import tongue from './tongue.png';
const useStyles = makeStyles(theme => createStyles({
	header: {
		position: "relative",
		zIndex: 1300
	},
	appBar: {
		//background: '#3E4142',
		background: '#1D1C1A',
		color: 'white',
		width:'100%',
		height:'5%'
	},
	logoIcon: {
		height: "2rem",
		width: "auto",
		paddingRight: "1rem",
		fontStyle: 'roberto'
	},
	logo: {
		color: 'white',
		textDecoration: "none",
		display: "flex",
		alignItems: "center",
		fontWeight: 700
	},
	appBarButton: {
		marginLeft: "0.5rem"
	},
	appBarButtonRight: {
		marginRight: "0.5rem"
	},
	drawer: {
		minWidth: "50vw",
		"& a": {
			display: "flex",
			justifyContent: "flex-start",
			marginTop: "0.5rem",
			marginBottom: "0.5rem"
		}
	}
}));

const Toolbarapp = ({ gamen,name }) => {
	const classes = useStyles();

	const mobile = useMediaQuery('(max-width:768px)');

     return (
                <AppBar className={classes.appBar} classes={{root: classes.header}} position="static" elevation={0}>
                                <Toolbar>

								<Typography className={classes.logo} variant={mobile ? "body1" : "h5"} style={{marginRight: mobile ? "auto" : '4vw'}}>
									<img src={tongue} style={{height:'2vw',width:'4vw',marginRight:'0.3vw'}}></img>	GIBBERISH

								</Typography>
                                    <Typography variant={mobile ? "body1" : "h5"} style={{marginRight: mobile ? "auto" : undefined}}>
                                        <Link to={"/"} className={classes.logo}>
											
											<HomeIcon fontSize="large" />         <span style={{marginLeft:'0.3vw',marginRight:'2vw'}}>Home</span>
                                        </Link>
                                    </Typography>



									<Typography variant={mobile ? "body1" : "h5"} style={{marginRight: mobile ? "auto" : undefined}}>
                                        
																<Link className={classes.logo} onClick={e => {
																
																if(!name){
																e.preventDefault();
																alert("Enter your username before creating lobby");
																}else{
																	return null;
																}
															
																}}
																to={`/lobby?name=${name}`}>
    
											
									<AddCircleIcon />   <span style={{marginLeft:'0.3vw'}}>  Create Game </span>
									</Link>
                                    </Typography>


                                </Toolbar>
                            </AppBar>

                    );

                    }
                    
                    
                    
                    export default Toolbarapp;