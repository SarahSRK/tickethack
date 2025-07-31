const searchBtn = document.getElementById('searchBtn');
const results = document.getElementById('results');

searchBtn.addEventListener('click', async function () {
    const departure = document.getElementById('departure').value;
    const arrival = document.getElementById('arrival').value;
    let date = document.getElementById('date').value;

    // regex: Conversion du format DD/MM/YYYY en YYYY-MM-DD
    if (/^\d{2}\/\d{2}\/\d{4}$/.test(date)) {
        const [day, month, year] = date.split('/');
        date = `${year}-${month}-${day}`;
    }

    const url = `http://localhost:3000/public.tickets/${departure}/${arrival}/${date}`;


    const findTicketsDiv = document.querySelector('.find-tickets');
    if (findTicketsDiv) {
        findTicketsDiv.style.display = 'none';
    }

    const response = await fetch(url);

    if (!response.ok) {
        results.innerHTML = "Route not found";
        return;
    }

    const tickets = await response.json();
      console.log('Tickets trouvés :', tickets);

    results.innerHTML = "";
    tickets.forEach(ticket => {
        const formattedDate = moment(ticket.date).format('HH:mm');
        const div = document.createElement("div");
        div.className = "tickets";
        div.textContent = `${departure} > ${arrival} - ${formattedDate} - ${ticket.price}€`;
        results.appendChild(div);
    });
});
