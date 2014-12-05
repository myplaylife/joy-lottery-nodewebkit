'use strict'

### Filters ###

angular.module('app.filters', [])

.filter('interpolate', [
  'version',

(version) ->
  (text) ->
    String(text).replace(/\%VERSION\%/mg, version)

])

.filter('winners_filter', [

 ->
   (number) ->
     if number == -1
       ""
     else
       number

])
