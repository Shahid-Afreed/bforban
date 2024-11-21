// -----------------product and all page navbar scripts-----------------

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






    // products-dropdown filter funtionality

    document.addEventListener('DOMContentLoaded', function () {
        // Get the CAPS, T-SHIRTS, and ALL PRODUCTS links
        const capsLink = document.getElementById('capsLink');
        const tshirtLink = document.getElementById('tshirtLink');
        const allProductsLink = document.getElementById('allProductsLink');
        
        // Get all product elements
        const allProducts = document.querySelectorAll('.product-section .row .col-md-4');
        const paginationContainer = document.getElementById('pagination');
        
        const productsPerPage = 6;  // Number of products per page
        let currentPage = getCurrentPageFromURL() || 1;  // Get the page number from the URL or default to 1
        let currentCategory = getCurrentCategoryFromURL() || 'all';  // Default category is 'all'
        
        // Function to get current page from the URL
        function getCurrentPageFromURL() {
            const urlParams = new URLSearchParams(window.location.search);
            return parseInt(urlParams.get('page')) || 1;
        }
    
        // Function to get the current category from the URL
        function getCurrentCategoryFromURL() {
            const urlParams = new URLSearchParams(window.location.search);
            return urlParams.get('category') || 'all';  // Default to 'all' if not provided
        }
    
        // Function to shuffle the products array randomly
        function shuffleArray(arr) {
            for (let i = arr.length - 1; i > 0; i--) {
                const j = Math.floor(Math.random() * (i + 1));
                [arr[i], arr[j]] = [arr[j], arr[i]]; // Swap elements
            }
        }
    
        // Function to shuffle products if 24 hours have passed
        function shuffleProductsIfNeeded() {
            const lastShuffleTime = localStorage.getItem('lastShuffleTime');
            const currentTime = new Date().getTime();
    
            // If last shuffle was more than 24 hours ago or there is no timestamp in localStorage
            if (!lastShuffleTime || currentTime - lastShuffleTime > 24 * 60 * 60 * 1000) {
                // Shuffle the products
                shuffleArray(Array.from(allProducts));
    
                // Store the current time as the last shuffle time in localStorage
                localStorage.setItem('lastShuffleTime', currentTime);
            }
        }
    
        // Function to set the active link for dropdown
        function setActiveLink(link) {
            const links = [capsLink, tshirtLink, allProductsLink];
            links.forEach(l => l.classList.remove('active')); // Remove 'active' from all links
            link.classList.add('active'); // Add 'active' class to the clicked link
        }
    
        // Function to filter and paginate products
        function showProductsForPage(filteredCategoryName, pageNumber) {
            let filteredProducts = [];
    
            // If category is 'all', show all products
            if (filteredCategoryName === 'all') {
                filteredProducts = Array.from(allProducts);  // All products
            } else {
                // Otherwise, filter by specific category (caps or tshirts) based on the 'name' attribute
                filteredProducts = Array.from(allProducts).filter(product => {
                    return product.getAttribute('name') === filteredCategoryName;
                });
            }
    
            const totalFilteredProducts = filteredProducts.length;
            const totalPages = Math.ceil(totalFilteredProducts / productsPerPage);
            
            const startIndex = (pageNumber - 1) * productsPerPage;
            const endIndex = startIndex + productsPerPage;
    
            // Hide all products initially
            allProducts.forEach(product => product.style.display = 'none');
    
            // Show only the filtered products for the current page
            const pageProducts = filteredProducts.slice(startIndex, endIndex);
            pageProducts.forEach(product => product.style.display = 'block');
    
            // Update pagination for filtered products
            updatePagination(totalPages, pageNumber);
        }
    
        // Function to update pagination
        function updatePagination(totalPages, pageNumber) {
            // Clear existing pagination links
            paginationContainer.innerHTML = '';
    
            // Add the Previous button
            const prevPage = document.createElement('li');
            prevPage.classList.add('page-item');
            prevPage.setAttribute('id', 'prev-page');
            prevPage.innerHTML = `
                <a class="page-link-pagination" href="#" aria-label="Previous">
                    <span aria-hidden="true">&laquo;</span>
                </a>
            `;
            paginationContainer.appendChild(prevPage);
    
            // Create page number items dynamically
            for (let i = 1; i <= totalPages; i++) {
                const pageItem = document.createElement('li');
                pageItem.classList.add('page-item');
                if (i === pageNumber) pageItem.classList.add('active');
                pageItem.setAttribute('data-page', i);
                const pageLink = document.createElement('a');
                pageLink.classList.add('page-link-pagination');
                pageLink.setAttribute('href', `?category=${currentCategory}&page=${i}`);
                pageLink.innerText = i;
                pageItem.appendChild(pageLink);
                paginationContainer.appendChild(pageItem);
            }
    
            // Add the Next button
            const nextPage = document.createElement('li');
            nextPage.classList.add('page-item');
            nextPage.setAttribute('id', 'next-page');
            nextPage.innerHTML = `
                <a class="page-link-pagination" href="#" aria-label="Next">
                    <span aria-hidden="true">&raquo;</span>
                </a>
            `;
            paginationContainer.appendChild(nextPage);
    
            // Add event listeners for "Next" and "Previous" buttons
            document.getElementById('prev-page').addEventListener('click', function (e) {
                e.preventDefault();
                if (currentPage > 1) {
                    currentPage--;
                    window.location.search = `?category=${currentCategory}&page=${currentPage}`;
                }
            });
    
            document.getElementById('next-page').addEventListener('click', function (e) {
                e.preventDefault();
                if (currentPage < totalPages) {
                    currentPage++;
                    window.location.search = `?category=${currentCategory}&page=${currentPage}`;
                }
            });
        }
    
        // Initialize pagination and products
        shuffleProductsIfNeeded(); // Shuffle if needed (only once in 24 hours)
        showProductsForPage(currentCategory, currentPage); // Show products based on the category and page
        
        // Make sure the correct link is active on page load
        if (currentCategory === 'all') {
            setActiveLink(allProductsLink);
        } else if (currentCategory === 'caps') {
            setActiveLink(capsLink);
        } else if (currentCategory === 'tshirt') {
            setActiveLink(tshirtLink);
        }
    });
    
    // --------------------------------------------------------------------------------




   



    