import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  createHttpLink,
} from '@apollo/client'
import { setContext } from '@apollo/client/link/context'

import Dashboard from './pages/Dashboard'
import Login from './pages/Login'
import Signup from './pages/Signup'
import { HomeProvider } from './utils/GlobalState'
import DevicePage from './pages/DevicePage'

const httpLink = createHttpLink({
  uri: '/graphql',
})

const authLink = setContext((_, { headers }) => {
  const token = localStorage.getItem('id_token')
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : '',
    },
  }
})

const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
})

function App() {
  return (
    <ApolloProvider client={client}>
      <Router>
        <div>
          <HomeProvider>

          {/* <Nav /> */}
          <Routes>
            <Route path='/' element={<Dashboard />} />
            <Route path='/login' element={<Login />} />
            <Route path='/signup' element={<Signup />} />
            <Route path='/devices' element={<DevicePage />} />
            <Route path='/rooms/:id' element={<DevicePage />} />

          </Routes>
          </HomeProvider>

          {/* </HomeProvider> 
          /devices?deviceId=__ <- search params
          /devices/__ <- useLocation or window.location.href
          
          
          */}

        </div>
      </Router>
    </ApolloProvider>
  )
}

export default App
