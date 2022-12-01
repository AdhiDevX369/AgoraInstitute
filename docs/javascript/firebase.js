    // Import the functions you need from the SDKs you need

    import { initializeApp } from "https://www.gstatic.com/firebasejs/9.14.0/firebase-app.js";
    import { getDatabase, set, ref, update } from "https://www.gstatic.com/firebasejs/9.14.0/firebase-database.js";
    import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged, signOut } from "https://www.gstatic.com/firebasejs/9.14.0/firebase-auth.js";
    // TODO: Add SDKs for Firebase products that you want to use

    // https://firebase.google.com/docs/web/setup#available-libraries


    // Your web app's Firebase configuration

    const firebaseConfig = {

      apiKey: "AIzaSyDA_0VCQuWj9K-IrQXYCSDRph1WIZQlHoc",

      authDomain: "agoralms.firebaseapp.com",

      projectId: "agoralms",

      storageBucket: "agoralms.appspot.com",

      messagingSenderId: "411003821626",

      appId: "1:411003821626:web:5206520927eee85717df03"

    };


    // Initialize Firebase

    const app = initializeApp(firebaseConfig);
    const db = getDatabase(app);
    const auth = getAuth();


    const signup = document.getElementById('signup');
    signup.addEventListener('click', (e) => {
      e.preventDefault();
      const username = document.getElementById('username').value;
      const email = document.getElementById('email').value;
      const password = document.getElementById('password').value;
      createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
          // Signed in 
          const user = userCredential.user;
          // ...
          set(ref(db, 'users/' + user.uid), {
            username: username,
            email: email,
          });
          alert("User created successfully");
          window.location.href = "download.html";
          // ...
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          alert(errorMessage);
          // ..
        });
    })

    const login = document.getElementById('login');
    login.addEventListener('click', (e) => {
      e.preventDefault();
      const email = document.getElementById('un').value;
      const password = document.getElementById('pw').value;
      signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
          // Signed in
          const user = userCredential.user;
          // ...
          const dt = new Date();
          update(ref(db, 'users/' + user.uid), {
            lastLogin: dt,
          });
          alert("User logged in successfully");
          window.location.href = "download.html";
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          alert(errorMessage);
        });
    })

    const user = auth.currentUser;

   onAuthStateChanged(auth, (user) => {
      if (user) {
        // User is signed in, see docs for a list of available properties
        // https://firebase.google.com/docs/reference/js/firebase.User
        const uid = user.uid;
                 
        // ...
      } else {
        alert("User is not logged in");
        
      }
    });

    const logout = document.getElementById('logout');
    logout.addEventListener('click', (e) => {
      e.preventDefault();
      signOut(auth).then(() => {
        // Sign-out successful.
        alert("User logged out successfully");
        window.location.href = "index.html";
      }).catch((error) => {
        alert(error);
      });
    })
    
