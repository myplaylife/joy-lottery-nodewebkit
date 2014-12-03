angular.module('partials', [])
.run(['$templateCache', function($templateCache) {
  return $templateCache.put('/partials/act.html', [
'',
'<div class="draw_bg">',
'  <div class="title_bg"></div>',
'  <div class="row">',
'    <div class="col-md-2"></div>',
'    <div class="prize_display col-md-2">',
'      <div class="prize_display_title"></div>',
'      <div class="prize_display_image"><img ng-src="{{prize.image}}" class="prize_image"></div>',
'      <div class="prize_display_description">',
'        <p class="lead">{{prize.desc}}</p>',
'      </div>',
'    </div>',
'    <div class="col-md-4 draw">',
'      <div class="rod_area"><img ng-src="{{rod}}" class="rod_image"></div>',
'      <div class="title_image_area"><img ng-src="{{prize.titleImage}}" class="title_image"></div>',
'      <SWITCH ng-switch on="prize.complete_once">',
'        <WHEN ng-switch-when="true">',
'          <div class="draw_once_area">',
'            <SWITCH ng-switch on="prize.started">',
'              <WHEN ng-switch-when="true">',
'                <div ng-repeat="slot in prize.slots" class="draw_once_single_area">',
'                  <div ng-click="changeSlotState(slot)" ng-class="getSlotClass(slot)" class="draw_once_single_number">{{slot.number}}</div>',
'                </div>',
'              </WHEN>',
'              <WHEN ng-switch-when="false">',
'                <div class="draw_image"><img ng-src="images/draw_multi_box_ready.png"><br>（{{prize.capacity}} 名）</div>',
'              </WHEN>',
'            </SWITCH>',
'          </div>',
'        </WHEN>',
'        <WHEN ng-switch-when="false"> ',
'          <div class="draw_multi_area">',
'            <ul class="draw_multi_single_area">',
'              <li ng-repeat="slot in prize.slots" ng-click="changeSlotState(slot)" ng-class="getSlotClass(slot)" class="draw_multi_single_number">',
'                <SWITCH ng-switch on="slot.started">',
'                  <WHEN ng-switch-when="true"><span>{{slot.number}}</span></WHEN>',
'                  <WHEN ng-switch-when="false"><span ng-bind-html="space"></span></WHEN>',
'                </SWITCH>',
'              </li>',
'            </ul>',
'          </div>',
'        </WHEN>',
'      </SWITCH>',
'    </div>',
'    <div class="col-md-4"></div>',
'  </div>',
'</div>',''].join("\n"));
}])
.run(['$templateCache', function($templateCache) {
  return $templateCache.put('/partials/help.html', [
'',
'<h1>帮助</h1><br>',
'<table class="table table-striped">',
'  <tr ng-repeat="h in help">',
'    <td>{{h.key}}</td>',
'    <td> <span ng-bind-html="h.act"></span></td>',
'  </tr>',
'</table>',''].join("\n"));
}])
.run(['$templateCache', function($templateCache) {
  return $templateCache.put('/partials/list.html', [
'',
'<h1>list.act</h1><br>',
'<table class="table table-striped">',
'  <tr>',
'    <th>id</th>',
'    <th>name</th>',
'    <th>image</th>',
'    <th>winners</th>',
'  </tr>',
'  <tr ng-repeat="prize in prizes">',
'    <td>{{prize.id}}</td>',
'    <td>{{prize.name}}</td>',
'    <td><img ng-src="{{prize.image}}" width="50px" height="50px"></td>',
'    <td><span ng-repeat="slot in prize.slots">{{slot.number}}&nbsp;&nbsp;</span></td>',
'  </tr>',
'</table>',''].join("\n"));
}])
.run(['$templateCache', function($templateCache) {
  return $templateCache.put('/partials/manage.html', [
'',
'<h1>manage.html</h1>请输入基础数据路径：<br>',
'<input id="basedatapath" ng-model="BasePath" class="form-control">',
'<div class="text-info"><span>基础数据文件路径：{{BasePath}}/basedata.json</span></div>',
'<div class="text-danger"><span>{{error_text}}</span></div><br><br>',
'<table class="table table-striped">',
'  <tr>',
'    <th>id</th>',
'    <th>名称</th>',
'    <th>图片</th>',
'    <th>图片名称</th>',
'    <th>中奖人数</th>',
'    <th>是否一次抽完</th>',
'    <th>描述</th>',
'    <th>是否播放音乐</th>',
'  </tr>',
'  <tr ng-repeat="prize in prizes">',
'    <td>{{prize.id}}</td>',
'    <td>{{prize.name}}</td>',
'    <td>{{prize.image}}</td>',
'    <td>{{prize.titleImage}}</td>',
'    <td>{{prize.capacity}}</td>',
'    <td>{{prize.complete_once}}</td>',
'    <td>{{prize.desc}}</td>',
'    <td>{{prize.music}}</td>',
'  </tr>',
'</table>',
'<table class="table table-striped">',
'  <tr>',
'    <th>奖号区间</th>',
'  </tr>',
'  <tr ng-repeat="area in baseCandidates">',
'    <th>{{area.start}} - {{area.end}}</th>',
'  </tr>',
'</table>',''].join("\n"));
}])
.run(['$templateCache', function($templateCache) {
  return $templateCache.put('/partials/nav.html', [
'',
'<ul class="nav">',
'  <li ng-class="getClass(\'/todo\')"><a ng-href="#/todo">todo</a></li>',
'  <li ng-class="getClass(\'/view1\')"><a ng-href="#/view1">view1</a></li>',
'  <li ng-class="getClass(\'/view2\')"><a ng-href="#/view2">view2</a></li>',
'  <li ng-class="getClass(\'/view3\')"><a ng-href="#/view3">view3</a></li>',
'</ul>',''].join("\n"));
}])
.run(['$templateCache', function($templateCache) {
  return $templateCache.put('/partials/partial1.html', [
'',
'<p>This is the partial for view 1.</p>',''].join("\n"));
}])
.run(['$templateCache', function($templateCache) {
  return $templateCache.put('/partials/partial2.html', [
'',
'<p>This is the partial for view 2.</p>',
'<p>',
'  Showing of \'interpolate\' filter:',
'  {{ \'Current version is v%VERSION%.\' | interpolate }}',
'</p>',''].join("\n"));
}])
.run(['$templateCache', function($templateCache) {
  return $templateCache.put('/partials/partial3.html', [
'',
'<p>测试jade</p>',
'<p>',
'  Showing of \'interpolate\' filter:',
'  {{ \'Current version is v%VERSION%.\' | interpolate }}',
'</p>',''].join("\n"));
}])
.run(['$templateCache', function($templateCache) {
  return $templateCache.put('/partials/todo.html', [
'',
'<div ng-app="ng-app">',
'  <h2>Todo</h2>',
'  <div ng-controller="TodoCtrl"><span>{{remaining()}} of {{todos.length}} remaining</span> [<a href="" ng-click="archive()">archive</a>]',
'    <ul class="unstyled">',
'      <li ng-repeat="todo in todos">',
'        <label class="checkbox inline">',
'          <input type="checkbox" ng-model="todo.done"><span class="done{{todo.done}}">{{todo.text}}</span>',
'        </label>',
'      </li>',
'    </ul>',
'    <form ng-submit="addTodo()" class="form-inline">',
'      <p>',
'        <input type="text" ng-model="todoText" size="30" placeholder="add new todo here">',
'        <input type="submit" value="add" class="btn btn-primary">',
'      </p>',
'    </form>',
'  </div>',
'</div>',''].join("\n"));
}])
.run(['$templateCache', function($templateCache) {
  return $templateCache.put('/partials/welcome.html', [
'',
'<div class="welcome_bg"></div>',''].join("\n"));
}]);