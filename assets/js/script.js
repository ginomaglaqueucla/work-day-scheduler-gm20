var schedule = {};
var currentDate;
var loadEvent = function() {
    console.log("Hello");
    // pull local storage schedule
    schedule = JSON.parse(localStorage.getItem("schedule"));

    // if empty, create new object
    if(!schedule) {
        console.log("I'm empty");
        schedule = {
            hour: ["9", "10", "11", "12", "13", "14", "15", "16", "17"],
            eventMsg: ["", "", "", "", "" ,"", "", "", ""]
        };
    } 
    
    for( var i = 0; i < schedule.hour.length; i++){
        createEvent(schedule.hour[i], schedule.eventMsg[i]);
    }   
};

var loadDay = function() {
    currentDate = moment();
    var currentDay = moment().format("dddd, MMMM Do YYYY");
    $("#currentDay").text(currentDay);
    console.log(currentDay);
};

// displays events respectively
var createEvent = function(hour, message){
    console.log("inside createEvent");
    // var textArea = $("<textarea>")
    //     .text(message);
    
    var eventMsg = $("#"+hour+"-event");

    eventMsg.append(message);
};


// when an event box is clicked
$(".row").on("click", "textarea", function(){
    console.log("Inside event meesage");
    
    var text = $(this)
        .text()
        .trim();

    $(this).text(text);

});

// when action happens outside of being inside the text area
$(".row").on("blur", "textarea", function() {
    console.log("inside blur");
    var text = $(this)
        .val()
        .trim();
    
    var rowID = $(this)
        .closest(".row")
        .attr("id");
    
    var index = schedule.hour.indexOf(rowID);
    console.log(text);
    
    schedule.eventMsg[index] = text;
});

$(".row").on("click", "button", function(){
    console.log("save");
    localStorage.setItem("schedule", JSON.stringify(schedule));
});

var checkDue = function(){
    loadDay();
    var currentHour = parseInt(currentDate.format("H"));
    // loop through each hour and check with current hour
    for (var i = 0; i < schedule.hour.length; i++) {
        var scheduleHour = parseInt(schedule.hour[i]);
        var textAreaEl = $("#"+scheduleHour+"-event");
        if(scheduleHour < currentHour){
            console.log("grey");
            textAreaEl.addClass("past");
        }
        else if (scheduleHour === currentHour) {
            textAreaEl.addClass("present");
            console.log("red");
        }
        else if (scheduleHour > currentHour) {
            textAreaEl.addClass("future")
            console.log("green");
        }
    }
}


loadEvent();
checkDue();
setInterval(function() {
    console.log("checking every min!");
    checkDue();
}, 60 * 1000); // 60 * 1000 milsec
