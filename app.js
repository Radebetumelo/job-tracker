// Firebase Imports
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.8.1/firebase-app.js";
import { getFirestore, doc, getDocs, collection, setDoc, updateDoc } from "https://www.gstatic.com/firebasejs/11.8.1/firebase-firestore.js";

// Firebase Config
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
const db = getFirestore();

// Simulated User ID
const userId = "user123";

// API Key
const apiKey = "f8cace435f9bd1cd80392a51c37c200dbc0d55381f3cabae225df51a8ed4c18a";

// Global job list
let jobList = [];

// Count number of jobs saved
let saveCount = 0;

// Fetch and display jobs
async function getJobs() {
  try {
    const response = await fetch("https://api.apijobs.dev/v1/job/search", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "apikey": apiKey
      },
      body: JSON.stringify({
        q: "software engineer",
        employment_type: "full-time",
        city: "San Francisco",
        size: 10
      })
    });

    if (!response.ok) {
      throw new Error(`API error: ${response.status}`);
    }

    const data = await response.json();
    jobList = data.hits;

    jobList.forEach((job, index) => {
      const li = document.createElement('li');
      li.classList = "job-card";

      const date = new Date(job.published_at);
      const options = { year: "numeric", month: "short", day: "numeric" };
      const formattedDate = date.toLocaleDateString("en-US", options);

      
      li.innerHTML = `
        <div>${job.hiring_organization_name.split(" ").slice(0, 2).join(" ")}</div>
        <div>${job.title.split(" ").slice(0, 2).join(" ")}</div>
        <div>${job.city}</div>
        <div>${formattedDate}</div>
        <div>${job.employment_type}</div>
        <div><button class="save-btn" data-index="${index}">Save job</button></div>
      `;

      const selectedJob = jobList[index];

      li.querySelector(".save-btn").addEventListener("click", () => {
        
        saveJobToFirestore(selectedJob);
        fetchAppliedJobs()
        console.log("Saved job:", selectedJob);

      });

      document.querySelector('.job-list').appendChild(li);

      li.addEventListener("click", () => {
        const date = new Date(selectedJob.published_at);
        const options = { year: "numeric", month: "short", day: "numeric" };
        const formattedDate = date.toLocaleDateString("en-US", options);
        jobDetail()
        const div = document.createElement("div");
        div.classList = "details"
        div.innerHTML = `<div><button style="background: none"><i class="bx bx-arrow-left"></i></button></div>
                          <p>Comapny:  ${selectedJob.hiring_organization_name}</p>
                          <p>Job Title:  ${selectedJob.title}</p>
                          <p>City:  ${ selectedJob.city}</p>
                          <p>Employment Type: ${selectedJob.employment_type}</p>
                          <p>Workplace Type:   ${selectedJob.workplace_type}</p>
                          <p>Experience Required:  ${selectedJob.experience_requirements_months ? selectedJob.experience_requirements_months : "Not Specified"}</p>
                          <p>Industry:  ${selectedJob.industry ? selectedJob.industry : "Not Specified"} </p>
                          <p>Date Published: ${formattedDate}</p>
                          <p>Key Responsibilites: ${selectedJob.responsibilities}</p>
                          <p>SKills Requirements: ${selectedJob.skills_requirements}</p>
                          <p>Job Description: ${selectedJob.description}</p>
        `;
        const jobDetails = document.querySelector(".job-details");
        
        console.log(selectedJob)
        jobDetails.appendChild(div);
      })
    });

  } catch (error) {
    console.error("Error fetching data:", error.message);
  }
}

// Save job to Firestore
async function saveJobToFirestore(job) {
  const jobId = `job${saveCount}`;
  saveCount++;

  const jobRef = doc(db, "users", userId, "appliedJobs", jobId);

  const jobData = {
    title: job.title,
    company: job.hiring_organization_name || job.company,
    location: job.city || job.location,
    employment_type: job.employment_type,
    date_applied: new Date().toISOString(),
    status: "applied",
    notes: ""
  };

  try {
    await setDoc(jobRef, jobData);
    alert("Job saved successfully!");
  } catch (error) {
    console.error("Error saving job:", error);
    alert("Failed to save job.");
  }
}



//Get Documents form Firestore
const appliedJobsRef = collection(db, "users", userId, "appliedJobs");

async function fetchAppliedJobs() {
  const snapshot = await getDocs(appliedJobsRef);
  snapshot.forEach((docSnap) => {
    const job = docSnap.data();
    const jobId = docSnap.id;
    console.log(job)
    renderJob(job, jobId);
  });
}

function renderJob() {

}


// Page container
const container = document.querySelector(".container");

// Render Home Page
function renderHomePage() {
  container.innerHTML = `
    <div class="home_page">
      <nav>
        <div class="logo"><h2>J<span>T</span></h2></div>
        <div class="links">
          <a href="index.html">Home</a>
          <a href="#">Logout</a>
          <a href="applied-jobs.html">Applied Jobs</a>
        </div>
        <form>
          <input type="text" class="search_input" placeholder="Search Job">
          <button><i class="bx bx-search"></i></button>
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
    </div>
  `;
}

// Render Applied Jobs Page (optional usage)
function jobDetail() {
  container.innerHTML = `
    <div class="home_page">
      <nav>
        <div class="logo"><h2>J<span>T</span></h2></div>
        <div class="links">
          <a href="#">Home</a>
          <a href="#">Logout</a>
          <a href="applied-jobs.html">Applied Jobs</a>
        </div>
        <form>
          <input type="text" class="search_input" placeholder="Search Job">
          <button><i class="bx bx-search"></i></button>
        </form>
      </nav>
      <div class="job-details">
          
      </div>
    </div>
  `;
}

// Fake login (simplified)
document.addEventListener("DOMContentLoaded", () => {
  const loginBtn = document.querySelector(".login_btn");
  if (loginBtn) {
    loginBtn.addEventListener("click", () => {
      const email = document.getElementById("email").value.trim();
      const password = document.getElementById("password").value.trim();

      if (email === "" || password === "") {
        alert("Please fill in the details");
        return;
      } else {
        window.location.href = "index.html";
      }
    });
  }
});

// Start app
renderHomePage();
getJobs();
