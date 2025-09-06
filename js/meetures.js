// Setting up the carousel - this is where the magic happens ✨
const carouselTrack = document.getElementById('carouselTrack');
const loadedImages = [];
let currentSlideIndex = 0;

// This function loads all the meeture images (1-100) and handles missing ones
async function loadAllImages() {
    // Loop through all 100 possible images - some might not exist and that's totally fine
    for (let i = 1; i <= 100; i++) {
        const img = new Image();
        
        // When an image loads successfully, add it to the carousel
        img.onload = function() {
            const slideImg = document.createElement('img');
            slideImg.src = `/img/meetures/png/Meeture-${i}.png`;
            slideImg.alt = `Meeture ${i}`;
            slideImg.className = 'carousel-slide';
            slideImg.style.filter = 'drop-shadow(2px 2px 4px rgba(0, 0, 0, 0.3))'; // adds that nice shadow effect
            carouselTrack.appendChild(slideImg);
            loadedImages.push(i);
            
            // Update the counter as images load in
            document.getElementById('totalSlides').textContent = loadedImages.length;
        };
        
        // Try to load the image - if it doesn't exist, no big deal
        img.src = `/img/meetures/png/Meeture-${i}.png`;
    }
    
    // Make sure we start at the first image after everything loads
    setTimeout(() => {
        if (loadedImages.length === 0) {
            carouselTrack.innerHTML = '<p style="color: #666; padding: 20px;">No images found</p>';
        } else {
            currentSlideIndex = 0;
            carouselTrack.style.transform = 'translateX(0px)';
            document.getElementById('currentSlide').textContent = '1';
        }
    }, 1000);
}

// This moves the carousel left or right - the main function that does the sliding
function moveCarousel(direction) {
    if (loadedImages.length === 0) return; // can't move if there's nothing to move lol
    
    currentSlideIndex += direction;
    
    // Handle wrapping around (going from last to first or first to last)
    let wrapAround = false;
    if (currentSlideIndex < 0) {
        currentSlideIndex = loadedImages.length - 1; // jump to the end
        wrapAround = true;
    } else if (currentSlideIndex >= loadedImages.length) {
        currentSlideIndex = 0; // jump back to the beginning
        wrapAround = true;
    }
    
    // Different sizes for mobile vs desktop because responsive design hits different
    const slideWidth = window.innerWidth <= 768 ? 300 : 500;
    
    // If we're wrapping around, disable the smooth transition temporarily so it doesn't look weird
    if (wrapAround) {
        carouselTrack.style.transition = 'none';
        carouselTrack.style.transform = `translateX(-${currentSlideIndex * slideWidth}px)`;
        
        // Turn the smooth transition back on after a tiny delay
        setTimeout(() => {
            carouselTrack.style.transition = 'transform 0.3s ease';
        }, 50);
    } else {
        // Normal movement with smooth animation
        carouselTrack.style.transform = `translateX(-${currentSlideIndex * slideWidth}px)`;
    }
    
    // Update the counter so people know where they are
    document.getElementById('currentSlide').textContent = currentSlideIndex + 1;
}

// Keyboard controls because why not - arrow keys work too
document.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowLeft') moveCarousel(-1);
    if (e.key === 'ArrowRight') moveCarousel(1);
});

// Hold-to-scroll functionality - this is where it gets spicy 🌶️
let holdInterval;
let holdTimeout;

function startHold(direction) {
    // Start the rapid-fire scrolling after a short delay
    holdTimeout = setTimeout(() => {
        holdInterval = setInterval(() => {
            moveCarousel(direction); // zoom zoom zoom
        }, 50); // super fast - 20 images per second
    }, 200); // wait 200ms before going into turbo mode
}

function stopHold() {
    // Stop all the timers when you let go
    clearTimeout(holdTimeout);
    clearInterval(holdInterval);
}

// Set up all the button event listeners when the page loads
document.addEventListener('DOMContentLoaded', () => {
    const prevBtn = document.querySelector('.carousel-btn.prev');
    const nextBtn = document.querySelector('.carousel-btn.next');

    // Previous button events
    prevBtn.addEventListener('click', () => moveCarousel(-1)); // single click = one image
    prevBtn.addEventListener('mousedown', () => startHold(-1)); // hold down = rapid scroll
    prevBtn.addEventListener('mouseup', stopHold);
    prevBtn.addEventListener('mouseleave', stopHold); // stop if mouse leaves button

    // Next button events (same deal but going forward)
    nextBtn.addEventListener('click', () => moveCarousel(1));
    nextBtn.addEventListener('mousedown', () => startHold(1));
    nextBtn.addEventListener('mouseup', stopHold);
    nextBtn.addEventListener('mouseleave', stopHold);

    // Touch events for mobile users
    let touchStartTime;
    
    prevBtn.addEventListener('touchstart', (e) => {
        e.preventDefault(); // prevent weird mobile behaviors
        touchStartTime = Date.now();
        moveCarousel(-1); // immediate move for single tap
        startHold(-1); // also start hold timer for long press
    });
    prevBtn.addEventListener('touchend', (e) => {
        e.preventDefault();
        const touchDuration = Date.now() - touchStartTime;
        // If it was a quick tap (less than 200ms), don't continue with turbo mode
        if (touchDuration < 200) {
            stopHold();
        }
    });

    nextBtn.addEventListener('touchstart', (e) => {
        e.preventDefault();
        touchStartTime = Date.now();
        moveCarousel(1); // immediate move for single tap
        startHold(1); // also start hold timer for long press
    });
    nextBtn.addEventListener('touchend', (e) => {
        e.preventDefault();
        const touchDuration = Date.now() - touchStartTime;
        // If it was a quick tap (less than 200ms), don't continue with turbo mode
        if (touchDuration < 200) {
            stopHold();
        }
    });
});

// Start loading all the images when the page loads
loadAllImages();
