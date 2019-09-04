var restify = require('restify');
var builder = require('botbuilder');
var LUIS = require('luis-sdk');
var moment = require('moment');
var ping = require("ping");
var unirest = require("unirest");
// const request = require('request-promise')
var request = require('request');
var globalOrder = null;
var bot = new builder.UniversalBot(connector);
var server = restify.createServer();
// var server = restify.createServer();
var session1;
server.listen(process.env.port || process.env.PORT || 8000, function () {
    console.log("--------------------------------------------------------");
    console.log("L&D Smart Assistant is running with the address : " + server.url);
    console.log("--------------------------------------------------------");
});
var connector = new builder.ChatConnector({
    appId: "d416189b-db2b-4a31-a716-c8de61d92f73",
    appPassword: "3z*JPC5bI@dh1IaUgR.]MIUX3?InEUrI"
});
var bot = new builder.UniversalBot(connector, {
    storage: new builder.MemoryBotStorage()
});
server.get('/followup', (req, res) => {

    var address =
    {
        channelId: 'msteams',
        user: { id: '29:1MRCQcVpFOUGrJ7yN6PQRoezTctxRlArksnXD9v6C0gOE3C8MrpY00MINKtqhPFjds6sDCk14igf2I7q-awZPRA' },
        channelData: {
            tenant: {
                id: '08c14ce7-cb84-43e8-b04a-50a5afe9bdf9'
            }
        },
        bot:
        {
            id: 'd416189b-db2b-4a31-a716-c8de61d92f73',
            name: '3z*JPC5bI@dh1IaUgR.]MIUX3?InEUrI'
        },
        serviceUrl: 'https://smba.trafficmanager.net/amer/',
        useAuth: true
    }

    var msg = new builder.Message().address(address);
    msg.text('I see that you attended the session topic IOT & Implementation on September 5th, 2019. To ensure that you complete your course certification, you must take the assessment test');
    msg.addAttachment(
        new builder.HeroCard(session1)
            .text("Would you like for me to help schedule this?")
            .buttons([
                builder.CardAction.imBack(session1, "Yes, I'm interested", "Yes"),
                builder.CardAction.imBack(session1, "noRegistration", "No")
            ]))
    bot.send(msg);
    res.send("success");
})
server.get('/feedback', (req, res) => {

    var address =
    {
        channelId: 'msteams',
        user: { id: '29:1MRCQcVpFOUGrJ7yN6PQRoezTctxRlArksnXD9v6C0gOE3C8MrpY00MINKtqhPFjds6sDCk14igf2I7q-awZPRA' },
        channelData: {
            tenant: {
                id: '08c14ce7-cb84-43e8-b04a-50a5afe9bdf9'
            }
        },
        bot:
        {
            id: 'd416189b-db2b-4a31-a716-c8de61d92f73',
            name: '3z*JPC5bI@dh1IaUgR.]MIUX3?InEUrI'
        },
        serviceUrl: 'https://smba.trafficmanager.net/amer/',
        useAuth: true
    }

    var msg = new builder.Message().address(address);
    msg.text('I see that you attended the session topic IOT & Implementation on September 5th, 2019. Would you like to provide feedback on the session?');
    msg.addAttachment(
        new builder.HeroCard(session1)
            .buttons([
                builder.CardAction.imBack(session1, "Yes", "Yes"),
                builder.CardAction.imBack(session1, "No", "No"),
                builder.CardAction.imBack(session1, "Later", "Later")
            ]))
    bot.send(msg);
    res.send("success");
})
server.post('/api/messages', connector.listen());
// server.use(restify.conditionalRequest());
//var bot = new builder.UniversalBot(connector);
var bot = new builder.UniversalBot(connector, {
    storage: new builder.MemoryBotStorage()
});
var onum, onumber;
var model = 'https://westus.api.cognitive.microsoft.com/luis/v2.0/apps/af5ec78b-16d0-4fc0-9593-36ddf2f551e6?verbose=true&timezoneOffset=-360&subscription-key=ff5c97b12877459d8ca427dca53466ee&q='
var recognizer = new builder.LuisRecognizer(model);
var dialog = new builder.IntentDialog({
    recognizers: [recognizer]
});
var count = 0;
var n = 0;

