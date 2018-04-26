import React, { Component } from 'react';
import TwitterMedia from '../obj/TwitterMedia';

class ElmVideo extends Component {
  constructor(props){
    super(props);
    this.state = {
      o : new TwitterMedia(props.twObj)
    };
  }
  render(){
    const o = this.state.o;
    //console.log("ElmVideo.render()\r\no:"+JSON.stringify(o,null,' '));
    const sources = o['video_info']['variants'].map((v,i)=>(<source src={v['url']} type={v['content_type']} key={String(i)} />));
    const wOvrH = o['video_info']['aspect_ratio'][0] / o['video_info']['aspect_ratio'][1];
    return (<video width="100%" height={(wOvrH*100)+'%'} className="twVideo" controls>
      {sources}
      Your browser does not support the <code>video</code> element.
    </video>);
  }
}
export default ElmVideo;
/*
aspect_ratio : raw['aspect_ratio'] ? [...raw['aspect_ratio']] : [1,1],
variants : raw['variants'] ? raw['variants'].map(v=>new TwitterVideoVariant(raw['variants'])) : [],
duration_millis

const parts = o['expanded_url'].split('/');
const url = parts.slice(0,6).join('/') + '?ref_src=twsrc%5Etfw';
return (
  <div className="twVideo">
    <p>THERE SHOULD BE A VIDEO HERE</p>
    <blockquote class="twitter-video" data-lang="en">
      <p lang="en" dir="ltr">You can now shoot, edit and share video on Twitter. Capture life&#39;s most moving moments from your perspective. <a href={o['url']}>{o['display_url']}</a></p>
      &mdash; (@{parts[3]}) <a href={url}>{o['id_str']}</a>
    </blockquote>
    <script async src="https://platform.twitter.com/widgets.js" charset="utf-8"></script>
  </div>
);
*/
/* expanded_url >>> https://twitter.com/Otter_News/status/933329687908057089/video/1
<blockquote class="twitter-video" data-lang="en">
  <p lang="en" dir="ltr">You can now shoot, edit and share video on Twitter. Capture life&#39;s most moving moments from your perspective. <a href="http://t.co/31JoMS50ha">pic.twitter.com/31JoMS50ha</a></p>
  &mdash; Twitter (@Twitter) <a href="https://twitter.com/Twitter/status/560070183650213889?ref_src=twsrc%5Etfw">January 27, 2015</a>
</blockquote>
<script async src="https://platform.twitter.com/widgets.js" charset="utf-8"></script>


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
