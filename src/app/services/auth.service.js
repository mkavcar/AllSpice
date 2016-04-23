//auth.service.js
angular
  .module('allSpiceApp')
  .factory("authService", authService);

authService.$inject = ["$firebaseAuthService", "$q"];

function authService ($firebaseAuthService, $q) {
    var authData = null,
        authObj = $firebaseAuthService,
        authService = {
          isLoggedIn: isLoggedIn,
          getUser: getUser,
          login: login,
          logout: logout  
        };
  
    return authService;
    
    ////////////  
    function isLoggedIn(){
      return authData !== null;
    };
  
    function getUser() {
      return (authData !== null) ? { 
        'uid': authData.uid,
        'name': authData.google.displayName,
        'profileImageURL': authData.google.profileImageURL,
        'provider' : authData.provider
      } : null;
    };
  
    function login(){
      return authObj.$authWithOAuthPopup('google', {
          //remember: "sessionOnly"
        })
        .then(
          function(data){
            authData = data;
            return authData;
          },
          function(error){
            $q.reject(error);
          }
        );
    };

    function logout(){
      authObj.$unauth();
      authData = null;
    };
  };
