'use strict'

### Controllers ###

angular.module('app.controllers', [])

.controller('AppCtrl', [
  '$scope'
  '$location'
  '$resource'
  '$rootScope'
  'LotteryRoute'
  'LotteryDao'
  'WorkspaceService'
  '$interval'
  '$timeout'

($scope, $location, $resource, $rootScope, LotteryRoute, LotteryDao, WorkspaceService, $interval, $timeout) ->

  $rootScope.loaded = false

  $rootScope.isAct = true

  $scope.keydown = (event) ->

    # delete key
    if $rootScope.modalOpen or (event.keyCode == 8)
      event.preventDefault()
      return

    LotteryRoute.route event

    # 抽奖的动作，1000ms之内不能执行第二次
    $rootScope.timer = null
    $timeout.cancel $rootScope.timer if $rootScope.timer
    if (event.keyCode == 32) and ($location.path() == '/act') and $rootScope.isAct
      if !$rootScope
        alert '请等待数据加载'

      if !$rootScope.Workspace.activate
        WorkspaceService.start()
      else
        WorkspaceService.stop()

      $rootScope.isAct = false
      $rootScope.actScope.rod = "images/rod_2.gif"
      timer = $timeout ( ->
        $rootScope.isAct = true
        $rootScope.actScope.rod = "images/rod_1.gif"
      ), 1000


    if (event.keyCode == 27)
      $location.path '/welcome'

])

.controller('WelcomeCtrl', [
  '$rootScope'
  '$scope'
  'WorkspaceService'
  'LotteryDao'

($rootScope, $scope, WorkspaceService, LotteryDao) ->

  fs = require 'fs'

  if fs.existsSync ConfigPath
    BasePath = fs.readFileSync ConfigPath
    $rootScope.BasePath = BasePath.toString()
    if !$rootScope.loaded
      WorkspaceService.updatePathConfig()
      LotteryDao.getBaseData()

])

.controller('ActCtrl', [
  '$rootScope'
  '$scope'
  'WorkspaceService'
  'LotteryDao'
  '$modal'

($rootScope, $scope, WorkspaceService, LotteryDao, $modal) ->

  $scope.prize = WorkspaceService.getActivePrize()

  $rootScope.actScope = $scope

  $scope.changeSlotState = (slot) ->
    state = slot.state
    slot.state = if state == 1 then 2 else if state == 2 then 1 else 0
    LotteryDao.saveWorkspace()

  $scope.getSlotClass = (slot) ->
    if $scope.prize.complete_once
      style = 'draw_once_single_chosen' if slot.state == 2
    else
      if !slot.started
        # 如果只有一个奖品，返回大图标
        if $scope.prize.slots.length == 1
          style = "draw_multi_single_number_big"
        else
          style = "draw_multi_single_number"
      else if (slot.state == 0) or (slot.state == 1)
        if $scope.prize.slots.length == 1
          style = "draw_multi_single_chosen_big"
        else
          style = 'draw_multi_single_chosen'
      else if slot.state == 2
        if $scope.prize.slots.length == 1
          style = "draw_multi_single_redraw_big"
        else
          style = 'draw_multi_single_redraw'

  $scope.rod = "images/rod_1.gif"

  $scope.space = "&nbsp;"

])

.controller('ModalCtrl', [
  '$scope'
  '$modalInstance'
  'image'
  '$rootScope'

($scope, $modalInstance, image, $rootScope) ->

  $scope.image = image
  $rootScope.modalOpen = true

])

.controller('ListCtrl', [
  '$rootScope'
  '$scope'
  'WorkspaceService'

($rootScope, $scope, WorkspaceService) ->

  $scope.prizes = $rootScope.Workspace.prizes

])

.controller('ManageCtrl', [
  '$rootScope'
  '$scope'
  'WorkspaceService'
  'LotteryDao'

($rootScope, $scope, WorkspaceService, LotteryDao) ->

  if $rootScope.BasePath
    $scope.BasePath= $rootScope.BasePath

  if $rootScope.loaded
    $scope.prizes = $rootScope.BaseData.prizes
    $scope.baseCandidates = $rootScope.BaseData.baseCandidates
  else
    $rootScope.$watch('loaded', (loaded) ->
      if loaded
        $scope.prizes = $rootScope.BaseData.prizes
        $scope.baseCandidates = $rootScope.BaseData.baseCandidates
    )

  $scope.$watch('BasePath', (path) ->
    fs = require 'fs'

    if fs.existsSync path + BasedataFile
      fs.writeFileSync ConfigPath, path
      $rootScope.BasePath = path
      WorkspaceService.updatePathConfig()
      if !$rootScope.loaded
        WorkspaceService.updatePathConfig()
        LotteryDao.getBaseData()
      $scope.error_text = ''
    else
      $scope.error_text = '请输入正确的基础数据路径'
  )

])

.controller('HelpCtrl', [
  '$scope'

($scope) ->
  $scope.help = help
])
