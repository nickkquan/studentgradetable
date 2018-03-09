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
/***************************************************************************************************
 * initializeApp
 * @params {undefined} none
 * @returns: {undefined} none
 * initializes the application, including adding click handlers and pulling in any data from the server, in later versions
 */
function initializeApp() {
	addClickHandlersToElements();
	getStudentData();
	handleFormInputs();
}
/***************************************************************************************************
 * addClickHandlerstoElements
 * @params {undefined}
 * @returns  {undefined}
 */
function addClickHandlersToElements() {
	$(".add").on("click", addStudent);
	$(".cancel").on("click", handleCancelClick);
	$(".retrieve").on("click", handleGetDataClicked);
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
/***************************************************************************************************/
function handleFormInputs() {
	$("#studentName, #studentCourse, #studentGrade").keyup(checkFormEntry);
}

function checkFormEntry() {
	if ($("#studentName").val().length < 2) {
		$(".student-name").addClass("has-error");
		$(".student-icon").popover("show");
	} else {
		$(".student-name").removeClass("has-error");
		$(".student-name").addClass("has-success");
		$(".student-icon").popover("hide");
	}

	if ($("#studentCourse").val().length < 2) {
		$(".student-course").addClass("has-error");
		$(".course-icon").popover("show");
	} else {
		$(".student-course").removeClass("has-error");
		$(".student-course").addClass("has-success");
		$(".course-icon").popover("hide");
	}

	if ($("#studentGrade").val() === "" || isNaN($("#studentGrade").val())) {
		$(".student-grade").addClass("has-error");
		$(".grade-icon").popover("show");
	} else {
		$(".student-grade").removeClass("has-error");
		$(".student-grade").addClass("has-success");
		$(".grade-icon").popover("hide");
	}
}

/***************************************************************************************************
 * addStudent - creates a student objects based on input fields in the form and adds the object to global student array
 * @param {undefined} none
 * @return undefined
 * @calls clearAddStudentFormInputs, updateStudentList
 */
function addStudent() {
	var studentObject = {};
	var studentGrade = $("#studentGrade").val();
	var studentName = $("#studentName").val();
	var studentCourse = $("#studentCourse").val();
	var isValid = true;

	if (studentName.length < 2 || studentName === "") {
		$(".student-name").addClass("has-error");
		$(".student-icon").popover("show");
		isValid = false;
	} else {
		$(".student-name").removeClass("has-error");
		$(".student-name").addClass("has-success");
		$(".student-icon").popover("hide");
		studentObject.name = studentName;
	}

	if (studentCourse.length < 2 || studentCourse === "") {
		$(".student-course").addClass("has-error");
		$(".course-icon").popover("show");
		isValid = false;
	} else {
		$(".student-course").removeClass("has-error");
		$(".student-course").addClass("has-success");
		$(".course-icon").popover("hide");
		studentObject.course = studentCourse;
	}

	if (isNaN(studentGrade) || studentGrade === "" || studentGrade < 0 || studentGrade > 100) {
		$(".student-grade").addClass("has-error");
		$(".grade-icon").popover("show");
		isValid = false;
	} else {
		$(".student-grade").removeClass("has-error");
		$(".student-grade").addClass("has-success");
		$(".grade-icon").popover("hide");
		studentObject.grade = studentGrade;
	}

	if (isValid) {
		// student_array.push(studentObject);
		addStudentData(studentObject);
		updateStudentList(student_array);
		clearAddStudentFormInputs();
	}
}
/***************************************************************************************************
 * clearAddStudentForm - clears out the form values based on inputIds variable
 */
function clearAddStudentFormInputs() {
	$("#studentName").val("");
	$("#studentCourse").val("");
	$("#studentGrade").val("");
	$(".student-grade, .student-name, .student-course").removeClass("has-success has-error");
	$(".student-icon, .course-icon, .grade-icon").popover("hide");
}
/***************************************************************************************************
 * updateStudentList - centralized function to update the average and call student list update
 * @param students {array} the array of student objects
 * @returns {undefined} none
 * @calls renderStudentOnDom, calculateGradeAverage, renderGradeAverage
 */
function updateStudentList(array) {
	$("tbody").empty();
	for (var arrayIndex = 0; arrayIndex < array.length; arrayIndex++) {
		(function() {
			var student = array[arrayIndex];
			var newRow = $("<tr>").attr("id", student.id);
			var name = $("<td>").text(student.name);
			var course = $("<td>").text(student.course);
			var grade = $("<td>").text(student.grade);

			var deleteButton = $("<button>", {
				type: "button",
				class: "delete btn btn-danger btn-sm",
				text: "Delete",
				on: {
					click: function() {
						var parentRow = $(this).parents("tr");
						student_array.splice(student, 1);
						// parentRow.remove();
						deleteStudentData(student, parentRow);
						renderGradeAverage(calculateGradeAverage(array));
					}
				}
			});
			var button = $("<td>").append(deleteButton);
			newRow.append(name, course, grade, button);
			$("tbody").append(newRow);
			$(".student-grade").removeClass("has-success has-error");
		})();
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
	var averageGrade;
	for (var studentIndex = 0; studentIndex < array.length; studentIndex++) {
		number += parseInt(array[studentIndex].grade);
	}
	if (array.length > 0) {
		averageGrade = number / array.length;
	} else {
		averageGrade = 0;
	}
	return averageGrade.toFixed(2);
}
/***************************************************************************************************
 * renderGradeAverage - updates the on-page grade average
 * @param: {number} average    the grade average
 * @returns {undefined} none
 */
function renderGradeAverage(number) {
	$(".avgGrade").text(number);
}

function handleGetDataClicked() {
	student_array = [];
	getStudentData();
}

function getStudentData() {
	var ajaxConfig = {
		dataType: "json",
		url: "/students/get",
		method: "GET",
		success: function(data) {
			var studentDatabase = data;
			for (var studentIndex = 0; studentIndex < studentDatabase.data.length; studentIndex++) {
				student_array.push(studentDatabase.data[studentIndex]);
			}
			updateStudentList(student_array);
		}
	};
	$.ajax(ajaxConfig);
}

function addStudentData(student) {
	var ajaxConfig = {
		dataType: "json",
		data: {
			name: student.name,
			grade: student.grade,
			course: student.course
		},
		url: "/students/create",
		method: "POST",
		success: function(response) {
			if (response.success === true) {
				student.id = response.new_id;
				student_array.push(student);
				updateStudentList(student_array);
			} else {
				$(".error-message").text(response.error[0]);
				$("#error-modal").modal("show");
			}
		},
		error: function(error) {
			$(".error-message").text(error.statusText);
			$("#error-modal").modal("show");
		}
	};
	$.ajax(ajaxConfig);
}

function deleteStudentData(student, element) {
	var ajaxConfig = {
		dataType: "json",
		data: {
			student_id: student.student_id
		},
		url: "/students/delete",
		method: "POST",
		success: deleteStudentSuccess.bind(null, element),
		error: function(error) {
			$(".error-message").text(error.statusText);
			$("#error-modal").modal("show");
		}
	};
	$.ajax(ajaxConfig);
}

// Function deletes student from DOM element upon success response from server.
function deleteStudentSuccess(element, response) {
	if (response.success === true) {
		element.remove();
		console.log(response.success);
	} else {
		$(".error-message").text(response.errors[0]);
		$("#error-modal").modal("show");
	}
}
