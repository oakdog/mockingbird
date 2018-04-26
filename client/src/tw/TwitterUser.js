/*
  Perform Twitter account-data queries & manage the results

*/
import * as actions from './TwitterUserActions';
import * as str from './TwitterUserActionStrs';
import ExpressTalk from './ExpressTalk';

class TwitterUser {
  /*constructor(store){
    this.store = store;
    this.boundActions = bindActionCreators(actions,store.dispatch);
  }
  getState(){
    return [...this.store.getState()['user']];
  }

  getStoredUser(id){
    let user = this.getState().filter(u=>u.id===id);
    return user.length ? user[0] : null;
  }*/

  // Account
  static create(id,dispatch){
    //console.log('TwitterUser.addTo(id:'+id+')');
    let init = ExpressTalk.initObj({id:id});
    //console.log('TwitterSearch.create() : init:'+JSON.stringify(init));
    fetch('/twit/user',init)
    .then( res => {
      //console.log(' TwitterSearch.create() : res:"'+JSON.stringify(res)+'"');
      return res.json().then( resJson => {
        //console.log(' TwitterSearch.create() : resJson:"'+JSON.stringify(resJson)+'"');
        dispatch(actions.uCreate(id,resJson.data));
      });
    });
  }
  static discard(id,dispatch){
    //console.log('TwitterUser.addTo(id:'+id+')');
    dispatch(actions.uDiscard(id));
  }

  // Follows
  static followsSet(id,count,dispatch){
    //console.log('TwitterUser.followsSet(id:'+id+',count:'+count+')');
    this.tw.get( 'followers/ids',
      { screen_name: id },
      (err, data, r) => {
        dispatch(actions.uFollowsSet(data.id,data.results));
      }
    );
  }
  static followsAddTo(id,count,dispatch){
    //console.log('TwitterUser.followsAddTo(id:'+id+',count:'+count+')');
    this.tw.get( 'followers/ids',
      { screen_name: id },
      (err, data, r) => {
        dispatch(actions.uFollowsAddTo(data.id,data.results));
      }
    );
  }
  static followsDelete(id,dispatch){
    //console.log('TwitterUser.followsDelete(id:'+id+')');
    dispatch(actions.uFollowsDelete(id));
  }

  // FollowedBy
  static followedBySet(id,count,dispatch){
    //console.log('TwitterUser.followedBySet(id:'+id+',count:'+count+')');
    this.tw.get( 'followers/ids',
      { screen_name: id },
      (err, data, r) => {
        dispatch(actions.uFollowedBySet(data.id,data.results));
      }
    );
  }
  static followedByAddTo(id,count,dispatch){
    //console.log('TwitterUser.followedByAddTo(id:'+id+',count:'+count+')');
    this.tw.get( 'followers/ids',
      { screen_name: id },
      (err, data, r) => {
        dispatch(actions.uFollowedByAddTo(data.id,data.results));
      }
    );
  }
  static followedByDelete(id,dispatch){
    //console.log('TwitterUser.followedByDelete(id:'+id+')');
    dispatch(actions.uFollowedByDelete(id));
  }

  // Mentions
  static mentionsSet(id,count,dispatch){
    //console.log('TwitterUser.mentionsSet(id:'+id+',count:'+count+')');
    this.tw.get( 'followers/ids',
      { screen_name: id },
      (err, data, r) => {
        dispatch(actions.uMentionsSet(data.id,data.results));
      }
    );
  }
  static mentionsAddTo(id,count,dispatch){
    //console.log('TwitterUser.mentionsAddTo(id:'+id+',count:'+count+')');
    this.tw.get( 'followers/ids',
      { screen_name: id },
      (err, data, r) => {
        dispatch(actions.uMentionsAddTo(data.id,data.results));
      }
    );
  }
  static mentionsDelete(id,dispatch){
    //console.log('TwitterUser.mentionsDelete(id:'+id+')');
    dispatch(actions.uMentionsDelete(id));
  }

  // Likes
  static likesSet(id,count,dispatch){
    //console.log('TwitterUser.likesSet(id:'+id+',count:'+count+')');
    this.tw.get( 'followers/ids',
      { screen_name: id },
      (err, data, r) => {
        dispatch(actions.uLikesAddTo(data.id,data.results));
      }
    );
  }
  static likesAddTo(id,count,dispatch){
    //console.log('TwitterUser.likesAddTo(id:'+id+',count:'+count+')');
    this.tw.get( 'followers/ids',
      { screen_name: id },
      (err, data, r) => {
        dispatch(actions.uLikesAddTo(data.id,data.results));
      }
    );
  }
  static likesDelete(id,dispatch){
    //console.log('TwitterUser.likesDelete(id:'+id+')');
    dispatch(actions.uLikesDelete(id));
  }