var cards;
var reply;
server.post('/api/messages', connector.listen());
bot.dialog('/', dialog);
// else
// {
function feedback1(session) {
    return [
        new builder.HeroCard(session)
            .buttons([
                builder.CardAction.imBack(session, "Yes", "Yes"),
                builder.CardAction.imBack(session, "No", "No"),
                builder.CardAction.imBack(session, "Partially", "Partially"),

            ]),
    ];
}
function capabilities(session) {
    return [
        new builder.HeroCard(session)
            .buttons([
                builder.CardAction.imBack(session, "Event Registration", "Event Registration"),
                builder.CardAction.imBack(session, "Course Search in LMS", "Course Search in LMS"),
                builder.CardAction.imBack(session, "Upcoming Events", "Upcoming Events"),
                builder.CardAction.imBack(session, "Schedule Assessment", "Schedule Assessment"),
                builder.CardAction.imBack(session, "Assemble Servo Motor", "Assemble Servo Motor"),
                builder.CardAction.imBack(session, "Speak with L&D Expert", "Speak with L&D Expert"),
            ]),
    ];
}

function feedback2(session) {
    return [
        new builder.HeroCard(session)
            .buttons([
                builder.CardAction.imBack(session, "Excellent", "Excellent"),
                builder.CardAction.imBack(session, "Good", "Good"),
                builder.CardAction.imBack(session, "Okay", "Okay"),
                builder.CardAction.imBack(session, "Bad", "Bad")
            ]),
    ];
}
function feedback3(session) {
    return [
        new builder.HeroCard(session)
            .buttons([
                builder.CardAction.imBack(session, "1", "1"),
                builder.CardAction.imBack(session, "2", "2"),
                builder.CardAction.imBack(session, "3", "3"),
                builder.CardAction.imBack(session, "4", "4"),
                builder.CardAction.imBack(session, "5", "5")
            ]),
    ];
}
function eventRegistration(session) {
    
    return [
        new builder.HeroCard(session)
            .buttons([
                builder.CardAction.imBack(session, "September 10th, 2019", "September 1st, 2019"),
                builder.CardAction.imBack(session, "October 2nd, 2019", "October 2nd, 2019"),
                builder.CardAction.imBack(session, "November 22nd, 2019", "November 22nd, 2019"),
            ]),
    ];
}




function trainingsession(session) {
    //console.log("Session ", session);
    return [
        new builder.HeroCard(session)

            .title('Accelerating the Journey to AI')
            .subtitle('Date : 1/12/2019 ,Timings : 3:20 PM')
            .text('Location : Miracle Head Quarters')
            .images([
                builder.CardImage.create(session, 'https://assets.techcircle.in/uploads/article-image/2019/04/images/18200-17676-artificial-intelligence-rf2.jpg')
            ]),
        new builder.HeroCard(session)
            .title('The Blueprint for smart Businesses ')
            .subtitle('Date : 4/12/2019 , Timings : 5:20 PM')
            .text('Location : Miracle Data Science studio')
            .images([
                builder.CardImage.create(session, 'https://smallbizclub.com/wp-content/uploads/2016/08/Ways-Small-Businesses-Can-Embrace-Smart-Home-Technology.jpg')
            ]),
        new builder.HeroCard(session)
            .title('Prominence of WikiNet')
            .subtitle('Date : 6/12/2019 , Timings : 12:20 AM')
            .text('Location : MLabs Research Center')
            .images([
                builder.CardImage.create(session, 'https://s3-sa-east-1.amazonaws.com/projetos-artes/fullsize%2F2016%2F10%2F21%2F21%2FLogo-e-Papelaria-196276_25301_211327543_1551790993.jpg')
            ])

    ];

}

