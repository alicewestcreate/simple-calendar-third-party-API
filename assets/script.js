let bodyEl = $("body")
let currentDayEl = $("#currentDay")
let today = moment();
let containerEl = $("#diary")



// ------------------------------
//  TASK ONE - Display the current day at the top of the calender when a user opens the planner.
// ------------------------------


// UPDATE TIME FUNCTION 
let updateTime = function() {
    let currentDay = today.format("dddd, D MMMM YYYY, h:mm:ss a");
    currentDayEl.text(currentDay);

}
// UPDATE TIME CALLER 

setInterval(updateTime, 1000);





// ------------------------------
//  TASK TWO - Present timeblocks for standard business hours when the user scrolls down.
// ------------------------------

// GLOBAL VARIABLES

let timeCell;
let subjectCell;
let statusCell;
let entryRow;

let HH = 08
// This function create a time Cell. 
let createTimeCell = function () {
    HH++
    let cell = $("<div>")
    cell.addClass("col")
    cell.attr("data-cell", "time-cell")
    cell.text(`${HH}:00`)
    return(cell)
}

let createSubjectCell = function () {
    let cell = $("<div>")
    cell.addClass("col-9")
    cell.attr("data-cell", "subject-cell")
    console.log("subject",cell)
    return(cell)
}
let createStatusCell = function () {
    let cell = $("<div>")
    cell.addClass("col")
    cell.attr("data-cell", "status-cell")
    cell.text("Save")
    console.log("status", cell)
    return(cell)
}


let createEntryRow = function () {
    let row = $("<div>")
    row.addClass("row")
    return(row)

}


let appear = function () {
    for (let i = 0; i < 9; i++ ) {
        timeCell = createTimeCell()
        subjectCell = createSubjectCell()
        statusCell = createStatusCell()
        entryRow  = createEntryRow()
        entryRow.attr("data-row", HH)
        entryRow.append(timeCell, subjectCell, statusCell)
        containerEl.append(entryRow)
    }
    
}

// - CODE ACTING FUNKY - KEEPS CONTINUING THE FOR LOOP
// $( window ).scroll(function() {
//     appear()
// });
appear()





// ------------------------------
//  TASK THREE - Color-code each timeblock based on past, present, and future when the timeblock is viewed.
// ------------------------------


let currentHour = today.format("HH")
let allrows = containerEl.children()

// THIS IS NEED TO BE WRAPPED IN A SETINTERVAL REFRESH TIMER! 

for (let index = 0; index < allrows.length; index++) {
    let row = allrows.eq([index])
    let dataRow = row.attr("data-row")
    let subjectCol = row.children().eq([1])

    if (dataRow  === currentHour) {
        console.log(dataRow)
        subjectCol.addClass("present")
        subjectCell.removeClass("future past")

    } else if (dataRow > currentHour) {
        console.log(dataRow)
        subjectCol.addClass("future")
        subjectCell.removeClass("present past")

    } else if (dataRow < currentHour) {
        subjectCol.addClass("past")
        subjectCell.removeClass("future")
    }
    
    // QUESTION - HOW TO STOP COMPUTER THINKING 9 IS GREAT THAN 12 BECUASE IT STARTS WITH A ONE. 
}


// ------------------------------
//  TASK FOUR - Allow a user to enter an event when they click a timeblock
// ------------------------------






// LOGIC FOR ENTERING INFORMATION 
// On click - input field is opened 
// User enter information into input field 
// On click anywhere else, or when user presses enter
// Store that data into a variable., which is appended to the row. 

let subject = allrows.eq([0]).children().eq([1])
let saveButton = allrows.eq([0]).children().eq([2])
// subject.text("First item")


let enterEntry = function() {

    subject.text($)

    console.log(" Enter Entry")
    //  let newText = textInput.val()
    subject.append(newText)
    
    // subject.append(entry)
    // console.log(entry);
    

    // let userInput = inputField.text()
   
}

let saveEntry = function() {
    console.log("entry save")

}

subject.on("click", enterEntry)

saveButton.on("click", saveEntry)







// ------------------------------
//  TASK FIVE - Save the event in local storage when the save button is clicked in that timeblock
// ------------------------------







// ------------------------------
//  TASK SIX - Persist events between refreshes of a page
// ------------------------------







