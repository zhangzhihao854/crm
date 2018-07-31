/**
 * Created by my on 2018/2/26.
 */
/*阻止ios拖拽到底部还能继续拖拽*/

var ScrollFix = function(elem) {
  // Variables to track inputs
  var startY, startTopScroll;

  elem = elem || document.querySelector(elem);

  // If there is no element, then do nothing
  if(!elem)
    return;

  // Handle the start of interactions
  elem.addEventListener('touchstart', function(event){
    startY = event.touches[0].pageY;
    startTopScroll = elem.scrollTop;

    if(startTopScroll <= 0)
      elem.scrollTop = 1;

    if(startTopScroll + elem.offsetHeight >= elem.scrollHeight)
      elem.scrollTop = elem.scrollHeight - elem.offsetHeight - 1;
  }, false);
};

/*判断设备调用ScrollFix*/

var sUserAgent=navigator.userAgent.toLowerCase();
if(sUserAgent.match(/iphone os/i) == "iphone os"){
  $('.wrapper').addClass('wrapper2');
  ScrollFix($('#app')[0]);
}

/*阻止用户双击使屏幕上滑*/
var agent = navigator.userAgent.toLowerCase();        //检测是否是ios
var iLastTouch = null;                                //缓存上一次tap的时间
if (agent.indexOf('iphone') >= 0 || agent.indexOf('ipad') >= 0)
{
  document.body.addEventListener('touchend', function(event)
  {
    var iNow = new Date()
      .getTime();
    iLastTouch = iLastTouch || iNow + 1 /** 第一次时将iLastTouch设为当前时间+1 */ ;
    var delta = iNow - iLastTouch;
    if (delta < 500 && delta > 0)
    {
      event.preventDefault();
      return false;
    }
    iLastTouch = iNow;
  }, false);
}
