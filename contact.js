const contactForm = document.querySelector('#contactForm');

contactForm.addEventListener('submit', function (e) {
    e.preventDefault();
    alert('Submitted!');
})