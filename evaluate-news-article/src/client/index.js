// import handleSubmit from './js/formHandler'
const handleSubmit = require('./js/formHandler').handleSubmit
// import validateUrl from './js/checkURL'
const validateUrl = require('./js/checkURL').default

// Include scss file here
import './styles/resets.scss'
import './styles/base.scss'
import './styles/form.scss'
import './styles/footer.scss'
import './styles/header.scss'

window.addEventListener('DOMContentLoaded', () => {
    // onsubmit="return Client.handleSubmit(event)"
    // onclick = "return Client.handleSubmit(event)"

    // Get the button for submit
    // var form = document.getElementById('form');
    // debugger;
    // Add event listener to it when the click to call handleSubmit function
    // form.addEventListener('submit', handleSubmit);
    var submitBtn = document.getElementById('submitbtn');
    submitBtn.addEventListener('click', handleSubmit);
})
export { handleSubmit, validateUrl }
