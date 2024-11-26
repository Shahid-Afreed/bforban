// login and create account js
function toggleForm(formType) {
    localStorage.setItem('formType', formType);
    window.location.reload();
}

window.onload = function() {
    const savedForm = localStorage.getItem('formType');
    
    if (savedForm === 'create') {
        document.getElementById('login-form').style.display = 'none';
        document.getElementById('create-account-form').style.display = 'block';
    } else {
        document.getElementById('login-form').style.display = 'block';
        document.getElementById('create-account-form').style.display = 'none';
    }
}



// rightclick disable
document.addEventListener('contextmenu', function(event) {
    event.preventDefault();  // Disable right-click context menu
});





// product_description functionalities

const increaseBtn = document.getElementById('increase');
const decreaseBtn = document.getElementById('decrease');
const quantityInput = document.getElementById('quantity');

increaseBtn.addEventListener('click', () => {
  quantityInput.value = parseInt(quantityInput.value) + 1;
});

decreaseBtn.addEventListener('click', () => {
  if (quantityInput.value > 1) {
    quantityInput.value = parseInt(quantityInput.value) - 1;
  }
});

// product_description image change functionality
function changeMainImage(imageSrc) {
    const mainImage = document.getElementById('main-image');
    
    mainImage.src = imageSrc;
}





