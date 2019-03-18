//This jQuery statement defines a self-invoking, anonymous function that runs after iframe.html has finished loading in the browser.
// Initialise the Zendesk JavaScript API client
// https://developer.zendesk.com/apps/docs/apps-v2
var client = ZAFClient.init();
client.invoke('resize', { width: '100%', height: '200px' });