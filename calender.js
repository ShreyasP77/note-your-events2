


let dates = new Date();
function renderDate() {

  let today = new Date();
  let months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
  let endDate = new Date(dates.getFullYear(), dates.getMonth() + 1, 0).getDate();
  let prevDate = new Date(dates.getFullYear(), dates.getMonth(), 0).getDate();

  let lastdayofthemonth = new Date(dates.getFullYear(), dates.getMonth() + 1, 0).getDay();

  document.getElementById("month").innerHTML = months[dates.getMonth()];
  document.getElementById("date_str").innerHTML = dates.toDateString();

  dates.setDate(1)
  let day = dates.getDay()

  let cells = "";
  let nextmonthDate = 1
  for (let x = day; x > 0; x--) {
    cells += "<div class='prev_date'>" + (prevDate - x + 1) + "</div>"

  }
  let n = 1
  for (let i = 1; i <= endDate; i++) {

    if (i == today.getDate() && dates.getMonth() == today.getMonth()) {
      // cells += "<div class='today' >" + i + "</div>"
      cells += `<div class='today common_date' id ='${i}' data-bs-toggle="modal" data-bs-target="#exampleModal" onclick='addNote(this.id)'>${i}</div>`
    } else {
      // cells += "<div class = 'present_date'>" + i + "</div>"
      cells += `<div class = 'present_date common_date' id='${i}' data-bs-toggle="modal" data-bs-target="#exampleModal" onclick='addNote(this.id)'>${i}</div>`
    }
  }
  for (let y = lastdayofthemonth; y < 6; y++) {
    cells += "<div class='next_date'>" + nextmonthDate + "</div>"
    nextmonthDate++;
  }
  document.getElementsByClassName("days")[0].innerHTML = cells;

  showNotes();







}



function moveDate(params) {
  if (params == 'prev') {
    dates.setMonth(dates.getMonth() - 1);

  } else if (params == 'next') {
    dates.setMonth(dates.getMonth() + 1);

  }
  renderDate();
}
let addNoteDate = new Date()
function addNote(i) {
  addNoteDate.setDate(i)
  addNoteMonth = dates.getMonth()

  addNoteDate.setFullYear(dates.getFullYear())
  addNoteDate.setMonth(addNoteMonth)



  sendToHiddenVariable = addNoteDate.toDateString();
  document.getElementById("dateHidden").innerHTML = sendToHiddenVariable;






}

function addBtn() {
  let addTxt = document.getElementById("addTxt");
  let addTitle = document.getElementById("addTitle");
  let dateHidden = document.getElementById("dateHidden").innerHTML;


  let notes = localStorage.getItem("notes");
  if (notes == null) {
    notesObj = [];
  } else {
    notesObj = JSON.parse(notes);
  }
  let myObj = {
    title: addTitle.value,
    text: addTxt.value,
    date: dateHidden
  }

  notesObj.push(myObj);
  notesObj.sort(function (a, b) {

    return new Date(a.date) - new Date(b.date);
  });

  localStorage.setItem("notes", JSON.stringify(notesObj));
  addTxt.value = "";
  addTitle.value = "";

  showNotes();



}

// Function to show elements from localStorage
function showNotes() {
  let newDate = new Date();
  let notes = localStorage.getItem("notes");
  if (notes == null) {
    notesObj = [];
  } else {
    notesObj = JSON.parse(notes);
  }
  let html = "";

  notesObj.forEach(function (element, index) {

    var res = element.text.substring(0, 14);
    html += `           
                <tr class="task-card" onclick="">      
                <td>
                    <div class="task-header">
                        <span class="addDateToNotes" >${element.date}</span>
                        ${element.title}  
                    </div>
                    <div class="task-body">
<pre>
${element.text}
</pre>  
                    </div>
                    <div class="mybtn-right p-1">
                    <button type="button" class="btn btn-primary shadow shadow-secondary" id="${index}" onclick="deleteNote(this.id)">DEL
                    </button></div>
                </td>    
            </tr>  `;
  });
  let tbody = document.getElementsByTagName("tbody")[0];
  if (notesObj.length != 0) {
    tbody.innerHTML = html;
  } else {
    tbody.innerHTML = `<ul style="list-style:circle;">
    <li><div style="display: flex; color: darkblue;">Tap on the note to delete.</div></li>
    <li><div style="display: flex; color: darkblue;"><strong style="color: red; letter-spacing: 1px; padding-right:3px;">Red </strong> note indicates that duration is exceeded. </div></li>
    <li> <div style="display: flex; color: darkblue;">Click on date to add new note.</div></li>
</ul>`;
  }

  let addDateToNotes = document.getElementsByClassName("addDateToNotes")


  let tr = document.getElementsByTagName('tr')

  for (let i = 0; i < tr.length; i++) {

    if (Date.parse(addDateToNotes[i].innerHTML) <= Date.parse(newDate)) {

      tr[i].classList.replace("task-card", "task-card-Replace")
    }

  }
  
  toChangeBGcoloronDateSelect()


}
function toChangeBGcoloronDateSelect(){
  let extracted_NotesDate = document.getElementsByClassName("addDateToNotes")
  let common_date = document.getElementsByClassName("common_date")
  // console.log(extracted_NotesDate)
  // console.log(Date.parse(new Date().toDateString()))
  let mark_date = new Date()
  mark_date.setFullYear(dates.getFullYear())
  mark_date.setMonth(dates.getMonth())
  console.log(mark_date)
  for (let j = 0; j < extracted_NotesDate.length; j++) {

    for (let k = 1; k <= common_date.length; k++) {
      //  console.log(common_date[k].innerHTML)
      // console.log(k)
    mark_date.setDate(k)
   if( Date.parse(extracted_NotesDate[j].innerHTML) == Date.parse(mark_date.toDateString()) ){
    common_date[k-1].classList.add("addnewBgColor");
   }
   
          
    }
    
  }
    
}

function deleteNote(index) {
  //   console.log("I am deleting", index);

  let notes = localStorage.getItem("notes");
  if (notes == null) {
    notesObj = [];
  } else {
    notesObj = JSON.parse(notes);
  }

  notesObj.splice(index, 1);
  localStorage.setItem("notes", JSON.stringify(notesObj));
  showNotes();
  renderDate();

}






