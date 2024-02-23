function redirectToNextPage() {
  
    window.location.href = 'quizform.html';
  }
  

$(document).ready(function() {
    $('#subscribeForm').submit(function(event) {
        event.preventDefault(); // Prevent default form submission

        // Simulate form submission success or failure
        var isSuccess = Math.random() < 0.5; // Simulate 50% success rate
        if (isSuccess) {
        $('#successMessage').modal('show'); // Show success modal
        } 
    });
});    
// Function to open the video popup
 function openVideoPopup() {
    document.getElementById("video-popup").style.display = "block";
}

// Function to close the video popup
function closeVideoPopup() {
    document.getElementById("video-popup").style.display = "none";
}

// Call the function to display the video popup when the page loads
window.onload = function() {
    openVideoPopup();
};

