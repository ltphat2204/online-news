document.getElementById('notificationBell').addEventListener('click', function (event) {
    event.stopPropagation();
    var panel = document.getElementById('notificationPanel');
    var userDropdown = document.querySelector('.dropdown-menu');
    if (userDropdown.style.display === 'block') {
        userDropdown.style.display = 'none';
    }
    panel.style.display = panel.style.display === 'none' ? 'block' : 'none';
});

document.getElementById('dropdownMenuLink').addEventListener('click', function (event) {
    event.stopPropagation();
    var panel = document.getElementById('notificationPanel');
    var userDropdown = document.querySelector('.dropdown-menu');
    if (panel.style.display === 'block') {
        panel.style.display = 'none';
    }
    userDropdown.style.display = userDropdown.style.display === 'none' ? 'block' : 'none';
    this.classList.toggle('active');
});

document.addEventListener('click', function () {
    var panel = document.getElementById('notificationPanel');
    var userDropdown = document.querySelector('.dropdown-menu');
    if (panel.style.display === 'block') {
        panel.style.display = 'none';
    }
    if (userDropdown.style.display === 'block') {
        userDropdown.style.display = 'none';
    }
});