function eventregister(session) {
    //console.log("Session ", session);
    return [
        new builder.HeroCard(session)
            .title("Autonomous : Empower Engineering")
            .subtitle('Date : 9/15/2019 ,Timings : 09:00 AM')
            .images([
                builder.CardImage.create(session, 'https://www.wardsauto.com/sites/wardsauto.com/files/styles/article_featured_retina/public/web-promo-autonomous.jpg?itok=R1Zn5nYo')
            ])
            .buttons([
                // builder.CardAction.imBack(session, "Bar faucets", "Bar faucets"),
                builder.CardAction.imBack(session, 'Autonomous : Empower Engineering', "Register")
            ]),
        new builder.HeroCard(session)
            .title("End to End Data Science Workshop")
            .subtitle('Date : 9/20/2019  ,Timings : 10:00 AM')
            .images([
                builder.CardImage.create(session, 'https://cdn.mos.cms.futurecdn.net/XbYnCuVzbcHPHuYzCGuSmf.jpg')
            ])
            .buttons([
                builder.CardAction.imBack(session, 'End to End Data Science Workshop', "Register")
            ]),
        new builder.HeroCard(session)
            .title("Security Master Skills")
            .subtitle('Date : 11/10/2019, Timings : 11:00 AM')
            .images([
                builder.CardImage.create(session, 'https://cdn.csu.edu.au/__data/assets/image/0006/2822424/M_Cyber_security_banner_template_01.jpg')
            ])
            .buttons([
                builder.CardAction.imBack(session, 'Security Master Skills', "Register")
            ])

    ];
}

function assessment(session) {
    //console.log("Session ", session);
    return [
        new builder.HeroCard(session)
            .title("Automotive Cyber Security Assessment") 
            .subtitle('Date : 9/10/2019  ,Timings : 10:00 AM')          
            .buttons([
                // builder.CardAction.imBack(session, "Bar faucets", "Bar faucets"),
                builder.CardAction.imBack(session, 'Automotive Cyber Security Assessment', "Register")
            ]),
        new builder.HeroCard(session)
            .title("MDE - CTE Skills Assessment")
            .subtitle('Date : 10/30/2019  ,Timings : 10:00 AM')
            .buttons([
                builder.CardAction.imBack(session, 'MDE - CTE Skills Assessment', "Register")
            ]),
        new builder.HeroCard(session)
            .title("Motor Vehicle Assessment")
            .subtitle('Date : 11/10/2019, Timings : 11:00 AM')
            .buttons([
                builder.CardAction.imBack(session, 'Motor Vehicle Assessment', "Register")
            ])

    ];
}
function servoMotor1(session){
    return [
        new builder.HeroCard(session)
            .title("Step1")
            .subtitle('Hardware Required')
            .images([
                builder.CardImage.create(session, 'https://cdn.instructables.com/FGG/71GM/IUCNGL3Y/FGG71GMIUCNGL3Y.LARGE.jpg?auto=webp&frame=1&width=1024&fit=bounds')
            ])
            .buttons([
                // builder.CardAction.imBack(session, "Bar faucets", "Bar faucets"),
                builder.CardAction.imBack(session, 'Next Step', "Next Step")
            ])

    ];
}
function servoMotor2(session){
    return [
        new builder.HeroCard(session)
            .title("Step2")
            .subtitle('Connections')
            .images([
                builder.CardImage.create(session, 'https://cdn.instructables.com/FIB/LYCX/IUCNGL3S/FIBLYCXIUCNGL3S.LARGE.jpg?auto=webp&frame=1&width=1024&fit=bounds')
            ])
            .buttons([
                // builder.CardAction.imBack(session, "Bar faucets", "Bar faucets"),
                builder.CardAction.imBack(session, 'Next Step', "Next Step")
            ])

    ];
}
function servoMotor3(session){
    return [
        new builder.HeroCard(session)
            .title("Step3")
            .subtitle('Programming')
            .images([
                builder.CardImage.create(session, 'https://cdn.instructables.com/FL4/XDF5/IUCNGL42/FL4XDF5IUCNGL42.LARGE.jpg?auto=webp&width=1024&fit=bounds')
            ])
            .buttons([
                // builder.CardAction.imBack(session, "Bar faucets", "Bar faucets"),
                builder.CardAction.imBack(session, 'Next Step', "Next Step")
            ])

    ];
}
function servoMotor4(session){
    return [
        new builder.HeroCard(session)
            .title("Step4")
            .subtitle('Final Servo motor with aurdino')
            .images([
                builder.CardImage.create(session, 'http://www.sharetechnote.com/image/Arduino_Servo_01.png')
            ])
    ];
}


