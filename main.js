// Typing animation
function typeText(element, text, speed = 100) {
    let index = 0;
    element.innerHTML = ''; // Clear any existing content
    
    function type() {
        if (index < text.length) {
            if (text.charAt(index) === '\n') {
                element.innerHTML += '<br>';
            } else {
                element.innerHTML += text.charAt(index);
            }
            index++;
            setTimeout(type, speed);
        } else if (index === text.length) {
            // Show scroll indicator after typing is complete
            document.querySelector('.scroll-indicator').style.opacity = '1';
        }
    }
    
    type();
}

// Scroll reveal animation
function handleScrollReveal() {
    const sections = document.querySelectorAll('.reveal-section');
    const windowHeight = window.innerHeight;
    
    sections.forEach(section => {
        const sectionTop = section.getBoundingClientRect().top;
        if (sectionTop < windowHeight * 0.85) { // Reveal when 85% of the section is visible
            section.classList.add('revealed');
        }
    });
}

// Header animation
function handleHeaderAnimation() {
    const header = document.querySelector('header');
    const headerRect = header.getBoundingClientRect();
    
    // Only trigger when the header actually hits the top of the viewport
    if (headerRect.top <= 0) {
        if (!header.classList.contains('header-reveal')) {
            // First add splitting state to trigger the line separation
            header.classList.add('header-splitting');
            
            // After lines have moved and faded, reveal the header
            setTimeout(() => {
                header.classList.add('header-reveal');
                header.classList.remove('header-hidden');
                
                // Clean up the splitting class after fade completes
                setTimeout(() => {
                    header.classList.remove('header-splitting');
                }, 300);
            }, 250);
        }
    } else {
        header.classList.remove('header-reveal', 'header-splitting');
        header.classList.add('header-hidden');
    }
}

// Initialize animations when page loads
document.addEventListener('DOMContentLoaded', () => {
    const introText = document.querySelector('.intro-text');
    const mainContent = document.querySelector('main');
    const header = document.querySelector('header');
    
    // Hide main content and header content initially
    mainContent.style.opacity = '1';
    header.classList.add('header-hidden');
    
    // Start typing animation
    setTimeout(() => {
        typeText(introText, "Hello, I'm Blake.\nWelcome to my portfolio.", 100);
    }, 500);
    
    // Set up scroll reveal and header animation
    window.addEventListener('scroll', () => {
        handleScrollReveal();
        handleHeaderAnimation();
    });
});
