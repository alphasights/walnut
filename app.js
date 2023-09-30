SERVICES = []
function Service(service) {
  SERVICES.push(service)
}

$(function() {
  var Statuses = {"true": "success", "false": "failure", "pending": "pending"};

  function removeClasses(service) {
    service.box.removeClass('pending unknown failure success waiting');
  }

  function handle_error(service, result, status) {
    removeClasses(service);
    service.box.addClass('unknown');
  }

  function handle_result(service, result, status) {
    if(status == 'success') {
      if(result && result.replace)
        result = result.replace(/body|img/gi, 'div')
      status = service.status(result)
      removeClasses(service)
      service.box.addClass(Statuses[status]);
      playIfNeeded(service, status);
    } else {
      handle_error(service, page, status)
    }
  }

  function repeat(service) {
    check = function() {
      check_service(service)
    }
    setTimeout(check, service.interval || 20000);
  }

  function check_service(service) {
    service.box.addClass('waiting')

    on_result = function(page, status) {  handle_result(service, page, status); repeat(service) }
    on_error = function(page, status) {  handle_error(service, page, status); repeat(service) }

    $.ajax({
       type: "GET",
       url: service.url,
       username: service.username,
       password: service.password,
       error: on_error,
       success: on_result,
       dataType: service.dataType,
       jsonp: service.jsonp,
       timeout: 3500,
     });
  }

  function initialize_service(n, service) {
    box = service.box = $('.service.template').clone()
    box.removeClass('template')
    box.find('.title').text(service.name)
    $('#content').append(box)
    check_service(service);
  }

  function playIfNeeded(service, status){
    if (service.lastStatus === undefined) {
      service.lastStatus = status;
      return null;
    };
    if (status === false && service.lastStatus !== false){
      playNew();
    };
    service.lastStatus = status;
  };

  $.each(SERVICES, initialize_service)
})

var id = 0;
var playNew = function(){
  zone = document.getElementById("audioelements");
  tag = document.createElement('audio');
  tag.setAttribute("preload","auto");
  tag.setAttribute("autoplay","autoplay");
  tag.setAttribute("src","inception.mp3");
  tag.setAttribute("id","audio"+id);
  zone.appendChild(tag);
  tag.play();
  setTimeout("x=document.getElementById('audio"+id+"');x.parentNode.removeChild(x);", 8500);
  id++;
};
