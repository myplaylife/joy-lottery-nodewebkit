'use strict'

# Declare app level module which depends on filters, and services
App = angular.module('app', [
  'ngCookies'
  'ngResource'
  'ngRoute'
  'ui.bootstrap'
  'ngSanitize'
  'ngAnimate'
  'app.services'
  'app.controllers'
  'app.directives'
  'app.filters'
  'app.animations'
  'partials'
])

App.config([
  '$routeProvider'
  '$locationProvider'

($routeProvider, $locationProvider, config) ->

  $routeProvider

    .when('/welcome', {templateUrl: '/partials/welcome.html', controller: 'WelcomeCtrl'})
    .when('/list', {templateUrl: '/partials/list.html', controller: 'ListCtrl'})
    .when('/list-toomuch', {templateUrl: '/partials/list-toomuch.html', controller: 'ListCtrl'})
    .when('/act', {templateUrl: '/partials/act.html', controller: 'ActCtrl'})
    .when('/manage', {templateUrl: '/partials/manage.html', controller: 'ManageCtrl'})
    .when('/help', {templateUrl: '/partials/help.html', controller: 'HelpCtrl'})

    # Catch all
    .otherwise({redirectTo: '/welcome'})

  # Without server side support html5 must be disabled.
  $locationProvider.html5Mode(false)
])
