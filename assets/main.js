//This jQuery statement defines a self-invoking, anonymous function that runs after iframe.html has finished loading in the browser.
// Initialise the Zendesk JavaScript API client
// https://developer.zendesk.com/apps/docs/apps-v2
$(function() {
  var client = ZAFClient.init();
  client.invoke('resize', { width: '100%', height: '400px' });

  showStart();

  $("#get-tasks").click(function(){
    getTaskData(client);
  });

});

function showStart() {
  /* var source = $("#start-hdbs").html();
     var template = Handlebars.compile(source);
     var html = template();
     $("#content").html(html); */
  switchTo('start-hdbs');
}

function getTaskData(client) {
  // The settings object contains all the properties necessary to complete the API request
  // based on the Asana's Get Project Tasks doc
  var settings = {
    url: 'https://app.asana.com/api/1.0/projects/1114672456098820/tasks',
    //headers: {"Authorization": "Bearer 0/d44bc72da8f853a0d5b0b0263e5dc186"},
    headers: {"Authorization": "Bearer {{setting.token}}"},
    secure: true,
    type: 'GET',
    dataType: 'json'
  };
  // make request
  client.request(settings).then(
    function(data) { // If the request is successful, this callback function is executed
      console.log(data);
      showTaskData(data);
    },
    function(response) { // If not, this second one is executed. 
      console.log(response);
      showError(response);
    }
  );
}

function showTaskData(tasks) {
  var context = {
     project_tasks: tasks.data
  };
    /*  var source = $("#tasks-hdbs").html();
      var template = Handlebars.compile(source);
      var html = template(context);
      $("#content").html(html); */
  switchTo('tasks-hdbs', context);
}

function showError(response) {
  var context = {
    'status': response.status,
    'statusText': response.statusText
  };
    /*
      var source = $("#error-hdbs").html();
      var template = Handlebars.compile(source);
      var html = template(context);
      $("#content").html(html); 
    */
    switchTo('error-hdbs', context);
}

// Refactor the template code
function switchTo(template_name, context) {
  var template_id = "#" + template_name;
  var source = $(template_id).html();
  var template = Handlebars.compile(source);
  if (context) {
    var html = template(context);
  } else {
    var html = template();
  }
  $("#content").html(html);
}