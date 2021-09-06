import React from 'react';
import { Typography } from '@material-ui/core';

import { useQuery, useMutation } from '@apollo/client';
import { QUERY_MESSAGES, QUERY_USERS } from '../utils/queries';

import ContactList from '../components/contactList';
import { ADD_CONTACT } from '../utils/mutations';

function Contacts() {
  // const { loading, data } = useQuery(QUERY_MESSAGES);

  // console.log(data);

  // const messages = data?.messages || [];

  const { loading, data } = useQuery(QUERY_USERS);
  const contacts = data?.users || [];

  const [addContact, { error }] = useMutation(ADD_CONTACT);

  const handleAddContact = (username) => {
    try {
      const { data } = addContact({
        variables: { username },
      });

      const contact = data?.user || {};
    } catch (err) {
      console.log(err);
    }
  };

  return (
    // <div className='App'>
    //   <Typography variant='h1'>Contacts</Typography>
    //   <div>
    //     {loading ? (
    //       <div>Loading...</div>
    //     ) : (
    //       <ContactList
    //         events={users}
    //         title="Here's your current roster of users:"
    //       />
    //     )}

    //     {/* {users.map((user) => (
    //       <div>
    //         <p> Username: {user.username}</p>
    //         <p> First Name: {user.firstName}</p>
    //         <p> Last Name: {user.lastName} </p>
    //       </div>
    //     ))} */}
    //   </div>
    // </div>
    <main>
      <div className='flex-row justify-center'>
        <div className='col-12 col-md-10 my-3'>
          {loading ? (
            <div>Loading...</div>
          ) : (
            contacts.map((contact) => (
              <div>
                <ContactList contact={contact} />
                {/* null is passed as the first argument to bind, which sets the scope of the handleJoinEvent function to the current page. This is how event._id is passed to the function as an argument. */}
                <button onClick={handleAddContact.bind(null, contact.username)}>
                  Add to contacts
                </button>
              </div>
            ))
          )}
        </div>
      </div>
    </main>
  );
}

export default Contacts;
