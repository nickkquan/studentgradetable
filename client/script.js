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
 * @params: {undefined} none
 * @returns: {undefined} none
 * initializes the application, including adding click handlers and pulling in any data from the server, in later versions
 */
function initializeApp() {
	addClickHandlersToElements();
	getStudentData();
	handleFormInputs();
	removePopover();
}
/***************************************************************************************************
 * addClickHandlerstoElements
 * @params: {undefined}
 * @returns: {undefined}
 */
function addClickHandlersToElements() {
	$(".add").on("click", addStudent);
	$(".cancel").on("click", handleCancelClick);
	$(".retrieve").on("click", handleGetDataClicked);
	$(".sort").on("click", handleSortClicked);
}
/***************************************************************************************************
 * handleAddClicked - Event Handler when user clicks the add button
 * @param: {object} event  The event object from the click
 * @return: none
 * @calls: addStudent
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
 * removePopover - Event handler that hides popover if mouse leaves student form element
 * @param: {undefined} none
 * @returns: {undefined} none
 */
function removePopover() {
	$(".student-add-form").mouseleave(() => $(".student-icon, .course-icon, .grade-icon").popover("hide"));
}
/***************************************************************************************************
 * handleSortClicked - Event Handler when user clicks on dropdown sort selection, will sort and update student_array
 * @param: {undefined} none
 * @returns: {student_array}
 * @calls: updateStudentList
 */
function handleSortClicked() {
	var sortMethod = $(this).attr("sort");
	switch (sortMethod) {
		case "a-z":
			if ($(this).attr("name") === "name") {
				student_array.sort(function(a, b) {
					var nameA = a.name.toLowerCase();
					var nameB = b.name.toLowerCase();
					if (nameA < nameB) {
						return -1;
					}
					if (nameA > nameB) {
						return 1;
					}
					return 0;
				});
			} else {
				student_array.sort(function(a, b) {
					var courseA = a.course.toLowerCase();
					var courseB = b.course.toLowerCase();
					if (courseA < courseB) {
						return -1;
					}
					if (courseA > courseB) {
						return 1;
					}
					return 0;
				});
			}
			updateStudentList(student_array);
			break;
		case "z-a":
			if ($(this).attr("name") === "name") {
				student_array.sort(function(a, b) {
					var nameA = a.name.toLowerCase();
					var nameB = b.name.toLowerCase();
					if (nameA > nameB) {
						return -1;
					}
					if (nameA < nameB) {
						return 1;
					}
					return 0;
				});
			} else {
				student_array.sort(function(a, b) {
					var courseA = a.course.toLowerCase();
					var courseB = b.course.toLowerCase();
					if (courseA > courseB) {
						return -1;
					}
					if (courseA < courseB) {
						return 1;
					}
					return 0;
				});
			}
			updateStudentList(student_array);
			break;
		case "0-9":
			student_array.sort(function(a, b) {
				return a.grade - b.grade;
			});
			updateStudentList(student_array);
			break;
		case "9-0":
			student_array.sort(function(a, b) {
				return b.grade - a.grade;
			});
			updateStudentList(student_array);
			break;
	}
}
/***************************************************************************************************
 * handleFormInputs - Event Handler that checks input fields to ensure valid entry
 * @param: {undefined} none
 * @returns: {undefined} none
 * @calls: checkFormEntry
 */
function handleFormInputs() {
	$("#studentName, #studentCourse, #studentGrade").keyup(checkFormEntry);
}
/***************************************************************************************************
 * checkFormEntry - Function that checks each fields to ensure input is valid. Provides UX feedback
 * @param: {undefined} none
 * @returns: {undefined} none
 */
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
	if ($("#studentGrade").val() === "" || $("#studentGrade").val() > 100 || isNaN($("#studentGrade").val())) {
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
 * @param: {undefined} none
 * @return: undefined
 * @calls: clearAddStudentFormInputs, updateStudentList
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
		$(".add").attr("disabled", true);
		addLoadIcon($("#add"));
		addStudentData(studentObject);
		updateStudentList(student_array);
		clearAddStudentFormInputs();
	}
}
/***************************************************************************************************
 * clearAddStudentForm - clears out the form values based on inputIds variable
 * @param: none
 * @return: undefined
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
 * @param: students {array} the array of student objects
 * @returns: {undefined} none
 * @calls: renderStudentOnDom, calculateGradeAverage, renderGradeAverage
 */
