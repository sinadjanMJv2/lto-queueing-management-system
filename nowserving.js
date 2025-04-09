// Function to update the "Now Serving" display for both counters
function updateServingDisplay() {
    // Retrieve current serving data for both counters
    const counter1Current = localStorage.getItem('counter-1-current') || 'None';
    const counter2Current = localStorage.getItem('counter-2-current') || 'None';
  
    // Update the "Now Serving" display on the page
    document.getElementById('counter-1-serving').textContent = counter1Current;
    document.getElementById('counter-2-serving').textContent = counter2Current;
  }
  
  // Periodically update the display every second
  setInterval(updateServingDisplay, 1000);
  
  // Initial display update
  updateServingDisplay();
  