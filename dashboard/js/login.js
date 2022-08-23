function login() {
    var userid = document
        .getElementById("user")
        .value;
    var pass = document
        .getElementById("pass")
        .value;


    firebase
        .auth()
        .signInWithEmailAndPassword(userid, pass) .then((userCredential) => {
            // Signed in
            window.location = 'crud.html'
            // ...
          })
        .catch((error) => {
            var errorCode = error.code;
            var errorMessage = error.message;
            window.alert("Error :" + errorMessage+ ", " + "with code"+ " " + errorCode)

        });
   
}