import React from 'react';
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

import AssignmentIcon from '@material-ui/icons/Assignment';

import { useQuery, useMutation } from '@apollo/client';
import { ADD_CONTACT } from '../utils/mutations';
import { ADD_CONTACTS, UPDATE_CONTACTS, UPDATE_CURRENT_USER } from '../utils/actions';
import { useSelector, useDispatch } from 'react-redux';

const ContactList = ({ contact }) => {

  // const dispatch = useDispatch();
  // const [addContact, { error }] = useMutation(ADD_CONTACT);

  // const handleAddContact = async (username) => {
  //   try {

  //     // If the contact a user is trying to add is not added yet
  //     // add the contact, update the database and the global state
  //     if(!current_user.contacts.includes(username))
  //     {
  //       // add the contact to the database
  //       const { data } = await addContact({
  //         variables: { username },
  //       });

  //       const user = data?.addContact || {};

  //       // add the contact to global state
  //       dispatch({
  //         type: UPDATE_CURRENT_USER,
  //         current_user: user,
  //       });
  //     }
  //     else
  //     {
  //       alert("This person is already in your contact list!");
  //     }
  //   } catch (err) {
  //     console.log(err);
  //   }
  // };


  return (
    <CssBaseline>
      <div>
        {/* <h3 className='text-primary'>{title}</h3> */}
        <div className="flex-row justify-space-between my-4">
          <div key={contact.username} className="col-12 col-xl-6">
            <Container>
              <List>
                <Card>
                  <div className="card mb-3">
                    <h4 className="card-header bg-dark text-light p-0 m-0">
                      {contact.firstName} {contact.lastName} {contact.role}
                      
                      <Typography>username: {contact.username} <br /></Typography>
                    
                      <ListItem>
                      email: 
                        <a href="mailto:{contact.email}" target="_top">
                        {contact.email}
                        </a>
                      </ListItem>
                    
                    </h4>
                    <ListItem>
                      <ListItemIcon>
                        <AssignmentIcon />
                      </ListItemIcon>
                      <ListItemText
                        primary="Here is a good place to jot down notes about each of your contacts.  Suggested information might include reminders about their birdthday, favorite music, or pet's name.  Click Add to Contacts to add this user to your Team."
                      />
                    </ListItem>
                  </div>
                </Card>
              </List>
            </Container>
          </div>
        </div>
      </div>
    </CssBaseline>
  );
};

export default ContactList;
