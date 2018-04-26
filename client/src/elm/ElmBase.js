import React, {Component} from 'react';
import { Motion, spring } from 'react-motion';
class ElmBase extends Component {
  constructor(props){
    super(props);
    this.halt = this.halt.bind(this);
  }
  halt(ev){ ev.stopPropagation(); ev.preventDefault(); }
  wrapHideMotion(defaultStyle,style,elm,inline=false){
    //console.log('ElmBase.wrapHideMotion(defaultStyle:'+JSON.stringify(defaultStyle,null,' ')+' style:'+JSON.stringify(style,null,' ')+' elm:'+elm+' wrapperComponent:'+wrapperComponent+')');
    let wc = is=><span className={inline?'elmHidesInline':'elmHides'} style={is}>{elm}</span>;
    //console.log('ElmBase.wrapHideMotion() wc:'+wc);
    return <Motion defaultStyle={defaultStyle} style={style}>{s=>wc(s)}</Motion>;
  }
  styleClosed(plusStyles={}){
    return Object.assign(plusStyles, {
      opacity:0,
      //maxWidth:0,
      maxHeight:0
    } );
  }
  styleOpenOn(expr,plusStyles={}){
    let o = {
      opacity:spring(expr?plusStyles['opacity']?plusStyles.opacity:1:0),
      //maxWidth:spring(expr?plusStyles['maxWidth']?plusStyles.maxWidth:300:0),
      maxHeight:spring(expr?plusStyles['maxHeight']?plusStyles.maxHeight:100:0)
    };
    for (let p in plusStyles) {
      o[p] = spring(expr?plusStyles[p]:0);
    }
    return o;
  }
}
export default ElmBase;
