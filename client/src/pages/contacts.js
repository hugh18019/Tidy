import React, {useState, useEffect} from 'react';

import Alert from '@material-ui/lab/Alert';
import { Typography, Container, Paper, Button, Card } from '@material-ui/core';
import styled from '@emotion/styled';

import { useQuery, useMutation } from '@apollo/client';
import { QUERY_MESSAGES, QUERY_USERS, QUERY_ME } from '../utils/queries';

import ContactList from '../components/contactList';
import { ADD_CONTACT } from '../utils/mutations';

import { useSelector, useDispatch } from 'react-redux';

// import styles
import useStyles from './styles';
import { ADD_CONTACTS, UPDATE_CONTACTS, UPDATE_CURRENT_USER } from '../utils/actions';

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
  console.log('users', users);

  const current_user_data = useQuery(QUERY_ME).data;

  const [addContact, { error }] = useMutation(ADD_CONTACT);

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
  
  const current_user = current_user_data.me;

  const handleAddContact = async (username) => {
    try {

      // If the contact a user is trying to add is not added yet
      // add the contact, update the database and the global state
      if(!current_user.contacts.includes(username))
      {
        // add the contact to the database
        const { data } = await addContact({
          variables: { username },
        });

        const user = data?.addContact || {};

        // add the contact to global state
        dispatch({
          type: UPDATE_CURRENT_USER,
          current_user: user,
        });
      }
      else
      {
        alert("This person is already in your contact list!");
      }
    } catch (err) {
      console.log(err);
    }
  };

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
                          <Button>
                            <button
                              onClick={handleAddContact.bind(
                                null,
                                user.username
                              )}
                            >
                              Add to contacts
                            </button>
                          </Button>
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

  return (
    <div>current_user.username</div>
  );
}

export default Contacts;
