$(document).ready(function() {
    const $searchIcon = $('.search-icon');
    const $searchInput = $('.search-input');
    const $personIcon = $('.person-icon');
    let isOpen = false;

    $searchIcon.click(function(e) {
        e.preventDefault();
        isOpen = !isOpen;
        
        if (isOpen) {
            $searchInput.addClass('active').focus();
            $personIcon.css('margin-right', '200px'); // Match the input width
        } else {
            $searchInput.removeClass('active');
            $personIcon.css('margin-right', '0');
        }
    });

    // Close search when clicking outside
    $(document).click(function(e) {
        if (!$(e.target).closest('.nav-item-group').length) {
            $searchInput.removeClass('active');
            $personIcon.css('margin-right', '0');
            isOpen = false;
        }
    });
});