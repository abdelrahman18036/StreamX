let employeeRef = db.collection('films');
let deleteIDs = [];

employeeRef.onSnapshot(snapshot => {
    let changes = snapshot.docChanges();
    changes.forEach(change => {
        if (change.type == 'added') {
            console.log('added');
        } else if (change.type == 'modified') {
            console.log('modified');
        } else if (change.type == 'removed') {
            $('tr[data-id=' + change.doc.id + ']').remove();
            console.log('removed');
        }
    });
});

employeeRef.onSnapshot(snapshot => {
    let size = snapshot.size;
    $('.count').text(size);
    if (size == 0) {
        $('#selectAll').attr('disabled', true);
    } else {
        $('#selectAll').attr('disabled', false);
    }
});

const displayEmployees = async(doc) => {
    console.log('displayEmployees');

    let employees = employeeRef;
    // .startAfter(doc || 0).limit(10000)

    const data = await employees.orderBy("id", "asc").get();

    data
        .docs
        .forEach(doc => {
            const employee = doc.data();
            let item = `<tr data-id="${doc.id}">
					<td>
							<span class="custom-checkbox">
									<input type="checkbox" id="${doc.id}" name="options[]" value="${doc.id}">
									<label for="${doc.id}"></label>
							</span>
					</td>
                    <td class="employee-id">${employee.id}</td>
					<td class="employee-name">${employee.name}</td>
					<td class="employee-email">${employee.email}</td>
					<td class="employee-address">${employee.address}</td>
					<td>
                    <a href="#" id="${doc.id}" class="view js-view-employee"><i class="material-icons" data-toggle="tooltip" title="view">pageview</i>
                    </a>
							<a href="#" id="${doc.id}" class="edit js-edit-employee"><i class="material-icons" data-toggle="tooltip" title="Edit">&#xE254;</i>
							</a>
							<a href="#" id="${doc.id}" class="delete js-delete-employee"><i class="material-icons" data-toggle="tooltip" title="Delete">&#xE872;</i>
							</a>
                            
					</td>
			</tr>`;

            $('#employee-table').append(item);

            // ACTIVATE TOOLTIP
            $('[data-toggle="tooltip"]').tooltip();

            // SELECT/DESELECT CHECKBOXES
            var checkbox = $('table tbody input[type="checkbox"]');
            $("#selectAll").click(function() {
                if (this.checked) {
                    checkbox.each(function() {
                        console.log(this.id);
                        deleteIDs.push(this.id);
                        this.checked = true;
                    });
                } else {
                    checkbox.each(function() {
                        this.checked = false;
                    });
                }
            });
            checkbox.click(function() {
                if (!this.checked) {
                    $("#selectAll").prop("checked", false);
                }
            });
        })

    // UPDATE LATEST DOC
    latestDoc = data.docs[data.docs.length - 1];

    // UNATTACH EVENT LISTENERS IF NO MORE DOCS
    if (data.empty) {
        $('.js-loadmore').hide();
    }
}


