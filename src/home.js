import React, {
  Component
} from 'react';
import {
  connect
} from 'react-redux';
import {
  bindActionCreators
} from 'redux';

import reducers from "./reducers";
import thunk from 'redux-thunk';

class App extends Component {
  constructor(props) {
    super(props);
  }
  componentDidMount() {


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
