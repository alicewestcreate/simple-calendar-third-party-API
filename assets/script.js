let bodyEl = $("body")
let currentDayEl = $("#currentDay")
let today = moment();
let containerEl = $("#diary")



// UPDATE TIME FUNCTION 
let updateTime = function() {
    let currentDay = today.format("dddd, D MMMM YYYY, h:mm:ss a");
    currentDayEl.text(currentDay);

}
// UPDATE TIME CALLER 

setInterval(updateTime, 1000);



// GLOBAL VARIABLES

let timeCell;
let subjectCell;
let statusCell;
let entryRow;






// DYNICALL

let HH = 08
// This function create a time Cell. 
let createTimeCell = function () {
    HH++
    let cell = $("<div>")
    cell.addClass("col")
    // cell.attr("id", HH)
    cell.attr("data-cell", "time-cell")
    cell.text(`${HH}:00`)
    return(cell)
}

console.log("", createTimeCell)

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
    cell.text("N/A")
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
        entryRow.attr("id", HH)
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











let currentHour = today.format("HH")
console.log(currentHour)

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










//   // 1. Create a for-loop to iterate through the letters array.
//   for (var i = 0; i < letters.length; i++) {

//     // Inside the loop...

//     // 2. Create a variable named "letterBtn" equal to $("<button>");
//     var letterBtn = $("<button>");

//     // 3. Then give each "letterBtn" the following classes: "letter-button" "letter" "letter-button-color".
//     letterBtn.addClass("letter-button letter letter-button-color");

//     // 4. Then give each "letterBtn" a data-attribute called "data-letter".
//     letterBtn.attr("data-letter", letters[i]);

//     // 5. Then give each "letterBtns" a text equal to "letters[i]".
//     letterBtn.text(letters[i]);

//     // 6. Finally, append each "letterBtn" to the "#buttons" div (provided).
//     $("#buttons").append(letterBtn);

//   }




