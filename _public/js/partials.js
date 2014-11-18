angular.module('partials', [])
.run(['$templateCache', function($templateCache) {
  return $templateCache.put('/partials/act.html', [
'',
'<div ng-keydown="act($event)">',
'  <h1>act.html</h1>',
'  <div id="prize">',
'    <h4>prize area</h4>',
'    <h6>{{prize.id}}</h6>',
'    <h6>{{prize.name}}</h6>',
'    <h6>{{prize.desc}}</h6>',
'    <h6>{{prize.image}}</h6>',
'    <h6>是否一次抽完：{{prize.complete_once}}</h6>',
'    <h6>中奖人数：{{prize.capacity}}</h6>',
'  </div><br>',
'  <div id="act">',
'    <h4>act area</h4>',
'    <div ng-repeat="slot in prize.slots" ng-class="getSlotClass(slot.state)" class="row span4"><span ng-click="changeSlotState(slot)">',
'        <h5>{{slot.id}} - {{slot.number}}</h5></span></div><br>',
'    <input id="act" value="{{actButtonValue}}" type="button">',
'  </div>',
'</div>',''].join("\n"));
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
'    <td>{{prize.image}}</td>',
'    <td><span ng-repeat="slot in prize.slots">{{slot.number}}&nbsp;&nbsp;</span></td>',
'  </tr>',
'</table>',''].join("\n"));
}])
.run(['$templateCache', function($templateCache) {
  return $templateCache.put('/partials/manage.html', [
'',
'<h1>manage.html</h1>请输入基础数据路径：<br>',
'<input id="basedatapath" ng-model="BasePath" class="form-control">',
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
'<h1>welcome.html</h1>',''].join("\n"));
}]);