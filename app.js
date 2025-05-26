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

let isLoggedIn = false;

function renderLoginPage(){
    
    
    
        container.innerHTML = `<div class="login_container">
                
                <div class="inputs_div">
                
                <input type="email" name="email" placeholder="Email" id="email">
                
                <input type="password" placeholder="Password" id="password">
                </div>
                <a href="#" class="forgot_pass">Forgot Password<a>
                <button class="login_btn" onclick="handleLogin()">Login</button>
                <p class="sign_up">Don't have an account? <span><a href="#">Sign Up</a></span></p>
            </div>`
            
            
}

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

renderLoginPage();

function handleLogin() {
    if((document.getElementById("email").value && document.getElementById("password").value) === ""){
        alert("Please fill in the details")
        return
    } else {
        renderHomePage();
        getJobs();
    }
    };

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
















