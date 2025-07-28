window.onload = function() {
    const getFullUrl = document.querySelector('#full-url');
    let getURLInput = document.querySelector('#main-url');

    const getFiscalYear = document.querySelector('#fsyear');
    let getFiscalYearInput = document.querySelector('#fiscal_year');

    const getMarketSourceCode = document.querySelector('#market-source-code');
    let getMarketSourceCodeInput = document.querySelector('#marketSourceCode');

    const getMarket = document.querySelector('#mkt');
    let getMarketInput = document.querySelector('#marketfield');

    const getEmailType = document.querySelector('#emailType');
    let getEmailTypeInput = document.querySelector('#email_type');

    const getNameOfCreative = document.querySelector('#name_of_creative');
    let getNameofCreativeInput = document.querySelector('#creative_name');

    const getMonth = document.querySelector('#month');
    let getMonthInput = document.querySelector('#gen_month');

    const getEmailVersion = document.querySelector('#email_version');
    let getEmailVersionInput = document.querySelector('#emailVersion');

    const getAudienceSegment = document.querySelector('#audience_segment');
    const getAudienceSegmentInput = document.querySelector('#audienceSegment');

    const getATV = document.querySelector('#additional_testing_variants');
    let getATVInput = document.querySelector('#adv');

    const getGenBtn = document.querySelector('#btn_generate_url');

    const getInputfields = document.querySelectorAll('.fieldValue');

    const getMainInput = document.querySelectorAll('.input-text');

    const getPickLists = document.querySelectorAll('.pick-list');

    const getAllInputEl = document.querySelectorAll('.req');

    const getGenErr = document.querySelector("#gen_error_msg");


    
  let errorMsg = "whitespace not allowed";
  let errorMsg2 = "This field is required";
  let errorMsg3 = 'Please fix all error(s) and click on "Generate URL" button';
  let savedUrlMsg = "Generated Email URL and Pardot Email name have been saved";

  history.scrollRestoration = "manual";
  window.onbeforeunload = function () {
    window.scrollTo(0, 0);
  };

  //Back to top button
  const backToTop = document.querySelector('#backToTop');
  
  window.addEventListener('scroll', function() {
    if(window.scrollY > 20) {
    // if(document.body.scrollTop > 2 || document.documentElement.scrollTop > 2) {
      backToTop.style.display = 'block';
    } else {
      backToTop.style.display = 'none';
    }
  });

  backToTop.addEventListener('click', function() {
    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });
  });

// Check for white space(s) in input fields
function checkWhiteSpace(str) {
    return /\s/.test(str);
}

// Check for white space(s) in input fields
function checkWhiteSpace(str) {
return /\s/.test(str);
}

