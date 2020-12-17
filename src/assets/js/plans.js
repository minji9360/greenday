function setWeek() {
  const today = new Date();
  const year = today.getFullYear();
  const month = today.getMonth();
  const date = today.getDate();
  const dayOfWeek = today.getDay();

  for(let i = 0; i < 7; i++) {
    const resultDay = new Date(year, month, date + (i - dayOfWeek));
    const yyyy = resultDay.getFullYear();
    const mm = Number(resultDay.getMonth()) + 1;
    const dd = resultDay.getDate();
    const dateText = document.querySelector(".date" + i);
    const dateValue = document.querySelector(".date-value" + i);
    dateText.innerText = dd;

    mm = String(mm).length === 1 ? '0' + mm : mm;
    dd = String(dd).length === 1 ? '0' + dd : dd;

    dateValue.value = yyyy + String(mm) + String(dd);
  }
}

var Slider = function(id, _web, _tab, _mobile, spacing){
    var containerWidth = 0;
    var sliderItemWidth = 0;
    var totalCount = 0;
    var spacing = spacing || 10;
    var display = _web;
    var left = 0;
    var interval;
  
    var DOM = {
      container: function(id){
        var dom = document.querySelector('#'+id);
        return dom;
      },
      slider: function(container){
        totalCount = container.children.length;
  
        var dom = document.createElement('div');
        dom.className = 'slider'
        dom.style.position = 'relative';
        dom.style.overflow = 'hidden';
        dom.style.left = 0;
        dom.style.transition = 'left .5s';
        return dom;
      }
    }
  
    // DOM 만들기
    var container = DOM.container(id);
    var slider = DOM.slider(container);
    var temp = container.innerHTML;
    container.innerHTML = '';
    slider.innerHTML = temp;
    container.appendChild(slider);
    var items = document.querySelector('#'+ id + ' .slider').children;
    for(var i=0; i<items.length; i++){
      items[i].style.float = 'left';
      items[i].style.width = (sliderItemWidth-spacing)+ 'px';
      items[i].style['margin-right'] = spacing+'px'; // 간격
    }
  
    // 화면 사이즈 수정시 발생하는 이벤트
    function resize(){
      left = 0;
      document.querySelector('#'+ id + ' .slider').style.left = left + 'px';
  
      var innerWidth = window.innerWidth;
      if(innerWidth >= 1000){
        setDisplayCount(_web);
      }else if(innerWidth < 1000 && innerWidth >= 768) {
        setDisplayCount(_tab);
      }else if (innerWidth < 768) {
        setDisplayCount(_mobile);
      }
      
      if(display === 1){
        spacing = 0;
        var items = document.querySelector('#'+ id + ' .slider').children;
        for(var i=0; i<items.length; i++){
          items[i].style.width = sliderItemWidth + 'px';
          items[i].style['margin-right'] = 0 + 'px'; // 간격
        }
      }
    }
  
    // 디스플레이 갯수 설정 함수
    function setDisplayCount(count) {
      display = count;
  
      containerWidth = container.offsetWidth + spacing;
      sliderItemWidth = containerWidth / display;
  
      document.querySelector('#'+ id + ' .slider').style.width = totalCount * sliderItemWidth + spacing * totalCount + 'px';
      var items = document.querySelector('#'+ id + ' .slider').children;
      for(var i=0; i<items.length; i++){
        items[i].style.width = (sliderItemWidth-spacing)+ 'px';
      }
    }
  
    // 반응형 디스플레이 갯수 조절
    var isResponsive = _tab != undefined && _mobile != undefined;
    if(isResponsive){
      window.onresize = resize;
    }
    resize();
  
    return {
      setDisplayCount: setDisplayCount,
      move: function(index){
        left = (-1) * sliderItemWidth * index;
        document.querySelector('#'+ id + ' .slider').style.left = left + 'px';
      },
      prev: function(){
        left += sliderItemWidth;
        var limit = 0;
        if(left > limit){
          left = limit;
        }
        document.querySelector('#'+ id + ' .slider').style.left = left + 'px';
      },
      next: function(){
        left -= sliderItemWidth;
        var limit = (-1) * sliderItemWidth * (totalCount - display);
        if(left < limit){
          left = limit;
        }
        document.querySelector('#'+ id + ' .slider').style.left = left + 'px';
      },
      auto: function(){
        clearInterval(interval);
        interval = setInterval(function(){
          left -= sliderItemWidth;
          var limit = (-1) * sliderItemWidth * (totalCount - display);
          if(left < limit){
            left = 0;
          }
          document.querySelector('#'+ id + ' .slider').style.left = left + 'px';
        }, 2000)
      },
      stop: function(){
        clearInterval(interval);
      }
    }
  }

function horizontalScroll(){ 
	if (event.wheelDelta >= 120)
		window.scrollBy(-500,0);
	else if (event.wheelDelta <= -120)
		window.scrollBy(500,0);
}

function init() {
  window.horizontalScroll = horizontalScroll;
  var slider = new Slider('slider', 3, 3, 1, 40);
  var next__btn = document.querySelector(".next__btn");
  var prev__btn = document.querySelector(".prev__btn");

  prev__btn.addEventListener("click", slider.prev);
  next__btn.addEventListener("click", slider.next);
  setWeek();
}

init();