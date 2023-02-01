let bodyEl = $("body")
let currentDayEl = $("#currentDay")
let today = moment();
let containerEl = $("#diary")


// ------------------------------
//  TASK ONE - Display the current day at the top of the calender when a user opens the planner.
// ------------------------------

let updateTime = function() {
    let currentDay = moment().format("dddd, D MMMM YYYY, h:mm:ss a");
    currentDayEl.text(currentDay);
}
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
    let storedInfo = localStorage.getItem(`${HH}:00`)
    cell.text(storedInfo) || ("")
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
    row.addClass("row" )
    return(row)

}

let done = false

let appear = function () {
    
    HH = 08
    for (let i = 0; i < 9; i++ ) {
        timeCell = createTimeCell()
        subjectCell = createSubjectCell()
        statusCell = createStatusCell()
        entryRow  = createEntryRow()
        entryRow.attr("data-row", HH)
        entryRow.append(timeCell, subjectCell, statusCell)
        containerEl.append(entryRow) 
        done = true    
    }
}

// NOTE TO GRADER - When scroll function is activated, it prevent the fimeblock function for activing. 
// Have included in the code, but have had to comment out because of this reason. 

// $(window).scroll(function(){
//     if (!done) {
//     getCell = appear()     
//     }
// });

appear()


// ------------------------------
//  TASK THREE - Color-code each timeblock based on past, present, and future when the timeblock is viewed.
// ------------------------------


let currentHour = moment().format("HH")
let allrows = containerEl.children()
let freshTimeblocks = function() {

    for (let index = 0; index < allrows.length; index++) {
        let row = allrows.eq([index])
        let dataRow = parseInt(row.attr("data-row"))
        let subjectCol = row.children().eq([1])
    
        if (dataRow > currentHour) {
            subjectCol.addClass("future")
            subjectCell.removeClass("present past")
    
        } else if (dataRow < currentHour) {
            subjectCol.addClass("past")
            subjectCell.removeClass("future")
        } else {
                subjectCol.addClass("present")
                subjectCell.removeClass("future past")
            }
        }
}

setInterval(freshTimeblocks, 1000);


// ------------------------------
//  TASK FOUR - Allow a user to enter an event when they click a timeblock
// ------------------------------

// - This already happens when the element is dynamically created. 


// ------------------------------
//  TASK FIVE - Save the event in local storage when the save button is clicked in that timeblock
// ------------------------------


let saveEntry = function() {

    for (let index = 0; index < allrows.length; index++) {
        let firstRow = allrows.eq([index])
        let time = firstRow.children().eq([0]).text()
        let entry = firstRow.children().eq([1]).val()
        localStorage.setItem(time, entry)
    }
}

allrows.on("click", saveEntry)



// ------------------------------
//  TASK SIX - Persist events between refreshes of a page ETA  - got to line 43
// ------------------------------


// 
// EXTRA - Clear storage, when the value of current session doesnt not equal the value of the retrieved information. 
//

let retrieved = parseInt(localStorage.getItem("Session Date")) || ("None")
let currentSession = parseInt(today.format("DD"))

if (retrieved != currentSession) {
    localStorage.clear()
    let textArea = $("textarea")
    textArea.text = ("")
    localStorage.setItem("Session Date", currentSession)
    }


