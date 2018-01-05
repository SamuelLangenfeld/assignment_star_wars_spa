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
import Resource from './Resource'
import {withRouter} from 'react-router-dom'

const NavLinks = () => {
  return (
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
    <NavLink activeClassName="active" exact to="/planets">
      Planets
    </NavLink>{' '}
    <NavLink activeClassName="active" exact to="/vehicles">
      Vehicles
    </NavLink>{' '}
    <NavLink activeClassName="active" exact to="/starships">
      Starships
    </NavLink>{' '}
    <NavLink activeClassName="active" exact to="/species">
      Species
    </NavLink>{' '}
  </div>
)}



const App = () => (
  <Router>
    <div>
      <NavLinks />
      <Switch>
        <Route exact path='/' component={Home} />
        <Route exact path="/films/:id" component={Film} />
        <Route exact path='/people/:id' component={Person} />
        <Route exact path='/films' render = {(props) => <ResourceList resource="films" name="title"/>  }  />
        
        <Route exact path='/people' render = {(props) => <ResourceList resource="people" name="name"/>  }  />
        <Route exact path='/planets' render = {(props) => <ResourceList resource="planets" name="name"/>  }  />
        <Route exact path='/planets/:id' render = {(props) => <Resource resource="planets" name="name"/>  }  />
        <Route exact path='/vehicles' render = {(props) => <ResourceList resource="vehicles" name="name"/>  }  />
        <Route exact path='/vehicles/:id' render = {(props) => <Resource resource="vehicles" name="name"/>  }  />
        <Route exact path='/species' render = {(props) => <ResourceList resource="species" name="name"/>  }  />
        <Route exact path='/species/:id' render = {(props) => <Resource resource="species" name="name"/>  }  />
        <Route exact path='/starships' render = {(props) => <ResourceList resource="starships" name="name"/>  }  />
        <Route exact path='/starships/:id' render = {(props) => <Resource resource="starships" name="name"/>  }  />

        <Route render={()=><h1>Page Not Found</h1>} />
      </Switch>
      <NavLinks />
    </div>
  </Router>
)

export default App;
