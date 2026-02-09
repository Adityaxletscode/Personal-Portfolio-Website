// Modal Zoom Logic

function openModal(element) {
    const modal = document.getElementById("certificateModal");
    const modalImg = document.getElementById("img01");
    const captionText = document.getElementById("caption");
    
    // Get content from the clicked card
    const img = element.querySelector('img');
    const title = element.querySelector('h3').innerText;
    const dateText = element.querySelector('.certificate-date').innerText;
    
    // Set modal content
    modalImg.src = img.src;
    captionText.innerHTML = `<h3>${title}</h3><p>${dateText}</p>`;
    
    // Show modal
    modal.style.display = "flex";
    // Trigger reflow
    void modal.offsetWidth;
    modal.classList.add("show");
}

function closeModal() {
    const modal = document.getElementById("certificateModal");
    modal.classList.remove("show");
    setTimeout(() => {
        modal.style.display = "none";
    }, 300);
}

document.addEventListener('DOMContentLoaded', () => {
    const modal = document.getElementById("certificateModal");
    const span = document.getElementsByClassName("close-modal")[0];

    // Close button click
    if (span) {
        span.onclick = function() { 
            closeModal();
        }
    }

    // Click outside modal
    if (modal) {
        modal.onclick = function(event) {
            if (event.target === modal) {
                closeModal();
            }
        }
    }

    // Escape key
    document.addEventListener('keydown', function(event) {
        if (event.key === "Escape" && modal && modal.classList.contains("show")) {
            closeModal();
        }
    });
});


