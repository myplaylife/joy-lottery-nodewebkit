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
  $rootScope.isEscReady = true

  $scope.keydown = (event) ->
    # delete key
    # 不支持delete 键
    if event.keyCode == 8
      event.preventDefault()
      return

    # 正在抽奖时，只有空格键会得到相应
    if !$rootScope.Workspace.activate or (event.keyCode == 32)
      LotteryRoute.route event

      # 抽奖的动作，1000ms之内不能执行第二次
      if (event.keyCode == 32) and ($location.path() == '/act') and $rootScope.isAct
        if !$rootScope
          alert '请等待数据加载'

        if !$rootScope.Workspace.activate
          WorkspaceService.start()
        else
          WorkspaceService.stop()

        $rootScope.isAct = false
        $rootScope.actScope.rod = "images/rod_2.gif"
        $timeout ( ->
          $rootScope.isAct = true
          $rootScope.actScope.rod = "images/rod_1.png"
        ), 1000


      # esc
      # esc 1000ms之内也不能执行两次
      if (event.keyCode == 27) and !$rootScope.modalOpen and $rootScope.isEscReady
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

  $(".welcome_bg").css "width", window.screen.width
  $(".welcome_bg").css "height", window.screen.height

])

.controller('ActCtrl', [
  '$rootScope'
  '$scope'
  'WorkspaceService'
  'LotteryDao'
  '$modal'
  'UIService'

($rootScope, $scope, WorkspaceService, LotteryDao, $modal, UIService) ->

  $scope.prize = WorkspaceService.getActivePrize()

  $scope.prize_desc = $scope.prize.desc
  if $scope.prize.desc.length < 47
    $scope.prize_desc = $scope.prize.desc
  else
    $scope.prize_desc = $scope.prize.desc.substring(0, 46) + "..."

  $rootScope.actScope = $scope

  $scope.changeSlotState = (slot) ->
    state = slot.state
    slot.state = if state == 1 then 2 else if state == 2 then 1 else 0
    LotteryDao.saveWorkspace()

  $scope.getSlotClass = (slot) ->
    if $scope.prize.complete_once
      if $scope.prize.slots.length > 10
        if slot.state == 2
          style = 'draw_once_single_chosen_more_10'
        else
          style = 'draw_once_single_done_more_10'
      else if $scope.prize.slots.length > 6
        if slot.state == 2
          style = 'draw_once_single_chosen'
        else
          style = 'draw_once_single_done'
      else
        if slot.state == 2
          style = 'draw_once_single_chosen_less_7'
        else
          style = 'draw_once_single_done_less_7'
    else
      if !slot.started
        # 如果只有一个奖品，返回大图标
        if $scope.prize.slots.length == 1
          style = "draw_multi_single_number_big"
        else if $scope.prize.slots.length > 3
          style = "draw_multi_single_number"
        else
          style = "draw_multi_single_number_medium"
      else if (slot.state == 0) or (slot.state == 1)
        if $scope.prize.slots.length == 1
          style = "draw_multi_single_chosen_big"
        else if $scope.prize.slots.length > 3
          style = 'draw_multi_single_chosen'
        else
          style = 'draw_multi_single_chosen_medium'
      else if slot.state == 2
        if $scope.prize.slots.length == 1
          style = "draw_multi_single_redraw_big"
        else if $scope.prize.slots.length > 3
          style = 'draw_multi_single_redraw'
        else
          style = 'draw_multi_single_redraw_medium'

  $scope.rod = "images/rod_1.png"

  $scope.space = "&nbsp;"

  UIService.actSelfAdaption();

])

.controller('DisplayCtrl', [
  '$scope'
  '$modalInstance'
  'prize'
  '$rootScope'

($scope, $modalInstance, prize, $rootScope, UIService) ->

  $scope.prize = prize
  $rootScope.modalOpen = true


])

.controller('ListCtrl', [
  '$rootScope'
  '$scope'
  'WorkspaceService'
  'UIService'

($rootScope, $scope, WorkspaceService, UIService) ->

  $scope.prizes = $rootScope.Workspace.prizes

  UIService.winnerListSelfAdaption()

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
