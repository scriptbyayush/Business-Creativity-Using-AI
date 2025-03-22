// Toggle the visibility of a dropdown menu
const toggleDropdown = (dropdown, menu, isOpen) => {
    dropdown.classList.toggle("open", isOpen);
    menu.style.height = isOpen ? `${menu.scrollHeight}px` : 0;
  };
  // Close all open dropdowns
  const closeAllDropdowns = () => {
    document.querySelectorAll(".dropdown-container.open").forEach((openDropdown) => {
      toggleDropdown(openDropdown, openDropdown.querySelector(".dropdown-menu"), false);
    });
  };
  // Attach click event to all dropdown toggles
  document.querySelectorAll(".dropdown-toggle").forEach((dropdownToggle) => {
    dropdownToggle.addEventListener("click", (e) => {
      e.preventDefault();
      const dropdown = dropdownToggle.closest(".dropdown-container");
      const menu = dropdown.querySelector(".dropdown-menu");
      const isOpen = dropdown.classList.contains("open");
      closeAllDropdowns(); // Close all open dropdowns
      toggleDropdown(dropdown, menu, !isOpen); // Toggle current dropdown visibility
    });
  });
  // Attach click event to sidebar toggle buttons
  document.querySelectorAll(".sidebar-toggler, .sidebar-menu-button").forEach((button) => {
    button.addEventListener("click", () => {
      closeAllDropdowns(); // Close all open dropdowns
      document.querySelector(".sidebar").classList.toggle("collapsed"); // Toggle collapsed class on sidebar
    });
  });
  // Collapse sidebar by default on small screens
  if (window.innerWidth <= 1024) document.querySelector(".sidebar").classList.add("collapsed");




  const form = document.querySelector("form");
  form.addEventListener("submit", async (event) => {
      event.preventDefault();
  
      // Get elements by ID for reliability
      const formData = {
          brand: document.getElementById("brand-input").value.trim(),
          audience: document.getElementById("audience-input").value.trim(),
          budget: document.getElementById("budget-input").value.trim(),
          product: document.getElementById("product-input").value.trim(),
          description: document.getElementById("description-textarea").value.trim()
      };
  
      // Basic validation
      if (!formData.brand || !formData.product) {
          alert("Brand and Product Name are required!");
          return;
      }
      if (isNaN(formData.budget) || formData.budget < 0) {
          alert("Please enter a valid budget number");
          return;
      }
  
      try {
          const response = await fetch("http://localhost:3000/ask", {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify(formData),
          });
  
          const data = await response.json();
          if (!response.ok) throw new Error(data.error || "Request failed");
  
          document.getElementById("output").innerText = data.output;
      } catch (error) {
          console.error("Error:", error);
          document.getElementById("output").innerText = error.message;
      }
  });