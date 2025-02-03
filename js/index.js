const cursor = document.createElement('div');
cursor.classList.add('glow-cursor');
document.body.appendChild(cursor);

// Makes the glow follow the mouse
document.addEventListener('mousemove', (e) => {
    cursor.style.left = `${e.clientX}px`;
    cursor.style.top = `${e.clientY}px`;
});

document.addEventListener('mouseenter', () => {
    cursor.style.width = '200px';
    cursor.style.height = '200px';
    cursor.style.boxShadow = ' 0 0 300px rgb(255, 255, 255, 1)';
});

document.addEventListener('mouseleave', () => {
    cursor.style.width = '0'; /* Shrinks the size */
    cursor.style.height = '0'; /* Shrinks the size */
    /*cursor.style.boxShadow = '0 0 0px rgb(255, 255, 255, 0.25)'*/
    /*cursor.style.backgroundColor = '0 0 10px rgb(0, 0, 0)';*/
});

