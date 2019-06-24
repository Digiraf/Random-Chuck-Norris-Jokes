import React, {
  Component
} from 'react';
import {
  connect
} from 'react-redux';
import {
  bindActionCreators
} from 'redux';
import {isRegister,getJokes} from './actions/index';
import {isFav,setFavJoke,removeFavJoke,getFavList} from './storage/local';
class App extends Component {
  componentDidMount() {
      if(this.props.register&&!this.props.register.state){
              this.props.isRegister(['state','remote']);
                this.getJokesList()
      }
  }
  activeList(key){
      if(this.props.register.state&&this.props.register.state===key){
        return 'bttn active'
      }else{
        return 'bttn'
      }
  }
  getRemoteJokesBttn(){
    return (
      <div onClick={
        ()=>{
            this.props.isRegister(['state','remote']);
              this.getJokesList()
        }
      } className={this.activeList('remote')} aria-labelledby="home"><span role="img" aria-labelledby="home">🏠</span></div>
    )
  }
  getLocalJokesBttn(){
    return (
      <div onClick={
        ()=>{
            this.props.isRegister(['state','local'])
            this.getJokesList()
        }
      } className={this.activeList('local')} aria-labelledby="favorite"><span role="img" aria-labelledby="home">🌟</span></div>
    )
  }
  jokesBar(){
    return (
      <div className="jokesbar">
        {this.getRemoteJokesBttn()}
        {this.getLocalJokesBttn()}
      </div>
    )
  }
  getJoker(){
    return(
      <span className="emojijoker"  role="img" aria-labelledby="joker">😂</span>
    )
  }
  loader(){
      if(this.props.register.loading){
        return(
          <div className="loader">loading jokes{this.getJoker()}</div>
        )
      }else{
        return null;
      }

  }
  getJokesList(){
      const scope=this;
      if(this.props.register.state==='remote'){

        getJokes(5,this,(jokes)=>{

            if(jokes&&jokes.type&&jokes.type==='success'){
              console.log(jokes.value)
              scope.props.isRegister(['jokes',jokes.value])
            }
              scope.props.isRegister(['loading',false]);
        })
      }else if(this.props.register.state==='local'){
              scope.props.isRegister(['jokes',getFavList()])
                scope.props.isRegister(['loading',false]);
      }


  }
  prettyJoke(joke){
    return joke.replace(/&quot;/g,'"')
  }
  favstatus(joke){
      if(!isFav(joke)){
        return "active"
      }else{
        return ""
      }
  }

  getFavBttn(joke){
    if(this.props.register.state==='remote'){
      return (<span onClick={()=>{
            setFavJoke(joke)
      }} className={"favIcon "+this.favstatus(joke)} role="img" aria-labelledby="add favorite">⭐</span>)
    }else{
      return (<span onClick={()=>{
            removeFavJoke(joke)
      }} className={"favIcon "+this.favstatus(joke)} role="img" aria-labelledby="remove favorite">🗑</span>)
    }


  }
  renderJokes(){
        if(this.props.register.jokes&&this.props.register.jokes.map){
          return this.props.register.jokes.map((joke)=>{
              return (

                  <div key={joke.id} className="joke">
                      {this.prettyJoke(joke.joke)}
                      {this.getFavBttn(joke)}
                  </div>
              )
          })
        }else{
          return null;
        }

    }

  render() {
    return (
      <div>
          {this.jokesBar()}
          <div className="jokesList">
          {this.loader()}
          {this.renderJokes()}
          </div>
      </div>
    )
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    isRegister
  }, dispatch);

}

function mapStateToProps(state) {
  return {
    register: state.register
  }

}
export default connect(mapStateToProps, mapDispatchToProps)(App)
