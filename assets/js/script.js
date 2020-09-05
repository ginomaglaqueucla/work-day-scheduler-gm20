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
            eventMsg: ["", "World"]
        };
    } 
    
    for( var i = 0; i < schedule.hour.length; i++){
        createEvent(schedule.hour[i], schedule.eventMsg[i]);
    }   
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


    // var textInput = $("<textarea>")
    //     .addClass("event-msg form-group col-md-8 list-group-item")
    //     .text(text);

    $(this).text(text);
    // textInput.trigger("focus");
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



loadEvent();