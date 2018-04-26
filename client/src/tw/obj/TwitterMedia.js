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

"video_info": {
          "aspect_ratio": [
            1,
            1
          ],
          "duration_millis": 6605,
          "variants": [
            {
              "bitrate": 832000,
              "content_type": "video/mp4",
              "url": "https://video.twimg.com/ext_tw_video/567972074346807296/pu/vid/480x480/eU1s1ig_skHgeRjB.mp4"
            },
            {
              "content_type": "application/x-mpegURL",
              "url": "https://video.twimg.com/ext_tw_video/567972074346807296/pu/pl/tr7sF7aHBPOCuL8H.m3u8"
            },
            {
              "bitrate": 832000,
              "content_type": "video/webm",
              "url": "https://video.twimg.com/ext_tw_video/567972074346807296/pu/vid/480x480/eU1s1ig_skHgeRjB.webm"
            },
            {
              "bitrate": 1280000,
              "content_type": "video/mp4",
              "url": "https://video.twimg.com/ext_tw_video/567972074346807296/pu/vid/720x720/njkDGgpJBpsTjQD3.mp4"
            },
            {
              "bitrate": 320000,
              "content_type": "video/mp4",
              "url": "https://video.twimg.com/ext_tw_video/567972074346807296/pu/vid/240x240/Gye4gcWtlJq8zXhF.mp4"
            }
          ]
        }
*/
import TwitterObject from './TwitterObject';

class TwitterMedia {
  constructor(raw){
    const propAttrs = [
      { name : 'display_url', type : 'String' },
      { name : 'expanded_url', type : 'String' },
      // { name : 'id', type : 'Int64' },
      { name : 'id_str', type : 'String' },
      { name : 'indices', type : 'Array of Int' },
      { name : 'media_url', type : 'String' },
      { name : 'media_url_https', type : 'String' },
      { name : 'sizes', type : 'TwitterMediaSizes' },
      // { name : 'source_status_id', type : 'Int64' },
      { name : 'source_status_id_str', type : 'String' },
      { name : 'type', type : 'String' },
      { name : 'url', type : 'String' },
      { name : 'video_info', type : 'TwitterVideoInfo'}
    ];
    return TwitterObject.parse(raw,propAttrs);
  }
}
export default TwitterMedia;
