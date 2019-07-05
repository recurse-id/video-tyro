import React from 'react';
import './Home.scss';
import {VideoGrid} from "../../components/VideoGrid/VideoGrid";
import { Fetch } from 'react-request';
import {withRouter} from "react-router-dom";



const API = process.env.REACT_APP_API
const TAG = 'machine learning'
export class Home extends React.Component {
  constructor(props) {
    super(props);
  }


  // loadRandom(){
  //     request(`${API}/load_random?tag=${TAG}`, function (error, response, body) {
  //         console.error('error:', error); // Print the error if one occurred
  //         console.log('statusCode:', response && response.statusCode); // Print the response status code if a response was received
  //         console.log('body:', body); // Print the HTML for the Google homepage.
  //       })
  // }

  componentDidMount(){
      // this.loadRandom()
  }

  render() {
      console.log(API)
          return (
              <div className='home'>
              <Fetch url={`${API}/load_random?tag=${TAG}`}>
                  {({fetching, failed, data}) => {
                      if (fetching){
                          return <div>Loading Data..</div>
                      }
                      if (failed) {
                          return <div> the request did not succeed</div>
                      }
                      if (data) {
                          return <VideoGrid title={TAG} payload={data}/>
                      }
                  }
                  }
              </Fetch>



        {/*<VideoGrid title='Autos & Vehicles' hideDivider={true}/>*/}
      </div>
    );
  }
}

export default withRouter(Home)