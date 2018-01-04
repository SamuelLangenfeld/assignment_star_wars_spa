import React, {Component} from 'react'
import fetch from 'isomorphic-fetch'
import parse from './parse'
class Person extends Component {


  constructor(){
    super()
    this.state = {
      isFetching:false,
      person: null,
      error:null
    }
  }
  componentDidMount(){
    
    this.setState({...this.state, isFetching:true})
    let number = this.props.match.params.id
    fetch(`https://swapi.co/api/people/${number}/`)
    .then(response =>{
      return response.json()
    })
    .then(response =>{
      let person = response
      let films = response.films
      let promiseArray=[]
      films.forEach(film=>{
        promiseArray.push(fetch(film).then(response=>response.json()))
      })

      /*response.species.forEach(specie=>{
        promiseArray.push(fetch(specie).then(response=>response.json()))
      })*/

      response.vehicles.forEach(vehicle=>{
        promiseArray.push(fetch(vehicle).then(response=>response.json()))
      })

      response.starships.forEach(starship=>{
        promiseArray.push(fetch(starship).then(response=>response.json()))
      })


      Promise.all(promiseArray).then(data=>{
          person.films = data.slice(0,films.length).map(film=>film.title)
          let index =films.length
          /*person.species = data.slice(index, index+response.planets.length).map(specie=>specie.name)
          index+=response.species.length*/
          person.starships = data.slice(index, index+response.starships.length).map(starship=>starship.name)
          index+=response.starships.length
          person.vehicles = data.slice(index, index+response.vehicles.length).map(vehicle=>vehicle.name)
          index+=response.vehicles.length
          this.setState({person:person, isFetching:false, error:false})
      })
    })
    .catch(e=>{
      console.error(e)
      this.setState({isFetching:false, error:e, person:this.state.person})
    })
  }

  render(){
    let person
    if (this.state.person){
      person = Object.keys(this.state.person).map(key=>{
          return <div key={key}><strong>{key}: </strong>{this.state.person[key]}</div>
      })
    }
    return (
            <div className="container">
              <div className="Person">
                <h1>Star Wars Person</h1>
                {this.state.isFetching ? <h2>Loading</h2>: null}
                {this.state.person ? <div>{person}</div> : null}
              </div>
            </div>
          )
    }
}

export default Person;