Job Tracker App

A Firebase-powered job tracking app that allows users to log in, sign up, and manage jobs they've applied for. Users can track the status of each application, view job details, and save job progress with a clean and responsive UI.

The Job Tracker App is a JavaScript-based web application that integrates Firebase services to provide user authentication and data storage. It allows users to sign up, log in, and manage jobs they have applied for by adding, viewing, and updating the status of each application. The app is deployed using Firebase Hosting.


Authentication (Login and Signup)

* **Firebase Authentication** is used to handle login and signup operations.
* The login and signup forms are toggled on the same HTML page using DOM manipulation.
* The `Remember Me` checkbox uses `localStorage` to persist user sessions between page reloads.
* After successful login, the user is redirected to `home-page.html`.

Key Functions

* `signInWithEmailAndPassword(firebaseAuth, email, password)`
* `createUserWithEmailAndPassword(firebaseAuth, email, password)`



Firestore Integration

* Firebase Firestore stores all job application data under a user's unique ID.
* Jobs are saved with fields like `title`, `company`, `location`, `employment_type`, `date_applied`, and `status`.
* When users visit `applied-jobs.html`, a list of applied jobs is fetched and rendered dynamically.
* Changing a job's status using a dropdown automatically updates the Firestore document in real-time.

Key Operations

* `addDoc`, `setDoc`, `getDocs`, `updateDoc` from `firebase/firestore`


Job List Rendering

* On `applied-jobs.html`, jobs are displayed using dynamically created `<li>` elements.
* Each item displays summary information like company, title, location, employment type, and date applied.
* Clicking a list item opens job details (implemented via a `jobDetail` function).


Pagination

* The app supports pagination, displaying 10 jobs per page.
* Two buttons, "Previous" and "Next," adjust the index for the Firestore query, allowing navigation through job entries.
* Controlled using a `from` variable that gets incremented or decremented based on the button clicked.

## 6. **Event Handling & Job Status Update**

* Each job has a `<select>` dropdown that lets users set the application status.
* A `change` event listener on this dropdown updates the job's status in Firestore.
* Each dropdown is linked to its respective job via a `data-id` attribute.



 **Firebase Hosting**

* `firebase.json` is configured with a rewrite rule that directs all navigation to `index.html`.
* Files in the `public` directory are hosted.
* Deployment is done via Firebase CLI:

```bash
firebase deploy
```

Security Considerations

* Firestore security rules must ensure users only access their own data.
* Authentication state is checked before accessing secure pages like `applied-jobs.html`.



Future Improvements

* Add job search and filters.
* Enhance UI/UX with loading animations.
* Add data visualization for application statistics.
* Implement password reset via Firebase.
* Add calendar reminders for interviews.

🔧 Features

* ✅ Login & Signup with Firebase Authentication
* 💾 Store applied jobs in Firebase Firestore
* 🔍 View a list of applied jobs with details
* 🔁 Change and save application status (e.g., Hired, Rejected)
* 📄 View full job detail when an item is clicked
* 🔁 Pagination (Next / Previous buttons)
* 🧠 "Remember Me" functionality to persist sessions
* 📦 Firebase Hosting for deployment



🛠️ Tech Stack

* **Frontend**: HTML5, CSS3, JavaScript (Modules)
* **Backend**: Firebase Authentication, Firestore
* **Hosting**: Firebase Hosting




🚀 Installation & Setup

1. **Clone the Repository**

   ```bash
   git clone https://github.com/Radebetumelo/job-tracker.git
   cd job-tracker
   ```

2. **Firebase Setup**

   * Ensure Firebase CLI is installed.
   * Run `firebase login`
   * Run `firebase init` and configure hosting & Firestore

3. **Deploy to Firebase**

   ```bash
   firebase deploy
   ```



📁 Project Structure

```
job-tracker/
├── public/
│   ├── index.html           # Login & Signup UI
│   ├── home-page.html       # Homepage after login
│   ├── applied-jobs.html    # List of applied jobs
│   ├── js/
│   │   └── app.js           # Main logic
│   └── css/
│       ├── style.css        # Styles
│       └── applied-jobs.css
├── firebase.json            # Firebase config
├── .firebaserc              # Firebase project alias
```



🔐 Authentication

* Login uses Firebase Auth and redirects to `index.html` on success.
* Signup form toggles in the same page as Login.
* Authenticated users are stored and remembered if "Remember Me" is checked.



📦 Firestore Usage

* Applied jobs are saved in Firestore per user.
* Each job entry includes `title`, `company`, `location`, `employment_type`, `date_applied`, and `status`.
* Status updates are instantly saved back to Firestore.



🌐 Deployment URL

After deployment, Firebase CLI will output a hosting URL like:

```
https://job-tracker-bd25a.web.app
```

Use this link to view your live app.



🧠 Future Enhancements

* 🔎 Add job search and filter features
* 📊 Add charts for job status summary
* 📱 Improve mobile responsiveness
* 📅 Add calendar-based job reminder system
* 🖼️ Loader animations during fetches

Summary

The Job Tracker App provides a complete end-to-end solution for managing job applications using Firebase for backend services and vanilla JavaScript for frontend logic. The architecture is scalable and modular, allowing future enhancements without restructuring the core.

🧑‍💻 Author

Built by \Tumelo Radebe



📄 License

[MIT](LICENSE)
