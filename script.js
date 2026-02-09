document.addEventListener('DOMContentLoaded', () => {
    // Mobile Menu
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');

    hamburger.addEventListener('click', () => {
        navLinks.classList.toggle('active');
    });

    // Bubble Animation
    const bubblesContainer = document.querySelector('.bubbles-container');
    const createBubble = () => {
        const bubble = document.createElement('div');
        bubble.classList.add('bubble');
        
        const size = Math.random() * 60 + 20; // Random size between 20px and 80px
        bubble.style.width = `${size}px`;
        bubble.style.height = `${size}px`;
        
        bubble.style.left = `${Math.random() * 100}%`; // Random horizontal position
        
        const duration = Math.random() * 10 + 10; // Random duration between 10s and 20s
        bubble.style.animationDuration = `${duration}s`;
        
        const delay = Math.random() * 5; // Random delay
        bubble.style.animationDelay = `${delay}s`;

        bubblesContainer.appendChild(bubble);

        // Remove bubble after animation ends to clean up DOM
        setTimeout(() => {
            bubble.remove();
        }, (duration + delay) * 1000);
    };

    // Create bubbles continually
    setInterval(createBubble, 500); // Create a new bubble every 500ms

    // Smooth scroll for anchor links (already handled by CSS scroll-behavior, but good for older browsers or more control)
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            navLinks.classList.remove('active'); // Close mobile menu on click

            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                const headerOffset = document.querySelector('.navbar').offsetHeight;
                const elementPosition = targetElement.getBoundingClientRect().top;
                const absoluteElementTop = elementPosition + window.pageYOffset;
                
                // Calculate position to center the element within the available view (viewport minus navbar)
                // Add 20px to scroll further down, moving content visually UP
                const centeredPosition = absoluteElementTop - ((window.innerHeight + headerOffset) / 2) + (targetElement.offsetHeight / 2) + 20;
                
                // Calculate position to align the top of the element slightly overlapped by navbar (+5px) 
                // to GUARANTEE no gap from previous section is visible
                const topAlignedPosition = absoluteElementTop - headerOffset + 5;
    
                // Choose the position that scrolls LESS (i.e., shows the element lower in the viewport)
                const offsetPosition = Math.min(centeredPosition, topAlignedPosition);
    
                window.scrollTo({
                    top: offsetPosition,
                    behavior: "smooth"
                });
            }
        });
    });

    // Contact Form Handling
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            
            const submitBtn = contactForm.querySelector('.submit-btn');
            const originalBtnText = submitBtn.innerHTML;
            
            // Show loading state
            submitBtn.disabled = true;
            submitBtn.innerHTML = '<span>Sending...</span><i class="fas fa-spinner fa-spin"></i>';
            
            const formData = new FormData(contactForm);
            
            try {
                const response = await fetch(contactForm.action, {
                    method: 'POST',
                    body: formData,
                    headers: {
                        'Accept': 'application/json'
                    }
                });
                
                if (response.ok) {
                    alert('Thank you! Your message has been sent successfully.');
                    contactForm.reset();
                } else {
                    const data = await response.json();
                    if (Object.hasOwn(data, 'errors')) {
                        alert(data["errors"].map(error => error["message"]).join(", "));
                    } else {
                        alert('Oops! There was a problem submitting your form');
                    }
                }
            } catch (error) {
                alert('Oops! There was a problem submitting your form');
            } finally {
                // Restore button state
                submitBtn.disabled = false;
                submitBtn.innerHTML = originalBtnText;
            }
        });
    }

    // Project Tabs Logic
    const tabBtns = document.querySelectorAll('.tab-btn');
    const projectCategories = document.querySelectorAll('.project-category');

    if (tabBtns.length > 0) {
        tabBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                // Remove active class from all buttons
                tabBtns.forEach(b => b.classList.remove('active'));
                btn.classList.add('active');

                // Hide all categories
                projectCategories.forEach(category => {
                    category.classList.remove('active');
                });

                // Show target category
                const targetId = btn.getAttribute('data-tab');
                const targetCategory = document.getElementById(targetId);
                if (targetCategory) {
                    targetCategory.classList.add('active');
                }
            });
        });
    }
});