function coursesearch(session) {
    //console.log("Session ", session);
    return [
        new builder.HeroCard(session)
            .title("Sensor Fusion Engineer")
            .subtitle("James ||  Rating : 4/5")
            .text("100 students enrolled")
            // .images([
            //     builder.CardImage.create(session, 'https://upload.wikimedia.org/wikipedia/commons/f/f9/Eurofighter_sensor_fusion.png')
            // ])
            .buttons([
                builder.CardAction.imBack(session, 'Sensor Fusion Engineer', "Enroll")
            ]),
        new builder.HeroCard(session)
            .title("Self Driving Car Engineer")
            .subtitle("Richard  || Rating : 3/5")
            .text("50 students enrolled")
            // .images([
            //     builder.CardImage.create(session, 'https://blog.education-ecosystem.com/wp-content/uploads/2018/12/self-driving-car-engineer_irwoui.jpg')
            // ])
            .buttons([
                builder.CardAction.imBack(session, 'Self Driving Car Engineer', "Enroll")
            ]),
        new builder.HeroCard(session)
            .title("Robotics Software Engineer")
            .subtitle("David || Rating: 4/5")
            .text("70 students enrolled")
            // .images([
            //     builder.CardImage.create(session, 'data:image/jpeg;base64,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')
            // ])
            .buttons([
                builder.CardAction.imBack(session, 'Robotics Software Engineer', "Enroll")
            ]),
        new builder.HeroCard(session)
            .title("Cyber-Physical Systems Design & Analysis")
            .subtitle("Thomas  || Rating : 4/5")
            .text("150 students enrolled")
            // .images([
            //     builder.CardImage.create(session, 'https://d20vrrgs8k4bvw.cloudfront.net/images/courses/thumbnails/ud9876_thumbnail.jpg')
            // ])
            .buttons([
                builder.CardAction.imBack(session, 'Cyber-Physical Systems Design & Analysis', "Enroll")
            ])

    ];
}
bot.on('conversationUpdate', function (message) {
    console.log("message", message);
    if (message.membersAdded) {

        message.membersAdded.forEach(function (identity) {
            //  //console.log("Message in initial message" ,message);
            if (identity.id == message.address.bot.id) {
                var reply = new builder.Message()
                    .address(message.address)
                    .text("Hi, I’m Ally! A virtual assistant from Miracle’s L&D center ");
                bot.send(reply);
            }
        });
    }
});
dialog.matches('greetings', [

    function (session, args) {
        session1 = session
        console.log("message", session.message);
        console.log("serviceUrl", session.message.address.serviceUrl);
        console.log("session.message.sourceEvent.tenant.id", session.message.sourceEvent.tenant.id)
        console.log("session.message.user.id", session.message.user.id)

        session.sendTyping();
        //   session.send("Hello ** You **");
        session.send("Hi, "+session.message.user.name+" I’m Ally! A virtual assistant from Miracle’s L&D center ");
    }
]);
dialog.matches('Later', [

    function (session, args) {
        session1 = session
        session.sendTyping();
        session.send("Sure, I will reach back to you later!");
        setTimeout(() => {
            request('http://localhost:8000/feedback', function (error, response, body) {
                console.log('error:', error); // Print the error if one occurred
                console.log('statusCode:', response && response.statusCode); // Print the response status code if a response was received
                console.log('body:', body); // Print the HTML for the Google homepage.
            });
            // session.send("Hello, Later Welcome");
        }, 60000);

    }
]);
dialog.matches('noRegistration', [

    function (session, args) {
        session1 = session
        console.log("message", session.message);
        console.log("serviceUrl", session.message.address.serviceUrl);
        console.log("session.message.sourceEvent.tenant.id", session.message.sourceEvent.tenant.id)
        console.log("session.message.user.id", session.message.user.id)

        session.sendTyping();
        //   session.send("Hello ** You **");
        session.send("Sure, I can understand – thanks for attending the session!.");
    }
]);
dialog.matches('No', [

    function (session, args) {
        session1 = session
        console.log("message", session.message);
        console.log("serviceUrl", session.message.address.serviceUrl);
        console.log("session.message.sourceEvent.tenant.id", session.message.sourceEvent.tenant.id)
        console.log("session.message.user.id", session.message.user.id)

        session.sendTyping();
        session.send("Sure, I can understand – thanks for attending the session!.");
    }
]);
dialog.matches('Yes', [
    function (session, args) {
        console.log("inside feedback------------------------------", session)
        builder.Prompts.text(session, "Did you feel that the content in the session was relevant to what you were promised during registration?");
        var cards = feedback1(session);
        var reply = new builder.Message(session)
            .attachmentLayout(builder.AttachmentLayout.carousel)
            .attachments(cards);
        session.send(reply);
    },
    function (session, args) {
        console.log("args", args.response);
        builder.Prompts.text(session, "How engaging was the main speaker ?");
        var cards = feedback2(session);
        var reply = new builder.Message(session)
            .attachmentLayout(builder.AttachmentLayout.carousel)
            .attachments(cards);
        session.send(reply);
    },
    function (session, args) {
        console.log("args", args.response);
        builder.Prompts.text(session, "How would you rate the overall course content ?");
        var cards = feedback3(session);
        var reply = new builder.Message(session)
            .attachmentLayout(builder.AttachmentLayout.carousel)
            .attachments(cards);
        session.send(reply);
    },
    function (session, args) {

        session.send("Thank you for spending your time, we will constantly put our effort to improve your learning experiences");
        session.endDialog();
        session.endConversation();
    },
]);
dialog.matches('intrested', [

    function (session, args) {
        //  console.log("inside assessment------------------------------")
        session.sendTyping();
        builder.Prompts.text(session, "Okay, these are the dates that I currently have available");
        var cards = eventRegistration(session);
        var reply = new builder.Message(session)
            .attachmentLayout(builder.AttachmentLayout.carousel)
            .attachments(cards);
        session.send(reply);



    },

    function (session, args) {
        console.log("args", args.response);
        session.send("Thank you, I have confirmed your slot for the assessment on " + args.response + " You have been sent a calendar invite as well.");
    }
]);

