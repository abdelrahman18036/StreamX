function login() {
    var userid = document.getElementById("email").value;
    var pass = document
        .getElementById("password")
        .value;

    var user = firebase
        .auth()
        .currentUser;



    if (userid == "admin@streamx.vercel.app" && pass == "00oo00oo") {
        Swal.fire({
            icon: 'success',
            title: 'Login as Administrator Successfuly!',
            html: 'you will automatically Redirect after <b></b> milliseconds.',
            timer: 2000,
            timerProgressBar: true,
            didOpen: () => {
                Swal.showLoading()
                const b = Swal.getHtmlContainer().querySelector('b')
                timerInterval = setInterval(() => {
                    b.textContent = Swal.getTimerLeft()
                }, 100)
            },
            willClose: () => {
                window.location = 'dashboard/index.html'
            }
        })

    } else {
        firebase
            .auth()
            .signInWithEmailAndPassword(userid, pass)
            .then((userCredential) => {
                let timerInterval
                Swal.fire({
                    icon: 'success',
                    title: 'Login as User Successfuly!',
                    html: 'you will automatically Redirect after <b></b> milliseconds.',
                    timer: 2000,
                    timerProgressBar: true,
                    didOpen: () => {
                        Swal.showLoading()
                        const b = Swal.getHtmlContainer().querySelector('b')
                        timerInterval = setInterval(() => {
                            b.textContent = Swal.getTimerLeft()
                        }, 100)
                    },
                    willClose: () => {
                        if (screen.availWidth < 768) {
                            window.location = 'mob/mob.html'

                        } else {
                            window.location = 'home.html'
                        }
                    }
                }).then((result) => {
                    /* Read more about handling dismissals below */
                    if (result.dismiss === Swal.DismissReason.timer) {
                        console.log('I was closed by the timer')
                    }
                })
            })
            .catch((error) => {
                var errorCode = error.code;
                var errorMessage = error.message;
                Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: error.message,
                    footer: error.code
                })

            });
    }



}




firebase
    .auth()
    .onAuthStateChanged(function(user) {
        if (user) {

            var user = firebase
                .auth()
                .currentUser;

            if (user != null) {
                user.providerData.forEach((profile) => {
                    if (profile.displayName != null) {
                        $("#name").html(profile.displayName);
                        $("#username").html(profile.email);
                        $("#img").attr("src", profile.photoURL);
                    } else {
                        $("#name").html("New User");
                        $("#username").html(profile.email);
                        $("#img").attr("src", "media/user.jpg");
                    }
                });

            }
        }
    });



var form = document.getElementById("myForm");
if (form) {
    function handleForm(event) { event.preventDefault(); }
    form.addEventListener('submit', handleForm);
    form.addEventListener('submit', login);
}





function gmail() {
    var provider = new firebase.auth.GoogleAuthProvider();

    firebase.auth()
        .signInWithPopup(provider)
        .then((result) => {
            /** @type {firebase.auth.OAuthCredential} */
            var credential = result.credential;

            // This gives you a Google Access Token. You can use it to access the Google API.
            var token = credential.accessToken;
            // The signed-in user info.
            var user = result.user;
            Swal.fire({
                icon: 'success',
                title: 'Login as User Successfuly!',
                html: 'you will automatically Redirect after <b></b> milliseconds.',
                timer: 2000,
                timerProgressBar: true,
                didOpen: () => {
                    Swal.showLoading()
                    const b = Swal.getHtmlContainer().querySelector('b')
                    timerInterval = setInterval(() => {
                        b.textContent = Swal.getTimerLeft()
                    }, 100)
                },
                willClose: () => {
                    if (screen.availWidth < 768) {
                        window.location = 'mob/mob.html'

                    } else {
                        window.location = 'home.html'
                    }
                }
            }).then((result) => {
                /* Read more about handling dismissals below */
                if (result.dismiss === Swal.DismissReason.timer) {
                    console.log('I was closed by the timer')
                }
            })
        }).catch((error) => {
            // Handle Errors here.
            var errorCode = error.code;
            var errorMessage = error.message;
            // The email of the user's account used.
            var email = error.email;
            // The firebase.auth.AuthCredential type that was used.
            var credential = error.credential;
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: error.message,
                footer: error.code
            })

        });
}


