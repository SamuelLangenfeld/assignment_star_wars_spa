import React, {Component} from 'react'
import fetch from 'isomorphic-fetch'
import {withRouter} from 'react-router-dom'
class Resource extends Component {


  constructor(props){
    super()
    this.state = {
      isFetching:false,
      [props.resource]: null,
      error:null
    }
  }
  componentWillReceiveProps(){
    this.setState({...this.state, isFetching:true})
    let number = this.props.match.params.id
    fetch(`https://swapi.co/api/${this.props.resource}/${number}/`)
    .then(response =>{
      return response.json()
    })
    .then(response =>{
      this.setState({[this.props.resource]:response, isFetching:false, error:false})
    })
    .catch(e=>{
      console.error(e)
      this.setState({isFetching:false, error:e, [this.props.resource]:this.state[this.props.resource]})
    })
  }

  render(){
    let resource
    if (this.state[this.props.resource]){
      resource = Object.keys(this.state[this.props.resource]).map(key=>{
          return <div key={key}><strong>{key}: </strong>{this.state[this.props.resource][key]}</div>
      })
    }
    return (
            <div className="container">
              <div className="Person">
                <h1>Star Wars {this.props.resource.toUpperCase()}</h1>
                {this.state.isFetching ? <h2>Loading</h2>: null}
                {this.state[this.props.resource] ? <div>{resource}</div> : null}
              </div>
            </div>
          )
    }
}

export default withRouter(Resource);