//spice.service.js
angular
  .module('allSpiceApp')
  .factory('spiceApi', spiceApi);

spiceApi.$inject = ['$firebaseArray', '$firebaseRef', 'authService'];

function spiceApi($firebaseArray, $firebaseRef, authService) {
  var 
  _spiceObj = null,
      timestamp = new Date(),
      arr = $firebaseArray($firebaseRef.default),
      tagList,
      spiceApi = {
        getAll: getAll,
        getObj: getObj,
        setObj: setObj,
        add: add,
        update: update,
        remove: remove,
        togglePin: togglePin,
        getTagList: getTagList
      };      

  return spiceApi;
  ////////////
  
  function getAll() {
    //var query = ref.orderByKey().limitToLast(100);      
    //return $firebaseArray(query);    
    return arr;
  };

  function getObj() {
    return _spiceObj;
  };

  function setObj(spiceObj) {
    _spiceObj = spiceObj;
  };

  function add(spiceObj) {
    var spiceArr = spiceApi.getAll();      
    spiceObj.timestamp = Firebase.ServerValue.TIMESTAMP;
    spiceObj.user = authService.getUser();

    console.log(spiceObj);
    return spiceArr.$add(spiceObj);
  };

  function update(spiceObj) {
    var spiceArr = spiceApi.getAll();
    spiceObj.timestamp = Firebase.ServerValue.TIMESTAMP;

    console.log(spiceObj);
    spiceArr.$save(spiceObj)
  };

  function remove(spiceObj) {
    var spiceArr = spiceApi.getAll();

    console.log(spiceObj);
    spiceArr.$remove(spiceObj);      
  };

  function togglePin(spiceObj) {
    var user = authService.getUser();

    if (spiceObj.user.uid !== user.uid) {
      if (!spiceObj.pinnedUsers) 
        spiceObj.pinnedUsers = {};    

      spiceObj.pinnedUsers[user.uid] = !(spiceObj.pinnedUsers[user.uid] === true);       
      spiceApi.update(spiceObj);
    }
  };
  
  function getTagList() {
    if (!tagList)
      tagList = [{ 'text': 'appetizer' }, { 'text': 'dessert' }];
    
    return tagList;
  };
};
