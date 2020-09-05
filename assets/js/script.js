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
    
    var textInput = $("textarea")
        .text(text);

    

    

    // var textInput = $("<textarea>")
    //     .val(text);

    // $(this).replaceWith(textInput);
    // textInput.trigger("focus");
});

// save event when click outside
$(".row").on("blur", "textarea", function() {
    console.log("inside blur");
    var text = $(this)
        .val()
        .trim();
    
    var rowID = $(this)
        .closest(".row")
        .attr("id");
    
    var index = schedule.hour.indexOf(rowID);
    
    schedule.eventMsg[index] = text;
    console.log(rowID);
    console.log(text);
    console.log(schedule.hour.indexOf(rowID));


});



loadEvent();