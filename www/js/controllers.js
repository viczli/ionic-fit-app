angular.module('starter.controllers', [])

.controller('DashCtrl', function($scope) {})

.controller('ChatsCtrl', function($scope, Chats) {
  // With the new view caching in Ionic, Controllers are only called
  // when they are recreated or on app start, instead of every page change.
  // To listen for when this page is active (for example, to refresh data),
  // listen for the $ionicView.enter event:
  //
  //$scope.$on('$ionicView.enter', function(e) {
  //});
  
  $scope.chats = Chats.all();
  $scope.remove = function(chat) {
    Chats.remove(chat);
  }
})

.controller('ChatDetailCtrl', function($scope, $stateParams, Chats) {
  $scope.chat = Chats.get($stateParams.chatId);
})

.controller('AccountCtrl', function($scope) {
  $scope.settings = {
    enableFriends: true
  };
})

.controller('overviewCtrl', function(dbPlans, dbUser, $scope, $http) {
  $scope.data = {};
  $scope.dbUser = {};
    // Call the async method and then do stuff with what is returned inside our own then function
    dbPlans.async().then(function(data) {
      $scope.data = data[0];
      console.log(" got dbPlans data")
    });
  
    // Call the async method and then do stuff with what is returned inside our own then function
    dbUser.async().then(function(data) {
      $scope.dbUser = data[0];
      $scope.selectedExercise = $scope.dbUser.max[0]; // first option is not empty
      console.log("got dbUser data")

    })
})
