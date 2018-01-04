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
)



const App = () => (
  <Router>
    <ScrollToTop>
      <NavLinks />
      <Switch>
        <Route exact path='/' component={Home} />
        <Route exact path="/films/:id" component={Film} />
         <Route exact path='/people/:id' component={Person} />
        <Route exact path='/films' render = {() => <ResourceList resource="films" name="title"/>  }  />
        
        <Route exact path='/people' render = {() => <ResourceList resource="people" name="name"/>  }  />
        <Route exact path='/planets' render = {() => <ResourceList resource="planets" name="name"/>  }  />
        <Route exact path='/planets/:id' render = {() => <Resource resource="planets" name="name"/>  }  />
        <Route exact path='/vehicles' render = {() => <ResourceList resource="vehicles" name="name"/>  }  />
        <Route exact path='/vehicles/:id' render = {() => <Resource resource="vehicles" name="name"/>  }  />
        <Route exact path='/species' render = {() => <ResourceList resource="species" name="name"/>  }  />
        <Route exact path='/species/:id' render = {() => <Resource resource="species" name="name"/>  }  />
        <Route exact path='/starships' render = {() => <ResourceList resource="starships" name="name"/>  }  />
        <Route exact path='/starships/:id' render = {() => <Resource resource="starships" name="name"/>  }  />

        <Route render={()=><h1>Page Not Found</h1>} />
      </Switch>
      <NavLinks />
    </ScrollToTop>
  </Router>
)

export default App;
