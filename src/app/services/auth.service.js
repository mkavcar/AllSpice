//auth.service.js
angular
  .module('allSpiceApp')
  .factory("authService", authService);

authService.$inject = ["$firebaseAuth", "$q"];

function authService ($firebaseAuth, $q) {
    var
      authData = null,
      ref = new Firebase("https://amber-heat-8766.firebaseio.com"),
      authObj = $firebaseAuth(ref),
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
      ref.unauth();
      authData = null;
    };
  };