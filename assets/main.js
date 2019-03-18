//This jQuery statement defines a self-invoking, anonymous function that runs after iframe.html has finished loading in the browser.
// Initialise the Zendesk JavaScript API client
// https://developer.zendesk.com/apps/docs/apps-v2
$(function() {
  var client = ZAFClient.init();
  client.invoke('resize', { width: '100%', height: '400px' });

  showStart();
  $("#get-tasks").click(function() {
  getTaskData(client);

});

});

function showStart() {
  var source = $("#start-hdbs").html();
  var template = Handlebars.compile(source);
  var html = template();
  $("#content").html(html);
}

function getTaskData(client) {
  var settings = {
    url: 'https://app.asana.com/api/1.0/projects/your_project_id/tasks',
    headers: {"Authorization": "Bearer 0/d44bc72da8f853a0d5b0b0263e5dc186"},
    type: 'GET',
    dataType: 'json'
  };
  // make request
}
