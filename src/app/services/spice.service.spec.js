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
    expect(authServiceObj.getAll).toBeDefined();
    expect(authServiceObj.getAll).toEqual(jasmine.any(Function));
  });
});