// JavaScript to handle complaint submission, tracking, and displaying complaints in admin view
const complaintForm = document.getElementById("complaintForm");
const registerSuccess = document.getElementById("registerSuccess");
const trackForm = document.getElementById("trackForm");
const trackResult = document.getElementById("trackResult");
const complaintsList = document.getElementById("complaintsList");

let complaints = []; // Array to store complaints for tracking and admin dashboard

complaintForm.addEventListener("submit", (e) => {
    e.preventDefault();
    
    // Get input values
    const name = document.getElementById("name").value;
    const email = document.getElementById("email").value;
    const complaintText = document.getElementById("complaint").value;
    const trackingID = CID${Math.floor(Math.random() * 100000)}; // Generate tracking ID
    
    // Store complaint
    const newComplaint = { name, email, complaintText, trackingID, status: "Pending" };
    complaints.push(newComplaint);

    registerSuccess.textContent = Complaint Registered! Tracking ID: ${trackingID};
    complaintForm.reset();
});

trackForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const trackingID = document.getElementById("trackingID").value;
    
    // Find the complaint by tracking ID
    const complaint = complaints.find(c => c.trackingID === trackingID);
    if (complaint) {
        trackResult.innerHTML = `
            <p><strong>Name:</strong> ${complaint.name}</p>
            <p><strong>Email:</strong> ${complaint.email}</p>
            <p><strong>Complaint:</strong> ${complaint.complaintText}</p>
            <p><strong>Status:</strong> ${complaint.status}</p>
        `;
    } else {
        trackResult.textContent = "No complaint found with this Tracking ID.";
    }
});

function renderAdminDashboard() {
    complaintsList.innerHTML = complaints.map(complaint => `
        <div class="complaint">
            <p><strong>Tracking ID:</strong> ${complaint.trackingID}</p>
            <p><strong>Name:</strong> ${complaint.name}</p>
            <p><strong>Email:</strong> ${complaint.email}</p>
            <p><strong>Complaint:</strong> ${complaint.complaintText}</p>
            <p><strong>Status:</strong> ${complaint.status}</p>
            <button onclick="updateStatus('${complaint.trackingID}', 'Resolved')">Mark as Resolved</button>
        </div>
    `).join('');
}

function updateStatus(trackingID, status) {
    const complaint = complaints.find(c => c.trackingID === trackingID);
    if (complaint) {
        complaint.status = status;
        renderAdminDashboard();
    }
}

// Load the admin dashboard initially
renderAdminDashboard();