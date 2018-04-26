import React from 'react';

import ElmHeader from './elm/ElmHeader';
import ElmTrending from './elm/ElmTrending';
import ElmTimeline from './elm/ElmTimeline';

class Mockingbird extends React.Component {
  constructor(props){ //console.log('Mockingbird.constructor()');
    super(props);
    this.state = {};
  }
  render() { //console.log('Mockingbird.render()');
    return (
      <div id="mockingbird">
        <ElmHeader/>
        <div id="moduleContainer">
          <ElmTrending />
          <ElmTimeline />
        </div>
      </div>
    );
  }
}
export default Mockingbird;
