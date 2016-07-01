//spice.service.js
angular
  .module('allSpiceApp')
  .factory('spiceApi', spiceApi);

spiceApi.$inject = ['$firebaseArray', '$firebaseRef', '$q', 'authService'];

function spiceApi($firebaseArray, $firebaseRef, $q, authService) {
  var _spiceObj = null,
      timestamp = new Date(),
      arr = $firebaseArray($firebaseRef.spices),
      tagRef = $firebaseRef.tags,
      tagList,
      spiceApi = {
        getAll: getAll,
        getObj: getObj,
        setObj: setObj,
        add: add,
        update: update,
        remove: remove,
        togglePin: togglePin,
        getTagList: getTagList,
        filter: filter
      };

  return spiceApi;
  
  ////////////
  function getAll() {
    //var query = ref.orderByKey().limitToLast(100);      
    //return $firebaseArray(query);    
    return arr;
  }

  function getObj() {
    return _spiceObj;
  }

  function setObj(spiceObj) {
    _spiceObj = spiceObj;
  }

  function add(spiceObj) {
    var spiceArr = spiceApi.getAll();      
    spiceObj.timestamp = Firebase.ServerValue.TIMESTAMP;
    spiceObj.user = authService.getUser();

    console.log(spiceObj);
    return spiceArr.$add(spiceObj);
  }

  function update(spiceObj) {
    var spiceArr = spiceApi.getAll();
    spiceObj.timestamp = Firebase.ServerValue.TIMESTAMP;

    console.log(spiceObj);
    spiceArr.$save(spiceObj)
  }

  function remove(spiceObj) {
    var spiceArr = spiceApi.getAll();

    console.log(spiceObj);
    spiceArr.$remove(spiceObj);      
  }

  function togglePin(spiceObj) {
    var user = authService.getUser();

    if (spiceObj.user.uid !== user.uid) {
      if (!spiceObj.pinnedUsers) 
        spiceObj.pinnedUsers = {};    

      spiceObj.pinnedUsers[user.uid] = !(spiceObj.pinnedUsers[user.uid] === true);       
      spiceApi.update(spiceObj);
    }
  }
  
  function getTagList() {
    if (!tagList) {
      return tagRef.once('value').then(function (data) {
        tagList = Object.keys(data.val()).map(function (item) {
          return { "text": item };
        }); 
        
        return tagList;
      });
    }
    else {
      var deferred = $q.defer();
      deferred.resolve(tagList);
      return deferred.promise;
    }
  }
  
  function filter(item, uid, search) {
    var res = true;

    if (uid) {
      if (authService.isLoggedIn())
        res = ((item.user && item.user.uid === uid) || (item.pinnedUsers && item.pinnedUsers[uid] === true)) ? true : false;
      else
        res = ((item.user && item.user.uid === uid)) ? true : false;
    }

    if (search) {
      search = search.toLowerCase();

      res = (item.name.toLowerCase().indexOf(search) >= 0 || item.user.name.toLowerCase().indexOf(search) >= 0)
      
      if (!res && item.description)
        res = (item.description.toLowerCase().indexOf(search) >= 0);
      
      if (!res && item.ingredients)
        res = (item.ingredients.toLowerCase().indexOf(search) >= 0);
         
      if (!res && item.directions) 
        res = (item.directions.toLowerCase().indexOf(search) >= 0);
        
      if (!res && item.tags)
        res = (item.tags.toLowerCase().indexOf(search) >= 0);
      
      if (!res && item.user)
        res = (item.user.uid.toLowerCase().indexOf(search) >= 0);
    }

    return res;
  }
};
