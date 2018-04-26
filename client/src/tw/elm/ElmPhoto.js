import React, { Component } from 'react';
import TwitterMedia from '../obj/TwitterMedia';

class ElmPhoto extends Component {
  constructor(props){
    super(props);
    this.state = { o : new TwitterMedia(props.twObj) };
  }
  render(){
    const o = this.state.o;
    //console.log("ElmPhoto.render()\r\no:"+JSON.stringify(o,null,' '));
    return (<a href={o['expanded_url']} className="twPhoto" target="_blank">
      <img src={o['media_url_https']} alt={o['display_url']} border="0" />
    </a>);
  }
}
export default ElmPhoto;
/*
display_url 	String
URL of the media to display to clients.

expanded_url 	String
An expanded version of display_url. Links to the media display page.

id 	Int64
ID of the media expressed as a 64-bit integer.

id_str 	String
ID of the media expressed as a String.

indices 	Array of Int

media_url 	String
An http:// URL pointing directly to the uploaded media file. For media in direct messages, media_url is the same https URL as media_url_https and must be accessed via an authenticated twitter.com session or by signing a request with the user’s access token using OAuth 1.0A. It is not possible to directly embed these images in a web page.

media_url_https 	String
An https:// URL pointing directly to the uploaded media file, for embedding on https pages. For media in direct messages, media_url_https must be accessed via an authenticated twitter.com session or by signing a request with the user’s access token using OAuth 1.0A. It is not possible to directly embed these images in a web page.

sizes 	Size Object
An object showing available sizes for the media file.

source_status_id 	Int64
Nullable. For Tweets containing media that was originally associated with a different tweet, this ID points to the original Tweet.

source_status_id_str 	Int64
Nullable. For Tweets containing media that was originally associated with a different tweet, this String-based ID points to the original Tweet.

type 	String
Type of uploaded media. Possible types include photo, video, and animated_gif.

url 	String
Wrapped URL for the media link. This corresponds with the URL embedded directly into the raw Tweet text, and the values for the indices parameter.
*/
