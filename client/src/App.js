/* eslint-disable jsx-a11y/alt-text */
import React from 'react';
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  createHttpLink,
} from '@apollo/client';
import { AccountProvider } from './utils/GlobalState';
import { setContext } from '@apollo/client/link/context';
// import { createBrowserHistory } from 'history';
import { Routes, Route } from 'react-router-dom';
import CalendarPage from './pages/calendar.js';
import Contacts from './pages/contacts.js';
import Events from './pages/events.js';
import Home from './pages/Home.js';
import Landing from './pages/landing.js';
import Photos from './pages/photos.js';
import Profile from './pages/profile.js';
import SignIn from './pages/SignIn.js';
import SignUp from './pages/Signup.js';
import Tasks from './pages/tasks.js';
import Team from './pages/team.js';
import Todos from './pages/todos.js';
import Weather from './pages/weather.js';
import PolishNav from './components/PolishNav';
import Dashboard from './pages/dashboard.js';
import NoMatch from './pages/NoMatch';
import Tests from './pages/testPage';
import { ChakraProvider } from '@chakra-ui/react';

// Construct our main GraphQL API endpoint
const httpLink = createHttpLink({
  uri: '/graphql',
});

const authLink = setContext((_, { headers }) => {
  // get the authentication token from local storage if it exists
  const token = localStorage.getItem('id_token');
  // return the headers to the context so httpLink can read them
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : '',
    },
  };
});

const client = new ApolloClient({
  // Set up our client to execute the `authLink` middleware prior to making the request to our GraphQL API
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});

function App() {
  return (
    <ApolloProvider client={client}>
        {/* <div> */}
          <AccountProvider>
            <PolishNav />
            <Routes>
              <Route exact path='/dashboard' element={<Dashboard />} />
              {/* <Route exact path="/calendar" component={<Calendar />} /> */}
              <Route exact path='/contacts' element={<Contacts />} />
              <Route exact path='/events' element={<Events />} />
              <Route exact path='/photos' element={<Photos />} />
              <Route exact path='/profile' element={<Profile />} />
              <Route exact path='/team' element={<Team />} />
              <Route exact path='/todos' element={<Tasks />} />
              <Route exact path='/signin' element={<SignIn />} />
              <Route exact path='/signup' element={<SignUp />} />
              <Route exact path='/signout' element={<SignIn />} />
              <Route exact path='/tasks' element={<Tasks />} />
              <Route exact path='/tests' element={<Tests />} />
              <Route exact path='/weather' element={<Weather />} />
              <Route exact path='/calendar' element={<CalendarPage />} />
              <Route exact path='/' element={<Landing />} />
              <Route component={NoMatch} />
            </Routes>
          </AccountProvider>
        {/* </div> */}
    </ApolloProvider>
  );
}

export default App;
