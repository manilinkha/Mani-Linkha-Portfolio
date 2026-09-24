/**
 * Mani Linkha - F1 Portfolio Website Client-Side Logic
 * File: script.js
 */

/* ==========================================================================
   1. Typing Animation (Typed.js API)
   ========================================================================== */
const typingElement = document.getElementById("typing");
if (typingElement) {
    new Typed("#typing", {
        strings: [
            "Future Cybersecurity Expert",
            "Cloud Computing Enthusiast",
            "UI/UX Designer",
            "Tech Entrepreneur"
        ],
        typeSpeed: 60,
        backSpeed: 40,
        loop: true
    });
}

/* ==========================================================================
   2. F1 Page Transition Overlay Controller
   ========================================================================== */
const navLinks = document.querySelectorAll("nav a");
navLinks.forEach(link => {
    link.addEventListener("click", function (e) {
        const href = this.getAttribute("href");
        if (href.includes("#")) return;

        e.preventDefault();

        const overlay = document.querySelector(".transition-overlay");
        const car = document.querySelector(".f1-car");

        if (overlay && car) {
            // Display page overlay transition box
            overlay.style.opacity = "1";

            // Snap the F1 car position back to the left start position
            car.style.transition = "none";
            car.style.left = "-800px";

            // Trigger linear car animation from left to right side
            setTimeout(() => {
                car.style.transition = "0.5s linear";
                car.style.left = "120%";
            }, 50);

            // Redirect context to target page immediately after the car speeds past (550ms total delay)
            setTimeout(() => {
                window.location.href = href;
            }, 550);
        } else {
            // Fallback redirect if elements are missing
            window.location.href = href;
        }
    });
});

/* ==========================================================================
   3. Interactive Card Glow Effect (Radial Gradient Cursor Tracking)
   ========================================================================== */
const glowCards = document.querySelectorAll(".card, .skill-card");
glowCards.forEach(card => {
    card.addEventListener("mousemove", (e) => {
        const rect = card.getBoundingClientRect();
        const mouseX = e.clientX - rect.left;
        const mouseY = e.clientY - rect.top;

        // Render orange-tinted hover gradient centered on cursor coordinate
        card.style.background = `
            radial-gradient(
                circle at ${mouseX}px ${mouseY}px,
                rgba(255, 120, 0, 0.25),
                rgba(255, 255, 255, 0.05)
            )
        `;
    });

    card.addEventListener("mouseleave", () => {
        // Reset base glassmorphic background
        card.style.background = "rgba(255, 255, 255, 0.05)";
    });
});

/* ==========================================================================
   4. Contact Form Submission (Asynchronous Web3Forms Endpoint Integration)
   ========================================================================== */
const contactForm = document.getElementById("myContactForm");
const responseDiv = document.getElementById("formResponse");
const submitBtn = document.getElementById("submitBtn");

if (contactForm && responseDiv && submitBtn) {
    contactForm.addEventListener("submit", function (e) {
        e.preventDefault(); // Terminate default browser reload event

        // Adjust UI during asynchronous dispatch cycle
        submitBtn.innerText = "Sending...";
        submitBtn.style.opacity = "0.7";
        submitBtn.disabled = true;

        const formData = new FormData(contactForm);
        const requestPayload = JSON.stringify(Object.fromEntries(formData));

        fetch("https://api.web3forms.com/submit", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json"
            },
            body: requestPayload
        })
        .then(async (response) => {
            const resultData = await response.json();
            
            if (response.status === 200) {
                // Success indicator
                responseDiv.className = "form-success-text";
                responseDiv.innerHTML = "Message sent successfully";
                contactForm.reset();
            } else {
                // Error indicator
                responseDiv.className = "form-error-text";
                responseDiv.innerHTML = resultData.message || "Something went wrong. Please try again.";
            }
        })
        .catch(() => {
            // General connection issue handler
            responseDiv.className = "form-error-text";
            responseDiv.innerHTML = "Connection error. Please check your network connection.";
        })
        .then(() => {
            // Restore button visual states
            submitBtn.innerText = "Send Message";
            submitBtn.style.opacity = "1";
            submitBtn.disabled = false;

            // Purge the status text message after a brief 6-second window
            setTimeout(() => {
                responseDiv.innerHTML = "";
            }, 6000);
        });
    });
}

// Mobile menu toggle
const menuToggle = document.getElementById('mobile-menu');
const navUl = document.querySelector('nav ul');
if (menuToggle && navUl) {
    menuToggle.addEventListener('click', () => {
        navUl.classList.toggle('active');
        // Toggle icon between hamburger and close
        const icon = menuToggle.querySelector('i');
        if (icon) {
            icon.classList.toggle('fa-bars');
            icon.classList.toggle('fa-times');
        }
    });
}