// Input validation(s)
  const inputInvalid = function (el) {
    el.nextElementSibling.style.display = "block";
    if (el.classList.contains("valid")) {
      el.classList.remove("valid");
    }
    el.classList.add("invalid");
  };

  const inputValid = function (el) {
    el.nextElementSibling.style.display = "none";
    el.nextElementSibling.innerHTML = "";
    if (el.classList.contains("invalid")) {
      el.classList.remove("invalid");
    }
    el.classList.add("valid");
  };

  const restoreDefault = function (el) {
    el.nextElementSibling.style.display = "none";
    el.nextElementSibling.innerHTML = "";
    if (el.classList.contains("valid")) {
      el.classList.remove("valid");
    }

    if (el.classList.contains("invalid")) {
      el.classList.remove("invalid");
    }
  };

  const hiddenInputValidate = function (el) {
    el.removeAttribute("required");
    if (el.classList.contains("invalid")) {
      el.classList.remove("invalid");
      el.nextElementSibling.innerHTML = "";
      el.nextElementSibling.style.display = "none";
    }
  };

    // Required fields validation
  const validateRequired = function () {
    let empty = 0;
    for (let i = 0; i < getAllInputEl.length; i++) {
      if (
        getAllInputEl[i].hasAttribute("required") &&
        getAllInputEl[i].value == ""
      ) {
        empty++;
      }
    }
    if (empty == 0) {
      return true;
    } else {
      for (let i = 0; i < getAllInputEl.length; i++) {
        if (
            getAllInputEl[i].hasAttribute("required") &&
            getAllInputEl[i].value == ""
        ) {
          inputInvalid(getAllInputEl[i]);
          getAllInputEl[i].nextElementSibling.innerHTML = errorMsg2;
        }
      }
    }
  };

  
  for (let i = 0; i < getMainInput.length; i++) {
    getMainInput[i].addEventListener("input", function () {
      const getValue = getMainInput[i].value;
      const getSibling = getMainInput[i].nextElementSibling;

      if(getMainInput[i].getAttribute('id') == 'name_of_creative') {
        return;
      }

      if (checkWhiteSpace(getValue) == true) {
        if (getSibling.classList.contains("error_msg")) {
          inputInvalid(getMainInput[i]);
          getMainInput[i].nextElementSibling.innerHTML = errorMsg;
        }
      } else if (checkWhiteSpace(getValue) == false) {
        if (getValue != "") {
          inputValid(getMainInput[i]);
        } else if (getValue == "") {
          restoreDefault(getMainInput[i]);
        }
      }
    });
  }

  getNameOfCreative.addEventListener('input', function() {
    let fieldValue = getNameOfCreative.value;
    if(fieldValue || fieldValue !== null || fieldValue !== '') {
        if(getNameOfCreative.classList.contains('invalid')) {
            getNameOfCreative.classList.remove('invalid');
            getNameOfCreative.classList.add('valid');
            getNameOfCreative.nextElementSibling.innerHTML = '';
            getNameOfCreative.nextElementSibling.style.display = 'none';
        } else {
          getNameOfCreative.classList.add('valid');
        }
    }
  });

  // Prevent dashes in Name of Creative field
  getNameOfCreative.addEventListener('input', function() {
    let fieldValue = getNameOfCreative.value;
    let NewfieldValue = '';
    if(fieldValue.includes('-')) {
      NewfieldValue = fieldValue.replace(/-/g, ' ');
      getNameOfCreative.value = NewfieldValue;
      getNameOfCreative.nextElementSibling.innerHTML = 'Caution: Dashes are not allowed in this field and will be automatically replaced by a space';
      getNameOfCreative.nextElementSibling.style.display = 'block';
      setTimeout(() => {
        getNameOfCreative.nextElementSibling.innerHTML = '';
      getNameOfCreative.nextElementSibling.style.display = 'none';
      }, 3000);
    }
  })

  // Validation for required drop down options
  for(let i = 0; i < getPickLists.length; i++) {
    getPickLists[i].addEventListener('change', function(event) {
        let selectedValue = event.target.value;
        let getSiblingElement = getPickLists[i].nextElementSibling;
        let getID = getPickLists[i].getAttribute('id');
        if(getID !== 'additional_testing_variants') {
            if(selectedValue === '') {
                inputInvalid(getPickLists[i]);
                getSiblingElement.innerHTML = errorMsg2;
    
            }
    
            if(selectedValue !== '') {
                inputValid(getPickLists[i]);
                getSiblingElement.innerHTML = '';
            }
        }
         

    })
  }


    // Populate input fields
    const populateTextInputValue = function(p1, p2) {
        p1.addEventListener('input', function() {
            p2.value = p1.value;
        });
    };


   const populateDropDownValue = function(p1, p2) {
    p1.addEventListener('change', function(event) {
        const selectedValue = event.target.value;
        if(selectedValue || selectedValue !== null || selectedValue !== '') {
            p2.value = selectedValue
        }
    });
   }


    populateTextInputValue(getFullUrl, getURLInput);

    populateDropDownValue(getFiscalYear, getFiscalYearInput);

    populateDropDownValue(getMarketSourceCode, getMarketSourceCodeInput);

    populateDropDownValue(getMarket, getMarketInput);

    populateDropDownValue(getEmailType, getEmailTypeInput);

    populateTextInputValue(getNameOfCreative, getNameofCreativeInput);

    populateDropDownValue(getMonth, getMonthInput);

    populateDropDownValue(getEmailVersion, getEmailVersionInput);

    populateDropDownValue(getAudienceSegment, getAudienceSegmentInput);

    populateDropDownValue(getATV, getATVInput);

    // Get input fields
    // const getInputfields = document.querySelectorAll('.fieldValue');

    const calcUrlResults = function(fields) {
        for(let i = 0; i < fields.length; i++) {
            concat = 
            fields[0].value +
            "?" +
            "ms=" +
            fields[1].value +
            "_" +
            fields[2].value +
            "_" +
            fields[3].value +
            "_" +
            fields[6].value +
            fields[7].value +
            fields[8].value +
            "&" +
            "utm_medium=email" +
            "&" +
            "utm_source=pardot" +
            "&" +
            "utm_campaign=" +
            fields[2].value;

            if(fields[9].value) {
            //    concat = concat + fields[9].value;
            //    concat += fields[9].value;
                concat = 
                fields[0].value +
                "?" +
                "ms=" +
                fields[1].value +
                "_" +
                fields[2].value +
                "_" +
                fields[3].value +
                "_" +
                fields[6].value +
                fields[7].value +
                fields[8].value +
                fields[9].value +
                "&" +
                "utm_medium=email" +
                "&" +
                "utm_source=pardot" +
                "&" +
                "utm_campaign=" +
                fields[2].value;
            }
            return concat;
        }
    }

    const calcEmailResults = function(fields) {
        const getFY = document.querySelector('#fsyear');
        const getSelectedIndex = getFY.selectedIndex;
        const getSelectedOption = getFY.options[getSelectedIndex];
        const getSelectedText = getSelectedOption.text;

        for(let i = 0; i < fields.length; i++) {
            concat = 
            getSelectedText +
            " - " +
            fields[6].value +
            fields[7].value +
            fields[8].value +
            " - " +
            fields[4].value +
            " - " +
            fields[5].value;

            if(fields[9].value) {
                // concat += " - " + fields[9].value;
                concat = 
                getSelectedText +
                " - " +
                fields[6].value +
                fields[7].value +
                fields[8].value +
                fields[9].value +
                " - " +
                fields[4].value +
                " - " +
                fields[5].value;
            }
            return concat;
        }
    }

    let getUrlResult = document.querySelector('#urloutput');
    let getEmailResult = document.querySelector('#emailoutput');
    let getUrlNote = document.querySelector('.url-save-note');
    let saveButton = document.querySelector("#save-button");
    let getInputName = document.querySelector('#save-input-name');
    let getResetNote = document.querySelector('.reset-note');
    let getCopyBtn = document.querySelector('#copy-text');
    let getCopyBtn2 = document.querySelector('#emailnameCopy');

    getGenBtn.addEventListener('click', function() {
        let urlResult = '';
        let emailResult = '';
        if(validateRequired()) {
            urlResult = calcUrlResults(getInputfields);
            emailResult = calcEmailResults(getInputfields);

            // console.log(urlResult);
            getUrlResult.value = urlResult;
            getEmailResult.value = emailResult;
            getUrlNote.style.display = "block";
            saveButton.style.display = 'block';
            getInputName.style.display = 'block';
            getResetNote.style.display = 'block';
            getCopyBtn.style.display = 'block';
            getCopyBtn2.style.display = 'block';
            getUrlResult.focus();

        } else {
            // alert('error');
          window.scrollTo({
            top: 0,
            behavior: 'smooth'
          });
          getGenErr.innerHTML = errorMsg3;
        }
        

    });
    // calcResults(getInputfields);


    //URL validation
    function isValidURL(string) {
        var res = string.match(
        /(http(s)?:\/\/.)?(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/g
        );
        return res !== null;
    }
    

    getFullUrl.addEventListener("input", function () {
        let getUrlValue = getFullUrl.value;
    
        if (isValidURL(getUrlValue) == true) {
          if (getFullUrl.classList.contains("invalid")) {
            getFullUrl.classList.remove("invalid");
          }
    
          if (!getFullUrl.classList.contains("valid")) {
            getFullUrl.classList.add("invalid");
          }
        }
    
        if (isValidURL(getUrlValue) !== true) {
          if (getFullUrl.classList.contains("valid")) {
            getFullUrl.classList.remove("valid");
            getFullUrl.classList.add("invalid");
            getFullUrl.nextElementSibling.innerHTML =
              "The website URL provided is not a valid URL.";
              getFullUrl.nextElementSibling.style.display = "block";
          }
        }
    });


    // Copy generated link

    getCopyBtn.addEventListener("click", function () {
    const initialText = "Copy URL for Email";
    getUrlResult.select();
    getUrlResult.setSelectionRange(0, 999999); //For mobile devices
    // navigator.clipboard.writeText(getUrlResult.textContent);
    navigator.clipboard.writeText(getUrlResult.value);

    if (
      getCopyBtn.textContent
        .toLowerCase()
        .includes(initialText.toLowerCase())
    ) {
      getCopyBtn.textContent = "Email URL Copied";
    } else {
      getCopyBtn.textContent = initialText;
    }
  });

  getCopyBtn.addEventListener("mouseout", function () {
    const initialText = "Email URL Copied";

    if (
      getCopyBtn.textContent
        .toLowerCase()
        .includes(initialText.toLowerCase())
    ) {
      getCopyBtn.textContent = "Copy URL for Email";
    }
  });


    // Copy Pardot Email Name

    getCopyBtn2.addEventListener("click", function () {
    const initialText = "Copy Pardot Email Name";
    getEmailResult.select();
    getEmailResult.setSelectionRange(0, 999999); //For mobile devices
    // navigator.clipboard.writeText(getUrlResult.textContent);
    navigator.clipboard.writeText(getEmailResult.value);

    if (
      getCopyBtn2.textContent
        .toLowerCase()
        .includes(initialText.toLowerCase())
    ) {
      getCopyBtn2.textContent = "Pardot Email Name Copied";
    } else {
      getCopyBtn2.textContent = initialText;
    }
  });

  getCopyBtn2.addEventListener("mouseout", function () {
    const initialText = "Pardot Email Name Copied";

    if (
      getCopyBtn2.textContent
        .toLowerCase()
        .includes(initialText.toLowerCase())
    ) {
      getCopyBtn2.textContent = "Copy Pardot Email Name";
    }
  });

    const scriptURL_MMUS = "https://script.google.com/macros/s/AKfycbzTVSI115lpjR2dTpy5HOcrzX31AADmFncgKE9Jq76Pr03VH9NRXGEILee3O-IgG1OM0A/exec";
    const scriptURL_UK = "https://script.google.com/macros/s/AKfycbymlyKNYy1Ru9XSkp1n-qhY3OH2rztv0xFq5x4iQKUxAC-KXi9ZwVoKH8WIaCss2gMu8g/exec";
    const scriptURL_SK = "https://script.google.com/macros/s/AKfycbwOsNTpHU1-sDjASV2MYUTdYKzYPT0Kbn9AhbvYfvd8qN1wzYzZMVaViMG05LdQRvDoZg/exec";
    const scriptURL_RM = "https://script.google.com/macros/s/AKfycbwb9BT5n7o970p2rMd4XbWh7rSz0d5FcQysP1YgLcUzc7Daln3YFogGrfHFYKP41yH9jQ/exec";
    const scriptURL_DE = "https://script.google.com/macros/s/AKfycbzuT-fdusmmzJU66NUce0D2yT0rnxvoIePsJLz3vTmSLMEXOjXxdypBnpbIp_vL3x68hw/exec";
    const scriptURL_SE = "https://script.google.com/macros/s/AKfycbwHi4Xwtja69aPN02JI_OhKTRJPURUIQ7QVd2Hu2UV9Koax77wDf76CqWgeA1ir4s7JvA/exec";
    const form = document.querySelector("#submit-to-google-sheet");
    const getlabel = document.querySelector("#url_saved_message");
    // const getMarketEmail = document.querySelector("#mkt");
    


    form.addEventListener("submit", (e) => {
      saveButton.disabled = true;
      e.preventDefault();
      const getMarketEmail = document.querySelector("#mkt");
      if (getMarketEmail.value == "us") {
        fetch(scriptURL_MMUS, { method: "POST", body: new FormData(form) })
          .then((response) => {
            saveButton.disabled = false;
            getlabel.innerHTML = savedUrlMsg;
            setTimeout(() => {
              getlabel.style.display = "none";
            }, 5000);
            setTimeout(() => {
              window.location.reload();
            }, 3000);
          })
          .catch((error) => {
            console.error("Error", error.message);
            saveButton.disabled = false;
          });
      } 
      else if (getMarket.value == "uk") {
        fetch(scriptURL_UK, { method: "POST", body: new FormData(form) })
          .then((response) => {
            saveButton.disabled = false;
            getlabel.innerHTML = savedUrlMsg;
            setTimeout(() => {
              getlabel.style.display = "none";
            }, 5000);
            setTimeout(() => {
              window.location.reload();
            }, 3000);
          })
          .catch((error) => {
            console.error("Error", error.message);
            saveButton.disabled = false;
          });
      } 
      else if (getMarket.value == "sk") {
        fetch(scriptURL_SK, { method: "POST", body: new FormData(form) })
          .then((response) => {
            saveButton.disabled = false;
            getlabel.innerHTML = savedUrlMsg;
            setTimeout(() => {
              getlabel.style.display = "none";
            }, 5000);
            setTimeout(() => {
              window.location.reload();
            }, 3000);
          })
          .catch((error) => {
            console.error("Error", error.message);
            saveButton.disabled = false;
          });
      } 
      else if (getMarket.value == "rm") {
        fetch(scriptURL_RM, { method: "POST", body: new FormData(form) })
          .then((response) => {
            saveButton.disabled = false;
            getlabel.innerHTML = savedUrlMsg;
            setTimeout(() => {
              getlabel.style.display = "none";
            }, 5000);
            setTimeout(() => {
              window.location.reload();
            }, 3000);
          })
          .catch((error) => {
            console.error("Error", error.message);
            saveButton.disabled = false;
          });
      } 
      else if (getMarket.value == "de") {
        fetch(scriptURL_DE, { method: "POST", body: new FormData(form) })
          .then((response) => {
            saveButton.disabled = false;
            getlabel.innerHTML = savedUrlMsg;
            setTimeout(() => {
              getlabel.style.display = "none";
            }, 5000);
            setTimeout(() => {
              window.location.reload();
            }, 3000);
          })
          .catch((error) => {
            console.error("Error", error.message);
            saveButton.disabled = false;
          });
      } 
      else {
        fetch(scriptURL_SE, { method: "POST", body: new FormData(form) })
          .then((response) => {
            saveButton.disabled = false;
            getlabel.innerHTML = savedUrlMsg;
            setTimeout(() => {
              getlabel.style.display = "none";
            }, 5000);
            setTimeout(() => {
              window.location.reload();
            }, 3000);
          })
          .catch((error) => {
            console.error("Error", error.message);
            saveButton.disabled = false;
          });
      }
    });
};


