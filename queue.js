// Initialize queue in localStorage
if (!localStorage.getItem('queue')) {
    localStorage.setItem('queue', JSON.stringify([]));
  }
  
  let ticketNumber = parseInt(localStorage.getItem('ticketNumber') || '0'); // Store ticket number
  
  // Update the queue display
  function updateQueue() {
    const queue = JSON.parse(localStorage.getItem('queue'));
    const queueList = document.getElementById('queue-list');
    queueList.innerHTML = '';
    queue.forEach((entry, index) => {
      const listItem = document.createElement('li');
      listItem.textContent = `${entry.ticket} - ${entry.name}`;
      queueList.appendChild(listItem);
    });
  }
  
  // Join the queue and display the ticket
  document.getElementById('join-queue').addEventListener('click', () => {
    const userName = document.getElementById('user-name').value;
    if (!userName) {
      alert('Please enter your name');
      return;
    }
  
    ticketNumber++;
    localStorage.setItem('ticketNumber', ticketNumber);
  
    const formattedTicket = `T${ticketNumber.toString().padStart(3, '0')}`;
    const queue = JSON.parse(localStorage.getItem('queue'));
    queue.push({ ticket: formattedTicket, name: userName }); // Save ticket and name together
    localStorage.setItem('queue', JSON.stringify(queue));
    document.getElementById('user-name').value = '';
    updateQueue();
  
    // Show Ticket in Modal
    document.getElementById('ticket-number').textContent = `Ticket: ${formattedTicket}`;
    document.getElementById('ticket-popup').classList.remove('hidden');
  });
  
  // Close the ticket modal
  document.getElementById('close-popup').addEventListener('click', () => {
    document.getElementById('ticket-popup').classList.add('hidden');
  });
  
  // Print the ticket
  document.getElementById('print-ticket').addEventListener('click', () => {
    const ticketContent = document.getElementById('ticket-number').textContent;
    const printWindow = window.open('', '_blank');
    printWindow.document.write(`<h2>${ticketContent}</h2>`);
    printWindow.document.close();
    printWindow.print();
  });
  
  // Initial update
  updateQueue();
  