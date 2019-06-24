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
import Config from './config/config'
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
            if(!this.props.register.loading){
                window.jokertime=0;

            this.props.isRegister(['state','remote']);

  this.getJokesList()
            }
        }
      } className={this.activeList('remote')} aria-labelledby="home"><span role="img" aria-labelledby="home">😂🔄</span></div>
    )
  }
  getLocalJokesBttn(){
    return (
      <div onClick={
        ()=>{
            if(!this.props.register.loading){

              this.props.isRegister(['state','local']);
              this.props.isRegister(['jokes',getFavList()])

            }

        }
      } className={this.activeList('local')} aria-labelledby="favorite"><span role="img" aria-labelledby="home">🌟</span></div>
    )
  }
  timerStatusClass(){
    if(this.props.register.timerInterval){
      return ' active'
    }
    return '';

  }
  timerButton(){
    if(this.props.register.state!=='local'){
      return (
        <div onClick={
          ()=>{
            if(this.props.register.timerInterval){
              this.props.isRegister(['timerInterval',false]);

            }else{
              this.props.isRegister(['timerInterval',true]);
            }
            this.setTimer()
          }
        } className={'timer'+this.timerStatusClass()} aria-labelledby="home"><span role="img" aria-labelledby="home">🕐</span>{this.timerBar()}</div>
      )
    }

  }
  jokesBar(){
    return (
      <div className="jokesbar">
        {this.getRemoteJokesBttn()}
        {this.getLocalJokesBttn()}

        {this.timerButton()}
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
          <div className="loader">loading jokes. Please wait for it<br/>{this.getJoker()}</div>
        )
      }else{
        return null;
      }

  }
  setTimer(status){
    var scope=this;
    if(!this.props.register.timerInterval){
      clearInterval(window.jokesInterval);
    }else{
        clearInterval(window.jokesInterval);
        window.jokesInterval=setInterval(function(){
        if(!scope.props.register.loading){
          if(!window.jokertime||window.jokertime>Config.max)window.jokertime=0;
          if(window.jokertime>=Config.max){
              window.jokertime=0;
              scope.getJokesList();
          }else{
              window.jokertime += 1;
          }
        }else{
            window.jokertime=0;
        }
        scope.forceUpdate();

        },1000)
    }
  }
  getJokesList(){
      const scope=this;
      if(this.props.register.state==='remote'){

        getJokes(Config.max,this,(jokes)=>{

            if(jokes&&jokes.type&&jokes.type==='success'){
                    scope.props.isRegister(['loading',false]);
              scope.props.isRegister(['jokes',jokes.value])
            }

        })
      }else if(this.props.register.state==='local'){

                scope.props.isRegister(['loading',false]);
                scope.props.isRegister(['jokes',getFavList()])
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
    if(this.props.register.state==='remote'&&!isFav(joke)){
      return (<span onClick={()=>{
            setFavJoke(joke)
              this.forceUpdate()
      }} className={"favIcon "+this.favstatus(joke)} role="img" aria-labelledby="add favorite">⭐</span>)
    }else if(this.props.register.state==='local'){
      return (<span onClick={()=>{

          removeFavJoke(joke);
          this.props.isRegister(['jokes',getFavList()])
          this.forceUpdate()
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
                      {this.timerBar()}
                  </div>
              )
          })
        }else{
          return null;
        }

    }
    timerBar(){

      if(this.props.register.timerInterval &&this.props.register.state==='local'){

        return (<div className="timerBar" style={{width:(window.jokertime/Config.max*100)+"%"}}>
        </div>)
      }
    }
  render() {
    return (
      <div className="jokeshome">
          <div className="hometitle">Chuck Norris Joke application</div>
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
