import React from 'react';
import {Image} from 'semantic-ui-react';
import './VideoPreview.scss';

export class VideoPreview extends React.Component {
  render() {
    return (
        <a href = {this.props.video.urls[0]}>
      <div className='video-preview'>
        <div className='image-container'>
          <Image src={this.props.video.thumbnailUrl}/>
          <div className='time-label'>
            <span>{this.props.video.duration}</span>
          </div>
        </div>

        <div className='video-info'>
          <div className='semi-bold show-max-two-lines'>{this.props.video.title}</div>
          <div className='video-preview-metadata-container'>
            {/*<div className='channel-title'>Channel title</div>*/}
            {/*<div><span>2.1M views • 2 days ago</span></div>*/}
          </div>
        </div>
      </div>
        </a>
    );
  }
}

export default VideoPreview