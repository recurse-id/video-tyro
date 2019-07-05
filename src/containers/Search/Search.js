import React from 'react';
import './Search.scss';
import {VideoList} from '../../components/VideoList/VideoList';
import {withRouter} from 'react-router-dom';


class Search extends React.Component {

  render() {
    return (<VideoList
      searchQuery={this.getSearchQuery()}/>);
  }

  getSearchParam(location, name) {
    if (!location || !location.search) {
      return null;
    }
    const searchParams = new URLSearchParams(location.search);
    return searchParams.get(name);
  };


  getSearchQuery() {
    return this.getSearchParam(this.props.location, 'search_query');
  }

  componentDidMount() {
    if (!this.getSearchQuery()) {
      // redirect to home component if search query is not there
      this.props.history.push('/');
    }
    this.searchForVideos();
  }

  searchForVideos() {
    const searchQuery = this.getSearchQuery();
    // request(`${API}/search?search=${searchQuery}`, function (err, res, body) {
    //
    //   if (err){
    //     console.log(err)
    //   }
    //   if (body) {
    //     console.log(body)
    //     this.props.searchResults = body
    //   }
    //
    // })


  }


}


export default withRouter(Search);