$(document).ready(function() {

    let latestDoc = null;

    // LOAD INITIAL DATA
    displayEmployees();

    // LOAD MORE
    $(document).on('click', '.js-loadmore', function() {
        displayEmployees(latestDoc);
    });

    // ADD EMPLOYEE
    $("#add-employee-form").submit(function(event) {
        event.preventDefault();
        let employeeID = $('#employee-id').val();
        let employeeName = $('#employee-name').val();
        let employeeEmail = $('#employee-email').val();
        let employeeAddress = $('#employee-address').val();
        db
            .collection('films')
            .add({
                id: employeeID,
                name: employeeName,
                email: employeeEmail,
                address: employeeAddress,

                createdAt: firebase
                    .firestore
                    .FieldValue
                    .serverTimestamp()
            })
            .then(function(docRef) {
                console.log("Document written with ID: ", docRef.id);
                $("#addEmployeeModal").modal('hide');

                let newEmployee = `<tr data-id="${docRef.id}">
						<td>
								<span class="custom-checkbox">
										<input type="checkbox" id="${docRef.id}" name="options[]" value="${docRef.id}">
										<label for="${docRef.id}"></label>
								</span>
						</td>
						<td class="employee-id">${employeeID}</td>
                        <td class="employee-name">${employeeName}</td>
                        <td class="employee-email">${employeeEmail}</td>
                        <td class="employee-address">${employeeAddress}</td>
                        
						<td>
                             <a href="#" id="${docRef.id}" class="view js-view-employee"><i class="material-icons" data-toggle="tooltip" title="view">pageview</i>
							    </a>
								<a href="#" id="${docRef.id}" class="edit js-edit-employee"><i class="material-icons" data-toggle="tooltip" title="Edit">&#xE254;</i>
								</a>
								<a href="#" id="${docRef.id}" class="delete js-delete-employee"><i class="material-icons" data-toggle="tooltip" title="Delete">&#xE872;</i>
								</a>
						</td>
				</tr>`;

                $('#employee-table tbody').prepend(newEmployee);
            })
            .catch(function(error) {
                console.error("Error writing document: ", error);
            });
    });

    // view EMployee

    $(document).on('click', '.js-view-employee', function(e) {
        e.preventDefault();
        let id = $(this).attr('id');
        $('#view-employee-form').attr('edit-id', id);
        db
            .collection('films')
            .doc(id)
            .get()
            .then(function(document) {
                if (document.exists) {
                    $('#view-employee-form #employee-id').val(document.data().id);
                    $('#view-employee-form #employee-name').val(document.data().name);
                    $('#view-employee-form #employee-email').val(document.data().email);
                    $('#view-employee-form #employee-address').val(document.data().address);
                    $('#viewEmployeeModal').modal('show');
                } else {
                    console.log("No such document!");
                }
            })
            .catch(function(error) {
                console.log("Error getting document:", error);
            });
    });

    $("#view-employee-form").submit(function(event) {
        event.preventDefault();
        let id = $(this).attr('edit-id');

        let employeeID = $('#employee-id').val();
        let employeeName = $('#employee-name').val();
        let employeeEmail = $('#employee-email').val();
        let employeeAddress = $('#employee-address').val();


        db
            .collection('films')
            .doc(id)
            .update({
                id: employeeID,
                name: employeeName,
                email: employeeEmail,
                address: employeeAddress,
                updatedAt: firebase
                    .firestore
                    .FieldValue
                    .serverTimestamp()
            });

        $('#viewEmployeeModal').modal('hide');

        // SHOW UPDATED DATA ON BROWSER
        $('tr[data-id=' + id + '] td.employee-id').html(employeeID);
        $('tr[data-id=' + id + '] td.employee-name').html(employeeName);
        $('tr[data-id=' + id + '] td.employee-email').html(employeeEmail);
        $('tr[data-id=' + id + '] td.employee-address').html(employeeAddress);
    });

    // UPDATE EMPLOYEE
    $(document).on('click', '.js-edit-employee', function(e) {
        e.preventDefault();
        let id = $(this).attr('id');
        $('#edit-employee-form').attr('edit-id', id);
        db
            .collection('films')
            .doc(id)
            .get()
            .then(function(document) {
                if (document.exists) {
                    $('#edit-employee-form #employee-id').val(document.data().id);
                    $('#edit-employee-form #employee-name').val(document.data().name);
                    $('#edit-employee-form #employee-email').val(document.data().email);
                    $('#edit-employee-form #employee-address').val(document.data().address);
                    $('#editEmployeeModal').modal('show');
                } else {
                    console.log("No such document!");
                }
            })
            .catch(function(error) {
                console.log("Error getting document:", error);
            });
    });

    $("#edit-employee-form").submit(function(event) {
        event.preventDefault();
        let id = $(this).attr('edit-id');
        let employeeID = $('#edit-employee-form #employee-id').val();
        let employeeName = $('#edit-employee-form #employee-name').val();
        let employeeEmail = $('#edit-employee-form #employee-email').val();
        let employeeAddress = $('#edit-employee-form #employee-address').val();

        db
            .collection('films')
            .doc(id)
            .update({
                id: employeeID,
                name: employeeName,
                email: employeeEmail,
                address: employeeAddress,

                updatedAt: firebase
                    .firestore
                    .FieldValue
                    .serverTimestamp()
            });

        $('#editEmployeeModal').modal('hide');

        // SHOW UPDATED DATA ON BROWSER
        $('tr[data-id=' + id + '] td.employee-id').html(employeeID);
        $('tr[data-id=' + id + '] td.employee-name').html(employeeName);
        $('tr[data-id=' + id + '] td.employee-email').html(employeeEmail);
        $('tr[data-id=' + id + '] td.employee-address').html(employeeAddress);

    });

    // DELETE EMPLOYEE
    $(document).on('click', '.js-delete-employee', function(e) {
        e.preventDefault();
        let id = $(this).attr('id');
        $('#delete-employee-form').attr('delete-id', id);
        $('#deleteEmployeeModal').modal('show');
    });

    $("#delete-employee-form").submit(function(event) {
        event.preventDefault();
        let id = $(this).attr('delete-id');
        if (id != undefined) {
            db
                .collection('films')
                .doc(id)
                .delete()
                .then(function() {
                    console.log("Document successfully delete!");
                    $("#deleteEmployeeModal").modal('hide');
                })
                .catch(function(error) {
                    console.error("Error deleting document: ", error);
                });
        } else {
            let checkbox = $('table tbody input:checked');
            checkbox.each(function() {
                db
                    .collection('films')
                    .doc(this.value)
                    .delete()
                    .then(function() {
                        console.log("Document successfully delete!");
                        displayEmployees();
                    })
                    .catch(function(error) {
                        console.error("Error deleting document: ", error);
                    });
            });
            $("#deleteEmployeeModal").modal('hide');
        }
    });

    // SEARCH
    $("#search-name").click(function B(m) {
        $('#employee-table tbody').html('');
        let nameKeyword = $("#search").val();
        let x = $('#select option:selected').val();
        employeeRef
            .orderBy(x, "asc")
            .startAt(nameKeyword)
            .endAt(nameKeyword + "\uf8ff")
            .get()
            .then((querySnapshot) => {
                querySnapshot
                    .docs
                    .forEach(doc => {
                        const employee = doc.data();
                        let item = `<tr data-id="${doc.id}">a
                            <td>
                                    <span class="custom-checkbox">
                                            <input type="checkbox" id="${doc.id}" name="options[]" value="${doc.id}">
                                            <label for="${doc.id}"></label>
                                    </span>
                            </td>
                            <td class="employee-id">${employee.id}</td>
                            <td class="employee-name">${employee.name}</td>
                            <td class="employee-email">${employee.email}</td>
                            <td class="employee-address">${employee.address}</td>
                           
                            <td>
                            <a href="#" id="${doc.id}" class="view js-view-employee"><i class="material-icons" data-toggle="tooltip" title="view">pageview</i>
                            </a>
                                    <a href="#" id="${doc.id}" class="edit js-edit-employee"><i class="material-icons" data-toggle="tooltip" title="Edit">&#xE254;</i>
                                    </a>
                                    <a href="#" id="${doc.id}" class="delete js-delete-employee"><i class="material-icons" data-toggle="tooltip" title="Delete">&#xE872;</i>
                                    </a>
                                    
                            </td>
                    </tr>`;

                        $('#employee-table').append(item);
                    });
            })
    });

    // RESET FORMS
    $("#addEmployeeModal").on('hidden.bs.modal', function() {
        $('#add-employee-form .form-control').val('');
    });

    $("#editEmployeeModal").on('hidden.bs.modal', function() {
        $('#edit-employee-form .form-control').val('');
    });
});