function apple() {
    var provider = new firebase.auth.OAuthProvider('apple.com');


    firebase
        .auth()
        .signInWithPopup(provider)
        .then((result) => {
            /** @type {firebase.auth.OAuthCredential} */
            var credential = result.credential;

            // The signed-in user info.
            var user = result.user;

            // You can also get the Apple OAuth Access and ID Tokens.
            var accessToken = credential.accessToken;
            var idToken = credential.idToken;
            Swal.fire({
                icon: 'success',
                title: 'Login as User Successfuly!',
                html: 'you will automatically Redirect after <b></b> milliseconds.',
                timer: 2000,
                timerProgressBar: true,
                didOpen: () => {
                    Swal.showLoading()
                    const b = Swal.getHtmlContainer().querySelector('b')
                    timerInterval = setInterval(() => {
                        b.textContent = Swal.getTimerLeft()
                    }, 100)
                },
                willClose: () => {
                    if (screen.availWidth < 768) {
                        window.location = 'mob/mob.html'

                    } else {
                        window.location = 'home.html'
                    }
                }
            }).then((result) => {
                /* Read more about handling dismissals below */
                if (result.dismiss === Swal.DismissReason.timer) {
                    console.log('I was closed by the timer')
                }
            })
        })
        .catch((error) => {
            // Handle Errors here.
            var errorCode = error.code;
            var errorMessage = error.message;
            // The email of the user's account used.
            var email = error.email;
            // The firebase.auth.AuthCredential type that was used.
            var credential = error.credential;
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: error.message,
                footer: error.code
            })
        });


}


function forget() {
    const email1 = document.getElementById("email1").value;
    firebase.auth().languageCode = 'en';

    firebase.auth().sendPasswordResetEmail(email1)
        .then(() => {
            console.log("done")
        })
        .catch((error) => {
            var errorCode = error.code;
            var errorMessage = error.message;
            console.log(errorCode)
            console.log(errorMessage)
                // ..
        });

}

var form1 = document.getElementById("myForm1");
if (form1) {
    function handleForm1(event) {
        event.preventDefault();
    }
    form1.addEventListener('submit', handleForm1);
    form1.addEventListener('submit', forget);
}




function logout() {
    firebase.auth().signOut();
    window.location = 'index.html'
}





function register() {
    var userid1 = document.getElementById("email2").value;
    var pass1 = document.getElementById("password2").value;


    firebase
        .auth()
        .createUserWithEmailAndPassword(userid1, pass1)
        .then((userCredential) => {
            success()
        })
        .catch((error) => {
            var errorCode = error.code;
            var errorMessage = error.message;
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: error.message,
                footer: error.code
            })

        });

}

function success() {
    var firstname = document.getElementById("f_name").value;
    var lastname = document.getElementById("l_name").value;
    var img1 = document.getElementById("img1").value;
    var user = firebase
        .auth()
        .currentUser
    console.log(user)
    user.updateProfile({
        displayName: firstname + ' ' + lastname,
        photoURL: img1
    })
    let timerInterval

    Swal.fire({
        icon: 'success',
        title: 'Account Created Successfuly!',
        html: 'you will automatically Redirect after <b></b> milliseconds.',
        timer: 2000,
        timerProgressBar: true,
        didOpen: () => {
            Swal.showLoading()
            const b = Swal.getHtmlContainer().querySelector('b')
            timerInterval = setInterval(() => {
                b.textContent = Swal.getTimerLeft()
            }, 100)
        },
        willClose: () => {
            if (screen.availWidth < 768) {
                window.location = 'mob/mob.html'

            } else {
                window.location = 'home.html'
            }
        }
    }).then((result) => {
        /* Read more about handling dismissals below */
        if (result.dismiss === Swal.DismissReason.timer) {
            console.log('I was closed by the timer')
        }
    })
}


var form2 = document.getElementById("myForm2");
if (form2) {
    function handleForm2(event) {
        event.preventDefault();
    }
    form2.addEventListener('submit', handleForm2);
    form2.addEventListener('submit', register);
}

function update() {
    const user = firebase.auth().currentUser;

    user.updateProfile({
        displayName: "Jane Q. User",
        photoURL: "https://ps.w.org/user-avatar-reloaded/assets/icon-256x256.png?rev=2540745"
    }).then(() => {
        // Update successful
        // ...
    }).catch((error) => {
        // An error occurred
        // ...
    });
}