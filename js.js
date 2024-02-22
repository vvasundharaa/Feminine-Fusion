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
