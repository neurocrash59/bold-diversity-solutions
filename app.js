AOS.init();

const acceptTermsCheckbox = document.querySelector('#acceptTermsCheck');

acceptTermsCheckbox.addEventListener('click', function () {
    document.querySelector('#acceptTermsBtn').disabled = false;
})