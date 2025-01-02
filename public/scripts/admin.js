document.addEventListener("DOMContentLoaded", () => {
    const notificationBell = document.getElementById("notificationBell");
    const notificationPanel = document.getElementById("notificationPanel");
  
    // Toggle dropdown on icon click
    notificationBell.addEventListener("click", (event) => {
      event.stopPropagation(); // Ngăn click lan ra ngoài
      notificationPanel.style.display =
        notificationPanel.style.display === "block" ? "none" : "block";
    });
  
    // Hide dropdown when clicking outside
    document.addEventListener("click", () => {
      notificationPanel.style.display = "none";
    });
  
    // Prevent dropdown from hiding when clicking inside it
    notificationPanel.addEventListener("click", (event) => {
      event.stopPropagation();
    });
  });
  