dialog.matches('Training_Sessions', [

    function (session, args) {
        console.log("inside training sessions")
        //session.send("Please find the upcoming events on campus")
        session.sendTyping();
        var cards = trainingsession(session);
        var reply = new builder.Message(session)
            .attachmentLayout(builder.AttachmentLayout.carousel)
            .attachments(cards);
        session.send(reply);
    }
])


dialog.matches('eventRegistration', [
    function (session, args) {
        builder.Prompts.text(session, "Please find the upcoming events on campus, feel free to register.")
        var cards = eventregister(session);
        var reply = new builder.Message(session)
            .attachmentLayout(builder.AttachmentLayout.carousel)
            .attachments(cards);
        session.send(reply);
    },
    function (session, args) {
        session.send("You have been successfully registered to " + args.response + ". The confirmation details have been sent to your email. Thanks for the registration.")
    }
])

dialog.matches('Course_Search', [

    function (session, args) {

        console.log("inside course search");
        session.send("I see that you are from engineering , which topic would you like to learn more about")
    }
    // function (session, args) {
    //     console.log("before cards");
    //     if (args.response == 'Autonomous Cars')
    //         builder.Prompts.text(session, "Here are the courses currently available on-demand, you can enroll by cliking on them")
    //     var cards = coursesearch(session);
    //     var reply = new builder.Message(session)
    //         .attachmentLayout(builder.AttachmentLayout.carousel)
    //         .attachments(cards);
    //     session.send(reply);

    // },
    // function (session, args) {
    //     console.log("after enroll");
    //     session.send("You have successfully enrolled for " + args.response + " . Further details have been sent to your email. Please check")
    // }
])
dialog.matches('AutonomousCars', [

    function (session, args) {
        builder.Prompts.text(session, "Here are the courses currently available on-demand, you can enroll by cliking on them")
        var cards = coursesearch(session);
        var reply = new builder.Message(session)
            .attachmentLayout(builder.AttachmentLayout.carousel)
            .attachments(cards);
        session.send(reply);
    },
    function(session,args){
        session.send("You have successfully enrolled for " + args.response + " . Further details have been sent to your email. Please check")
    }
])
dialog.matches('assessment', [

    function (session, args) {
        builder.Prompts.text(session, "Sure, here are the currently available assessments. Which one would you like to take?")
        var cards = assessment(session);
        var reply = new builder.Message(session)
            .attachmentLayout(builder.AttachmentLayout.carousel)
            .attachments(cards);
        session.send(reply);
    },
    function(session,args){
        session.send("You have successfully enrolled for " + args.response + ". Further details have been sent to your email. Please check")
    }
]);
dialog.matches('capabilities', [

    function (session, args) {
        session.send("Hi, I’m Ally. A chatbot from Miracle L&D center. I can help you with any of the following.")
        var cards = capabilities(session);
        var reply = new builder.Message(session)
            .attachmentLayout(builder.AttachmentLayout.carousel)
            .attachments(cards);
        session.send(reply);
    }
]);
dialog.matches('Thankyou', [

    function (session, args) {
    
        session.send("You are Welcome, How can I help you today?");
    }
]);

