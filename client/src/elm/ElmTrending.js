import React from 'react';
import ElmCats from '../cat/elm/ElmCats';

class ElmTrending extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      trends:'tying an onion to your belt, as was the style at the time'
    };
    //console.log('Trending.constructor()');
  }
  render() {
    //console.log('Trending.render()');
    return (
      <div id="trending">
        <ElmCats />
      </div>
    );
  }
}
export default ElmTrending;
