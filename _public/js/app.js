"use strict";var App;App=angular.module("app",["ngCookies","ngResource","ngRoute","app.services","app.controllers","app.directives","app.filters","app.animations","partials"]),App.config(["$routeProvider","$locationProvider",function(t,e){return t.when("/welcome",{templateUrl:"/partials/welcome.html",controller:"WelcomeCtrl"}).when("/list",{templateUrl:"/partials/list.html",controller:"ListCtrl"}).when("/act",{templateUrl:"/partials/act.html",controller:"ActCtrl"}).when("/manage",{templateUrl:"/partials/manage.html",controller:"ManageCtrl"}).otherwise({redirectTo:"/welcome"}),e.html5Mode(!1)}]),angular.module("app.animations",["ngAnimate"]).animation(".phone",function(){return{event:function(){return alert(11)}}});var BasedataFile,BasedataPath,ConfigPath,WorkspacePath,config;config={redirect:{"/welcome":{38:"/manage",39:"/act",40:"/list"},"/act":{38:"/manage",40:"/list"},"/list":{38:"/act",40:"/manage"},"/manage":{38:"/list",40:"/act"}}},ConfigPath="./JoyLotteryPath",BasedataPath="/basedata",BasedataFile="/basedata.json",WorkspacePath="/workspace",Array.prototype.contains=function(t){var e,r,a;for(r=0,a=this.length;a>r;r++)if(e=this[r],e===t)return!0;return!1},String.prototype.endWith=function(t){return null===t||""===t||0===this.length||t.length>this.length?!1:this.substring(this.length-t.length)===t?!0:!1},String.prototype.startWith=function(t){return null===t||""===t||0===this.length||t.length>this.length?!1:this.substr(0,t.length)===t?!0:!1},angular.module("app.controllers",[]).controller("AppCtrl",["$scope","$location","$resource","$rootScope","LotteryRoute","LotteryDao","WorkspaceService","$interval","$timeout",function(t,e,r,a,n,s,o,i,l){return a.loaded=!1,a.isAct=!0,t.keydown=function(t){var r;return n.route(t),a.timer=null,a.timer&&l.cancel(a.timer),32===t.keyCode&&"/act"===e.path()&&a.isAct&&(a||alert("请等待数据加载"),a.Workspace.activate?o.stop():o.start(),a.isAct=!1,r=l(function(){return a.isAct=!0},500)),27===t.keyCode?e.path("/welcome"):void 0}}]).controller("WelcomeCtrl",["$rootScope","$scope","WorkspaceService","LotteryDao",function(t,e,r,a){var n,s;return s=require("fs"),s.existsSync(ConfigPath)&&(n=s.readFileSync(ConfigPath),t.BasePath=n.toString(),!t.loaded)?(r.updatePathConfig(),a.getBaseData()):void 0}]).controller("ActCtrl",["$rootScope","$scope","WorkspaceService","LotteryDao",function(t,e,r,a){return e.prize=r.getActivePrize(),e.actButtonValue="开始",t.actScope=e,e.changeSlotState=function(t){var e;return e=t.state,t.state=1===e?2:2===e?1:0,a.saveWorkspace()},e.getSlotClass=function(t){var e;return 2===t?e="chosen":void 0}}]).controller("ListCtrl",["$rootScope","$scope","WorkspaceService",function(t,e){return e.prizes=t.Workspace.prizes}]).controller("ManageCtrl",["$rootScope","$scope","WorkspaceService","LotteryDao",function(t,e,r,a){return t.BasePath&&(e.BasePath=t.BasePath),t.loaded?(e.prizes=t.BaseData.prizes,e.baseCandidates=t.BaseData.baseCandidates):t.$watch("loaded",function(r){return r?(e.prizes=t.BaseData.prizes,e.baseCandidates=t.BaseData.baseCandidates):void 0}),e.$watch("BasePath",function(n){var s;return s=require("fs"),s.existsSync(n+BasedataPath)?(s.writeFileSync(ConfigPath,n),t.BasePath=n,r.updatePathConfig(),t.loaded||(r.updatePathConfig(),a.getBaseData()),e.error_text=""):e.error_text="请输入正确的基础数据路径"})}]);var DataStore,createDocumentStore,createRelationalStore,createSimpleStore;DataStore="undefined"!=typeof exports&&null!==exports&&exports||(this.DataStore={}),DataStore.create=function(t){switch(t){case"simple":return createSimpleStore();case"relational":return createRelationalStore();case"document":return createDocumentStore();default:return void 0}},createSimpleStore=function(){return{get:function(t){return JSON.parse(localStorage.getItem(JSON.stringify(t)))},set:function(t,e){return localStorage.setItem(JSON.stringify(t),JSON.stringify(e))},"delete":function(t){return localStorage.removeItem(JSON.stringify(t))},count:function(){return localStorage.length},clear:function(){return localStorage.clear()}}},createRelationalStore=function(){var t,e;return t=openDatabase("nwsqldb","1.0","embedded sql database",268435456),e={run:function(e,r){return t.transaction(function(t){return t.executeSql(e,[],function(t,e){var a;return"function"==typeof r?r(function(){var t,r,n;for(n=[],a=t=0,r=e.rows.length;r>=0?r>t:t>r;a=r>=0?++t:--t)n.push(e.rows.item(a));return n}()):void 0})})}}},createDocumentStore=function(){var t,e,r,a;try{return t=require("nedb"),e=require("nw.gui").App.dataPath+"/nedb",a={collection:function(e){return new t({filename:"/"+e,autoload:!0})}}}catch(n){return r=n,console.error("MODULE_NOT_FOUND"===r.code?"NeDB not found. Try `npm install nedb --save` inside of `/app/assets`.":r)}},angular.module("app.directives",["app.services"]).directive("appVersion",["version",function(t){return function(e,r){return r.text(t)}}]),angular.module("app.filters",[]).filter("interpolate",["version",function(t){return function(e){return String(e).replace(/\%VERSION\%/gm,t)}}]),angular.module("app.services",[]).factory("version",function(){return"0.1"}).factory("LotteryRoute",["$location","WorkspaceService","$rootScope","$route","LotteryDao",function(t,e,r,a){return{redirect_rule:config.redirect,route:function(n){var s;return n.altKey?(s=require("fs"),r.BasePath&&s.existsSync(r.BasePath)&&s.existsSync(r.BasedataPath)?r.loaded?("/act"===t.path()&&(37===n.keyCode?(r.Workspace.activePrizeId=e.setActivePrizeId(!1),a.reload()):39===n.keyCode&&(r.Workspace.activePrizeId=e.setActivePrizeId(!0),a.reload())),t.path(this.redirect_rule[t.path()][n.keyCode])):void t.path("/manager"):void t.path("/manage")):void 0}}}]).factory("LotteryDao",["$http","$rootScope",function(t,e){return{saveBaseData:function(){var t;return t=require("fs"),t.writeFile(e.BasedataPath+"/basedata.json",JSON.stringify(e.BaseData),function(t){return t?alert("工作空间数据保存失败"+t):void 0})},getBaseData:function(){var t,r,a,n;return r=this.getWorkspace,a=this.initWorkspace,n=this.saveWorkspace,t=require("fs"),t.exists(e.BasedataFile,function(s){return s?t.readFile(e.BasedataFile,function(t,s){return t&&alert("读取基础数据文件出错"),e.BaseData=JSON.parse(s),r(a,n)}):alert("基础数据文件不存在")})},getWorkspace:function(t,r){var a,n,s;return n=require("fs"),a=n.readdirSync(e.WorkspacePath),s=[],a.forEach(function(t){return t.endWith(".json")?s.push(t):void 0}),s.length>0&&(e.Workspace=JSON.parse(n.readFileSync(e.WorkspacePath+"/"+s.sort()[s.length-1]))),e.Workspace?e.loaded=!0:t(r)},initWorkspace:function(t){var r,a,n,s,o,i,l,c;for(e.Workspace={prizes:e.BaseData.prizes,baseCandidates:e.BaseData.baseCandidates,activePrizeId:0,waivers:[],candidates:[],activate:!1},l=e.Workspace.prizes,s=0,i=l.length;i>s;s++)for(a=l[s],a.slots=[],r=o=1,c=a.capacity;c>=1?c>=o:o>=c;r=c>=1?++o:--o)n={id:r,number:-1,interval:null,activate:!1,state:0},a.slots.push(n);return t(),e.loaded=!0},saveWorkspace:function(){var t,r;return t=require("fs"),r=(new Date).getTime(),t.writeFile(e.WorkspacePath+"/"+r+".json",JSON.stringify(e.Workspace),function(t){return t&&alert("工作空间数据保存失败"+t),e.Workspace.lastVersion=r})},backupWorkspace:function(){return alert("backupWorkspace")}}}]).factory("WorkspaceService",["$rootScope","$interval","LotteryDao",function(t,e,r){return{setActivePrizeId:function(e){var a,n,s;return s=t.Workspace.activePrizeId,n=t.Workspace.prizes.length-1,a=e?n>s?s+1:0:0===s?n:s-1,r.saveWorkspace(),a},getActivePrize:function(){var e,r,a,n,s;for(s=t.Workspace.prizes,a=0,n=s.length;n>a;a++)r=s[a],r.id===t.Workspace.activePrizeId&&(e=r);return e},start:function(){var r,a,n,s,o,i,l,c,u,p;n=this.getActivePrize(),a=0,s=this.random,r=this.candidatesArray();try{if(!n.complete_once){for(u=n.slots,p=[],l=0,c=u.length;c>l;l++){if(i=u[l],0===i.state||2===i.state){i.interval=e(function(){return i.number=s(r)},10),i.activate=!0,a+=1;break}p.push(void 0)}return p}if(o=n.slots.length,1!==n.slots[0].state&&(n.slots[0].interval=e(function(){return n.slots[0].number=s(r)},10),a+=1),1!==n.slots[1].state&&(n.slots[1].interval=e(function(){return n.slots[1].number=s(r)},10),a+=1),1!==n.slots[2].state&&(n.slots[2].interval=e(function(){return n.slots[2].number=s(r)},10),a+=1),1!==n.slots[3].state&&(n.slots[3].interval=e(function(){return n.slots[3].number=s(r)},10),a+=1),1!==n.slots[4].state&&(n.slots[4].interval=e(function(){return n.slots[4].number=s(r)},10),a+=1),1!==n.slots[5].state&&(n.slots[5].interval=e(function(){return n.slots[5].number=s(r)},10),a+=1),1!==n.slots[6].state&&(n.slots[6].interval=e(function(){return n.slots[6].number=s(r)},10),a+=1),1!==n.slots[7].state&&(n.slots[7].interval=e(function(){return n.slots[7].number=s(r)},10),a+=1),1!==n.slots[8].state&&(n.slots[8].interval=e(function(){return n.slots[8].number=s(r)},10),a+=1),1!==n.slots[9].state&&(n.slots[9].interval=e(function(){return n.slots[9].number=s(r)},10),a+=1),1!==n.slots[10].state&&(n.slots[10].interval=e(function(){return n.slots[10].number=s(r)},10),a+=1),1!==n.slots[11].state&&(n.slots[11].interval=e(function(){return n.slots[11].number=s(r)},10),a+=1),1!==n.slots[12].state&&(n.slots[12].interval=e(function(){return n.slots[12].number=s(r)},10),a+=1),1!==n.slots[13].state&&(n.slots[13].interval=e(function(){return n.slots[13].numberw=s(r)},10),a+=1),1!==n.slots[14].state&&(n.slots[14].interval=e(function(){return n.slots[14].number=s(r)},10),a+=1),1!==n.slots[15].state&&(n.slots[15].interval=e(function(){return n.slots[15].number=s(r)},10),a+=1),1!==n.slots[16].state&&(n.slots[17].interval=e(function(){return n.slots[16].number=s(r)},10),a+=1),1!==n.slots[17].state&&(n.slots[17].interval=e(function(){return n.slots[17].number=s(r)},10),a+=1),1!==n.slots[18].state&&(n.slots[18].interval=e(function(){return n.slots[18].number=s(r)},10),a+=1),1!==n.slots[19].state&&(n.slots[19].interval=e(function(){return n.slots[19].number=s(r)},10),a+=1),1!==n.slots[20].state&&(n.slots[20].interval=e(function(){return n.slots[20].number=s(r)},10),a+=1),1!==n.slots[21].state&&(n.slots[21].interval=e(function(){return n.slots[21].number=s(r)},10),a+=1),1!==n.slots[22].state&&(n.slots[22].interval=e(function(){return n.slots[22].number=s(r)},10),a+=1),1!==n.slots[23].state&&(n.slots[23].interval=e(function(){return n.slots[23].number=s(r)},10),a+=1),1!==n.slots[24].state&&(n.slots[24].interval=e(function(){return n.slots[24].number=s(r)},10),a+=1),1!==n.slots[25].state&&(n.slots[25].interval=e(function(){return n.slots[25].number=s(r)},10),a+=1),1!==n.slots[26].state&&(n.slots[26].interval=e(function(){return n.slots[26].number=s(r)},10),a+=1),1!==n.slots[27].state&&(n.slots[27].interval=e(function(){return n.slots[27].number=s(r)},10),a+=1),1!==n.slots[28].state&&(n.slots[28].interval=e(function(){return n.slots[28].number=s(r)},10),a+=1),1!==n.slots[29].state&&(n.slots[29].interval=e(function(){return n.slots[29].number=s(r)},10),a+=1),1!==n.slots[30].state)return n.slots[30].interval=e(function(){return n.slots[30].number=s(r)},10),a+=1}catch(f){}finally{t.Workspace.activate=!0,a>0&&(t.actScope.actButtonValue="进行中...")}},stop:function(){var a,n,s,o,i,l,c,u,p;if(n=this.getActivePrize(),n.complete_once)for(a=[],u=n.slots,o=0,l=u.length;l>o;o++){for(s=u[o],e.cancel(s.interval);a.contains(s.number);)s.number=this.random(this.candidatesArray());0===s.state&&(s.state=1),s.activate=!1,this.addWaiver(s.number),a.push(s.number)}else for(p=n.slots,i=0,c=p.length;c>i;i++)s=p[i],s.activate&&(e.cancel(s.interval),s.state=1,s.activate=!1,this.addWaiver(s.number));return t.Workspace.activate=!1,t.actScope.actButtonValue="开始",r.saveWorkspace()},candidatesArray:function(){var e,r,a,n,s,o,i,l,c;for(e=[],i=t.Workspace.baseCandidates,n=0,o=i.length;o>n;n++)for(a=i[n],r=s=l=a.start,c=a.end;c>=l?c>=s:s>=c;r=c>=l?++s:--s)t.Workspace.waivers.contains(r)||e.contains(r)||e.push(r);return t.Workspace.candidates=e,e},addWaiver:function(e){return t.Workspace.waivers.push(e)},random:function(t){return t[Math.floor(Math.random()*t.length)]},basedataPath:function(){return t.BasePath+BasedataPath},basedataFile:function(){return t.BasePath+BasedataPath+BasedataFile},workspacePath:function(){return t.BasePath+WorkspacePath},updatePathConfig:function(){var e;return t.BasePath&&(e=require("fs"),t.BasedataPath=t.BasePath+BasedataPath,t.BasedataFile=t.BasedataPath+BasedataFile,t.WorkspacePath=t.BasePath+WorkspacePath,e.existsSync(t.WorkspacePath)||e.mkdirSync(t.WorkspacePath),!e.existsSync(t.BasedataPath))?e.mkdirSync(t.BasedataPath):void 0}}}]);