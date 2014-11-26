# 37:left 38:up 39:right 40:down
# 32:space
config =
  redirect :
    "/welcome" :
      37 : "/manage"
      39 : "/act"
    "/act" :
      40 : "/list"
      38 : "/list"
    "/list" :
      38 : "/act"
      40 : "/act"
    "/manage" :
      38 : "/help"
      40 : "/help"
    "/help" :
      38 : "/manage"
      40 : "/manage"

ConfigPath = './JoyLotteryPath'
BasedataFile = '/basedata.json'
WorkspacePath = '/workspace'
ImagePath = '/image'


Array.prototype.contains = (element) ->
  for i in this
    if i == element
      return true
  return false

String.prototype.endWith = (str) ->
  if(str==null||str==""||this.length==0||str.length>this.length)
    return false;
  if(this.substring(this.length-str.length)==str)
    return true;
  else
    return false;
  return true;

String.prototype.startWith = (str) ->
  if(str==null||str==""||this.length==0||str.length>this.length)
    return false;
  if(this.substr(0,str.length)==str)
    return true;
  else
    return false;
  return true;

help = [
  {
    "key" : "Alt + s"
    "act" : "保存工作空间"
  },
  {
    "key" : "Alt + o"
    "act" : "在抽奖页面中，打开奖品图片"
  },
  {
    "key" : "ESC"
    "act" : "在非欢迎页面：回到欢迎页面；<br/>在抽奖页面，奖品图片打开时，关闭奖品页面"
  },
  {
    "key" : "space"
    "act" : "在抽奖页面，开始或停止抽奖进程。在0.5秒内连续点击两次无效。"
  },
  # &larr; - 左箭头
  # &uarr; - 上箭头
  # &rarr; - 右箭头
  # &darr; - 下箭头
  {
    "key" : "欢迎页面"
    "act" : "Alt + &larr;：基础数据管理页面；<br/> Alt + &rarr;：抽奖页面；"
  },
  {
    "key" : "抽奖页面"
    "act" : "Alt + &larr;：上一个奖项；<br/> Alt + &rarr;：下一个奖项；<br/> Alt + &uarr; and &darr;：中奖名单;"
  },
  {
    "key" : "中奖名单页面"
    "act" : "Alt + &uarr; and &darr;：抽奖页面;"
  },
  {
    "key" : "基础数据管理页面"
    "act" : "Alt + &uarr; and &darr;：帮助页面;"
  },
  {
    "key" : "帮助页面"
    "act" : "Alt + &uarr; and &darr;：基础数据管理页面;"
  }
]
