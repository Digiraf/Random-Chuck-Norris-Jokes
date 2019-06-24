import React, {
  Component
} from 'react';
import {
  connect
} from 'react-redux';
import {
  bindActionCreators
} from 'redux';

class App extends Component {
  constructor(props) {
    super(props);
  }
  componentDidMount() {
      if(this.props.register&&!this.props.register.state){
              this.props.isRegister(['state','store']);

      }

  }
  render() {
    return (
      <div>hola</div>
    )

  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({

  }, dispatch);

}

function mapStateToProps(state) {
  return {
    register: state.register
  }

}
export default connect(mapStateToProps, mapDispatchToProps)(App)