function updateStudentList(studentArray) {
	$("tbody").empty();
	for (var arrayIndex = 0; arrayIndex < studentArray.length; arrayIndex++) {
		(function() {
			var student = studentArray[arrayIndex];
			var newRow = $("<tr>").attr("id", student.id);
			var name = $("<td>").text(student.name);
			var course = $("<td>").text(student.course);
			var grade = $("<td>").text(student.grade);

			var deleteButton = $("<button>", {
				type: "button",
				class: "delete btn btn-danger btn-sm",
				id: "delete",
				text: "Delete",
				on: {
					click: (function(studentRow) {
						return function() {
							deleteStudent(studentRow);
						};
					})(newRow)
				}
			});

			function deleteStudent(parentRow) {
				showDeleteModal(student);
				$("#confirm-delete").on("click", function() {
					student_array.splice(student, 1);
					deleteStudentData(student, parentRow);
					addLoadIcon("#confirm-delete");
					renderGradeAverage(calculateGradeAverage(studentArray));
					setTimeout(() => {
						$("#delete-modal").modal("hide");
					}, 500);
				});
			}

			var button = $("<td>").append(deleteButton);
			newRow.append(name, course, grade, button);
			$("tbody").append(newRow);
			$(".student-grade").removeClass("has-success has-error");
		})();
	}
	renderGradeAverage(calculateGradeAverage(studentArray));
}
/***************************************************************************************************
 * calculateGradeAverage - loop through the global student array and calculate average grade and return that value
 * @param: {array} students the array of student objects
 * @returns: {number}
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
 * @param: {number} average the grade average
 * @returns: {undefined} none
 */
function renderGradeAverage(number) {
	$(".avgGrade").text(number);
}
/***************************************************************************************************
 * handleGetDataClicked - clears the student array and updates the array
 * @param {undefined} none
 * @returns {undefined} none
 * @calls getStudentData
 */
function handleGetDataClicked() {
	student_array = [];
	getStudentData();
}
/***************************************************************************************************
 * getStudentData - Ajax call that populates the student_array upon success.
 * @param {undefined} none
 * @returns {undefined} none
 * @calls: updateStudentList
 */
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
/***************************************************************************************************
 * addStudentData - Ajax call that adds the student to the database and renders onto DOM.
 * @param: {student} object
 * @returns: {undefined} none
 * @calls: updateStudentList
 */
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
				$("#add").attr("disabled", false);
				setTimeout(() => {
					removeLoadIcon($("#add"));
				}, 250);
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
/***************************************************************************************************
 * deleteStudentData - Ajax call that deletes the student to the database and removes from DOM.
 * @param: {student, element} object
 * @returns: {undefined} none
 */
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
/***************************************************************************************************
 * deleteStudentSuccess - Function that checks to see if delete Ajax call function is successful.
 * @param: {element, response} object
 * @returns: {undefined} none
 */
function deleteStudentSuccess(element, response) {
	if (response.success === true) {
		element.remove();
		$("#confirm-delete").attr("disabled", false);
		setTimeout(() => {
			removeLoadIcon($("#confirm-delete"));
		}, 250);
	} else {
		$(".error-message").text(response.errors[0]);
		$("#error-modal").modal("show");
	}
}
/***************************************************************************************************
 * showDeleteModal - Function that will invoke the delete student confirmation modal.
 * @param: {student} object
 * @returns: {undefined} none
 */
function showDeleteModal(student) {
	$("#delete-modal").modal("show");
	$(".modal-student-name")
		.empty()
		.text("Name: " + student.name);
	$(".modal-student-course")
		.empty()
		.text("Course: " + student.course);
	$(".modal-student-grade")
		.empty()
		.text("Grade: " + student.grade);
}

function addLoadIcon(button) {
	$(button)
		.children("span")
		.addClass("glyphicon glyphicon-refresh spinAnimation");
}

function removeLoadIcon(button) {
	$(button)
		.children("span")
		.removeClass("glyphicon glyphicon-refresh spinAnimation");
}