dialog.matches('servoMeter', [

    function (session, args) {
        builder.Prompts.text(session, "Servo motors are great devices that can turn to a specified position. These are the Hardware components required.")
        var cards = servoMotor1(session);
        var reply = new builder.Message(session)
            .attachmentLayout(builder.AttachmentLayout.carousel)
            .attachments(cards);
        session.send(reply);
    },
    function(session,args){
        builder.Prompts.text(session, "The servo motor has a female connector with three pins. The darkest or even black one is usually the ground. Connect this to the Arduino GND. Connect the power cable that in all standards should be red to 5V on the Arduino.Connect the remaining line on the servo connector to a digital pin on the Arduino.")
        var cards = servoMotor2(session);
        var reply = new builder.Message(session)
            .attachmentLayout(builder.AttachmentLayout.carousel)
            .attachments(cards);
        session.send(reply);
    },
    function(session,args){
        builder.Prompts.text(session, "Define Servo name, Servo signal input pin (PWM) and Make sure you include Servo.h library")
        var cards = servoMotor3(session);
        var reply = new builder.Message(session)
            .attachmentLayout(builder.AttachmentLayout.carousel)
            .attachments(cards);
        session.send(reply);
    },
    function(session,args){
       session.send("This is how we can Control Servo Motor with Arduino")
        var cards = servoMotor4(session);
        var reply = new builder.Message(session)
            .attachmentLayout(builder.AttachmentLayout.carousel)
            .attachments(cards);
        session.send(reply);
    },
    
]);
// dialog.matches('agent', [
//     function (session, args) {
//     userdata[0].agent=true
//     // console.log(session.send)
//     callAgent(session)
//     // console.log(session.connector, args)
//     console.log("inside agent------------------------------")
//     session.sendTyping();
//     session.send("Please wait a moment while we connect you with an available L&D Expert");
//     // session.send("Hello " + req.body.user.name + ", I’m Ally. A chatbot from Miracle L&D center. How can I help you today.");
   
//     }
//     ]);


//}

