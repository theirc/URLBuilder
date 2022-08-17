window.onload = function() {
    const getButton = document.querySelector('#generate-button');
    const getField = document.querySelector('#ms-codes');
    const getInputFields = document.querySelectorAll('.multi-input');
    const concatnated = document.querySelector('#url_codes');
    const getGenErr = document.querySelector('#gen_error_msg');
    const getURL = document.querySelector('#website-url');
    const getCopyButton = document.querySelector('#copy-text');
    const getMarket_Month = document.querySelector('#mktmth');


    let errorMsg = 'whitespace not allowed';
    let errorMsg2 = 'This field is required';
    let errorMsg3 = 'Please fix all error(s) and click on "Generate URL" button';
    let errorMsg4 = 'MS-Code must end with an underscore';

    // concatenation formula
    const calcResult = function(fieldValues) {
        for(let i = 0; i < fieldValues.length; i++) {
            concat =  fieldValues[0].value + "?" + "ms=" + fieldValues[1].value + fieldValues[2].value + fieldValues[3].value + "&" + "initialms=" + fieldValues[1].value + fieldValues[2].value + fieldValues[3].value;

            if(fieldValues[4].value) {
                concat += ("&utm_medium=" + fieldValues[4].value);
            }
            if(fieldValues[5].value) {
                concat += ("&utm_source=" + fieldValues[5].value);
            }
            if(fieldValues[6].value) {
                concat += ("&utm_campaign=" + fieldValues[6].value);
            }
            if(fieldValues[7].value) {
                concat += ("&utm_content=" + fieldValues[7].value);
            }

            return concat;
        }
    }


    // Check for white space(s) in input fields
    function checkWhiteSpace(str) {
        return /\s/.test(str);
    }

    // Input validation(s)
    const inputInvalid = function(el) {
        el.nextElementSibling.style.display = 'block';
        if(el.classList.contains('valid')) {
            el.classList.remove('valid');
        }
        el.classList.add('invalid');
    }

    const inputValid = function(el) {
        el.nextElementSibling.style.display = 'none';
        el.nextElementSibling.innerHTML = '';
        if(el.classList.contains('invalid')) {
            el.classList.remove('invalid');
        }
        el.classList.add('valid')
    }

    const restoreDefault = function(el) {
        el.nextElementSibling.style.display = 'none';
        el.nextElementSibling.innerHTML = '';
        if(el.classList.contains('valid')) {
            el.classList.remove('valid');
        }

        if(el.classList.contains('invalid')) {
            el.classList.remove('invalid');
        }
    }

    // Auto populate market and month
    const month = ['jan', 'feb', 'mar', 'apr', 'may', 'jun', 'jul', 'aug', 'sep', 'oct', 'nov', 'dec'];
    const getDate = new Date();
    let getCurrentMonth = month[getDate.getMonth()];
    let getMarketField = document.querySelector('#market-month');
    console.log(getCurrentMonth)
    getMarket_Month.addEventListener('change', function() {
        console.log(getMarket_Month.value + "_" + getCurrentMonth);
        getMarketField.value = getMarket_Month.value + "_" + getCurrentMonth;
    })

    // getField.addEventListener('input', function() {
    //     const getValue = getField.value;
    //     const getSibling = getField.nextElementSibling;
    //     if(checkWhiteSpace(getValue) == true) {
    //         if(getSibling.classList.contains('error_msg')) {
    //             inputInvalid(getField);
    //         }
    //     } 
    //     else if(checkWhiteSpace(getValue) == false) {
    //         if(getValue != '') {
    //             inputValid(getField);
    //         }
    //         else if(getValue == ""){
    //             restoreDefault(getField);
    //         }
    //     }
    // });

    for(let i = 0; i < getInputFields.length; i++) {
        getInputFields[i].addEventListener('input', function() {
            const getValue = getInputFields[i].value;
            const getSibling = getInputFields[i].nextElementSibling;
            if(checkWhiteSpace(getValue) == true) {
                if(getSibling.classList.contains('error_msg')) {
                    inputInvalid(getInputFields[i]);
                    getInputFields[i].nextElementSibling.innerHTML = errorMsg;
                    getGenErr.innerHTML = errorMsg3;
                }
            }
            else if(checkWhiteSpace(getValue) == false) {
                if(getValue != '') {
                    inputValid(getInputFields[i]);
                }
                else if(getValue == '') {
                    restoreDefault(getInputFields[i])
                }
            }
        })
    }

    // ms-code custom input validation

    getField.addEventListener('input', function() {
        let customInput = getField.value;
        if(customInput.endsWith('_')) {
            inputValid(getField);
        } else {
            inputInvalid(getField);
            getField.nextElementSibling.innerHTML = errorMsg4
        }
    })

    // Required fields validation
    const validateRequired = function() {
        let empty = 0;
        for (let i = 0; i < getInputFields.length; i++) {
            if(getInputFields[i].hasAttribute('required') && getInputFields[i].value == '') {
                empty++;
            }
        }
        if(empty == 0) {
            return true;
        } else {
            for (let i = 0; i < getInputFields.length; i++) {
                if(getInputFields[i].hasAttribute('required') && getInputFields[i].value == '') {
                    inputInvalid(getInputFields[i]);
                    getInputFields[i].nextElementSibling.innerHTML = errorMsg2;
                }
            }
        }
    }

    
    const validateAll = function() {
        let notValid = 0;
        for(let i = 0; i <getInputFields.length; i++) {
            if(getInputFields[i].classList.contains('invalid')) {
                notValid++;
            }
        }
        if(notValid == 0) {
            return true;
        } else {
            // alert('fix errors');
            getGenErr.innerHTML = errorMsg3;
        }
    }

    getButton.addEventListener('click', function() {
        let result = '';
  
        if(validateRequired()){
            if(validateAll()) {

                result = calcResult(getInputFields);
                concatnated.innerHTML = result;
                getCopyButton.style.display = 'block';
                getGenErr.innerHTML = '';
            } else {
                // console.log('err2')
                getGenErr.innerHTML = errorMsg3;
            }
        } else {
            // console.log('err1')
            getGenErr.innerHTML = errorMsg3;
        }

    });

    // Drop down options
    const getDropDown = document.querySelector('#adsets');
    const getMsCode = document.querySelector('#ms-codes');

    getDropDown.addEventListener('change', function() {
        let optionText = getDropDown.options[getDropDown.selectedIndex].text;
        let optionValue = getDropDown.value;


        getMsCode.setAttribute('value', optionValue);
        getMsCode.removeAttribute('required');
        if(getMsCode.classList.contains('invalid')) {
            getMsCode.classList.remove('invalid');
            getMsCode.nextElementSibling.innerHTML = '';
            getMsCode.nextElementSibling.style.display = 'none';
        }

        if(optionText === 'Custom mscode') {
            getMsCode.removeAttribute('readonly');
            getMsCode.setAttribute('required', '');
        } else {
            getMsCode.setAttribute('readonly', 'yes');
        }
    });

    //URL validation
    function isValidURL(string) {
        var res = string.match(/(http(s)?:\/\/.)?(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/g);
        return (res !== null)
    };


    getURL.addEventListener('input', function() {
        let getUrlValue = getURL.value;

        if(isValidURL(getUrlValue) == true) {
            if(getURL.classList.contains('invalid')) {
                getURL.classList.remove('invalid');
            }

            if(!getURL.classList.contains('valid')) {
                getURL.classList.add('invalid');
            }
        }

        if(isValidURL(getUrlValue) !== true) {
            if(getURL.classList.contains('valid')) {
                getURL.classList.remove('valid');
                getURL.classList.add('invalid');
                getURL.nextElementSibling.innerHTML = 'The website URL provided is not a valid URL.';
                getURL.nextElementSibling.style.display = 'block'
            }
        }
    });

    // Copy generated link

    getCopyButton.addEventListener('click', function() {
        const initialText = 'Copy';
        concatnated.select();
        concatnated.setSelectionRange(0, 999999); //For mobile devices
        navigator.clipboard.writeText(concatnated.textContent);
        

        if(getCopyButton.textContent.toLowerCase().includes(initialText.toLowerCase())) {
            getCopyButton.textContent = 'Copied'
        } else {
            getCopyButton.textContent = initialText;
        }
    });

    getCopyButton.addEventListener('mouseout', function() {
        const initialText = 'Copied';

        if(getCopyButton.textContent.toLowerCase().includes(initialText.toLowerCase())) {
            getCopyButton.textContent = 'Copy'
        } 
    })
    
}