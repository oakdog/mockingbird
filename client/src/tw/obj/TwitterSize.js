/*
w 	Int
Width in pixels of this size.

h 	Int
Height in pixels of this size.

resize 	String
Resizing method used to obtain this size. A value of fit means that the media was resized to fit one dimension, keeping its native aspect ratio. A value of crop means that the media was cropped in order to fit a specific resolution.
*/
class TwitterSize {
  constructor(raw){
    return {
      w : raw['w'] ? Number(raw['w']) : null,
      h : raw['h'] ? Number(raw['h']) : null,
      resize : raw['resize'] ? String(raw['resize']) : null
    };
  }
}

export default TwitterSize;
