/*
thumb 	Size Object
Information for a thumbnail-sized version of the media.

large 	Size Object
Information for a large-sized version of the media.

medium 	Size Object
Information for a medium-sized version of the media.

small 	Size Object
Information for a small-sized version of the media.
 */
import TwitterSize from './TwitterSize';

class TwitterMediaSizes {
  constructor(raw){
    return {
      'thumb'  : raw['thumb'] ? new TwitterSize(raw['thumb']) : null,
      'large'  : raw['large'] ? new TwitterSize(raw['large']) : null,
      'medium' : raw['medium'] ? new TwitterSize(raw['medium']) : null,
      'small'  : raw['small'] ? new TwitterSize(raw['small']) : null
    };
  }
}

export default TwitterMediaSizes;
