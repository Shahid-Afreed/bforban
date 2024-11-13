function toggleForm(formType) {
    localStorage.setItem('formType', formType);
    // Reload the page
    window.location.reload();
}

// Check the saved form state on page load
window.onload = function() {
    const savedForm = localStorage.getItem('formType');
    
    // If there's a saved form type, show the corresponding form
    if (savedForm === 'create') {
        // Show create account form, hide login form
        document.getElementById('login-form').style.display = 'none';
        document.getElementById('create-account-form').style.display = 'block';
    } else {
        // Show login form by default (or if no formType is saved)
        document.getElementById('login-form').style.display = 'block';
        document.getElementById('create-account-form').style.display = 'none';
    }
}





// rightclick disable
document.addEventListener('contextmenu', function(event) {
    event.preventDefault();  // Disable right-click context menu
});

