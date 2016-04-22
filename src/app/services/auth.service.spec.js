describe('authService', function() {
  var authServiceObj;
  
  //load module
  beforeEach(function() {
    module('allSpiceApp');
  });
  
  //set up mock service object
  beforeEach(inject(function(authService) {
    authServiceObj = authService;
  }))

  it('should define methods', function() {
    expect(authServiceObj.isLoggedIn).toBeDefined()
    expect(authServiceObj.isLoggedIn).toEqual(jasmine.any(Function))
  });
});