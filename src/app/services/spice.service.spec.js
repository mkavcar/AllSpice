describe('spiceApi', function() {
  var mockFirebaseArray, mockFirebaseRef, mockQ, mockAuthService, spiceApiObj;
  
  //load module
  beforeEach(function() {
    module('allSpiceApp');
  });
  
  //set up mock service object
  beforeEach(inject(function(spiceApi) {
    spiceApiObj = spiceApi;
  }))

  it('should define methods', function() {
    expect(spiceApiObj.getAll).toBeDefined();
    expect(spiceApiObj.getAll).toEqual(jasmine.any(Function));
  });
  
  it('getObj should return null', function() {
    expect(spiceApiObj.getObj()).toBeNull();
  });
  
  it('getObj should return an object after setting', function() {
    spiceApiObj.setObj({});
    expect(spiceApiObj.getObj()).not.toBeNull();
    expect(spiceApiObj.getObj()).toEqual(jasmine.any(Object));
  });
  
  it('filter should return true if matched', function () {
    var item = { user: { uid: 'user1', name: ''}, name: 'name', description: '', ingredients: '', tags: '', directions: '' };
    
    expect(spiceApiObj.filter(item)).toEqual(true);
    expect(spiceApiObj.filter(item,'user1')).toEqual(true);
    expect(spiceApiObj.filter(item,'user2', 'name')).toEqual(true);
    expect(spiceApiObj.filter(item,'user2', 'NAME')).toEqual(true);
    
    expect(spiceApiObj.filter(item,'user2')).toEqual(false);    
    expect(spiceApiObj.filter(item,'user2', 'false')).toEqual(false);
    
    item.pinnedUsers = { user3: true };
    expect(spiceApiObj.filter(item,'user3')).toEqual(true);
  });
});