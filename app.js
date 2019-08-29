var restify = require('restify');
var builder = require('botbuilder');
var LUIS = require('luis-sdk');
var moment = require('moment');
var ping = require("ping");
var unirest = require("unirest");
const request = require('request-promise')
var globalOrder = null;
var bot = new builder.UniversalBot(connector);
var server = restify.createServer();
var server = restify.createServer();
server.listen(process.env.port || process.env.PORT || 8000, function () {
    console.log("--------------------------------------------------------");
    console.log("Kohler is running with the address : " + server.url);
    console.log("--------------------------------------------------------");
});
var connector = new builder.ChatConnector({
   appId: "d416189b-db2b-4a31-a716-c8de61d92f73",
    appPassword: "Zn=Kazw5uD.2Rq7_fr]43XQ0BEu:U11o"
});
var bot = new builder.UniversalBot(connector, {
    storage: new builder.MemoryBotStorage()
});
server.post('/api/messages', connector.listen());
// server.use(restify.conditionalRequest());
//var bot = new builder.UniversalBot(connector);
var bot = new builder.UniversalBot(connector, {
    storage: new builder.MemoryBotStorage()
});
var onum, onumber;
var model = 'https://westus.api.cognitive.microsoft.com/luis/v2.0/apps/1d8f0713-b358-4f0f-9c19-b2d3fdec6220?verbose=true&timezoneOffset=-360&subscription-key=c2d40a5393cd495d81e8f0271cee39af&q='
var recognizer = new builder.LuisRecognizer(model);
var dialog = new builder.IntentDialog({
    recognizers: [recognizer]
});
var count = 0;
var n = 0;
server.get('/test',(req,res)=>{
    res.send("App running");
});
server.post('/api/messages', connector.listen());
bot.dialog('/', dialog);

dialog.matches('greetings', [
    function (session, args) {
        console.log(session)
        session.sendTyping();
        //   session.send("Hello ** You **");
        session.send("Hey ! I am Feedback and Follwup Bot.How can I help you today?");

    }
]);
