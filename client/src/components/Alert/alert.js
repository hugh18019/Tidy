import React, { useState, useEffect, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Alert from '@material-ui/lab';
import { UPDATE_SHOW_ALERT } from '../../utils/actions';

import useStyles from '../../pages/styles';
import styled from '@emotion/styled';
import {
    Typography,
    Card,
    CssBaseline,
    List,
    ListItem,
    ListItemIcon,
    ListItemText,
    Paper,
    Container,
    Button
  } from '@material-ui/core';

export const StyleWrapper = styled.div`
  #cardStyle {
    background-image: 
      radial-gradient(rgba(0, 255, 0, 0.4),
      rgba(0, 20, 0, 0.7)));
      // url("../../logo.png");
      background-repeat: no-repeat;
      background-size: 100%;
      background-color: rgba(0, 100, 50, 0.5);
      margin: 20px
  },
  #namesCard {
    background-image: 
      radial-gradient(rgba(0, 255, 0, 0.4),
      rgba(0, 20, 0, 0.7)));
      // url("../../logo.png");
      background-repeat: no-repeat;
      background-size: 100%;
      background-color: rgba(0, 100, 50, 0.5);
      margin: 20px
  },

  #paperStyle {
    
    padding-top: 2px;
    padding-bottom: 2px;
    font-size: 1.4em;
    text-align: center;
    border: 2px solid rgba(100, 200, 150, 0.5);
    border-radius: 12px;
    background-color: rgba(0, 100, 50, 0.5);
  }
`;

  const AlertBox = () => {

    const classes = useStyles();
    const dispatch = useDispatch();

    useEffect(() => {
        setTimeout(() => {
            dispatch({
                type: UPDATE_SHOW_ALERT,
                showAlert: false
            });
        }, 5000);   
    }, [])

    return (

            <StyleWrapper>
                <Card className={classes.card} id='cardStyle'>
                <Typography variant='h5'>
                    <div id='namesCard'>
                    <h6 style={{ textAlign: "center"}}>
                        The person is already in your contact!
                    </h6>
                    </div>
                </Typography>
                </Card>
            </StyleWrapper>   
    );
  }

  export default AlertBox;