// mobile-menu JS
document.addEventListener('DOMContentLoaded', function() {
    var hamburger = document.getElementById('hamburger');
    var header = document.getElementById('header-inner');
    var mobileMenu = document.getElementById('mobile-menu');
    var icons = document.querySelectorAll('.grid-box .icon');
    var popupmodal = document.getElementById('popup-modal')

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
        })
        // Array.prototype.forEach.call(icons,
        //     function(icon) {
        //     icons.addEventListener('click', function() {
        //         console.log('clicked')
        //         popupmodal.classList.add('open');
        //     })
        // })
        icons.forEach(function(icon) {
            icon.addEventListener('click', function() {
                popupmodal.classList.add('open');
            })
        })
    });