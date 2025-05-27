// Import the functions you need from the SDKs you need
  import { initializeApp } from "https://www.gstatic.com/firebasejs/11.8.1/firebase-app.js";
 
// Add a second document with a generated ID.
import { getFirestore, collection, addDoc, getDocs } from "https://www.gstatic.com/firebasejs/11.8.1/firebase-firestore.js";



  // TODO: Add SDKs for Firebase products that you want to use
  // https://firebase.google.com/docs/web/setup#available-libraries

  // Your web app's Firebase configuration
  // For Firebase JS SDK v7.20.0 and later, measurementId is optional
  const firebaseConfig = {
    apiKey: "AIzaSyDeplACP_2AT1kPk8d2PG-pqbhdwk7kJrI",
    authDomain: "job-tracker-bd25a.firebaseapp.com",
    projectId: "job-tracker-bd25a",
    storageBucket: "job-tracker-bd25a.firebasestorage.app",
    messagingSenderId: "1021142125689",
    appId: "1:1021142125689:web:6c725b83dd2830397a58a8",
    measurementId: "G-SHJR6ZWZBG"
  };
  // Initialize Firebase
    const app = initializeApp(firebaseConfig);

    const db = getFirestore(app);


// try {
//   const docRef = await addDoc(collection(db, "users"), {
//     first: "Ada",
//     last: "Lovelace",
//     born: 1815
//   });
//   console.log("Document written with ID: ", docRef.id);
// } catch (e) {
//   console.error("Error adding document: ", e);
// }

// const querySnapshot = await getDocs(collection(db, "users"));
// querySnapshot.forEach((doc) => {
//   console.log(`${doc.id} => ${doc.data()}`);
// });


const apiKey = "f8cace435f9bd1cd80392a51c37c200dbc0d55381f3cabae225df51a8ed4c18a"



async function getJobs(){
try{
    const response = await fetch( "https://api.apijobs.dev/v1/job/search",{ 
    method: "POST", 
    headers: { "Content-Type": "application/json", 
                "apikey": apiKey
                },
    body: JSON.stringify({
        q : "software engineer",
        employment_type: "full-time",
        city: "San Francisco",
        size: 10
        })
    });
    
    if (!response.ok){
        throw new Error(`API error : ${response.status}`);
    }
    
    const data = await response.json();
    data.hits.forEach((job, index) => {
        const li = document.createElement('li');
        const date = new Date(job.published_at);
        const options = { year: "numeric", month: "short", day: "numeric" };
        const formattedDate = date.toLocaleDateString("en-US", options); // → "Apr 6, 2025"
        li.innerHTML = `<div>${job.hiring_organization_name}</div><div>${job.title.split(" ").slice(0, 2).join(" ")}</div><div>${job.city}</div><div>${formattedDate}</div><div>${job.employment_type}</div><div><button class="save-job">Save as Applied</button></div>`;
        document.querySelector('.job-list').appendChild(li);
        });
               
   
    } catch (error){
        console.error("Error fetchhing data:", error.message);
    }
}


const container = document.querySelector(".container");





function renderAppliedJobsPage(){

    container.innerHTML =  `<div class="home_page">
            <nav>
            <div class="logo"><h2>J<span>T</h2></span></div>
            <div class="links">
                <a href="#">Home</a>
                <a href="#">Logout</a>
                <a href="#">Applied Jobs</a>
            </div>
            <form>
                <input type="text" class="search_input" placeholder="Search Job">
                <button>
                    <i class="bx bx-search" ></i>
                </button>
            </form>
        </nav>
        <div class="headers">
            <div>Company Name</div>
            <div>Work Title</div>
            <div>City</div>
            <div>Date</div>
            <div>Job Type</div>
            
        </div>
        
        </div>`
        
}
document.addEventListener("DOMContentLoaded", () => {
  const loginBtn = document.querySelector(".login_btn");
  loginBtn.addEventListener("click", function handleLogin() {
    const email = document.getElementById("email").value.trim();
    const password = document.getElementById("password").value.trim();

    if (email === "" || password === "") {
        alert("Please fill in the details");
        return;
    } else {
        window.location.href = "index.html";
    }   
} ) 
}) 

function renderHomePage(){
    container.innerHTML = 
        `<div class="home_page">
            <nav>
            <div class="logo"><h2>J<span>T</h2></span></div>
            <div class="links">
                <a href="#">Home</a>
                <a href="#">Logout</a>
                <a href="applied-jobs.html">Applied Jobs</a>
            </div>
            <form>
                <input type="text" class="search_input" placeholder="Search Job">
                <button>
                    <i class="bx bx-search" ></i>
                </button>
            </form>
        </nav>
        <div class="headers">
            <div>Company Name</div>
            <div>Work Title</div>
            <div>City</div>
            <div>Published</div>
            <div>Job Type</div>
            <div></div>
        </div>
        <ul class="job-list"></ul>
        </div>`       
}
renderHomePage();
getJobs();