import React, {Component} from 'react'
import fetch from 'isomorphic-fetch'

class Films extends Component {


  constructor(){
    super()
    this.state = {
      isFetching:false,
      films: [],
      error:null
    }
  }
  componentDidMount(){
    
    this.setState({...this.state, isFetching:true})
    fetch("https://swapi.co/api/films/")
    .then(response =>{
      return response.json()
    })
    .then(response =>{
      let films = response.results.map(film=>{
        return {title:film.title, director:film.director, producer: film.producer, date:film.release_date, number:film.episode_id}
      }).sort((a,b)=>{
        if (a.number > b.number){
          return 1
        }
        return -1
      })
      this.setState({films, isFetching:false, error:false})
    })
    .catch(e=>{
      console.error(e)
      this.setState({isFetching:false, error:e, films:this.state.films})
    })
  }

  render(){

    let filmsArray= this.state.films.map(film=>{
      return (<div key={film.number}><div>Title: {film.title}</div><div>Director: {film.director}</div><div>Producer: {film.producer}</div>
      <div>Date: {film.date}</div><div>Film Number: {film.number}</div><br /></div>)
    })

    return (
      <div className="container">
        <div className="Films">
          <h1>Star Wars Films</h1>
          {this.state.isFetching ? <h2>Loading</h2>: null}
          {filmsArray ? filmsArray : null}
        </div>
      </div>
    )
  }
}

export default Films;