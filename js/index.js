const cursor = document.createElement('div');
cursor.classList.add('glow-cursor');

// Opacity and position on start 
cursor.style.opacity = '0.7';
cursor.style.left = '20px';
cursor.style.top = '20px';
document.body.appendChild(cursor);

// Makes the glow follow the mouse
document.addEventListener('mousemove', (e) => {
    cursor.style.left = `${e.clientX}px`;
    cursor.style.top = `${e.clientY}px`;

    // Fix : Makes cursor glow once webpage loaded
    cursor.style.opacity = '0.7';
});

document.addEventListener('mouseenter', () => {
    cursor.style.opacity = '0.7';
    cursor.style.width = '200px';
    cursor.style.height = '200px';
    cursor.style.boxShadow = ' 0 0 300px rgb(255, 255, 255, 1)';
});

// Can be used to make cursor dimmer when starting
//document.addEventListener('mouseleave', () => {
//    cursor.style.opacity = '0.5';
//});