  // Timeline
  static timelineSet(id,count,dispatch){
    //console.log('TwitterUser.timelineSet(id:'+id+',count:'+count+')');
    this.tw.get( 'followers/ids',
      { screen_name: id },
      (err, data, r) => {
        dispatch(actions.uTimelineSet(data.id,data.results));
      }
    );
  }
  static timelineAddTo(id,count,dispatch){
    //console.log('TwitterUser.timelineAddTo(id:'+id+',count:'+count+')');
    this.tw.get( 'followers/ids',
      { screen_name: id },
      (err, data, r) => {
        dispatch(actions.uTimelineAddTo(data.id,data.results));
      }
    );
  }
  static timelineDelete(id,dispatch){
    //console.log('TwitterUser.timelineDelete(id:'+id+')');
    dispatch(actions.uTimelineDelete(id));
  }

  /* Reducer
    state =
    account : [
      { id:string, (follows|followedBy|mentions|likes|timeline):[] }
    ]
  */
  static reducer(state={},action){
    if (!state.account) return Object.assign({},state);
    let account = state.account;
    let accountsFiltered = account.filter(a=>a.id!==action.id),
    filteredAccount = account.filter(a=>a.id===action.id);
    filteredAccount = filteredAccount.length ? filteredAccount[0] : null;

    switch (action.type) {

      // Account
      case str.uCreate :
        if (!filteredAccount){
          return accountsFiltered.concat({
            id : action.id,
            follows:[],
            followedBy:[],
            mentions:[],
            likes:[],
            timeline:[]
          });
        }
        break;
      case str.uDiscard :
        return accountsFiltered;
      case str.uFollowsSet : // - Follows
      case str.uFollowsAddTo :
      case str.uFollowsDelete :
      case str.uFollowedBySet : // - FollowedBy
      case str.uFollowedByAddTo :
      case str.uFollowedByDelete :
      case str.uMentionsSet : // - Mentions
      case str.uMentionsAddTo :
      case str.uMentionsDelete :
      case str.uLikesSet : // - Likes
      case str.uLikesAddTo :
      case str.uLikesDelete :
      case str.uTimelineSet : // - Timeline
      case str.uTimelineAddTo :
      case str.uTimelineDelete :
        if (!filteredAccount) break;
        switch(action.type){
          // Follows
          case str.uFollowsSet :
            return accountsFiltered.concat(Object.assign({},
              filteredAccount,
              { follows : action.results }
            ));
          case str.uFollowsAddTo :
            return accountsFiltered.concat(Object.assign({},
              filteredAccount,
              { follows : filteredAccount.follows.concat(action.results) }
            ));
          case str.uFollowsDelete :
            return accountsFiltered.concat(Object.assign({},
              filteredAccount,
              { follows : [] }
            ));

          // FollowedBy
          case str.uFollowedBySet :
            return accountsFiltered.concat(Object.assign({},
              filteredAccount,
              { followedBy : action.results }
            ));
          case str.uFollowedByAddTo :
            return accountsFiltered.concat(Object.assign({},
              filteredAccount,
              { followedBy : filteredAccount.followedBy.concat(action.results) }
            ));
          case str.uFollowedByDelete :
            return accountsFiltered.concat(Object.assign({},
              filteredAccount,
              { followedBy : [] }
            ));

          // - Mentions
          case str.uMentionsSet :
            return accountsFiltered.concat(Object.assign({},
              filteredAccount,
              { mentions : action.results }
            ));
          case str.uMentionsAddTo :
            return accountsFiltered.concat(Object.assign({},
              filteredAccount,
              { mentions : filteredAccount.mentions.concat(action.results) }
            ));
          case str.uMentionsDelete :
            return accountsFiltered.concat(Object.assign({},
              filteredAccount,
              { mentions : [] }
            ));

          // - Likes
          case str.uLikesSet :
            return accountsFiltered.concat(Object.assign({},
              filteredAccount,
              { likes : action.results }
            ));
          case str.uLikesAddTo :
            return accountsFiltered.concat(Object.assign({},
              filteredAccount,
              { likes : filteredAccount.likes.concat(action.results) }
            ));
          case str.uLikesDelete :
            return accountsFiltered.concat(Object.assign({},
              filteredAccount,
              { likes : [] }
            ));

          // - Timeline
          case str.uTimelineSet :
            return accountsFiltered.concat(Object.assign({},
              filteredAccount,
              { timeline : action.results }
            ));
          case str.uTimelineAddTo :
            return accountsFiltered.concat(Object.assign({},
              filteredAccount,
              { timeline : filteredAccount.timeline.concat(action.results) }
            ));
          case str.uTimelineDelete :
            return accountsFiltered.concat(Object.assign({},
              filteredAccount,
              { timeline : [] }
            ));
          default :
            break;
        }
        break;
      default :
        break;
    }
    return Object.assign({},state);
  }
}
export default TwitterUser;
