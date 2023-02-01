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


let appear = function () {

    // containerEl.html("")
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


let currentHour = moment().format("HH")
let allrows = containerEl.children()
let freshTimeblocks = function() {

    // QUESTION - HOW TO STOP COMPUTER THINKING 9 IS GREAT THAN 12 BECUASE IT STARTS WITH A ONE. 


    for (let index = 0; index < allrows.length; index++) {
        let row = allrows.eq([index])
        let dataRow = row.attr("data-row")
        let subjectCol = row.children().eq([1])
    
        if (dataRow  === currentHour) {
            console.log(dataRow)
            console.log(" IS Equal TO ")
            console.log(currentHour)
            subjectCol.addClass("present")
            subjectCell.removeClass("future past")
    
        } else if (dataRow > currentHour) {
            
            console.log(dataRow)
            console.log("IS greater THAN")
            console.log(currentHour)
            subjectCol.addClass("future")
            subjectCell.removeClass("present past")
    
        } else if (dataRow < currentHour) {
            console.log(dataRow)
            console.log("IS less than")
            console.log(currentHour)
            subjectCol.addClass("past")
            subjectCell.removeClass("future")
        }
    }
}

// setInterval(freshTimeblocks, 1000);
freshTimeblocks()






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
        console.log(time);
        console.log(entry);
        localStorage.setItem(time, entry)
    }
}

allrows.on("click", saveEntry)






// ------------------------------
//  TASK SIX - Persist events between refreshes of a page
// ------------------------------

// if today is greater than yesterday or 1, then clear storage 



let previousSession = today.format("DD")
localStorage.setItem("Previous Session", previousSession)


let currentSession = today.format("DD")+1

// if today is great then previous session, clear session.




console.log(previousSession);

console.log(currentSession);
localStorage.setItem("Current Session", currentSession)








