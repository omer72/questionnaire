// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.controllers' is found in controllers.js
angular.module('starter', ['ionic', 'ngCordova','starter.controllers','starter.services'])

    .run(function($ionicPlatform) {
        $ionicPlatform.ready(function() {
            // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
            // for form inputs)
            if(window.cordova && window.cordova.plugins.Keyboard) {
                cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
            }
            if(window.StatusBar) {
                // org.apache.cordova.statusbar required
                StatusBar.styleDefault();
            }
        });
        Parse.initialize("LMeDCE6Wi9C5Z8e48MFnxtQZATVHqf8Y1dq52Rit", "iMIeFm80o6fneH526wSbwBZ52NfzoJVDbpfGnw2t");

    })

    .config(function($stateProvider, $urlRouterProvider) {
        $stateProvider

            .state('app', {
                url: "/app",
                abstract: true,
                templateUrl: "templates/menu.html",
                controller: 'AppCtrl'
            })

            .state('app.girls', {
                url: "/girls",
                views: {
                    'menuContent' :{
                        templateUrl: "templates/playlists.html",
                        controller: 'QuestionListCtrl',
                        resolve:{
                            genderType:  function(){
                                return "f";
                            }
                        }
                    }
                }
            })
            .state('app.boys', {
                url: "/boys",
                views: {
                    'menuContent' :{
                        templateUrl: "templates/playlists.html",
                        controller: 'QuestionListCtrl',
                        resolve:{
                            genderType:  function(){
                                return "m";
                            }
                        }
                    }
                }
            })

            .state('app.both', {
                url: "/both",
                views: {
                    'menuContent' :{
                        templateUrl: "templates/playlists.html",
                        controller: 'QuestionListCtrl',
                        resolve:{
                            genderType:  function(){
                                return "b";
                            }
                        }
                    }
                }
            })

            .state('app.single', {
                url: "/playlists/:questionnaireID",
                views: {
                    'menuContent' :{
                        templateUrl: "templates/playlist.html",
                        controller: 'QuestionCtrl'
                    }
                }
            });
        // if none of the above states are matched, use this as the fallback
        $urlRouterProvider.otherwise('/app/girls');
    });

