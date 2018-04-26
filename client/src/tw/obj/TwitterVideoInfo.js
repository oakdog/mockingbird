import TwitterVideoVariant from './TwitterVideoVariant';
class TwitterVideoInfo {
  constructor(raw){
    return {
      aspect_ratio : raw['aspect_ratio'] ? [...raw['aspect_ratio']] : [1,1],
      variants : raw['variants'] ? raw['variants'].map(v=>new TwitterVideoVariant(raw['variants'])) : [],
      duration_millis : raw['duration_millis'] ? Number(raw['duration_millis']) : 1
    }
  }
}
export default TwitterVideoInfo;
/* Used for both GIF and video resources.

GIF-sample. Not described as Obj & props in the dev.twitter.com docs. Only in samples.
"video_info": {
    "aspect_ratio": [
      175,
      131
    ],
    "variants": [
      {
        "bitrate": 0,
        "content_type": "video/mp4",
        "url": "https://video.twimg.com/tweet_video/DBMDLy_U0AAqUWP.mp4"
      }
    ]
  }

  VIDEO-sample. Not described as Obj & props in the dev.twitter.com docs. Only in samples.
  "video_info": {
          "aspect_ratio": [
            9,
            16
          ],
          "duration_millis": 10704,
          "variants": [
            {
              "bitrate": 320000,
              "content_type": "video/mp4",
              "url": "https://video.twimg.com/ext_tw_video/869317980307415040/pu/vid/180x320/FMei8yCw7yc_Z7e-.mp4"
            },
            {
              "bitrate": 2176000,
              "content_type": "video/mp4",
              "url": "https://video.twimg.com/ext_tw_video/869317980307415040/pu/vid/720x1280/octt5pFbISkef8RB.mp4"
            },
            {
              "bitrate": 832000,
              "content_type": "video/mp4",
              "url": "https://video.twimg.com/ext_tw_video/869317980307415040/pu/vid/360x640/2OmqK74SQ9jNX8mZ.mp4"
            },
            {
              "content_type": "application/x-mpegURL",
              "url": "https://video.twimg.com/ext_tw_video/869317980307415040/pu/pl/wcJQJ2nxiFU4ZZng.m3u8"
            }
          ]
        }
*/
