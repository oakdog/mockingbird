/*
id 	String
ID representing this place. Note that this is represented as a string, not an integer.

url 	String
URL representing the location of additional place metadata for this place.

place_type 	String
The type of location represented by this place.

name 	String
Short human-readable representation of the place’s name.

full_name 	String
Full human-readable representation of the place’s name.

country_code 	String
Shortened country code representing the country containing this place.

country 	String
Name of the country containing this place.

bounding_box 	Object
A bounding box of coordinates which encloses this place.

attributes 	Object
When using PowerTrack, 30-Day and Full-Archive Search APIs, and Volume Streams this hash is null.

Bounding box
Field 	Type 	Description
coordinates 	Array of Array of Array of Float
A series of longitude and latitude points, defining a box which will contain the Place entity this bounding box is related to. Each point is an array in the form of [longitude, latitude]. Points are grouped into an array per bounding box. Bounding box arrays are wrapped in one additional array to be compatible with the polygon notation.

type 	String
The type of data encoded in the coordinates property. This will be “Polygon” for bounding boxes and “Pointn” for Tweets with exact coordinates.

*/
import TwitterObject from './TwitterObject';
class TwitterPlace {
  constructor(raw){
    const propAttrs = [
      { name : 'id', type : 'String' },
      { name : 'url', type : 'String' },
      { name : 'place_type', type : 'String' },
      { name : 'name', type : 'String' },
      { name : 'full_name', type : 'String' },
      { name : 'country_code', type : 'String' },
      { name : 'country', type : 'String' },
      { name : 'bounding_box', type : 'Object' },
      { name : 'attributes', type : 'Object' },
      { name : 'type', type : 'String' }
    ];
    return TwitterObject.parse(raw,propAttrs);
  }

}

export default TwitterPlace;
