window.onload = function () {
  const getButton = document.querySelector("#generate-button");
  const getBulkGenerateBtn = document.querySelector("#bulk-generate-button");
  const getField = document.querySelector("#ms-codes");
  const getInputFields = document.querySelectorAll(".multi-input");
  const concatnated = document.querySelector("#url_codes");
  const getGenErr = document.querySelector("#gen_error_msg");
  const getURL = document.querySelector("#website-url");
  const getCopyButton = document.querySelector("#copy-text");
  const getMarket_Month = document.querySelector("#mktmth");
  const getMonth = document.querySelector("#market_month");
  const getMS_Campaign = document.querySelector("#ms-campaign-list");
  const getUTM_Medium = document.querySelector("#utm-medium-list");
  const getMsCampaignInputField = document.querySelector("#ms-campaign");
  const saveButton = document.querySelector("#save-button");
  const saveLabel = document.querySelector(".url-save-note");
  const saveName = document.querySelector("#save-input-name");
  const bulkUrl = document.querySelector("#bulk-url");
  const getDropDown = document.querySelector("#adsets");
  const getMsCode = document.querySelector("#ms-codes");
  const getInputName = document.querySelector("#save-bulk-input");
  const saveBulkButton = document.querySelector("#save-bulk-button");
  const saveBulkLabel = document.querySelector(".url-save-bulk-note");
  const resetNote = document.querySelector(".reset-note");
  let selectedOptionsUTMCampaign = {};
  const bulkUrlInstruction = document.querySelector(
    "#bulk-select-instructions"
  );
  let urlType = 'Single';

  bulkUrl.addEventListener('change', function() {
    if(bulkUrl.checked) {
      urlType = 'Bulk';
    } else {
      urlType = 'Single';
    }
  });


  // let fiscalYear = 'fy22'; // This value should be updated at the begining of every fiscal year. (Ususally on October 1st)
  let fiscalYearValue = 23;
  let fiscalYear = "fy" + fiscalYearValue;
  // console.log(adSets)

  const currentDate = new Date();
  const getRecentMonth = currentDate.getMonth();
  const getRecentDate = currentDate.getUTCDate();
  const getRecentYear = currentDate.getFullYear().toString();

  const updateFiscalYear = () => {
    fiscalYearValue = Number(getRecentYear.slice(2)) + 1;
    fiscalYear = "fy" + fiscalYearValue;
  };

  const currentFiscalYear = () => {
    fiscalYearValue = Number(getRecentYear.slice(2));
    fiscalYear = "fy" + fiscalYearValue;
  };

  if (getRecentMonth >= 9 && getRecentMonth <= 11) {
    updateFiscalYear();
  } else if (getRecentMonth >= 0 && getRecentMonth < 9) {
    currentFiscalYear();
  } else {
  }

  const updateAdsets = () => {
    const getSpan = document.querySelectorAll(".fiscal-year");
    for (let i = 0; i < getSpan.length; i++) {
      getSpan[i].innerHTML = fiscalYear + "_";
    }
  };

  updateAdsets();

  window.onbeforeunload = function () {
    window.scrollTo(0, 0);
  };

  let errorMsg = "whitespace not allowed";
  let errorMsg2 = "This field is required";
  let errorMsg3 = 'Please fix all error(s) and click on "Generate URL" button';
  let errorMsg4 = "MS-Code must end with an underscore";
  let savedUrlMsg = "Generated URL have been saved";
  let savedBulkUrlMsg = "Generated URLs have been saved";

  // concatenation formula
  const calcResult = function (fieldValues) {
    for (let i = 0; i < fieldValues.length; i++) {
      concat =
        fieldValues[0].value +
        "?" +
        "ms=" +
        fieldValues[1].value +
        fieldValues[2].value +
        fieldValues[3].value +
        "&" +
        "initialms=" +
        fieldValues[1].value +
        fieldValues[2].value +
        fieldValues[3].value;

      if (fieldValues[4].value) {
        concat += "&utm_medium=" + fieldValues[4].value;
      }
      if (fieldValues[5].value) {
        concat += "&utm_source=" + fieldValues[5].value;
      }
      if (fieldValues[6].value) {

        concat += "&utm_campaign=" + fieldValues[6].value;
      }
      if (fieldValues[7].value) {
        concat += "&utm_content=" + fieldValues[7].value;
      }

      return concat;
    }
  };

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

  // Auto populate market and month
  const month = [
    "jan",
    "feb",
    "mar",
    "apr",
    "may",
    "jun",
    "jul",
    "aug",
    "sep",
    "oct",
    "nov",
    "dec",
  ];
  const getDate = new Date();
  let getCurrentMonth = month[getDate.getMonth()];
  let getMarketField = document.querySelector("#market-month");
  let mktMthArray = [];
  let mergeMktMth = [getMarket_Month, getMonth];
  let combinedValue;

  for (let i = 0; i < mergeMktMth.length; i++) {
    mergeMktMth[i].addEventListener("change", function () {
      let getElementId = mergeMktMth[i].getAttribute("id");

      if (getElementId === "mktmth") {
        mktMthArray[0] = mergeMktMth[i].value;
      } else if (getElementId === "market_month") {
        mktMthArray[1] = mergeMktMth[i].value;
      }
      // mktMthArray.push(mergeMktMth[i].value);
      // if(mktMthArray.length === 2) {
      combinedValue = mktMthArray.join("_");
      getMarketField.value = combinedValue;
      hiddenInputValidate(getMarketField);
      // }
    });
  }

  // Auto populate MS-Campaign
  const populateSingleUTMCampaign = function() {
  getMS_Campaign.addEventListener("change", function () {
    let getCampaignField = document.querySelector("#ms-campaign");
    const getOptGroup = document.querySelector("#adsets");
    const getMsCampaignText =
      getMS_Campaign.options[getMS_Campaign.selectedIndex].text;
    // const optGroupLabel = getDropDown.options[getDropDown.selectedIndex].parentElement.label;
    const getUTMCampaignField = document.querySelector("#utm-campaign");
    const dataType = getOptGroup.options[getOptGroup.selectedIndex].getAttribute('data-type');

    getCampaignField.value = fiscalYear + "_" + getMS_Campaign.value;
    hiddenInputValidate(getCampaignField);

    if (getMsCampaignText === "Custom Input") {
      getCampaignField.value = fiscalYear + "_" + "";
      getCampaignField.setAttribute("type", "text");
      getCampaignField.setAttribute("required", "");
      getCampaignField.style.marginTop = "20px";
      if (getCampaignField.classList.contains("valid")) {
        getCampaignField.classList.remove("valid");
      }
    } else {
      getCampaignField.setAttribute("type", "hidden");
      getCampaignField.style.marginTop = "0";
    }

    // auto populate UTM Campagin
    if (
      dataType === "autoPopulate"
    ) {
      getUTMCampaignField.value = getCampaignField.value;
      getUTMCampaignField.classList.add("valid");
    } else {
      if (
        getMS_Campaign.options[getMS_Campaign.selectedIndex].text !==
        "Custom Input"
      ) {
        getUTMCampaignField.value = "";
        getUTMCampaignField.classList.remove("valid");
      }
    }
  });
}

  // MS Campaign custom input
  getMsCampaignInputField.addEventListener("input", function () {
    const getUTMfield = document.querySelector("#utm-campaign");
    getUTMfield.value = getMsCampaignInputField.value;
  });

  // Auto populate UTM Medium
  getUTM_Medium.addEventListener("change", function () {
    let getUTM_Medium_Field = document.querySelector("#utm-medium");
    getUTM_Medium_Field.value = getUTM_Medium.value;
  });

  for (let i = 0; i < getInputFields.length; i++) {
    getInputFields[i].addEventListener("input", function () {
      const getValue = getInputFields[i].value;
      const getSibling = getInputFields[i].nextElementSibling;
      if (checkWhiteSpace(getValue) == true) {
        if (getSibling.classList.contains("error_msg")) {
          inputInvalid(getInputFields[i]);
          getInputFields[i].nextElementSibling.innerHTML = errorMsg;
          getGenErr.innerHTML = errorMsg3;
        }
      } else if (checkWhiteSpace(getValue) == false) {
        if (getValue != "") {
          inputValid(getInputFields[i]);
        } else if (getValue == "") {
          restoreDefault(getInputFields[i]);
        }
      }
    });
  }

  // ms-code custom input validation

  getField.addEventListener("input", function () {
    let customInput = getField.value;
    if (customInput.endsWith("_")) {
      inputValid(getField);
    } else {
      inputInvalid(getField);
      getField.nextElementSibling.innerHTML = errorMsg4;
    }
  });

  // Required fields validation
  const validateRequired = function () {
    let empty = 0;
    for (let i = 0; i < getInputFields.length; i++) {
      if (
        getInputFields[i].hasAttribute("required") &&
        getInputFields[i].value == ""
      ) {
        empty++;
      }
    }
    if (empty == 0) {
      return true;
    } else {
      for (let i = 0; i < getInputFields.length; i++) {
        if (
          getInputFields[i].hasAttribute("required") &&
          getInputFields[i].value == ""
        ) {
          inputInvalid(getInputFields[i]);
          getInputFields[i].nextElementSibling.innerHTML = errorMsg2;
        }
      }
    }
  };

  ///////////////////
  // Bulk URL option

  const disableCustomAdset = function () {
    for (let i = 0; i < getDropDown.options.length; i++) {
      if (!getDropDown.options[i].value) {
        getDropDown.options[i].setAttribute("disabled", "");
      }
    }
  };

  const enableCustomAdset = function () {
    for (let i = 0; i < getDropDown.options.length; i++) {
      if (!getDropDown.options[i].value) {
        getDropDown.options[i].removeAttribute("disabled");
      }
    }
  };

  const populateSingleMsCode = function () {
    // Drop down options - Adsets & Channel for single URL
    getDropDown.addEventListener("change", function () {
      let optionText = getDropDown.options[getDropDown.selectedIndex].text;
      let optionValue = getDropDown.value;
      let msCampaignField = document.querySelector("#ms-campaign");
      let optionGroupLabelValue =
        getDropDown.options[getDropDown.selectedIndex].parentElement.label;
      let UTMCampaignField = document.querySelector("#utm-campaign");
      const dataType = getDropDown.options[getDropDown.selectedIndex].getAttribute('data-type');
      let getUTMMedium = document.querySelector('#utm-medium-list');
      let getUTMSource = document.querySelector('#utm-source');
      let getUTMContent = document.querySelector('#utm-content');

     if(urlType === 'Single') {
        if(optionGroupLabelValue === 'Onsite Elements - links on the communications site') {
          
          getUTMMedium.disabled = true;
          UTMCampaignField.setAttribute('readonly', 'readonly');
          getUTMSource.setAttribute('readonly', 'readonly');
          getUTMContent.setAttribute('readonly', 'readonly');
        } else{
          getUTMMedium.disabled = false;
          UTMCampaignField.removeAttribute('readonly');
          getUTMSource.removeAttribute('readonly');
          getUTMContent.removeAttribute('readonly');
        }
     }

      const populateMSCode = () => {
        getMsCode.setAttribute("value", optionValue);
        getMsCode.removeAttribute("required");
        if (getMsCode.classList.contains("invalid")) {
          getMsCode.classList.remove("invalid");
          getMsCode.classList.add("valid");
          getMsCode.nextElementSibling.innerHTML = "";
          getMsCode.nextElementSibling.style.display = "none";
        }
      };

      populateMSCode();

      if (optionText === "Custom mscode") {
        getMsCode.removeAttribute("readonly");
        getMsCode.setAttribute("required", "");
        getMsCode.value = "";
      } else {
        getMsCode.setAttribute("readonly", "yes");
        getMsCode.value = optionValue;
      }

      // Check MS Campaign / UTM Campaign
      if (
      dataType === "autoPopulate"
      ) {
        if (msCampaignField.value) {
          UTMCampaignField.value = msCampaignField.value;
          // UTMCampaignField.setAttribute('readonly','yes');
          UTMCampaignField.classList.add("valid");
        }
      } else {
        if (
          getMS_Campaign.options[getMS_Campaign.selectedIndex].text !==
          "Custom Input"
        ) {
          UTMCampaignField.value = "";
          UTMCampaignField.classList.remove("valid");
        }
      }
    });
  };

  // Direct Mail auto-populate UTM
  const directmail = function () {
    // console.log(getMsCode);
    getDropDown.addEventListener("change", function () {
      let getMsCodeValue = document.querySelector("#ms-codes");
      let optionValue = getDropDown.value;
      let utmMediumvalue = "print";
      let utmSourceValue = "direct_mail";
      let getUtmMediumList = document.querySelector("#utm-medium-list");
      let getUtmMediumDM = document.querySelector("#utm-medium-dm");
      let getUtmMediumHidden = document.querySelector("#utm-medium");
      let getUtmSource = document.querySelector("#utm-source");

      if (optionValue === "dm_furl_") {
        getUtmMediumList.style.display = "none";
        getUtmMediumDM.style.display = "block";
        getUtmMediumDM.value = utmMediumvalue;
        getUtmMediumHidden.value = utmMediumvalue;
        getUtmSource.value = utmSourceValue;
        getUtmSource.setAttribute("readonly", "yes");
      } else {
        getUtmMediumList.style.display = "block";
        getUtmMediumDM.style.display = "none";
        getUtmMediumDM.value = "";
        getUtmMediumHidden.value = "";
        getUtmSource.value = "";
        getUtmSource.removeAttribute("readonly");
      }
    });
  };

  directmail();

  const populateBulkMsCode = function () {
    getDropDown.addEventListener("change", function () {
      let len = getDropDown.options.length;
      let selectedOptions = [];
      // let displayedOptions = [];
      let opt;

      for (let i = 0; i < len; i++) {
        opt = getDropDown.options[i];
        if (opt.selected) {
          selectedOptions.push(opt.value + "");
        }
      }

      getMsCode.value = selectedOptions.join("\n");
    });
  };

  const populateBulkUTMCampaign = function() {
      const getMSCampaignDropDown = document.querySelector('#ms-campaign-list');
      const getUTMCampaignTextArea = document.querySelector('#utm-campaign');
      getMSCampaignDropDown.addEventListener("change", function() {
          getMSCodeList = document.querySelector('#ms-codes');
          // console.log(getMSCodeList.value);
          if(!getMSCodeList.value) {
              console.log('None');
          } else {
              const getAdSetsDropDown = document.querySelector('#adsets');
              let len = getAdSetsDropDown.options.length;
              // let selectedOptionsUTMCampaign = {};
              let selectedOpt;
              let UTMvalues = '';
              for(let i = 0; i < len; i++) {
                  
                  selectedOpt = getAdSetsDropDown[i];
                  if(selectedOpt.selected) {
                      const keyName = selectedOpt.value;
                      if(selectedOpt.getAttribute('data-type') === 'autoPopulate') {
                          selectedOptionsUTMCampaign[keyName] = fiscalYear + "_" + getMSCampaignDropDown.options[getMSCampaignDropDown.selectedIndex].text;
                      } else {
                          selectedOptionsUTMCampaign[keyName] = 'Leave Blank';
                      }
                  }
              }
             

              for (const property in selectedOptionsUTMCampaign) {
                  UTMvalues += `${property} : ${selectedOptionsUTMCampaign[property]} \n`;
              }

              getUTMCampaignTextArea.value = UTMvalues;
          }
      });
  }

  

  const resetMSandAdset = function () {
      const getUTMCampaignTextArea = document.querySelector('#utm-campaign');
      const getMSCampaignDropDown = document.querySelector('#ms-campaign-list');
      const getMSCampaignField = document.querySelector('#ms-campaign');
      getMSCampaignDropDown.selectedIndex = 0;
      getUTMCampaignTextArea.value = "";
      getMSCampaignField.value = '';
      getMsCode.value = "";
      getDropDown.selectedIndex = 0;
  };

  const resetUTMCampaign = function() {
      selectedOptionsUTMCampaign = {};
  }

  populateSingleMsCode();
  populateSingleUTMCampaign();

  bulkUrl.addEventListener("change", function () {
      bulkUTMCampaign = document.querySelector('#utm-campaign');
      const getUtmSource = document.querySelector('#utm-source');
      const getUtmMedium = document.querySelector('#utm-medium-list');
    if (bulkUrl.checked) {
      getField.setAttribute("rows", "10");
      getDropDown.setAttribute("multiple", "");
      getDropDown.style.height = "250px";
      disableCustomAdset();
      getButton.classList.add("noShow");
      getBulkGenerateBtn.classList.remove("noShow");
      // getUtmSource.setAttribute("readonly", "readonly");
      getUtmSource.setAttribute("disabled", "disabled");
      getUtmMedium.setAttribute('disabled', 'disabled');

      // For UTM Campaign
      bulkUTMCampaign.setAttribute("rows", "10");
      bulkUTMCampaign.setAttribute("multiple", "");
      bulkUTMCampaign.style.height = "250px";
      bulkUTMCampaign.setAttribute("readonly", "readonly");

      getMsCode.setAttribute("required", "");
      if (getMsCode.classList.contains("valid")) {
        getMsCode.classList.remove("valid");
      }
      concatnated.innerHTML = "";
      resetNote.style.display = "none";
      bulkUrlInstruction.style.display = "block";

      // Drop down options - Adsets & Channel for bulk URLS
      resetMSandAdset();
      populateBulkMsCode();
      populateBulkUTMCampaign();
      resetUTMCampaign();

      saveName.style.display = "none";
      saveButton.style.display = "none";
      saveLabel.style.display = "none";
      getCopyButton.style.display = "none";
    } else {
      getField.setAttribute("rows", "2");
      getDropDown.removeAttribute("multiple");
      getDropDown.removeAttribute("style");
      enableCustomAdset();
      getButton.classList.remove("noShow");
      getBulkGenerateBtn.classList.add("noShow");
      // getUtmSource.removeAttribute('readonly');
      getUtmSource.removeAttribute('disabled');
      getUtmMedium.removeAttribute('disabled');

      // For UTM Campaign
      bulkUTMCampaign.setAttribute("rows", "2");
      bulkUTMCampaign.removeAttribute("multiple");
      bulkUTMCampaign.removeAttribute("style");
      bulkUTMCampaign.removeAttribute('readonly');

      getMsCode.setAttribute("required", "");
      if (getMsCode.classList.contains("valid")) {
        getMsCode.classList.remove("valid");
      }
      concatnated.innerHTML = "";
      resetNote.style.display = "none";
      bulkUrlInstruction.style.display = "none";

      // Drop down options - Adsets & Channel for single URL
      resetMSandAdset();
      populateSingleMsCode();
      populateSingleUTMCampaign();
      resetUTMCampaign();

      saveBulkLabel.style.display = "none";
      bulkSaveBtn.style.display = "none";
      getInputName.style.display = "none";
      getCopyButton.style.display = "none";
    }
  });

  const validateAll = function () {
    let notValid = 0;
    for (let i = 0; i < getInputFields.length; i++) {
      if (getInputFields[i].classList.contains("invalid")) {
        notValid++;
      }
    }
    if (notValid == 0) {
      return true;
    } else {
      // alert('fix errors');
      getGenErr.innerHTML = errorMsg3;
    }
  };

  // Generate single URL
  const singleMsCampaignData = document.querySelector("#ms_campaign_data");
  const singleMsCodeData = document.querySelector("#ms_code_data");
  getButton.addEventListener("click", function () {
    let result = "";

    if (validateRequired()) {
      if (validateAll()) {
        result = calcResult(getInputFields);
        concatnated.innerHTML = result;
        singleMsCodeData.value = getField.value;
        // singleMsCampaignData.value = getMS_Campaign.value;
        singleMsCampaignData.value = getMsCampaignInputField.value;
        getCopyButton.style.display = "block";
        saveLabel.style.display = "block";
        saveName.style.display = "block";
        saveButton.style.display = "block";
        resetNote.style.display = "block";
        getGenErr.innerHTML = "";
      } else {
        // console.log('err2')
        getGenErr.innerHTML = errorMsg3;
      }
    } else {
      // console.log('err1')
      getGenErr.innerHTML = errorMsg3;
    }
  });

  // Generate bulk URL

  // const getInputName = document.querySelector('#save-bulk-input');
  // const saveBulkButton = document.querySelector('#save-bulk-button');
  // const saveBulkLabel = document.querySelector('.url-save-bulk-note');

  // concatenation formula for bulk URLs
  // const calcBulkResult = function (fieldValues, alt) {
  //   for (let i = 0; i < fieldValues.length; i++) {
  //     concat =
  //       fieldValues[0].value +
  //       "?" +
  //       "ms=" +
  //       alt +
  //       fieldValues[2].value +
  //       fieldValues[3].value +
  //       "&" +
  //       "initialms=" +
  //       alt +
  //       fieldValues[2].value +
  //       fieldValues[3].value;

  //     if (fieldValues[4].value) {
  //       concat += "&utm_medium=" + fieldValues[4].value;
  //     }
  //     if (fieldValues[5].value) {
  //       concat += "&utm_source=" + fieldValues[5].value;
  //     }
  //     if (fieldValues[6].value) {
  //       concat += "&utm_campaign=" + fieldValues[6].value;
  //     }
  //     if (fieldValues[7].value) {
  //       concat += "&utm_content=" + fieldValues[7].value;
  //     }

  //     return concat;
  //   }
  // };

   // concatenation formula for bulk URLs
  const calcBulkResult = function (fieldValues, alt, alt2, source, medium) {
    for (let i = 0; i < fieldValues.length; i++) {
      concat =
        fieldValues[0].value +
        "?" +
        "ms=" +
        alt +
        fieldValues[2].value +
        fieldValues[3].value +
        "&" +
        "initialms=" +
        alt +
        fieldValues[2].value +
        fieldValues[3].value;

      if (medium !== 'blank' && medium !== 'custom') {
        concat += "&utm_medium=" + fieldValues[4].value + medium;
      }

      if (source !== 'blank' && source !== 'custom') {
        concat += "&utm_source=" + fieldValues[5].value + source;
      }
      if (fieldValues[6].value) {
          if(alt2 !== 'Leave Blank') {
              concat += "&utm_campaign=" + alt2;
          }
      //   concat += "&utm_campaign=" + fieldValues[6].value;
      }
      if (fieldValues[7].value) {
        concat += "&utm_content=" + fieldValues[7].value;
      }

      return concat;
    }
  };

  // const getBulkMsCodes = function () {
  //   var msarray = [];
  //   for (let i = 0; i < getDropDown.options.length; i++) {
  //     if (getDropDown.options[i].selected) {
  //       msarray.push(getDropDown.options[i].value);
  //     }
  //   }
  //   return msarray;
  // };

  getBulkGenerateBtn.addEventListener("click", function () {
    if (validateRequired()) {
      if (validateAll()) {
      //   msCodeValues = getBulkMsCodes();

        const bulkUrls = function () {
          let allUrls = [];

          // for (let i = 0; i < msCodeValues.length; i++) {
          //   allUrls.push(calcBulkResult(getInputFields, msCodeValues[i]));
          // }

          let source = '';
          let medium = '';

          for (let key in selectedOptionsUTMCampaign) {
            const getAdsetsDropDown = document.querySelector("#adsets");
            let len = getAdsetsDropDown.options.length;
            let opt;
            for (let i = 0; i < len; i++) {
              opt = getAdsetsDropDown.options[i];
              if (opt.selected) {
                if(opt.value === key) {
                  source = opt.getAttribute('data-source');
                  medium = opt.getAttribute('data-medium');
                }
                
              }
            }
              allUrls.push(calcBulkResult(getInputFields, key, selectedOptionsUTMCampaign[key], source, medium));
          }

          return allUrls;
        };

        let results = bulkUrls();
        concatnated.setAttribute("rows", results.length + 5);
        concatnated.innerHTML = results.join("\r\n\r\n");
        getCopyButton.style.display = "block";

        const getBulkDropdown = document.querySelector("#generated-bulk-urls");
        for (result in results) {
          getBulkDropdown.add(new Option(results[result]));
        }

        // Auto populate MS Campaign for google sheet
        const msCampaignData = document.querySelector("#ms_campaign_bulk_data");

        // msCampaignData.value = getMS_Campaign.value;
        msCampaignData.value = getMsCampaignInputField.value;

        getCopyButton.style.display = "block";
        getInputName.style.display = "block";
        saveBulkButton.style.display = "block";
        saveBulkLabel.style.display = "block";
        resetNote.style.display = "block";
        getGenErr.innerHTML = "";
      } else {
        getGenErr.innerHTML = errorMsg3;
      }
    } else {
      getGenErr.innerHTML = errorMsg3;
    }
  });

  //URL validation
  function isValidURL(string) {
    var res = string.match(
      /(http(s)?:\/\/.)?(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/g
    );
    return res !== null;
  }

  getURL.addEventListener("input", function () {
    let getUrlValue = getURL.value;

    if (isValidURL(getUrlValue) == true) {
      if (getURL.classList.contains("invalid")) {
        getURL.classList.remove("invalid");
      }

      if (!getURL.classList.contains("valid")) {
        getURL.classList.add("invalid");
      }
    }

    if (isValidURL(getUrlValue) !== true) {
      if (getURL.classList.contains("valid")) {
        getURL.classList.remove("valid");
        getURL.classList.add("invalid");
        getURL.nextElementSibling.innerHTML =
          "The website URL provided is not a valid URL.";
        getURL.nextElementSibling.style.display = "block";
      }
    }
  });

  // Copy generated link

  getCopyButton.addEventListener("click", function () {
    const initialText = "Copy";
    concatnated.select();
    concatnated.setSelectionRange(0, 999999); //For mobile devices
    navigator.clipboard.writeText(concatnated.textContent);

    if (
      getCopyButton.textContent
        .toLowerCase()
        .includes(initialText.toLowerCase())
    ) {
      getCopyButton.textContent = "Copied";
    } else {
      getCopyButton.textContent = initialText;
    }
  });

  getCopyButton.addEventListener("mouseout", function () {
    const initialText = "Copied";

    if (
      getCopyButton.textContent
        .toLowerCase()
        .includes(initialText.toLowerCase())
    ) {
      getCopyButton.textContent = "Copy";
    }
  });

  //Navigation
  const navigateMenu = function () {
    const getMenuItems = document.querySelectorAll(".navlink");
    for (let i = 0; i < getMenuItems.length; i++) {
      getMenuItems[i].addEventListener("click", function (e) {
        let currentElement = document.querySelector(".active");
        currentElement.classList.remove("active");
        this.classList.add("active");
        let getURL = this.getAttribute("href");
        let getSection = getURL.slice(1);
        let getCurrentActiveSection = document.querySelector(
          ".tab-content.showContent"
        );
        let getNewActive = document.querySelector("#" + getSection);
        getCurrentActiveSection.classList.remove("showContent");
        getNewActive.classList.add("showContent");
      });
    }
  };
  navigateMenu();

  const getMarket = document.querySelector("#mktmth");

  const scriptURL =
    "https://script.google.com/macros/s/AKfycbz8k_T9cCI5M5t-J0vnoxpGOrqHfs0gb3xo-zm7yMVD1uOkmEvcZq44yR7qwg13RUV9Fw/exec";
  const scriptURLUS =
    "https://script.google.com/macros/s/AKfycbygVQiK9ueCtOolnQcrxX-VlJTkde7_s6UxtBbA43sdjYL4_-qepph3zJDdZNo31motTw/exec";
  const scriptURLDE =
    "https://script.google.com/macros/s/AKfycbz3G3nM1CiHUWH4U1UvWscAS575RleUuVVQNOxbhv0V-4m3GwnCeM7BWqK2F97s-_Ch5A/exec";
  const scriptURLUK =
    "https://script.google.com/macros/s/AKfycbx_a0zhQ0Ku_diKPWuSNU9uT0UvgH7484qeaLtaS29SCCrFdOfSdSTmkA4AVnWNpGuJLA/exec";
  const scriptURLRM =
    "https://script.google.com/macros/s/AKfycby5ooL9PNTQifW9ks3qn9jARoaR-yIF_OIzuveiS0zxtlCofAiogYnwbAY1jQObBU7W-A/exec";
  const scriptURLSE =
    "https://script.google.com/macros/s/AKfycbw1AJk8PETZMTA3akDhciUFOb3Uu0UFCAGHh1ZsH4w95e66kG6O_Lg_EiOmV4ZOZLYE_w/exec";
  const scriptURLSK =
    "https://script.google.com/macros/s/AKfycbzHZTfBqt4tM3v7vIBFOOImoMYhR1acXKb25JmGWWYQP1BR0DTCyvHT8Gc_tmbWy3RNZQ/exec";
  // const form = document.forms['submit-to-google-sheet']
  const form = document.querySelector("#submit-to-google-sheet");
  const getlabel = document.querySelector("#url_saved_message");

  form.addEventListener("submit", (e) => {
    saveButton.disabled = true;
    e.preventDefault();
    const getMarket = document.querySelector("#mktmth");
    if (getMarket.value == "_demk") {
      fetch(scriptURLDE, { method: "POST", body: new FormData(form) })
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
    } else if (getMarket.value == "_ukmk") {
      fetch(scriptURLUK, { method: "POST", body: new FormData(form) })
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
    } else if (getMarket.value == "_nm") {
      fetch(scriptURLRM, { method: "POST", body: new FormData(form) })
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
    } else if (getMarket.value == "_semk") {
      fetch(scriptURLSE, { method: "POST", body: new FormData(form) })
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
    } else if (getMarket.value == "_mmsk") {
      fetch(scriptURLSK, { method: "POST", body: new FormData(form) })
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
    } else {
      fetch(scriptURLUS, { method: "POST", body: new FormData(form) })
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

  // for bulk URLS

  const bulkSaveBtn = document.querySelector("#save-bulk-button");

  const bulkUrlForm = document.querySelector("#submit-bulk-to-google-sheet");
  const getBulkDropdown = document.querySelector("#generated-bulk-urls");
  let urlList;
  const fetchURLs = function () {
    let urlarray = [];
    for (let i = 0; i < getBulkDropdown.options.length; i++) {
      urlarray.push(getBulkDropdown.options[i].value);
    }
    return urlarray;
  };

  bulkUrlForm.addEventListener("submit", (e) => {
    urlList = fetchURLs();

    for (let i = 0; i < urlList.length; i++) {
      let getLink = document.querySelector("#bulkLink");
      getLink.value = urlList[i];
      const getBulkMSCode = document.querySelector("#ms_code_bulk_data");
      let singleURL = urlList[i].slice(urlList[i].indexOf("ms="));
      let singleParam = singleURL.split("fy")[0];
      let singleMsCode = singleParam.split("=")[1];
      getBulkMSCode.value = singleMsCode;
      bulkSaveBtn.disabled = true;
      e.preventDefault();

      if (getMarket.value == "_demk") {
        fetch(scriptURLDE, { method: "POST", body: new FormData(bulkUrlForm) })
          .then((response) => {
            bulkSaveBtn.disabled = false;
            getlabel.innerHTML = savedBulkUrlMsg;
            setTimeout(() => {
              getlabel.style.display = "none";
            }, 5000);
            setTimeout(() => {
              window.location.reload();
            }, 3000);
          })
          .catch((error) => {
            console.error("Error", error.message);
            bulkSaveBtn.disabled = false;
          });
      } else if (getMarket.value == "_ukmk") {
        fetch(scriptURLUK, { method: "POST", body: new FormData(bulkUrlForm) })
          .then((response) => {
            bulkSaveBtn.disabled = false;
            getlabel.innerHTML = savedBulkUrlMsg;
            setTimeout(() => {
              getlabel.style.display = "none";
            }, 5000);
            setTimeout(() => {
              window.location.reload();
            }, 3000);
          })
          .catch((error) => {
            console.error("Error", error.message);
            bulkSaveBtn.disabled = false;
          });
      } else if (getMarket.value == "_nm") {
        fetch(scriptURLRM, { method: "POST", body: new FormData(bulkUrlForm) })
          .then((response) => {
            bulkSaveBtn.disabled = false;
            getlabel.innerHTML = savedBulkUrlMsg;
            setTimeout(() => {
              getlabel.style.display = "none";
            }, 5000);
            setTimeout(() => {
              window.location.reload();
            }, 3000);
          })
          .catch((error) => {
            console.error("Error", error.message);
            bulkSaveBtn.disabled = false;
          });
      } else if (getMarket.value == "_semk") {
        fetch(scriptURLSE, { method: "POST", body: new FormData(bulkUrlForm) })
          .then((response) => {
            bulkSaveBtn.disabled = false;
            getlabel.innerHTML = savedBulkUrlMsg;
            setTimeout(() => {
              getlabel.style.display = "none";
            }, 5000);
            setTimeout(() => {
              window.location.reload();
            }, 3000);
          })
          .catch((error) => {
            console.error("Error", error.message);
            bulkSaveBtn.disabled = false;
          });
      } else if (getMarket.value == "_mmsk") {
        fetch(scriptURLSK, { method: "POST", body: new FormData(bulkUrlForm) })
          .then((response) => {
            bulkSaveBtn.disabled = false;
            getlabel.innerHTML = savedBulkUrlMsg;
            setTimeout(() => {
              getlabel.style.display = "none";
            }, 5000);
            setTimeout(() => {
              window.location.reload();
            }, 3000);
          })
          .catch((error) => {
            console.error("Error", error.message);
            bulkSaveBtn.disabled = false;
          });
      } else {
        fetch(scriptURLUS, { method: "POST", body: new FormData(bulkUrlForm) })
          .then((response) => {
            bulkSaveBtn.disabled = false;
            getlabel.innerHTML = savedBulkUrlMsg;
            setTimeout(() => {
              getlabel.style.display = "none";
            }, 5000);
            setTimeout(() => {
              window.location.reload();
            }, 3000);
          })
          .catch((error) => {
            console.error("Error", error.message);
            bulkSaveBtn.disabled = false;
          });
      }
    }
  });
};
