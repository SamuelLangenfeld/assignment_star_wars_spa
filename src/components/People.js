import React, {Component} from 'react'
import fetch from 'isomorphic-fetch'
import {Link} from 'react-router-dom'
import parse from './parse'


class People extends Component {


  constructor(){
    super()
    this.state = {
      isFetching:false,
      people: [],
      error:null
    }
  }
  componentDidMount(){
    
    this.setState({...this.state, isFetching:true})
    fetch("https://swapi.co/api/people/")
    .then(response =>{
      return response.json()
    })
    .then(response =>{
      let people = response.results
      this.setState({people, isFetching:false, error:false})
    })
    .catch(e=>{
      console.error(e)
      this.setState({isFetching:false, error:e, people:this.state.people})
    })
  }

  render(){
     let peopleArray
    if (this.state.people){
       let people = this.state.people
       peopleArray = people.map(person=>{

        let id = parse(person.url)
       console.log(id)
       	
		return <div><strong><Link to={`/people/${id}`}>{person.name}</Link></strong></div>

       
       })  
     
    }
        console.log(peopleArray)
    console.log("PeopleArray")

    return (

      <div className="container">
        <div className="People">
          <h1>Star Wars Characters</h1>
          {this.state.isFetching ? <h2>Loading</h2>: null}
          {peopleArray ? peopleArray : null}
        </div>
      </div>
    )
  }
}

export default People
