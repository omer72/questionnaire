angular.module('starter.controllers', [])


.controller('AppCtrl', function($scope, $ionicModal, $timeout) {
  // Form data for the login modal
  $scope.loginData = {};

  // Create the login modal that we will use later
  $ionicModal.fromTemplateUrl('templates/login.html', {
    scope: $scope
  }).then(function(modal) {
    $scope.modal = modal;
  });

  // Triggered in the login modal to close it
  $scope.closeLogin = function() {
    $scope.modal.hide();
  };

  // Open the login modal
  $scope.login = function() {
    $scope.modal.show();
  };

  // Perform the login action when the user submits the login form
  $scope.clearLocalStorage = function() {
    localStorage.clear();
  };
})

.controller('QuestionListCtrl',  function($scope,$q,$ionicLoading,ParseQueries){
  $scope.links = [];
        
  getData(false);

  function getData(update){
    $ionicLoading.show({
      template: 'Loading...'
    });
    ParseQueries.getQuestionList(update).then(function success(res){
      $scope.links = res;
      $scope.$broadcast('scroll.refreshComplete');
      $ionicLoading.hide();
    })
  }

  $scope.doRefresh = function(){
    getData(true);
  }

  $scope.goTo = function(uuid,messageId){
      $state.go('tab.message-detail',{"index":messageId,"uuid":uuid});
  }
  
})


.controller('QuestionCtrl', function($scope, $stateParams,$q,$ionicLoading,ParseQueries,$window,$ionicListDelegate) {
  $scope.saveData= {};
  $scope.questions = []; 
  $scope.haveAnswer = false;
  var main_answers = [];

  getData(false);
  function getData(update){
    $ionicListDelegate.canSwipeItems(false);
      $ionicLoading.show({
        template: 'Loading...'
      });
      ParseQueries.getQuestionData($stateParams.questionnaireID,update).then(function success(res){
      $scope.questions = res;
      $ionicLoading.hide();
    });
  }

  ParseQueries.getQuestionAnswers($stateParams.questionnaireID).then(function success(res){
    main_answers = res;
  })

$scope.share = function(){
  $window.plugins.socialsharing.share($scope.questions[0].questionHeader +" : "+$scope.answer, $scope.questions[0].questionHeader);
}
  
  

  $scope.submit = function(){
    $ionicListDelegate.canSwipeItems(false);
    $scope.scroll = false;  
    $scope.haveAnswer = true;
  
    var sum = 0;
    var length = 0
    for (var key in $scope.saveData.answer) {
      sum += $scope.saveData.answer[key];
      length ++;
    }
    var average =  Math.round(sum/length);
    $scope.answer = main_answers[average-1];
    
  }




});
