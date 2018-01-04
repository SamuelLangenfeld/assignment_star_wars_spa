import React, {Component} from 'react'
import fetch from 'isomorphic-fetch'

class Film extends Component {


  constructor(){
    super()
    this.state = {
      isFetching:false,
      film: null,
      error:null
    }
  }
  componentDidMount(){
    
    this.setState({...this.state, isFetching:true})
    let number = this.props.match.params.id
    fetch(`https://swapi.co/api/films/${number}`)
    .then(response =>{
      return response.json()
    })
    .then(response =>{
      let film = response
      let characters = response.characters
      let promiseArray=[]
      characters.forEach(character=>{
        promiseArray.push(fetch(character).then(response=>response.json()))
      })

      response.planets.forEach(planet=>{
        promiseArray.push(fetch(planet).then(response=>response.json()))
      })

      response.starships.forEach(ship=>{
        promiseArray.push(fetch(ship).then(response=>response.json()))
      })

      response.vehicles.forEach(vehicle=>{
        promiseArray.push(fetch(vehicle).then(response=>response.json()))
      })

      response.species.forEach(specie=>{
        promiseArray.push(fetch(specie).then(response=>response.json()))
      })

      Promise.all(promiseArray).then(data=>{
          film.characters = data.slice(0,characters.length).map(character=>character.name)
          let index =characters.length
          film.planets = data.slice(index, index+response.planets.length).map(planet=>planet.name)
          index+=response.planets.length
          film.starships = data.slice(index, index+response.starships.length).map(starship=>starship.name)
          index+=response.starships.length
          film.vehicles = data.slice(index, index+response.vehicles.length).map(vehicle=>vehicle.name)
          index+=response.vehicles.length
          film.species = data.slice(index).map(specie=>specie.name)
          this.setState({film:film, isFetching:false, error:false})
      })
    })
    .catch(e=>{
      console.error(e)
      this.setState({isFetching:false, error:e, film:this.state.film})
    })
  }

  render(){
    let film
    if (this.state.film){
      film = Object.keys(this.state.film).map(key=>{
          return <div><strong>{key}: </strong>{this.state.film[key]}</div>
      })
    }
    return (
            <div className="container">
              <div className="Films">
                <h1>Star Wars Films</h1>
                {this.state.isFetching ? <h2>Loading</h2>: null}
                {this.state.film ? <div>{film}</div> : null}
              </div>
            </div>
          )
    }
}

export default Film;