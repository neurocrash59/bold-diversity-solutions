window.onload = function () {
    verifyTermsAgreedLS();
    verifyTermsAgreedCookie();
    gdpr();
}
AOS.init();



// Adds verification checkbox is user is in the EU

const acceptTermsCheckbox = document.querySelector('#acceptTermsCheck');
const acceptTermsBtn = document.querySelector('#acceptTermsBtn');
const gdprBox = document.querySelector('#gdprBox');

const offset = new Date().getTimezoneOffset();
// 0 is GMT and - 120 is Finland - 
// It should catch all the EU - However it also catches most of Africa so use it carefully!

function gdpr() {
    if (1 > offset && offset > -130) {
        gdprBox.hidden = false;
        acceptTermsButton.disabled = true;
        // Add click event to terms checkbox that enables the "agree" button to be pressed
        acceptTermsCheckbox.addEventListener('click', function () {
            acceptTermsCheckbox.disabled = false;
        })
    }
}




// Upon "agreeing" to the site terms, store either a localStorage key or a cookie, depending on whether the user's browser is localStorage capable
const clickwrap = document.querySelector('#clickwrap');
const clickwrapAlert = document.querySelector('#clickwrapAlert');

clickwrap.onsubmit = function () {
    if (typeof (Storage) !== "undefined") {
        window.localStorage.setItem('awamLlcAgreement', 'I knowingly and willingly agreed to accept the Bold Diversity Solutions (Aqua Wealth & Media LLC) Privacy Policy, Terms of Use, and Disclaimer.');
    } else {
        e.preventDefault();

        let today = new Date();
        let expiry = new Date(today.getFullYear() + 1);

        document.cookie = 'awamLlcAgreementCookie=accaptedAgreement; expires=' + expiry.toUTCString();
    }
}


// Check to see if either a localStorage key or cookie exists from agreeing to the site terms
function verifyTermsAgreedLS() {
    if (!localStorage.getItem('awamLlcAgreement')) {
        // Do nothing
    } else {
        clickwrapAlert.hidden = true;
    }
}

function verifyTermsAgreedCookie() {
    if (document.cookie.indexOf('awamLlcAgreementCookie=') > -1) {
        clickwrapAlert.hidden = true;
    }
}