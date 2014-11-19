'use strict'


### Sevices ###

angular.module('app.services', [])

.factory('version', ->
  "0.1"
)

.factory('LotteryRoute', [
  '$location'
  'WorkspaceService'
  '$rootScope'
  '$route'
  'LotteryDao'

  ($location, WorkspaceService, $rootScope, $route, LotteryDao) ->

    "redirect_rule" : config.redirect

    "route" : (event) ->
      if event.altKey
        fs = require 'fs'
        if (!$rootScope.BasePath) or !(fs.existsSync $rootScope.BasePath) 
          $location.path '/manage'
          return

        if !$rootScope.loaded
          $location.path '/manager'
          return

        if $location.path() == '/act'
          if event.keyCode == 37
            $rootScope.Workspace.activePrizeId = WorkspaceService.setActivePrizeId false
            $route.reload()
          else if event.keyCode == 39
            $rootScope.Workspace.activePrizeId = WorkspaceService.setActivePrizeId true
            $route.reload()

        $location.path this.redirect_rule[$location.path()][event.keyCode]

])

.factory('LotteryDao', [
  '$http'
  '$rootScope'

  ($http, $rootScope) ->

    'saveBaseData' : () ->
      fs = require 'fs'
      fs.writeFile($rootScope.BasedataPath + '/' + 'basedata.json', JSON.stringify($rootScope.BaseData), (err) ->
        if err then alert '工作空间数据保存失败' + err
      )

    # 在获取到BaseData后，要初始化Workspace
    'getBaseData' : () ->
      getWorkspace = this.getWorkspace
      initWorkspace = this.initWorkspace
      saveWorkspace = this.saveWorkspace
      fs = require 'fs'
      fs.exists($rootScope.BasedataFile, (exist) ->
        if exist
          fs.readFile($rootScope.BasedataFile, (err, data) ->
            if err then alert '读取基础数据文件出错'
            $rootScope.BaseData = JSON.parse data
            getWorkspace(initWorkspace, saveWorkspace)
          )
        else
          alert '基础数据文件不存在'
      )

    # 从远端获取Workspace，如果远端不存在就调用Workspace.initWorkspace来初始化
    'getWorkspace' : (initWorkspace, saveWorkspace) ->
      fs = require 'fs'
      files = fs.readdirSync($rootScope.WorkspacePath)
      versions = []
      files.forEach (file) ->
        if file.endWith '.json' then versions.push file
      if versions.length > 0 then $rootScope.Workspace = JSON.parse fs.readFileSync($rootScope.WorkspacePath + '/' + versions.sort()[versions.length - 1])
      if $rootScope.Workspace
        $rootScope.loaded = true
      else
        initWorkspace(saveWorkspace)

    # 初始化工作空间，当工作空间不存在时调用此方法
    # 1.奖品列表copy过来一份
    # 2.初始化弃权列表
    # 3.初始化当前展示的奖品
    # 4.初始化candidates列表
    # 5.初始化所有奖品的winner列表
    # 6.生成奖槽，奖槽应该由编号、中奖号码、定时器、是否被激活等项组成
    #   定时器在抽奖的时候
    'initWorkspace' : (saveWorkspace) ->
      $rootScope.Workspace =
        'prizes'          : $rootScope.BaseData.prizes
        'baseCandidates'  : $rootScope.BaseData.baseCandidates
        'activePrizeId'   : 0
        'waivers'         : []
        'candidates'      : []
        'activate'        : false

      for prize in $rootScope.Workspace.prizes
        prize.slots = []
        for i in [1..prize.capacity]
          slot =
            {
              'id'        : i
              'number'    : -1
              'interval'  : null
              # 奖槽抽奖状态, 单个抽奖的时候会有用
              'activate'  : false
              # 0 - 初始； 1 - 已产生结果； 2 - 需要重抽；
              'state'     : 0
            }
          prize.slots.push slot
      saveWorkspace()
      $rootScope.loaded = true

    'saveWorkspace' : () ->
      fs = require 'fs'
      version = new Date().getTime()
      fs.writeFile($rootScope.WorkspacePath + '/' + version + '.json', JSON.stringify($rootScope.Workspace), (err) ->
        if err then alert '工作空间数据保存失败' + err
        $rootScope.Workspace.lastVersion = version
      )

    'backupWorkspace' : () ->
      alert 'backupWorkspace'
])

