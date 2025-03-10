document.addEventListener('DOMContentLoaded', function() {
    const alerts = [
        'Traffic jam on Main Street',
        'Road blockage on 5th Avenue',
        'Busy road near Central Park'
    ];

    const alertList = document.getElementById('alert-list');

    alerts.forEach(alert => {
        const listItem = document.createElement('li');
        listItem.textContent = alert;
        alertList.appendChild(listItem);
    });
});
