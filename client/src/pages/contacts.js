import React, {useState, useEffect} from 'react';

// import styles
import useStyles from './styles';
import { Typography, Container, Paper, Button, Card } from '@material-ui/core';
import styled from '@emotion/styled';

import { useQuery, useMutation } from '@apollo/client';
import { QUERY_MESSAGES, QUERY_USERS, QUERY_ME } from '../utils/queries';
import { ADD_CONTACT } from '../utils/mutations';
import { useSelector, useDispatch } from 'react-redux';
import { ADD_CONTACTS, UPDATE_CONTACTS, UPDATE_CURRENT_USER } from '../utils/actions';

import ContactList from '../components/contactList';
import AlertBox from '../components/Alert/alert';

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

function Contacts() {

  const dispatch = useDispatch();

  const classes = useStyles();

  // Get the data of all registered users from the backend
  const { loading, data } = useQuery(QUERY_USERS);

  // Extract all registered users from data
  const users = data?.users || [];

  // Get the currently logged in user
  const current_user_data = useQuery(QUERY_ME).data;

  if (!current_user_data)
    return (
      <StyleWrapper>
        <Card className={classes.card} id='cardStyle'>
          <Typography variant='h5'>
            <div id='namesCard'>
              <h3 style={{ textAlign: "center"}}>Please login</h3>
            </div>
          </Typography>
        </Card>
      </StyleWrapper>
    )
  else {
    const current_user = current_user_data.me;

    dispatch({
      type: UPDATE_CURRENT_USER,
      current_user: current_user
    })

    return (
      <main>
        <StyleWrapper>
          <Container>
            <div className='flex-row justify-center'>
              <Paper id='paperStyle'>
                <div className='col-12 col-md-10 my-3'>
                  {loading ? (
                    <div>Loading...</div>
                  ) : (
                    users.map((user) => (
                      <Card className={classes.card} id='cardStyle'>
                        <Typography variant='h5'>
                          <div id='namesCard'>
                            <ContactList contact={user} />
                            {/* null is passed as the first argument to bind, which sets the scope of the handleJoinEvent function to the current page. This is how event._id is passed to the function as an argument. */}
                          </div>
                        </Typography>
                      </Card>
                    ))
                  )}
                </div>
              </Paper>
            </div>
          </Container>
        </StyleWrapper>
      </main>
    );
  }
}

export default Contacts;
