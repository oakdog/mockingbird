/*
  This could use searches or any collection of results & extract information
  about the contents. For example, with users, the mentioned users could be
  gathered, and ordered by recurrences. With URLs, the same could be done yet
  looking at recurrences of a domain rather than the full datum as with users.

*/
import React from 'react';

class Suggestions extends React.Component {
  constructor(props){
    super(props);
    this.state = { str : '' };
    //console.log('Suggestions.constructor()');
  }
  render() { // <h2>Suggested Channels</h2>
    //console.log('Suggestions.render()');
    return (
      <div id="suggestions">
      </div>
    );
  }
}
export default Suggestions;
