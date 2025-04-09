document.getElementById('serve-next').addEventListener('click', (event) => {
  const queue = JSON.parse(localStorage.getItem('queue')) || [];
  const servedUser = queue.shift(); // Remove the first user from the queue

  if (servedUser) {
      // Get the counter ID from the button's "data-counter" attribute
      const counterId = event.target.getAttribute('data-counter');

      // Update the "Currently Serving" display
      const servingText = `${servedUser.ticket} - ${servedUser.name}`;
      document.getElementById('current-serving').textContent = servingText;

      // Save the currently served user to localStorage for this specific counter
      localStorage.setItem(`counter-${counterId}-current`, servingText);

      // Update the queue in localStorage
      localStorage.setItem('queue', JSON.stringify(queue));
      
      // Construct the announcement text
      const announcementText = `Number ${servedUser.ticket}, please come to counter ${counterId}`;
      
      // Speak the announcement
      speakText(announcementText);
  } else {
      alert('No more users in the queue!');
  }
});

document.getElementById('speakButton').addEventListener('click', () => {
  const currentServing = document.getElementById('current-serving').textContent;
  if (currentServing !== "None") {
      const counterId = document.getElementById('serve-next').getAttribute('data-counter');
      const announcementText = `Number ${currentServing.split(' - ')[0]}, please come to counter ${counterId}`;
      speakText(announcementText);
  }
});

function speakText(text) {
  const utterance = new SpeechSynthesisUtterance(text);
  utterance.voice = speechSynthesis.getVoices().find(voice => voice.name === "Google UK English Male");
  utterance.rate = 1;
  utterance.pitch = 1;
  utterance.volume = 1;
  speechSynthesis.speak(utterance);
}

// Ensure voices are loaded before accessing them
speechSynthesis.onvoiceschanged = () => {
  speechSynthesis.getVoices();
};