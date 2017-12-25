import React from 'react'
import { Switch, Route } from 'react-router-dom'
import List from './List'
import ItemDetails from './ItemDetails'

const Main = () => (
  <main className='main'>
    <Switch>
      <Route exact path='/' component={List}/>
      <Route path='/item/:itemTitle' component={ItemDetails}/>
    </Switch>
  </main>
)

export default Main
