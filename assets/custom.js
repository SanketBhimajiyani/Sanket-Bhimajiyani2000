document.addEventListener('DOMContentLoaded', function() {
    var hamburger = document.getElementById('hamburger');
    var header = document.getElementById('header-inner');
    var mobileMenu = document.getElementById('mobile-menu');
    var icons = document.querySelectorAll('.grid-box .icon');
    var closeIcons = document.querySelectorAll('.popup-modal .close-icon');

    hamburger.addEventListener('click', function() {
        this.classList.toggle('active');
        header.classList.toggle('active');
        mobileMenu.classList.toggle('active');
    });

    window.addEventListener('scroll', function () {
        if (window.scrollY > 100) {
            header.classList.add('sticky');
        } else {
            header.classList.remove('sticky');
        }
    });

    icons.forEach(function(icon) {
        icon.addEventListener('click', function() {
            var targetId = this.getAttribute('data-target');
            var targetModal = document.getElementById(targetId);
            if (targetModal) {
                targetModal.classList.add('open');
            } else {
                console.error('No modal found with id: ' + targetId);
            }
        });
    });

    closeIcons.forEach(function(closeIcon) {
        closeIcon.addEventListener('click', function() {
            var popupModal = this.closest('.popup-modal');
            if (popupModal) {
                popupModal.classList.remove('open');
            }
        });
    });

    var addToCartForms = document.querySelectorAll('.popup-modal form');

    addToCartForms.forEach(function(form) {
        var sizeDropdown = form.querySelector('.size-dropdown');

        form.addEventListener('submit', function(event) {
            event.preventDefault();

            var formData = new FormData(form);
            var selectedSize = sizeDropdown.value;
            var selectedVariantId = '';

            console.log('Selected size:', selectedSize); // Log selected size to console

            // Use productVariants variable instead
            for (var i = 0; i < productVariants.length; i++) {
                if (productVariants[i].title === selectedSize) {
                    selectedVariantId = productVariants[i].id;
                    console.log('Found matching variant ID:', selectedVariantId); // Log matching variant ID to console
                    break;
                }
            }

            if (!selectedVariantId) {
                console.error('Variant ID not found for selected size:', selectedSize);
                return; // Exit function if variant ID not found
            }

            formData.set('id', selectedVariantId);

            fetch('/cart/add.js', {
                method: 'POST',
                body: formData,
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                }
            })
            .then(response => response.json())
            .then(data => {
                console.log('Product added to cart:', data); // Log success message to console
                // Optionally update UI to reflect cart changes
            })
            .catch(error => {
                console.error('Error adding product to cart:', error); // Log error message to console
                // Handle errors
            });
        });
    });
});
