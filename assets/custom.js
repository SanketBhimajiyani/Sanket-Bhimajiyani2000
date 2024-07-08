document.addEventListener('DOMContentLoaded', function() {
    var hamburger = document.getElementById('hamburger');
    var header = document.getElementById('header-inner');
    var mobileMenu = document.getElementById('mobile-menu');
    var icons = document.querySelectorAll('.grid-box .icon');
    var closeIcons = document.querySelectorAll('.popup-modal .close-icon');
    var body = document.body;
  
    // Hamburger menu toggle
    hamburger.addEventListener('click', function() {
      this.classList.toggle('active');
      header.classList.toggle('active');
      mobileMenu.classList.toggle('active');
    });
  
    // Header sticky on scroll
    window.addEventListener('scroll', function() {
      if (window.scrollY > 100) {
        header.classList.add('sticky');
      } else {
        header.classList.remove('sticky');
      }
    });
  
    // Open popup modal on icon click
    icons.forEach(function(icon) {
      icon.addEventListener('click', function() {
        var targetId = this.getAttribute('data-target');
        var targetModal = document.getElementById(targetId);
        if (targetModal) {
          targetModal.classList.add('open');
          body.classList.add('popup-open');
        } else {
          console.error('No modal found with id: ' + targetId);
        }
      });
    });
  
    // Close popup modal on close icon click
    closeIcons.forEach(function(closeIcon) {
      closeIcon.addEventListener('click', function() {
        var popupModal = this.closest('.popup-modal');
        if (popupModal) {
          popupModal.classList.remove('open');
          body.classList.remove('popup-open');
        }
      });
    });
  
    // Add to cart functionality
    document.addEventListener('DOMContentLoaded', function() {
        var addToCartForms = document.querySelectorAll('.popup-modal form');
      
        addToCartForms.forEach(function(form) {
          form.addEventListener('submit', function(event) {
            event.preventDefault();
      
            var formData = new FormData(form);
            var sizeDropdown = form.querySelector('.size-dropdown');
            var colorSpans = form.querySelectorAll('.color-variant .varaint-box span');
      
            if (!sizeDropdown) {
              console.error('Size dropdown element not found in form:', form);
              console.log('Form inner HTML:', form.innerHTML); // Log the form's inner HTML for debugging
              return; // Exit function if size dropdown is not found
            }
      
            var selectedSize = sizeDropdown.value;
            var selectedColor = '';
      
            // Find selected color
            colorSpans.forEach(function(span) {
              if (span.classList.contains('selected')) {
                selectedColor = span.dataset.color;
              }
            });
      
            var selectedVariantId = '';
      
            // Assuming productVariants is available globally or replace it with your product variants data source
            for (var i = 0; i < productVariants.length; i++) {
              if (productVariants[i].option1 === selectedSize && productVariants[i].option2 === selectedColor) {
                selectedVariantId = productVariants[i].id;
                console.log('Found matching variant ID:', selectedVariantId); // Log matching variant ID to console
                break;
              }
            }
      
            if (!selectedVariantId) {
              console.error('Variant ID not found for selected size and color:', selectedSize, selectedColor);
              return; // Exit function if variant ID not found
            }
      
            // Append size and color selections to formData if needed
            formData.append('properties[Size]', selectedSize);
            formData.append('properties[Color]', selectedColor);
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
      
        // Add event listeners for color selection
        var colorSpans = document.querySelectorAll('.popup-modal .color-variant .varaint-box span');
        colorSpans.forEach(function(span) {
          span.addEventListener('click', function() {
            // Remove 'selected' class from all spans
            colorSpans.forEach(function(otherSpan) {
              otherSpan.classList.remove('selected');
            });
      
            // Add 'selected' class to clicked span
            span.classList.add('selected');
          });
        });
      });
      
      
      
      
      
  });
  