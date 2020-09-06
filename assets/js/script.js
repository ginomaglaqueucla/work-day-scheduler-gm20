var schedule = {};
var currentDate;

// Load schedule onto page from local storage
var loadEvent = function() {
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
    
    // loop through each item in object array in local storage
    // pass to createEvent function
    for( var i = 0; i < schedule.hour.length; i++){
        createEvent(schedule.hour[i], schedule.eventMsg[i]);
    }   
};

// pulls current date data using moment()
var loadDay = function() {
    currentDate = moment();
    var currentDay = moment().format("dddd, MMMM Do YYYY");
    $("#currentDay").text(currentDay);
    console.log(currentDay);
};

// displays events respectively
var createEvent = function(hour, message){
    // select HTML element for event message/description    
    var eventMsg = $("#"+hour+"-event");

    // append message to display onto page
    eventMsg.append(message);
};


// when an event description box is clicked
$(".row").on("click", "textarea", function(){
    // capture newly inputted text    
    var text = $(this)
        .text()
        .trim();

    // reassign
    $(this).text(text);

});

// when action happens outside of being inside the text area
// in order for event box to retain value
$(".row").on("blur", "textarea", function() {
    // grab newly inputted text
    var text = $(this)
        .val()
        .trim();
    
    // select HTML parent element
    var rowID = $(this)
        .closest(".row")
        .attr("id");
    
    // index of where user just inputted from
    var index = schedule.hour.indexOf(rowID);
    
    // reassign in object arrat
    schedule.eventMsg[index] = text;
});

// when save button is clicked
$(".row").on("click", "button", function(){
    // reassign schedule object inside local storage
    localStorage.setItem("schedule", JSON.stringify(schedule));
});

// checks timeblocks according to current hour
var checkDue = function(){
    // pull latest date data
    loadDay();
    // parse hour to integer
    var currentHour = parseInt(currentDate.format("H"));
    // loop through each hour and check with current hour
    for (var i = 0; i < schedule.hour.length; i++) {
        var scheduleHour = parseInt(schedule.hour[i]);
        var textAreaEl = $("#"+scheduleHour+"-event");
        if(scheduleHour < currentHour){
            textAreaEl.addClass("past");
        }
        else if (scheduleHour === currentHour) {
            textAreaEl.addClass("present");

        }
        else if (scheduleHour > currentHour) {
            textAreaEl.addClass("future")

        }
    }
}

loadEvent();
checkDue();
setInterval(function() {
    console.log("checking every min!");
    checkDue();
}, 60 * 1000); // 60 * 1000 milsec
