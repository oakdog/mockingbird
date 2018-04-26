import React, { Component } from 'react';
import TwitterMedia from '../obj/TwitterMedia';
import ElmPhoto from './ElmPhoto';
import ElmVideo from './ElmVideo';
import ElmGif from './ElmGif';

class ElmMedia extends Component {
  constructor(props){
    super(props);
    this.state = {
      o : new TwitterMedia(props.twObj)
    };
  }
  render(){
    const o = this.state.o;
    switch(o['type']){
      case 'video' :
        return (<ElmVideo twObj={o} />);
      case 'animated_gif' :
        return (<ElmGif twObj={o} />);
      // case 'photo' :
      default :
        return (<ElmPhoto twObj={o} />);
    }
  }
}
export default ElmMedia;
