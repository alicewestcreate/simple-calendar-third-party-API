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
    let cell = $("<textarea>")
    cell.addClass("col-9")
    cell.attr("data-cell", "subject-cell")
    return(cell)
}
let createStatusCell = function () {
    let cell = $("<button>")
    cell.addClass("col")
    cell.attr("data-cell", "status-cell")
    cell.text("Save")
    return(cell)
}


let createEntryRow = function () {
    let row = $("<div>")
    row.addClass("row")
    return(row)

}


let appear = function () {

    containerEl.html("")
    HH = 08

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

// // - CODE ACTING FUNKY - KEEPS CONTINUING THE FOR LOOP
// // $( window ).scroll(function() {
// //     appear()
// // });

// bodyEl.on("click", appear)


appear()




// ------------------------------
//  TASK THREE - Color-code each timeblock based on past, present, and future when the timeblock is viewed.
// ------------------------------


let currentHour = today.format("HH")

// let currentHour = 12
let allrows = containerEl.children()

// THIS IS NEED TO BE WRAPPED IN A SETINTERVAL REFRESH TIMER! 

for (let index = 0; index < allrows.length; index++) {
    let row = allrows.eq([index])
    let dataRow = row.attr("data-row")
    let subjectCol = row.children().eq([1])

    if (dataRow  === currentHour) {
        subjectCol.addClass("present")
        subjectCell.removeClass("future past")

    } else if (dataRow > currentHour) {
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

// - This already happens when the element is dynamically created. 







// ------------------------------
//  TASK FIVE - Save the event in local storage when the save button is clicked in that timeblock
// ------------------------------




let subject = allrows.eq([0]).children().eq([1])
let saveButton = allrows.eq([0]).children().eq([2])
// subject.text("First item")


let enterEntry = function() {
    console.log(" Enter Entry") 
}

subject.on("click", enterEntry)

// select all rows, and iterate over each row, and make this function happen

let saveEntry = function() {
    console.log("entry save")
    let firstRow = allrows.eq([0])
    let time = firstRow.children().eq([0]).text()
    let entry = firstRow.children().eq([1]).val()
    localStorage.setItem(time, entry)
    // for (let index = 0; index < allrows.length; index++) {
    //     let row = allrows.eq([index])
    //     let time = row.children().eq([0]).text()
    //     let entry = row.children().eq([1]).val()
    //     localStorage.setItem(time, entry) 
    //        }

}






saveButton.on("click", saveEntry)











// ------------------------------
//  TASK SIX - Persist events between refreshes of a page
// ------------------------------







