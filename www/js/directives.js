var app = angular.module("directives", [])

.directive("exerciseDetail",function($timeout){
  var num = 1;

  return{
    restrict: "E",
    replace: true,
    templateUrl: "templates/exercise-detail.html",
    scope: {
      exercise: "=",
      dbUser:"=user",
      data:"=data",
    },
    controller: function($scope) {
      $scope.header= "Exercise " + num++;
      setTimeout(function(){
        }, 1000)
    },
    link: function($scope, element, attrs){
      // timeout after loading data
        angular.element(document).ready(function(){
          element.lookup(); // loading data in
          element.inolSumexercise(); // calc total inol per exersize
        })

      $(".refresh").click(function(){
        $scope.$apply(function(){
          element.lookup();
        })
      })
 

      element.lookup = function(){
        var defineExercise = element[0].getElementsByClassName("exerciseName")[0].innerText;
        if(defineExercise === "Barbell Bench Press"){
          $scope.searchVal ="Barbell Bench Press"
          console.info($scope.searchVal)
          $scope.numbers = element.checker();
        }
        if(defineExercise === "Barbell Back Squat"){
          $scope.searchVal ="Barbell Back Squat"
          console.info($scope.searchVal)
          $scope.numbers = element.checker();
        }
        if(defineExercise === "Barbell Dead Lift"){
          $scope.searchVal ="Barbell Dead Lift"
          console.info($scope.searchVal)
          $scope.numbers = element.checker();
        }
      }
    
      $scope.searchField ="exercise";
      $scope.searchVal = "";
      element.checker = function (searchField, searchVal){
        console.log("--checker")
        var searchDb = $scope.dbUser;
        var searchVal = $scope.searchVal;
        var searchField =  $scope.searchField;
        for (var i=0 ; i < searchDb.max.length ; i++)
        {
            if (searchDb.max[i][searchField] == searchVal) {
                return searchDb.max[i].lift;
            }
        }
      }
      element.inolSumexercise = function(){
        var storedData = element[0].getElementsByClassName("inolNumber");
        var total = 0;
        for(var i = 0; i < storedData.length; i++){
            total += parseFloat(storedData[i].innerText)
            $scope.inolSet = total;
        }
      }
    }
  }
})

.directive("exerciseDay", function($timeout){
  return{
    restrict: "E",
    replace: true,
    templateUrl: "templates/exercise-day.html",
    scope:{
      day: "=",
      dbUser:"=user",
      data:"=data"      
    },
    link: function($scope, element, attrs){
      $timeout(function() {
        element.ready(function(){
          $scope.$apply(function (){
            element.inolSumDay()
          })
        })

      }, 1000);
      element.inolSumDay = function(){
        var defineExercise = element[0].getElementsByClassName("exerciseName");
        var BBP = element[0].getElementsByClassName("BBP");
        var BBS = element[0].getElementsByClassName("BBS");
        var BDL = element[0].getElementsByClassName("BDL");
        var exersizeChecker = "";
        $scope.BBP = 0;
        $scope.BBS = 0;
        $scope.BDL = 0;

        for(var i = 0; i < defineExercise.length; i++){
          exersizeChecker = defineExercise[i].innerText
          console.log(exersizeChecker)
          if (exersizeChecker === "Barbell Bench Press"){
            for(var i = 0; i < BBP.length; i++){
              $scope.BBP =  $scope.BBP + parseFloat(BBP[i].getElementsByClassName("inolexercise")[0].innerText)
              exersizeChecker = defineExercise[i].innerText
            }
          } 
          if (exersizeChecker === "Barbell Back Squat"){
            for(var i = 0; i < BBS.length; i++){
              $scope.BBS =  $scope.BBS + parseFloat(BBS[i].getElementsByClassName("inolexercise")[0].innerText)
              exersizeChecker = defineExercise[i].innerText
            }
          }
          if (exersizeChecker === "Barbell Dead Lift"){
            for(var i = 0; i < BDL.length; i++){
              $scope.BDL =  $scope.BDL + parseFloat(BDL[i].getElementsByClassName("inolexercise")[0].innerText)
              exersizeChecker = defineExercise[i].innerText
            }
          }
          break;
        }    
      }
    }
  }
})

.directive("changeMax", function(){
  return{
    restrict: "E",
    replace: true,
    templateUrl: "templates/change-max.html",
    link: function (scope, element, attrs) {
    element.bind("keydown keypress", function (event) {
        if(event.which === 13) {
            scope.$apply(function (){
                scope.$eval(attrs.ngEnter);
            });
              console.log('hello')

            $(".refresh").click()
            event.preventDefault();
        }
      });
    }
  }
})