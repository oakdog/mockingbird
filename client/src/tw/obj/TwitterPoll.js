/*
options 	Array of Option Object
An array of options, each having a poll position, and the text for that position. Example:
{"options": [
          {
            "position": 1,
            "text": "I read documentation once."
          }
      ]
}

end_datetime 	String
Time stamp (UTC) of when poll ends. Example:

duration_minutes 	String
Duration of poll in minutes.
*/
class TwitterPoll {
  constructor(raw){
    return {
      options : raw['options'] ? raw['options'].map(o=>({position:o.position,text:o.text})) : null,
      end_datetime :  raw['end_datetime'] ? String(raw['end_datetime']) : null,
      duration_minutes :  raw['duration_minutes'] ? String(raw['duration_minutes']) : null,
    }
  }
}

export default TwitterPoll;
