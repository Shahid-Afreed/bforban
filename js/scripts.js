// -----------------product scripts-----------------

// menu dropdown
document.addEventListener('click', function (event) {
    const isDropdownButton = event.target.matches('.dropdown-toggle');
    const dropdownMenus = document.querySelectorAll('.dropdown-menu');

    // Close all dropdown menus when clicking outside
    dropdownMenus.forEach(menu => {
        if (!menu.contains(event.target) && !event.target.matches('.dropdown-toggle')) {
            menu.style.display = 'none';
        }
    });

    // If a dropdown button is clicked, close all other dropdowns before opening the clicked one
    if (isDropdownButton) {
        dropdownMenus.forEach(menu => {
            menu.style.display = 'none'; // Close all dropdown menus first
        });

        const dropdownMenu = event.target.nextElementSibling;

        // Open the clicked dropdown menu
        dropdownMenu.style.display = dropdownMenu.style.display === 'block' ? 'none' : 'block';
        event.preventDefault();
    }

    // Close the dropdown menu and set active class on the clicked link
    if (event.target.matches('.dropdown-menu a')) {
        const parentMenu = event.target.closest('.dropdown-menu');
        if (parentMenu) {
            parentMenu.style.display = 'none';
        }

        // Remove active class from all links
        document.querySelectorAll('.dropdown-menu a').forEach(link => {
            link.classList.remove('active');
        });

        // Add active class to the clicked link
        event.target.classList.add('active');
    }
});

// Close all dropdowns when resizing the window
window.addEventListener('resize', () => {
    document.querySelectorAll('.dropdown-menu').forEach(menu => {
        menu.style.display = 'none';
    });
});




// fade-up when page loads
    window.addEventListener('load', () => {
        document.querySelectorAll('.fade-up').forEach(element => {
            element.classList.add('fade-up');
        });
    });


//  JavaScript for Search icon Modal Functionality
    const openModalButton = document.getElementById('openModal'); 
    const closeModalButton = document.getElementById('closeModal');
    const searchModal = document.getElementById('searchModal');

    openModalButton.addEventListener('click', function(event) {
        event.preventDefault();
        searchModal.style.display = 'flex';
    });

    closeModalButton.addEventListener('click', function() {
        searchModal.style.display = 'none';
    });

    window.addEventListener('click', function(event) {
        if (event.target === searchModal) {
            searchModal.style.display = 'none';
        }
    });

    

    // product-section
const productsPerPage = 6; // Adjust this as needed
const totalProducts = document.querySelectorAll('.product-section .row .col-md-4').length;
const totalPages = Math.ceil(totalProducts / productsPerPage);

// Get the pagination element
const paginationContainer = document.getElementById('pagination');
let currentPage = 1;  // Initialize the current page

// Function to show the correct products based on the current page
function showProductsForPage(pageNumber) {
  const startIndex = (pageNumber - 1) * productsPerPage;
  const endIndex = startIndex + productsPerPage;

  // Hide all product cards
  const productCards = document.querySelectorAll('.product-section .row .col-md-4');
  productCards.forEach(card => card.style.display = 'none');

  // Show the product cards for the current page
  const pageProducts = Array.from(productCards).slice(startIndex, endIndex);
  pageProducts.forEach(card => card.style.display = 'block');

  // Update active pagination link
  const pageLinks = document.querySelectorAll('.page-item');
  pageLinks.forEach(link => link.classList.remove('active'));
  const activeLink = document.querySelector(`.page-item[data-page="${pageNumber}"]`);
  if (activeLink) activeLink.classList.add('active');
}

// Function to create pagination links dynamically
function createPagination() {
  for (let i = 1; i <= totalPages; i++) {
      const pageItem = document.createElement('li');
      pageItem.classList.add('page-item');
      pageItem.setAttribute('data-page', i);
      const pageLink = document.createElement('a');
      pageLink.classList.add('page-link-pagination');
      pageLink.setAttribute('href', '#');
      pageLink.innerText = i;

      pageItem.appendChild(pageLink);
      paginationContainer.insertBefore(pageItem, document.getElementById('next-page'));  // Insert before the forward arrow

      // Add click event listener to each pagination link
      pageLink.addEventListener('click', function (e) {
          e.preventDefault();
          currentPage = i;  // Set current page to the clicked page
          showProductsForPage(i);
      });
  }
}

// Function to go to the next page
function goToNextPage() {
  if (currentPage < totalPages) {
      currentPage++;
      showProductsForPage(currentPage);
  }
}

// Function to go to the previous page
function goToPreviousPage() {
  if (currentPage > 1) {
      currentPage--;
      showProductsForPage(currentPage);
  }
}

// Add event listeners to the next and previous arrows
document.getElementById('next-page').addEventListener('click', function (e) {
  e.preventDefault();
  goToNextPage();
});

document.getElementById('prev-page').addEventListener('click', function (e) {
  e.preventDefault();
  goToPreviousPage();
});

// Initialize the pagination
createPagination();

// Show the products for the first page initially
showProductsForPage(1);






// account page login and create form js

function toggleForm(formType) {
    if (formType === 'create') {
        // Show create account form, hide login form
        document.getElementById('login-form').style.display = 'none';
        document.getElementById('create-account-form').style.display = 'block';
    } else if (formType === 'login') {
        // Show login form, hide create account form
        document.getElementById('login-form').style.display = 'block';
        document.getElementById('create-account-form').style.display = 'none';
    }
}