document.addEventListener("DOMContentLoaded", () => {
    // Include HTML components
    document.querySelectorAll("[data-include]").forEach(async (el) => {
        const file = el.getAttribute("data-include");
        const res = await fetch(file);
        const html = await res.text();
        el.innerHTML = html;
        
        // Setup dropdown after navbar is included
        if (file.includes("navbar")) {
            setupDropdownMenu();
        }
    });
});

// Dropdown menu functionality
function setupDropdownMenu() {
    const dropdown = document.querySelector(".dropdown");
    const dropdownToggle = document.querySelector(".dropdown-toggle");
    
    if (dropdownToggle && dropdown) {
        dropdownToggle.addEventListener("click", (e) => {
            e.preventDefault();
            dropdown.classList.toggle("active");
        });
        
        // Close dropdown when clicking outside
        document.addEventListener("click", (e) => {
            if (!dropdown.contains(e.target)) {
                dropdown.classList.remove("active");
            }
        });
        
        // Close dropdown when a link is clicked
        const dropdownLinks = document.querySelectorAll(".dropdown-menu a");
        dropdownLinks.forEach(link => {
            link.addEventListener("click", () => {
                dropdown.classList.remove("active");
            });
        });
    }
}

const slider = document.getElementById("slider");

document.querySelector(".left").onclick = () => {
    slider.scrollBy({ left: -300, behavior: "smooth" });
};

document.querySelector(".right").onclick = () => {
    slider.scrollBy({ left: 300, behavior: "smooth" });
};

