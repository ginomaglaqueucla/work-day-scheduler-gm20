var schedule = {};
var loadEvent = function() {
    console.log("Hello");
    // pull local storage schedule
    schedule = JSON.parse(localStorage.getItem("schedule"));

    // if empty, create new object
    if(!schedule) {
        console.log("I'm empty");
        schedule = {
            hour: ["9", "10"],
            eventMsg: ["Hello", "World"]
        };
    } 
    
    for( var i = 0; i < schedule.hour.length; i++){
        createEvent(schedule.hour[i], schedule.eventMsg[i]);
    }

    
};

var createEvent = function(hour, message){
    console.log("inside createEvent");
    var timeSlot = $("#"+hour);
    var eventMsg = $("#"+hour+"-event")
        .text(message);
}

loadEvent();