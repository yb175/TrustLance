//   // Open the application modal and set job title
//   function openApplicationModal(jobTitle) {
//     document.getElementById("modalJobTitle").textContent = "Apply for: " + jobTitle;
//     document.getElementById("applicationModal").style.display = "block";
// }

// // Close the modal
// function closeApplicationModal() {
//     document.getElementById("applicationModal").style.display = "none";
// }

// // Simulate form submission
// function submitApplication() {
//     const coverLetter = document.querySelector(".form-textarea").value;
//     const rate = document.querySelectorAll(".form-input")[0].value;
//     const timeline = document.querySelectorAll(".form-input")[1].value;
//     const portfolio = document.querySelectorAll(".form-input")[2].files[0];

//     // Simple validation
//     if (!coverLetter || !rate || !timeline) {
//         alert("Please fill all fields before submitting.");
//         return;
//     }

//     console.log("Cover Letter:", coverLetter);
//     console.log("Proposed Rate:", rate);
//     console.log("Timeline:", timeline);
//     console.log("Attached File:", portfolio ? portfolio.name : "No file");

//     alert("Application submitted successfully!");

//     // Reset form
//     document.querySelector(".application-form").reset();
//     closeApplicationModal();
// }

// // Optional: close modal if clicked outside the modal content
// window.onclick = function(event) {
//     const modal = document.getElementById("applicationModal");
//     if (event.target === modal) {
//         closeApplicationModal();
//     }
//     }


function submitApplication() {
    
    const coverLetter = document.querySelector(".form-textarea").value;
    const rate = document.querySelectorAll(".form-input")[0].value;
    const timeline = document.querySelectorAll(".form-input")[1].value;
    const portfolio = document.querySelectorAll(".form-input")[2].files[0];
    const jobTitle = document.getElementById("modalJobTitle").textContent.replace("Apply for: ", "");

    // Simple validation
    if (!coverLetter || !rate || !timeline) {
        alert("Please fill all fields before submitting.");
        return;
    }

    // Create application object
    const application = {
        jobTitle,
        coverLetter,
        rate,
        timeline,
        portfolioName: portfolio ? portfolio.name : "No file",
        submittedAt: new Date().toLocaleString()
    };

    // Get existing applications from localStorage
    const existingApps = JSON.parse(localStorage.getItem("applications")) || [];

    // Add new application
    existingApps.push(application);

    // Save back to localStorage
    localStorage.setItem("applications", JSON.stringify(existingApps));

    alert("Application submitted and saved locally!");

    // Reset form and close modal
    document.querySelector(".application-form").reset();
    closeApplicationModal();
}