.factory('WorkspaceService', [
  '$rootScope'
  '$interval'
  'LotteryDao'

($rootScope, $interval, LotteryDao) ->

  # 当前展示的奖品
  # 如果isForward == true，return currentPrizeId+1 if currentPrizeId < maxPrizeId, else 0
  # if isForward == false, return currentPrizeId-1 if currentPrizeId > 0, else maxPrizeId
  'setActivePrizeId' : (isForward) ->
    current = $rootScope.Workspace.activePrizeId
    count = $rootScope.Workspace.prizes.length - 1
    if isForward
      activeId = if current < count then current + 1 else 0
    else
      activeId = if current == 0 then count else current - 1
    LotteryDao.saveWorkspace()
    activeId

  'getActivePrize' : ->
    activePrize = prize for prize in $rootScope.Workspace.prizes when prize.id == $rootScope.Workspace.activePrizeId
    activePrize

  # 奖槽的号码不等于0，并且在winner里有这个值，说明这个奖槽已经确定中奖者
  # 在所有
  'start' : ->
    prize = this.getActivePrize()
    i = 0
    random = this.random
    candidates = this.candidatesArray()
    try
      if prize.complete_once
        size = prize.slots.length
        if prize.slots[0].state != 1
          prize.slots[0].interval = $interval ( -> prize.slots[0].number = random(candidates) ), 10
          i += 1
        if prize.slots[1].state != 1
          prize.slots[1].interval = $interval ( -> prize.slots[1].number = random(candidates) ), 10
          i += 1
        if prize.slots[2].state != 1
          prize.slots[2].interval = $interval ( -> prize.slots[2].number = random(candidates) ), 10
          i += 1
        if prize.slots[3].state != 1
          prize.slots[3].interval = $interval ( -> prize.slots[3].number = random(candidates) ), 10
          i += 1
        if prize.slots[4].state != 1
          prize.slots[4].interval = $interval ( -> prize.slots[4].number = random(candidates) ), 10
          i += 1
        if prize.slots[5].state != 1
          prize.slots[5].interval = $interval ( -> prize.slots[5].number = random(candidates) ), 10
          i += 1
        if prize.slots[6].state != 1
          prize.slots[6].interval = $interval ( -> prize.slots[6].number = random(candidates) ), 10
          i += 1
        if prize.slots[7].state != 1
          prize.slots[7].interval = $interval ( -> prize.slots[7].number = random(candidates) ), 10
          i += 1
        if prize.slots[8].state != 1
          prize.slots[8].interval = $interval ( -> prize.slots[8].number = random(candidates) ), 10
          i += 1
        if prize.slots[9].state != 1
          prize.slots[9].interval = $interval ( -> prize.slots[9].number = random(candidates) ), 10
          i += 1
        if prize.slots[10].state != 1
          prize.slots[10].interval = $interval ( -> prize.slots[10].number = random(candidates) ), 10
          i += 1
        if prize.slots[11].state != 1
          prize.slots[11].interval = $interval ( -> prize.slots[11].number = random(candidates) ), 10
          i += 1
        if prize.slots[12].state != 1
          prize.slots[12].interval = $interval ( -> prize.slots[12].number = random(candidates) ), 10
          i += 1
        if prize.slots[13].state != 1
          prize.slots[13].interval = $interval ( -> prize.slots[13].numberw= random(candidates) ), 10
          i += 1
        if prize.slots[14].state != 1
          prize.slots[14].interval = $interval ( -> prize.slots[14].number = random(candidates) ), 10
          i += 1
        if prize.slots[15].state != 1
          prize.slots[15].interval = $interval ( -> prize.slots[15].number = random(candidates) ), 10
          i += 1
        if prize.slots[16].state != 1
          prize.slots[17].interval = $interval ( -> prize.slots[16].number = random(candidates) ), 10
          i += 1
        if prize.slots[17].state != 1
          prize.slots[17].interval = $interval ( -> prize.slots[17].number = random(candidates) ), 10
          i += 1
        if prize.slots[18].state != 1
          prize.slots[18].interval = $interval ( -> prize.slots[18].number = random(candidates) ), 10
          i += 1
        if prize.slots[19].state != 1
          prize.slots[19].interval = $interval ( -> prize.slots[19].number = random(candidates) ), 10
          i += 1
        if prize.slots[20].state != 1
          prize.slots[20].interval = $interval ( -> prize.slots[20].number = random(candidates) ), 10
          i += 1
        if prize.slots[21].state != 1
          prize.slots[21].interval = $interval ( -> prize.slots[21].number = random(candidates) ), 10
          i += 1
        if prize.slots[22].state != 1
          prize.slots[22].interval = $interval ( -> prize.slots[22].number = random(candidates) ), 10
          i += 1
        if prize.slots[23].state != 1
          prize.slots[23].interval = $interval ( -> prize.slots[23].number = random(candidates) ), 10
          i += 1
        if prize.slots[24].state != 1
          prize.slots[24].interval = $interval ( -> prize.slots[24].number = random(candidates) ), 10
          i += 1
        if prize.slots[25].state != 1
          prize.slots[25].interval = $interval ( -> prize.slots[25].number = random(candidates) ), 10
          i += 1
        if prize.slots[26].state != 1
          prize.slots[26].interval = $interval ( -> prize.slots[26].number = random(candidates) ), 10
          i += 1
        if prize.slots[27].state != 1
          prize.slots[27].interval = $interval ( -> prize.slots[27].number = random(candidates) ), 10
          i += 1
        if prize.slots[28].state != 1
          prize.slots[28].interval = $interval ( -> prize.slots[28].number = random(candidates) ), 10
          i += 1
        if prize.slots[29].state != 1
          prize.slots[29].interval = $interval ( -> prize.slots[29].number = random(candidates) ), 10
          i += 1
        if prize.slots[30].state != 1
          prize.slots[30].interval = $interval ( -> prize.slots[30].number = random(candidates) ), 10
          i += 1
      else
        for slot in prize.slots
          if slot.state == 0 || slot.state == 2
            # slot.interval = $interval ( -> slot.number++ ), 10
            slot.interval = $interval ( -> slot.number = random(candidates) ), 10
            slot.activate = true
            i += 1
            break
    catch
    finally
      $rootScope.Workspace.activate = true
      if i > 0
        $rootScope.actScope.actButtonValue = "进行中..."

  # 轮询所有奖槽，将被激活奖槽的定时器终止
  # 并将奖槽最终的中奖号码写入到winner列表中
  'stop' : ->
    prize = this.getActivePrize()
    if prize.complete_once
      n = []
      for slot in prize.slots
        # 每一组中的中奖号码可能重复，如果跟之前的重复，就重新再抽一个
        $interval.cancel slot.interval
        while n.contains slot.number
          slot.number = this.random this.candidatesArray()
        slot.state = 1 if slot.state == 0
        slot.activate = false
        this.addWaiver slot.number
        n.push slot.number
    else
      for slot in prize.slots when slot.activate
        $interval.cancel slot.interval
        slot.state = 1
        slot.activate = false
        this.addWaiver slot.number

    $rootScope.Workspace.activate = false
    # $rootScope.Workspace.candidates = this.candidatesNumbers()
    $rootScope.actScope.actButtonValue = "开始"
    LotteryDao.saveWorkspace()

  # 从号池中去掉已经中奖的号，和弃权的号
  'candidatesArray' : ->
    candidates = []
    for range in $rootScope.Workspace.baseCandidates
      for i in [range.start..range.end]
        if ($rootScope.Workspace.waivers.contains i) or (candidates.contains i)
          continue
        candidates.push i

    $rootScope.Workspace.candidates = candidates;
    candidates

  # 添加弃权者
  'addWaiver' : (number) ->
    $rootScope.Workspace.waivers.push number

  # 生成一个0到number之间的随机数
  'random' : (candidates) ->
    candidates[Math.floor Math.random() * candidates.length]

  'basedataPath' : ->
    $rootScope.BasePath + BasedataPath

  'basedataFile' : ->
    $rootScope.BasePath + BasedataPath + BasedataFile

  'workspacePath' : ->
    $rootScope.BasePath + WorkspacePath

  'updatePathConfig' : ->
    if $rootScope.BasePath
      fs = require 'fs'
      $rootScope.BasedataFile = $rootScope.BasePath + BasedataFile
      $rootScope.WorkspacePath = $rootScope.BasePath + WorkspacePath
      if !fs.existsSync $rootScope.WorkspacePath
        fs.mkdirSync $rootScope.WorkspacePath

])
