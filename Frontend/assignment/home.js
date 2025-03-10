document.addEventListener('DOMContentLoaded', () => {
    const themeToggleButton = document.createElement('button');
    themeToggleButton.textContent = 'Toggle Theme';
    themeToggleButton.classList.add('theme-toggle-button');
    document.body.prepend(themeToggleButton);

    themeToggleButton.addEventListener('click', () => {
        document.body.classList.toggle('dark-theme');
    });
});
    const mapImage = document.querySelector('.map-image');

    mapImage.addEventListener('mouseover', () => {
        mapImage.style.transform = 'scale(1.05)';
        mapImage.style.transition = 'transform 0.3s ease';
        mapImage.style.boxShadow = '0 4px 8px rgba(0, 0, 0, 0.2)';
    });

    mapImage.addEventListener('mouseout', () => {
        mapImage.style.transform = 'scale(1)';
        mapImage.style.transition = 'transform 0.3s ease';
        mapImage.style.boxShadow = 'none';
    });

