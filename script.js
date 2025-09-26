// Function to open the envelope and show the hidden message
function openEnvelope() {
    const envelope = document.querySelector('.envelope');
    const flap = document.querySelector('.envelope-flap');
    const message = document.getElementById('hiddenMessage');
    
    // Add animation to envelope flap
    flap.style.transform = 'rotateX(-180deg)';
    flap.style.transformOrigin = 'bottom';

    // Play background music on first user interaction
    var bgMusic = document.getElementById('bgMusic');
    if (bgMusic) {
        bgMusic.muted = false; // Unmute in case browser muted it
        bgMusic.currentTime = 0;
        bgMusic.play().catch(function(e){
            // Optionally show a message if play fails
            // alert('Please tap again to enable sound!');
        });
        // Stop music after 15 seconds
        if (window.bgMusicTimeout) clearTimeout(window.bgMusicTimeout);
        window.bgMusicTimeout = setTimeout(function() {
            bgMusic.pause();
            bgMusic.currentTime = 0;
        }, 15000);
    }

    // Add bounce effect to envelope
    envelope.style.animation = 'bounce 0.5s ease';

    // Show the hidden message after a short delay
    setTimeout(() => {
        message.style.display = 'flex';
        // Add a subtle fade-in effect
        message.style.animation = 'fadeIn 0.5s ease';
    }, 300);
    
    // Remove bounce animation after it completes
    setTimeout(() => {
        envelope.style.animation = '';
    }, 500);
}

// Function to show photo gallery
function showPhotoGallery() {
    const message = document.getElementById('hiddenMessage');
    const photoGallery = document.getElementById('photoGallery');
    
    // Hide the message
    message.style.display = 'none';
    
    // Show the photo gallery
    photoGallery.style.display = 'block';
    
    // Reset envelope flap
    const flap = document.querySelector('.envelope-flap');
    flap.style.transform = '';
}

// Function to go back to main page
function goBackToMain() {
    // Hide all pages except the main/start
    document.getElementById('photoGallery').style.display = 'none';
    document.getElementById('letterPage').style.display = 'none';
    document.getElementById('couponPage').style.display = 'none';
    document.getElementById('hiddenMessage').style.display = 'none';

    // Show the heart and envelope containers (main/start)
    document.querySelector('.heart-container').style.display = 'block';
    document.querySelector('.envelope-container').style.display = 'block';
}

// Function to show the beautiful letter
function showLetter() {
    const photoGallery = document.getElementById('photoGallery');
    const letterPage = document.getElementById('letterPage');
    
    // Hide the photo gallery
    photoGallery.style.display = 'none';
    
    // Show the letter page
    letterPage.style.display = 'block';
    
    // Scroll to top of letter
    letterPage.scrollTop = 0;
}

// Function to show the coupon page
function showCoupon() {
    const letterPage = document.getElementById('letterPage');
    const couponPage = document.getElementById('couponPage');
    letterPage.style.display = 'none';
    couponPage.style.display = 'block';
}

// Function to close the message (keeping for backward compatibility)
function closeMessage() {
    showPhotoGallery();
}

// Add bounce keyframes dynamically
const style = document.createElement('style');
style.textContent = `
    @keyframes bounce {
        0%, 100% { transform: translateY(0); }
        25% { transform: translateY(-10px); }
        50% { transform: translateY(-5px); }
        75% { transform: translateY(-7px); }
    }
    
    @keyframes fadeIn {
        0% { opacity: 0; }
        100% { opacity: 1; }
    }
`;
document.head.appendChild(style);

// Add some interactive effects
document.addEventListener('DOMContentLoaded', function() {
    const heart = document.querySelector('.heart');
    const sparkles = document.querySelectorAll('.sparkle');
    
    // Add click effect to heart
    heart.addEventListener('click', function() {
        this.style.animation = 'heartbeat 0.5s ease';
        
        // Trigger sparkles
        sparkles.forEach((sparkle, index) => {
            setTimeout(() => {
                sparkle.style.animation = 'sparkle 1s ease';
            }, index * 100);
        });
        
        // Reset animation
        setTimeout(() => {
            this.style.animation = 'heartbeat 2s ease-in-out infinite';
            sparkles.forEach(sparkle => {
                sparkle.style.animation = 'sparkle 2s infinite';
            });
        }, 1000);
    });
    
    // Add hover effect to envelope
    const envelopeContainer = document.querySelector('.envelope-container');
    envelopeContainer.addEventListener('mouseenter', function() {
        const openText = document.querySelector('.open-text');
        openText.style.animation = 'pulse 0.5s ease';
    });
    
    envelopeContainer.addEventListener('mouseleave', function() {
        const openText = document.querySelector('.open-text');
        openText.style.animation = 'pulse 2s infinite';
    });
});

// Add touch support for mobile devices
document.addEventListener('touchstart', function() {}, {passive: true});
