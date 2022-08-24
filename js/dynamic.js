let filmref = db.collection('films');
let deleteIDs = [];

// REAL TIME LISTENER
filmref.onSnapshot(snapshot => {
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

// GET TOTAL SIZE
filmref.onSnapshot(snapshot => {
    let size = snapshot.size;
    $('.count').text(size);
    if (size == 0) {
        $('#selectAll').attr('disabled', true);
    } else {
        $('#selectAll').attr('disabled', false);
    }
});

const displayfilms = async(doc) => {
    console.log('displayfilms');

    let films = filmref;
    // .startAfter(doc || 0).limit(10000)

    const data = await films.orderBy("id", "asc").get();

    data
        .docs
        .forEach(doc => {
            const film = doc.data();
            let item = `
            <div class="card swiper-slide" data-id="${doc.id}">
                                <img src="${film.email}" alt="" />
                                <div style="width: 90%" class="border"></div>
                                <div class="text">
                                    <p class="title">${film.name}</p>
                                    <p class="time-left">Time left:  ${film.address}</p>
                                    <button>
                                    <a href="film-page.html"
                                    ><svg
                                      xmlns="http://www.w3.org/2000/svg"
                                      id="Filled"
                                      viewBox="0 0 24 24"
                                      width="100%"
                                      height="100%"
                                    >
                                      <path
                                        d="M20.492,7.969,10.954.975A5,5,0,0,0,3,5.005V19a4.994,4.994,0,0,0,7.954,4.03l9.538-6.994a5,5,0,0,0,0-8.062Z"
                                      /></svg
                                  ></a>
                    </button>
                                </div>
                            </div>    `;

            $('#film-table').append(item);

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
    displayfilms()
    $(document).on('click', '.js-loadmore', function() {
        displayEmployees(latestDoc);
    });
})