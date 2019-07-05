import React, {Component} from 'react';
import HeaderNav from "./containers/HeaderNav/HeaderNav";
import Home from "./containers/Home/Home";
import Search from "./containers/Search/Search"
import {Catalog} from "./containers/Catalog/Catalog";
import {Route, Switch, withRouter} from 'react-router-dom';
require('dotenv').config()


// const TAG = 'machine learning'
class App extends Component {

  render() {
    return (
        <React.Fragment>
          <HeaderNav/>
          <Switch>
            <Route path="/results" render={() => <Search key={this.props.location.key}/>}/>
            <Route path="/catalog" component={Catalog}/>
            <Route path="/" component={Home}/>
          </Switch>
        </React.Fragment>

    );
  }

  componentDidMount() {
    // this.loadRandom()
  }

  // loadRandom(){
  //   request(`${API}/load_random?tag=${TAG}`, function (error, response, body) {
  //     console.error('error:', error); // Print the error if one occurred
  //     console.log('statusCode:', response && response.statusCode); // Print the response status code if a response was received
  //     console.log('body:', body); // Print the HTML for the Google homepage.
  //
  //   })
  // }
}

export default withRouter(App);
