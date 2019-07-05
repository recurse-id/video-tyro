import React from 'react';
import './VideoList.scss';
import {Fetch} from "react-request";
import {VideoGrid} from "../VideoGrid/VideoGrid";

const API = process.env.REACT_APP_API

export class VideoList extends React.Component {
  render() {
    console.log("api", API)
    // const videoPreviews = this.getVideoPreviews();
    return (
      <React.Fragment>
        <div className='video-list'>
          <Fetch url={`${API}/search?q=${this.props.searchQuery}`}>
            {({fetching, failed, data}) => {
              if (fetching){
                return <div class="loading_center">Loading Data..</div>
              }
              if (failed) {
                return <div> the request did not succeed</div>
              }
              if (data) {
                return <VideoGrid title='' payload={data}/>
              }
            }
            }
          </Fetch>
        </div>
      </React.Fragment>
    );
  }

  // getVideoPreviews() {
  //   if(!this.props.videos || !this.props.videos.length) {
  //     return null;
  //   }
  //   const firstVideo = this.props.videos[0];
  //   if (!firstVideo.description) {return null}
  //
  //   return this.props.videos.map(video => (
  //     <VideoPreview horizontal={true} expanded={true} video={video} key={video.id} pathname={'/watch'}
  //                   search={'?v=' + video.id}/>)
  //   );
  // }

}