// CENTER MODAL
(function($) {
    "use strict";

    function centerModal() {
        $(this).css('display', 'block');
        var $dialog = $(this).find(".modal-dialog"),
            offset = ($(window).height() - $dialog.height()) / 2,
            bottomMargin = parseInt($dialog.css('marginBottom'), 10);

        // Make sure you don't hide the top part of the modal w/ a negative margin if
        // it's longer than the screen height, and keep the margin equal to the bottom
        // margin of the modal
        if (offset < bottomMargin)
            offset = bottomMargin;
        $dialog.css("margin-top", offset);
    }

    $(document).on('show.bs.modal', '.modal', centerModal);
    $(window).on("resize", function() {
        $('.modal:visible').each(centerModal);
    });
}(jQuery));

$('#refreshEmployeeModal').click(function() {
    location.reload();
});

function hideLoader() {
    $('#loading').hide();
}

$('.table-responsive').ready(hideLoader);

$(".default_option").click(function() {
    $(".dropdown ul").addClass("active");
});

$(".dropdown ul li").click(function() {
    var text = $(this).text();
    $(".default_option").text(text);
    $(".dropdown ul").removeClass("active");
});


$('#exportEmployeeModal').click(function() {
    $("table").table2csv('output', {
        appendTo: '#out'
    });

    $("table").table2csv({
        separator: ',',
        newline: '\n',
        quoteFields: true,
        excludeColumns: '',
        excludeRows: '',
        filename: 'STREAM X.csv',
        trimContent: true
    });
})


$(function() {
    $('#printEmployeeModal').click(function() {
        print();
    });
});