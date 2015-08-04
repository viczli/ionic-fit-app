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


.controller('plansCtrl', function(dbPlans, dbUser, $scope, $http){
  $scope.data =  dbPlans.async().then(function(data) {
    $scope.data = data[0];
    console.error(data[0].plans)
  })
  dbUser.async().then(function(data) {
    $scope.dbUser = data[0];
  })
})
.controller('workoutsCtrl', function(dbPlans, dbUser, $scope, $http, $stateParams, $ionicModal){
  console.log()
  $scope.data =  dbPlans.async().then(function(data) {
    $scope.data = data[0];
    $scope.whichWorkout = $stateParams.workout
    console.error(data[0].plans)
  })
  // Call the async method and then do stuff with what is returned inside our own then function
  dbUser.async().then(function(data) {
    $scope.dbUser = data[0];
  })

  $ionicModal.fromTemplateUrl('/templates/modal.html', {
      scope: $scope,
      animation: 'slide-in-up'
    }).then(function(modal) {
      $scope.modal = modal;
    });
    $scope.openModal = function() {
      $scope.modal.show();
    };
    $scope.closeModal = function() {
      $scope.modal.hide();
    };
    //Cleanup the modal when we're done with it!
    $scope.$on('$destroy', function() {
      $scope.modal.remove();
    });
    // Execute action on hide modal
    $scope.$on('modal.hidden', function() {
      // Execute action
    });
    // Execute action on remove modal
    $scope.$on('modal.removed', function() {
      // Execute action
  });
})

.controller('ContentController', function($scope, $ionicSideMenuDelegate) {
  $scope.toggleLeft = function() {
    $ionicSideMenuDelegate.toggleLeft();
  };
})