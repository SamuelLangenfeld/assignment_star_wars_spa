import React from 'react'
import {
  BrowserRouter as Router,
  Route,
  NavLink,
  Switch,
} from 'react-router-dom'
import ScrollToTop from './ScrollToTop'
import Home from './Home'
import Films from './Films'
import Film from './Film'
import People from './People'
import Person from './Person'
import ResourceList from './ResourceList'

const NavLinks = () => (
  <div className="NavLinks">
    <NavLink activeClassName="active" exact to="/">
      Home
    </NavLink>{' '}
    <NavLink activeClassName="active" exact to="/films">
      Films
    </NavLink>{' '}
     <NavLink activeClassName="active" exact to="/people">
      People
    </NavLink>{' '}
  </div>
)



const App = () => (
  <Router>
    <ScrollToTop>
      <NavLinks />
      <Switch>
        <Route exact path='/' component={Home} />
        <Route path="/films/:id" component={Film} />
         <Route path='/people/:id' component={Person} />
        <Route path='/films' render = {() => <ResourceList resource="films" name="title"/>  }  />
        
        <Route path='/people' component={People} />
        <Route render={()=><h1>Page Not Found</h1>} />
      </Switch>
      <NavLinks />
    </ScrollToTop>
  </Router>
)

export default App;
