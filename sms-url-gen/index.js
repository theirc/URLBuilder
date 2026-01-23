window.onload = function () {
  const getFullUrl = document.querySelector("#full-url");
  let getURLInput = document.querySelector("#main-url");

  const getFiscalYear = document.querySelector("#fsyear");
  let getFiscalYearInput = document.querySelector("#fiscal_year");

  const getMarketSourceCode = document.querySelector("#market-source-code");
  let getMarketSourceCodeInput = document.querySelector("#marketSourceCode");

  const getMarket = document.querySelector("#mkt");
  let getMarketInput = document.querySelector("#marketfield");

  const getEmailType = document.querySelector("#emailType");
  let getEmailTypeInput = document.querySelector("#email_type");

  const getNameOfCreative = document.querySelector("#name_of_creative");
  let getNameofCreativeInput = document.querySelector("#creative_name");

  const getMonth = document.querySelector("#month");
  let getMonthInput = document.querySelector("#gen_month");

  const getEmailVersion = document.querySelector("#email_version");
  let getEmailVersionInput = document.querySelector("#emailVersion");

  const getAudienceSegment = document.querySelector("#audience_segment");
  const getAudienceSegmentInput = document.querySelector("#audienceSegment");

  const getATV = document.querySelector("#additional_testing_variants");
  let getATVInput = document.querySelector("#adv");

  const getGenBtn = document.querySelector("#btn_generate_url");

  const getInputfields = document.querySelectorAll(".fieldValue");

  const getMainInput = document.querySelectorAll(".input-text");

  const getPickLists = document.querySelectorAll(".pick-list");

  const getAllInputEl = document.querySelectorAll(".req");

  const getGenErr = document.querySelector("#gen_error_msg");

  const getUtmContent = document.querySelector("#utm_content");
  const getUtmContentInput = document.querySelector("#utm_content_value");

  // const getEmailSegment = document.querySelector('#email_segment');
  // const getEmailSegment = document.querySelector('#email_segment');
  // const getEmailSegmentCheckbox = document.querySelector('#email-segment-checkbox');
  // const getEmailSegmentInput = document.querySelector('#email_segment_value');

  // const getGiftString = document.querySelector('#gift-string');
  // const getGiftStringCheckbox = document.querySelector('#gift-string-checkbox');
  // const getGiftStringInput = document.querySelector('#gift-string_value');

  // const getFormString = document.querySelector('#form-string');
  // const getFormStringCheckbox = document.querySelector('#form-string-checkbox');
  // const getFormStringInput = document.querySelector('#form-string_value');

  const getMSCampaignCustomInput = document.querySelector(
    "#CustomMarketSourceCode"
  );

  const getSmsPlatform = document.querySelector("#sms-platform");

  let utmSource;

  // let grassotOption = false;

  // Handle Mobile platform selection and auto-populate market based on Platform
  const markets = {
    mobile_coms: ["MMUS"],
    mogli: ["SE"],
    grassroots_analytics: ["MMUS"],
  };

  getSmsPlatform.addEventListener("change", function () {
    const platformSelected = this.value;
    const marketDropdown = document.querySelector("#mkt");
    marketDropdown.innerHTML = '<option value="">Select Market</option> ';
    if (markets[platformSelected]) {
      markets[platformSelected].forEach((market) => {
        const option = document.createElement("option");
        option.value = market.toLowerCase().replace(/\s+/g, "_");
        option.textContent = market;
        marketDropdown.appendChild(option);
      });

      if (platformSelected === "mobile_coms") {
        marketDropdown.value = "mmus";
        getMarketInput.value = marketDropdown.value;
        utmSource = "mobile_commons";
      }

      if (platformSelected === "mogli") {
        marketDropdown.value = "se";
        getMarketInput.value = marketDropdown.value;
        utmSource = "mogli";
      }

      if (platformSelected == "grassroots_analytics") {
        marketDropdown.value = "mmus";
        getMarketInput.value = marketDropdown.value;
        utmSource = "grassroots_analytics";
      }

      if (
        getMarketInput.previousElementSibling.classList.contains("error_msg")
      ) {
        getMarketInput.previousElementSibling.style.display = "none";
        getMarketInput.previousElementSibling.previousElementSibling.classList.remove(
          "invalid"
        );
        getMarketInput.previousElementSibling.previousElementSibling.classList.add(
          "valid"
        );
      }
    }
  });

  let errorMsg = "whitespace not allowed";
  let errorMsg2 = "This field is required";
  let errorMsg3 = 'Please fix all error(s) and click on "Generate URL" button';
  let savedUrlMsg = "Generated Email URL and Pardot Email name have been saved";

  history.scrollRestoration = "manual";
  window.onbeforeunload = function () {
    window.scrollTo(0, 0);
  };

  //Back to top button
  const backToTop = document.querySelector("#backToTop");

  window.addEventListener("scroll", function () {
    if (window.scrollY > 20) {
      // if(document.body.scrollTop > 2 || document.documentElement.scrollTop > 2) {
      backToTop.style.display = "block";
    } else {
      backToTop.style.display = "none";
    }
  });

  backToTop.addEventListener("click", function () {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  });

  // Check for white space(s) in input fields
  function checkWhiteSpace(str) {
    return /\s/.test(str);
  }

  // Check for white space(s) in input fields
  // function checkWhiteSpace(str) {
  // return /\s/.test(str);
  // }

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

      if (getMainInput[i].getAttribute("id") == "name_of_creative") {
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

  getNameOfCreative.addEventListener("input", function () {
    let fieldValue = getNameOfCreative.value;
    if (fieldValue || fieldValue !== null || fieldValue !== "") {
      if (getNameOfCreative.classList.contains("invalid")) {
        getNameOfCreative.classList.remove("invalid");
        getNameOfCreative.classList.add("valid");
        getNameOfCreative.nextElementSibling.innerHTML = "";
        getNameOfCreative.nextElementSibling.style.display = "none";
      } else {
        getNameOfCreative.classList.add("valid");
      }
    }
  });

  // Prevent dashes in Name of Creative field
  getNameOfCreative.addEventListener("input", function () {
    let fieldValue = getNameOfCreative.value;
    let NewfieldValue = "";
    if (fieldValue.includes("-")) {
      NewfieldValue = fieldValue.replace(/-/g, " ");
      getNameOfCreative.value = NewfieldValue;
      getNameOfCreative.nextElementSibling.innerHTML =
        "Caution: Dashes are not allowed in this field and will be automatically replaced by a space";
      getNameOfCreative.nextElementSibling.style.display = "block";
      setTimeout(() => {
        getNameOfCreative.nextElementSibling.innerHTML = "";
        getNameOfCreative.nextElementSibling.style.display = "none";
      }, 3000);
    }
  });

  // Prevent dashes in UTM Content
  getUtmContent.addEventListener("input", function () {
    let fieldValue = getUtmContent.value;
    let NewUpdatedValue = "";
    if (fieldValue.includes("-")) {
      NewUpdatedValue = fieldValue.replace(/-/g, "_");
      getUtmContent.value = NewUpdatedValue;
      getUtmContent.nextElementSibling.innerHTML =
        "Caution: Dashes are not allowed in this field and will be automatically replaced by an underscore";
      getUtmContent.nextElementSibling.style.display = "block";
      setTimeout(() => {
        getUtmContent.nextElementSibling.innerHTML = "";
        getUtmContent.nextElementSibling.style.display = "none";
      }, 3000);
    }
  });

  // Prevent dashes in Custom MS-Campaign
  getMSCampaignCustomInput
    ? getMSCampaignCustomInput.addEventListener("input", function () {
        let fieldValue = getMSCampaignCustomInput.value;
        let NewUpdatedValue = "";
        if (fieldValue.includes("-")) {
          NewUpdatedValue = fieldValue.replace(/-/g, "_");
          getMSCampaignCustomInput.value = NewUpdatedValue;
          getMSCampaignCustomInput.nextElementSibling.innerHTML =
            "Caution: Dashes are not allowed in this field and will be automatically replaced by an underscore";
          getMSCampaignCustomInput.nextElementSibling.style.display = "block";
          setTimeout(() => {
            getMSCampaignCustomInput.nextElementSibling.innerHTML = "";
            getMSCampaignCustomInput.nextElementSibling.style.display = "none";
          }, 3000);
        }
      })
    : "";

  // Validation for required drop down options
  for (let i = 0; i < getPickLists.length; i++) {
    getPickLists[i].addEventListener("change", function (event) {
      let selectedValue = event.target.value;
      let getSiblingElement = getPickLists[i].nextElementSibling;
      let getID = getPickLists[i].getAttribute("id");
      if (getID !== "additional_testing_variants") {
        if (selectedValue === "") {
          inputInvalid(getPickLists[i]);
          getSiblingElement.innerHTML = errorMsg2;
        }

        if (selectedValue !== "") {
          inputValid(getPickLists[i]);
          getSiblingElement.innerHTML = "";
        }
      }
    });
  }

  // Populate input fields
  const populateTextInputValue = function (p1, p2) {
    p1.addEventListener("input", function () {
      p2.value = p1.value;
    });
  };

  const populateDropDownValue = function (p1, p2) {
    p1.addEventListener("change", function (event) {
      const selectedValue = event.target.value;
      if (
        selectedValue ||
        selectedValue !== null ||
        selectedValue !== "" ||
        selectedValue !== "custom"
      ) {
        p2.value = selectedValue;
      }
    });
  };

  const populateCheckboxValue = function (p1, p2, p3) {
    p1.addEventListener("change", function () {
      if (p1.checked) {
        p3.value = p2.value;
      } else {
        p3.value = "";
      }
    });
  };

  populateTextInputValue(getFullUrl, getURLInput);

  populateDropDownValue(getFiscalYear, getFiscalYearInput);

  populateDropDownValue(getMarketSourceCode, getMarketSourceCodeInput);

  populateDropDownValue(getMarket, getMarketInput);

  populateDropDownValue(getEmailType, getEmailTypeInput);

  populateTextInputValue(getNameOfCreative, getNameofCreativeInput);

  populateTextInputValue(getUtmContent, getUtmContentInput);

  populateDropDownValue(getMonth, getMonthInput);

  populateDropDownValue(getEmailVersion, getEmailVersionInput);

  populateDropDownValue(getAudienceSegment, getAudienceSegmentInput);

  populateDropDownValue(getATV, getATVInput);

  // populateCheckboxValue(getEmailSegmentCheckbox, getEmailSegment, getEmailSegmentInput);

  // populateCheckboxValue(getGiftStringCheckbox, getGiftString, getGiftStringInput);

  // populateCheckboxValue(getFormStringCheckbox, getFormString, getFormStringInput);

  getFiscalYear.addEventListener("change", function () {
    const getPlatform = document.querySelector("#sms-platform");
    const platformSelected = getPlatform.value;

    let fsYearValue;
    let newValue;
    const fsValue = document.querySelector("#fiscal_year");
    fsYearValue = fsValue.value;

    if (platformSelected == "grassroots_analytics") {
      newValue = fsYearValue.replace("sms_", "grs_txt_");
      getFiscalYearInput.value = newValue;
    }
  });

  getSmsPlatform.addEventListener("change", function () {
    let fsYearValue;
    let newValue;
    const fsValue = document.querySelector("#fiscal_year");
    fsYearValue = fsValue.value;
    const valueSelected = getSmsPlatform.value;
    if (valueSelected === "grassroots_analytics") {
      newValue = fsYearValue.replace("sms_", "grs_txt_");
      getFiscalYearInput.value = newValue;
    } else {
      const getYear = document.querySelector("#fsyear");
      const selectedValue = getYear.value;
      fsValue.value = selectedValue;
    }
  });

  // validate custom MS-Campaign field
  getMarketSourceCode.addEventListener("change", function (event) {
    const selectedValue = event.target.value;
    let getCustomSection = document.querySelector("#custom-input-mscampaign");
    let getCustomInput = document.querySelector("#CustomMarketSourceCode");
    if (selectedValue === "custom") {
      getCustomSection.style.display = "block";
      getCustomInput.setAttribute("required", "required");
      getMarketSourceCode.classList.remove("valid");
      // getMarketSourceCode.classList.add('invalid');
      populateTextInputValue(getCustomInput, getMarketSourceCodeInput);
    } else {
      getCustomSection.style.display = "none";
    }
  });

  // Get input fields
  // const getInputfields = document.querySelectorAll('.fieldValue');

  const calcUrlResults = function (fields) {
    let concat;
    for (let i = 0; i < fields.length; i++) {
      let leftSection =
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
        fields[8].value;

      let rightSection =
        "&" + "utm_medium=sms" + "&" + `utm_source=${utmSource}`;

      //   let rightSection = "&" +
      //     "utm_medium=sms" +
      //     "&" +
      //     `utm_source=${utmSource}` +
      //     "&" +
      //     "utm_campaign=" +
      //     fields[2].value;

      if (fields[9].value) {
        leftSection += fields[9].value;
      }

      if (fields[10].value) {
        rightSection += "&" + "utm_content=" + fields[10].value;
      }

      // Email Segment only
      // if(fields[11].value && !fields[12].value && !fields[13].value) {
      //   leftSection = fields[0].value + "?" + "es=" + fields[11].value + "&" + "ms=" +
      //   fields[1].value +
      //   "_" +
      //   fields[2].value +
      //   "_" +
      //   fields[3].value +
      //   "_" +
      //   fields[6].value +
      //   fields[7].value +
      //   fields[8].value;

      //   if(fields[9].value) {
      //     leftSection += fields[9].value;
      //   }
      // }
      // Gift String only
      // if(!fields[11].value && fields[12].value && !fields[13].value) {
      //   leftSection = fields[0].value + "?" + "gs=" + fields[12].value + "&" + "ms=" +
      //   fields[1].value +
      //   "_" +
      //   fields[2].value +
      //   "_" +
      //   fields[3].value +
      //   "_" +
      //   fields[6].value +
      //   fields[7].value +
      //   fields[8].value;

      //   if(fields[9].value) {
      //     leftSection += fields[9].value;
      //   }
      // }
      // Form String only
      // if(!fields[11].value && !fields[12].value && fields[13].value) {
      //   leftSection = fields[0].value + "?" + "af=" + fields[13].value + "&" + "ms=" +
      //   fields[1].value +
      //   "_" +
      //   fields[2].value +
      //   "_" +
      //   fields[3].value +
      //   "_" +
      //   fields[6].value +
      //   fields[7].value +
      //   fields[8].value;

      //   if(fields[9].value) {
      //     leftSection += fields[9].value;
      //   }
      // }
      // Email Segment and Gift String only
      // if(fields[11].value && fields[12].value && !fields[13].value) {
      //   leftSection = fields[0].value + "?" + "es=" + fields[11].value + "&" + "gs" + fields[12].value + "&" + "ms=" +
      //   fields[1].value +
      //   "_" +
      //   fields[2].value +
      //   "_" +
      //   fields[3].value +
      //   "_" +
      //   fields[6].value +
      //   fields[7].value +
      //   fields[8].value;

      //   if(fields[9].value) {
      //     leftSection += fields[9].value;
      //   }
      // }
      // Email Segment and Form String only
      // if(fields[11].value && !fields[12].value && fields[13].value) {
      //   leftSection = fields[0].value + "?" + "es=" + fields[11].value + "&" + "af=" + fields[13].value + "&" + "ms=" +
      //   fields[1].value +
      //   "_" +
      //   fields[2].value +
      //   "_" +
      //   fields[3].value +
      //   "_" +
      //   fields[6].value +
      //   fields[7].value +
      //   fields[8].value;

      //   if(fields[9].value) {
      //     leftSection += fields[9].value;
      //   }
      // }
      // Gift String and Form String only
      // if(!fields[11].value && fields[12].value && fields[13].value) {
      //   leftSection = fields[0].value + "?" + "gs=" + fields[12].value + "&" + "af=" + fields[13].value + "&" + "ms=" +
      //   fields[1].value +
      //   "_" +
      //   fields[2].value +
      //   "_" +
      //   fields[3].value +
      //   "_" +
      //   fields[6].value +
      //   fields[7].value +
      //   fields[8].value;

      //   if(fields[9].value) {
      //     leftSection += fields[9].value;
      //   }
      // }
      // All 3
      // if(fields[11].value && fields[12].value && fields[13].value) {
      //   leftSection = fields[0].value + "?" + "es=" + fields[11].value + "&" + "gs=" + fields[12].value + "&" + "af=" + fields[13].value + "&" + "ms=" +
      //   fields[1].value +
      //   "_" +
      //   fields[2].value +
      //   "_" +
      //   fields[3].value +
      //   "_" +
      //   fields[6].value +
      //   fields[7].value +
      //   fields[8].value;

      //   if(fields[9].value) {
      //     leftSection += fields[9].value;
      //   }
      // }

      concat = leftSection + rightSection;
      return concat;
    }
  };

  const calcEmailResults = function (fields) {
    const getFY = document.querySelector("#fsyear");
    const getSelectedIndex = getFY.selectedIndex;
    const getSelectedOption = getFY.options[getSelectedIndex];
    const getSelectedText = getSelectedOption.text;
    let concat;

    for (let i = 0; i < fields.length; i++) {
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

      if (fields[9].value) {
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
  };

  let getUrlResult = document.querySelector("#urloutput");
  let getEmailResult = document.querySelector("#emailoutput");
  let getUrlNote = document.querySelector(".url-save-note");
  let saveButton = document.querySelector("#save-button");
  let getInputName = document.querySelector("#save-input-name");
  let getResetNote = document.querySelector(".reset-note");
  let getCopyBtn = document.querySelector("#copy-text");
  let getCopyBtn2 = document.querySelector("#emailnameCopy");

  getGenBtn.addEventListener("click", function () {
    let urlResult = "";
    let emailResult = "";
    if (validateRequired()) {
      urlResult = calcUrlResults(getInputfields);
      emailResult = calcEmailResults(getInputfields);

      if (
        getGenErr.textContent.includes(
          'Please fix all error(s) and click on "Generate URL" button'
        )
      ) {
        getGenErr.innerHTML = "";
      }
      // console.log(urlResult);
      getUrlResult.value = urlResult;
      getEmailResult.value = emailResult;
      getUrlNote.style.display = "block";
      saveButton.style.display = "block";
      getInputName.style.display = "block";
      getResetNote.style.display = "block";
      getCopyBtn.style.display = "block";
      getCopyBtn2.style.display = "block";
      getUrlResult.focus();
    } else {
      // alert('error');
      window.scrollTo({
        top: 0,
        behavior: "smooth",
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
    const initialText = "Copy URL for SMS";
    getUrlResult.select();
    getUrlResult.setSelectionRange(0, 999999); //For mobile devices
    // navigator.clipboard.writeText(getUrlResult.textContent);
    navigator.clipboard.writeText(getUrlResult.value);

    if (
      getCopyBtn.textContent.toLowerCase().includes(initialText.toLowerCase())
    ) {
      getCopyBtn.textContent = "SMS URL Copied";
    } else {
      getCopyBtn.textContent = initialText;
    }
  });

  getCopyBtn.addEventListener("mouseout", function () {
    const initialText = "SMS URL Copied";

    if (
      getCopyBtn.textContent.toLowerCase().includes(initialText.toLowerCase())
    ) {
      getCopyBtn.textContent = "Copy URL for SMS";
    }
  });

  // Copy Pardot Email Name

  getCopyBtn2.addEventListener("click", function () {
    const initialText = "Copy SMS Name";
    getEmailResult.select();
    getEmailResult.setSelectionRange(0, 999999); //For mobile devices
    // navigator.clipboard.writeText(getUrlResult.textContent);
    navigator.clipboard.writeText(getEmailResult.value);

    if (
      getCopyBtn2.textContent.toLowerCase().includes(initialText.toLowerCase())
    ) {
      getCopyBtn2.textContent = "SMS Name Copied";
    } else {
      getCopyBtn2.textContent = initialText;
    }
  });

  getCopyBtn2.addEventListener("mouseout", function () {
    const initialText = "SMS Name Copied";

    if (
      getCopyBtn2.textContent.toLowerCase().includes(initialText.toLowerCase())
    ) {
      getCopyBtn2.textContent = "Copy SMS Name";
    }
  });

  const scriptURL_MMUS =
    "https://script.google.com/macros/s/AKfycbwxVTgiV0-4GgendTm_9c6PsHhgHnBMva_xvEdhfm_NlxPvhmcVzdWdLwoihRRAEy-76g/exec";
  // const scriptURL_UK = "https://script.google.com/macros/s/AKfycbymlyKNYy1Ru9XSkp1n-qhY3OH2rztv0xFq5x4iQKUxAC-KXi9ZwVoKH8WIaCss2gMu8g/exec";
  // const scriptURL_SK = "https://script.google.com/macros/s/AKfycbwOsNTpHU1-sDjASV2MYUTdYKzYPT0Kbn9AhbvYfvd8qN1wzYzZMVaViMG05LdQRvDoZg/exec";
  // const scriptURL_RM = "https://script.google.com/macros/s/AKfycbwb9BT5n7o970p2rMd4XbWh7rSz0d5FcQysP1YgLcUzc7Daln3YFogGrfHFYKP41yH9jQ/exec";
  // const scriptURL_DE = "https://script.google.com/macros/s/AKfycbzuT-fdusmmzJU66NUce0D2yT0rnxvoIePsJLz3vTmSLMEXOjXxdypBnpbIp_vL3x68hw/exec";
  const scriptURL_SE =
    "https://script.google.com/macros/s/AKfycbyHFn6_yJ2zIsFUS3zUycOvYSFOH3SW8t14Nbxj3PVjFobhcsxcOHfVKXNzGDb20zgEiQ/exec";
  const form = document.querySelector("#submit-to-google-sheet");
  const getlabel = document.querySelector("#url_saved_message");
  // const getMarketEmail = document.querySelector("#mkt");

  form.addEventListener("submit", (e) => {
    saveButton.disabled = true;
    e.preventDefault();
    const getMarketEmail = document.querySelector("#mkt");
    if (getMarketEmail.value == "mmus") {
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
    //   else if (getMarket.value == "uk") {
    //     fetch(scriptURL_UK, { method: "POST", body: new FormData(form) })
    //       .then((response) => {
    //         saveButton.disabled = false;
    //         getlabel.innerHTML = savedUrlMsg;
    //         setTimeout(() => {
    //           getlabel.style.display = "none";
    //         }, 5000);
    //         setTimeout(() => {
    //           window.location.reload();
    //         }, 3000);
    //       })
    //       .catch((error) => {
    //         console.error("Error", error.message);
    //         saveButton.disabled = false;
    //       });
    //   }
    //   else if (getMarket.value == "sk") {
    //     fetch(scriptURL_SK, { method: "POST", body: new FormData(form) })
    //       .then((response) => {
    //         saveButton.disabled = false;
    //         getlabel.innerHTML = savedUrlMsg;
    //         setTimeout(() => {
    //           getlabel.style.display = "none";
    //         }, 5000);
    //         setTimeout(() => {
    //           window.location.reload();
    //         }, 3000);
    //       })
    //       .catch((error) => {
    //         console.error("Error", error.message);
    //         saveButton.disabled = false;
    //       });
    //   }
    //   else if (getMarket.value == "rm") {
    //     fetch(scriptURL_RM, { method: "POST", body: new FormData(form) })
    //       .then((response) => {
    //         saveButton.disabled = false;
    //         getlabel.innerHTML = savedUrlMsg;
    //         setTimeout(() => {
    //           getlabel.style.display = "none";
    //         }, 5000);
    //         setTimeout(() => {
    //           window.location.reload();
    //         }, 3000);
    //       })
    //       .catch((error) => {
    //         console.error("Error", error.message);
    //         saveButton.disabled = false;
    //       });
    //   }
    //   else if (getMarket.value == "de") {
    //     fetch(scriptURL_DE, { method: "POST", body: new FormData(form) })
    //       .then((response) => {
    //         saveButton.disabled = false;
    //         getlabel.innerHTML = savedUrlMsg;
    //         setTimeout(() => {
    //           getlabel.style.display = "none";
    //         }, 5000);
    //         setTimeout(() => {
    //           window.location.reload();
    //         }, 3000);
    //       })
    //       .catch((error) => {
    //         console.error("Error", error.message);
    //         saveButton.disabled = false;
    //       });
    //   }
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
