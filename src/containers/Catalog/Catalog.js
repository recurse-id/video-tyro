import React from 'react';
import './Catalog.scss';
import {Fetch} from "react-request";
import {withRouter} from "react-router-dom";

const API = process.env.REACT_APP_API

export class Catalog extends React.Component {

  render() {
    console.log("api", API)
    return (
      <div>
      <React.Fragment>
          <Fetch url={`${API}/catalog`}>
            {({fetching, failed, data}) => {
              if (fetching){
                return <div class="loading_center">Loading Data..</div>
              }
              if (failed) {
                return <div> the request did not succeed</div>
              }
              if (data) {
                console.log(data)
                return data.map(playlist => (<p><a href={playlist['url']}>{playlist['url']}</a></p>))
              }
            }
            }
          </Fetch>
      </React.Fragment>
      </div>
    );
  }


}

export default withRouter(Catalog);