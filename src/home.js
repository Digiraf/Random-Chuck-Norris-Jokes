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
class App extends Component {
  constructor(props) {
    super(props);
  }
  componentDidMount() {
      if(this.props.register&&!this.props.register.state){
              this.props.isRegister(['state','remote']);
                this.getRemoteList()
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
      <div className={this.activeList('remote')}>🏠</div>
    )
  }
  getLocalJokesBttn(){
    return (
      <div className={this.activeList('local')}>🌟</div>
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
      <span className="emojijoker">😂</span>
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
  getRemoteList(){
      var scope=this;

      getJokes(10,this,(jokes)=>{

          if(jokes&&jokes.type&&jokes.type==='success'){
            console.log(jokes.value)
            scope.props.isRegister(['jokes',jokes.value])
          }
            scope.props.isRegister(['loading',false]);
      })

  }
  renderJokes(){
        if(this.props.register.jokes){
          console.log( this.props.register.jokes)
          return this.props.register.jokes.map((joke)=>{

              return (

                  <div key={joke.id}>{joke.id}</div>
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
