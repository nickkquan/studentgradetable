/* information about jsdocs: 
* param: http://usejsdoc.org/tags-param.html#examples
* returns: http://usejsdoc.org/tags-returns.html
* 
/**
 * Listen for the document to load and initialize the application
 */
$(document).ready(initializeApp);
/**
 * Define all global variables here.
 */
/***********************
 * student_array - global array to hold student objects
 * @type {Array}
 * example of student_array after input:
 * student_array = [
 *  { name: 'Jake', course: 'Math', grade: 85 },
 *  { name: 'Jill', course: 'Comp Sci', grade: 85 }
 * ];
 */
var student_array = [];
var counter = 0;
var studentRowId = 0;
/***************************************************************************************************
 * initializeApp
 * @params {undefined} none
 * @returns: {undefined} none
 * initializes the application, including adding click handlers and pulling in any data from the server, in later versions
 */
function initializeApp() {
  addClickHandlersToElements();
}
/***************************************************************************************************
 * addClickHandlerstoElements
 * @params {undefined}
 * @returns  {undefined}
 */
function addClickHandlersToElements() {
  $(".add").on("click", handleAddClicked);
  $(".cancel").on("click", handleCancelClick);
  $("tbody").on("click", ".delete", handleDeleteClicked);
}
/***************************************************************************************************
 * handleAddClicked - Event Handler when user clicks the add button
 * @param {object} event  The event object from the click
 * @return: 
       none
 */
function handleAddClicked() {
  addStudent();
}
/***************************************************************************************************
 * handleCancelClicked - Event Handler when user clicks the cancel button, should clear out student form
 * @param: {undefined} none
 * @returns: {undefined} none
 * @calls: clearAddStudentFormInputs
 */
function handleCancelClick() {
  clearAddStudentFormInputs();
}
/***************************************************************************************************
 * addStudent - creates a student objects based on input fields in the form and adds the object to global student array
 * @param {undefined} none
 * @return undefined
 * @calls clearAddStudentFormInputs, updateStudentList
 */
function addStudent() {
  var studentObject = {};

  studentObject.name = $("#studentName").val();
  studentObject.course = $("#course").val();
  studentObject.grade = parseInt($("#studentGrade").val());
  studentObject.id = studentRowId;
  student_array.push(studentObject);
  updateStudentList(student_array);
  clearAddStudentFormInputs();
}
/***************************************************************************************************
 * clearAddStudentForm - clears out the form values based on inputIds variable
 */
function clearAddStudentFormInputs() {
  $("#studentName").val("");
  $("#course").val("");
  $("#studentGrade").val("");
}
/***************************************************************************************************
 * renderStudentOnDom - take in a student object, create html elements from the values and then append the elements
 * into the .student_list tbody
 * @param {object} studentObj a single student object with course, name, and grade inside
 */
function renderStudentOnDom(object) {
  var newRow = $("<tr>").attr("id", studentRowId++);
  var deleteButton = $("<button>")
    .attr("type", "button")
    .addClass("delete btn btn-danger btn-sm")
    .text("Delete");

  var name = $("<td>").text(object.name);
  var course = $("<td>").text(object.course);
  var grade = $("<td>").text(object.grade);
  var button = $("<td>").append(deleteButton);

  newRow.append(name, course, grade, button);
  $("tbody").append(newRow);
}
/***************************************************************************************************
 * updateStudentList - centralized function to update the average and call student list update
 * @param students {array} the array of student objects
 * @returns {undefined} none
 * @calls renderStudentOnDom, calculateGradeAverage, renderGradeAverage
 */
function updateStudentList(array) {
  for (var arrayIndex = counter; arrayIndex < array.length; arrayIndex++) {
    renderStudentOnDom(array[arrayIndex]);
    counter++;
  }
  renderGradeAverage(calculateGradeAverage(array));
}
/***************************************************************************************************
 * calculateGradeAverage - loop through the global student array and calculate average grade and return that value
 * @param: {array} students the array of student objects
 * @returns {number}
 */
function calculateGradeAverage(array) {
  var number = 0;
  for (var studentIndex = 0; studentIndex < array.length; studentIndex++) {
    number += array[studentIndex].grade;
  }
  var averageGrade = number / array.length;
  return averageGrade;
}
/***************************************************************************************************
 * renderGradeAverage - updates the on-page grade average
 * @param: {number} average    the grade average
 * @returns {undefined} none
 */
function renderGradeAverage(number) {
  $(".avgGrade").text(number);
}

/***************************************************************************************************
 * handleDeleteClicked - Event Handler when user clicks the delete button, should delete out student data
 * @param: {undefined} none
 * @returns: {undefined} none
 * @calls: removeStudent
 */
function handleDeleteClicked() {
  var parentRow = $(this).parents("tr");
  removeStudent(parentRow.attr("id"));
}
/* removeStudent - deletes a student object and deletes the object from global student array
* @param {undefined} none
* @return undefined
* @calls updateStudentList
*/
function removeStudent(id) {
  id = parseInt(id);
  for (
    var studentIndex = 0;
    studentIndex < student_array.length;
    studentIndex++
  ) {
    if (id === student_array[studentIndex].id) {
      student_array.splice(studentIndex, 1);
    } else {
      break;
    }
  }
  removeStudentFromDom(id);
}

function removeStudentFromDom(rowId) {
  $("#" + rowId).remove();
  renderGradeAverage(calculateGradeAverage(student_array));
}
