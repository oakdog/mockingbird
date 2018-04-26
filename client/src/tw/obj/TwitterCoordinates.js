/*
coordinates 	Collection of Float
The longitude and latitude of the Tweet’s location, as a collection in the form [longitude, latitude].

type 	String
The type of data encoded in the coordinates property. This will be “Point” for Tweet coordinates fields.
*/
class TwitterCoordinates {
  constructor(raw){
    return {
      coordinates : raw['coordinates']  ? [...raw['coordinates']] : null,
      type        : raw['type']         ? String(raw['type'])     : null
    };
  }
}

export default TwitterCoordinates;
