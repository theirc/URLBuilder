window.onload = function() {
    const getButton = document.querySelector('#generate-button');
    const getField = document.querySelector('#ms-codes');
    const getInputFields = document.querySelectorAll('.multi-input');
    const concatnated = document.querySelector('#url_codes');
    const getGenErr = document.querySelector('#gen_error_msg');
    const getURL = document.querySelector('#website-url');
    const getCopyButton = document.querySelector('#copy-text');
    const getMarket_Month = document.querySelector('#mktmth');
    const getMonth = document.querySelector('#market_month');
    const getMS_Campaign = document.querySelector('#ms-campaign-list');
    const getUTM_Medium = document.querySelector('#utm-medium-list');
    const getMsCampaignInputField = document.querySelector('#ms-campaign');
    // let fiscalYear = 'fy22'; // This value should be updated at the begining of every fiscal year. (Ususally on October 1st)
    let fiscalYearValue = 23
    let fiscalYear = 'fy' + fiscalYearValue; 


    const currentDate = new Date();
    const getRecentMonth = currentDate.getMonth();
    const getRecentDate = currentDate.getUTCDate();
    const getRecentYear = currentDate.getFullYear().toString();


    const updateFiscalYear = () => {
        fiscalYearValue = getRecentYear.slice(2);
    }

    if(getRecentMonth === 9 && getRecentDate === 1 ) {
        updateFiscalYear();
    } else {
        
    }

    const updateAdsets = () => {
        const getSpan = document.querySelectorAll('.fiscal-year');
        for(let i = 0; i < getSpan.length; i++) {
            getSpan[i].innerHTML = fiscalYear + '_';
        }
    }

    updateAdsets();


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

    const hiddenInputValidate = function(el) {
        el.removeAttribute('required');
        if(el.classList.contains('invalid')) {
            el.classList.remove('invalid');
            el.nextElementSibling.innerHTML = '';
            el.nextElementSibling.style.display = 'none';
        }
    }

    // Auto populate market and month
    const month = ['jan', 'feb', 'mar', 'apr', 'may', 'jun', 'jul', 'aug', 'sep', 'oct', 'nov', 'dec'];
    const getDate = new Date();
    let getCurrentMonth = month[getDate.getMonth()];
    let getMarketField = document.querySelector('#market-month');
    let mktMthArray = [];
    let mergeMktMth = [getMarket_Month, getMonth];
    let combinedValue;

    for(let i = 0; i < mergeMktMth.length; i++) {
        mergeMktMth[i].addEventListener('change', function() {
            let getElementId = mergeMktMth[i].getAttribute('id');

            if(getElementId === 'mktmth') {
                mktMthArray[0] = mergeMktMth[i].value;
            }
            else if(getElementId === 'market_month') {
                mktMthArray[1] = mergeMktMth[i].value;
            }
            // mktMthArray.push(mergeMktMth[i].value);
            // if(mktMthArray.length === 2) {
                combinedValue = mktMthArray.join('_');
                getMarketField.value = combinedValue;
                hiddenInputValidate(getMarketField);
            // }
        })
    }


    // Auto populate MS-Campaign
    getMS_Campaign.addEventListener('change', function() {
        let getCampaignField = document.querySelector('#ms-campaign');
        const getOptGroup = document.querySelector('#adsets');
        const getMsCampaignText = getMS_Campaign.options[getMS_Campaign.selectedIndex].text;
        // const optGroupLabel = getDropDown.options[getDropDown.selectedIndex].parentElement.label;
        const getUTMCampaignField = document.querySelector('#utm-campaign');

        getCampaignField.value = fiscalYear + "_" + getMS_Campaign.value;
        hiddenInputValidate(getCampaignField);

        if(getMsCampaignText === 'Custom Input') {
            getCampaignField.value = fiscalYear + '_' + '';
            getCampaignField.setAttribute('type', 'text');
            getCampaignField.setAttribute('required','');
            getCampaignField.style.marginTop = '20px';
            if(getCampaignField.classList.contains('valid')) {
                getCampaignField.classList.remove('valid');
            }
        } else {
            getCampaignField.setAttribute('type', 'hidden');
            getCampaignField.style.marginTop = '0';
        }

        // auto populate UTM Campagin
        // if((optGroupLabel !== 'Paid Display & Search') && (optGroupLabel !== 'Onsite Elements - links on the communications site') && getOptGroup.value) {
        if((getOptGroup.value !== 'gs_ppc_') && (getOptGroup.value !== 'gs_se_ppc_') && (getOptGroup.value !== 'gd_ppc_') && (getOptGroup.value !== 'gd_da_') && (getOptGroup.value !== 'gg_ppc_') && (getOptGroup.value !== 'yt_ppc_') && (getOptGroup.value !== 'bg_ppc_') && (getOptGroup.value !== 'ws_hero_') && (getOptGroup.value !== 'ws_banr_') && (getOptGroup.value !== 'ws_modl_') && (getOptGroup.value !== 'ws_ftr_') && (getOptGroup.value !== 'ws_crisis_page_') && (getOptGroup.value !== 'ws_article_') && (getOptGroup.value !== 'ws_article_') && (getOptGroup.value !== 'ws_article_h2h_') && (getOptGroup.value !== 'ws_resq_top_nav_btn_') && (getOptGroup.value !== 'ws_resq_stat_ftr_btn_') && (getOptGroup.value !== 'ss_irc_voices_mitchell_') && (getOptGroup.value !== 'default')) {
            getUTMCampaignField.value = getCampaignField.value;
            getUTMCampaignField.classList.add('valid');
        } else {

        }
    });

    // MS Campaign custom input
    getMsCampaignInputField.addEventListener('input', function() {
        const getUTMfield = document.querySelector('#utm-campaign');
        getUTMfield.value = getMsCampaignInputField.value;
    });

    // Auto populate UTM Medium
    getUTM_Medium.addEventListener('change', function() {
        let getUTM_Medium_Field = document.querySelector('#utm-medium');
        getUTM_Medium_Field.value = getUTM_Medium.value;
    })


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
        let msCampaignField = document.querySelector('#ms-campaign');
        let optionGroupLabelValue = getDropDown.options[getDropDown.selectedIndex].parentElement.label;
        let UTMCampaignField = document.querySelector('#utm-campaign');
        // console.log(getDropDown.options[getDropDown.selectedIndex].parentElement.label)
    

        // getMsCode.setAttribute('value', optionValue);
        // getMsCode.removeAttribute('required');
        // if(getMsCode.classList.contains('invalid')) {
        //     getMsCode.classList.remove('invalid');
        //     getMsCode.classList.add('valid');
        //     getMsCode.nextElementSibling.innerHTML = '';
        //     getMsCode.nextElementSibling.style.display = 'none';
        // }
        const populateMSCode = () => {
            getMsCode.setAttribute('value', optionValue);
            getMsCode.removeAttribute('required');
            if(getMsCode.classList.contains('invalid')) {
                getMsCode.classList.remove('invalid');
                getMsCode.classList.add('valid');
                getMsCode.nextElementSibling.innerHTML = '';
                getMsCode.nextElementSibling.style.display = 'none';
            }
        }

        populateMSCode();

        if(optionText === 'Custom mscode') {
            getMsCode.removeAttribute('readonly');
            getMsCode.setAttribute('required', '');
            getMsCode.value = "";
        } else {
            getMsCode.setAttribute('readonly', 'yes');
            getMsCode.value = optionValue;
        }

        // Check MS Campaign / UTM Campaign
        // if((optionGroupLabelValue !== 'Paid Display & Search') && (optionGroupLabelValue !== 'Onsite Elements - links on the communications site') && optionValue) {
            if((optionValue !== 'gs_ppc_') && (optionValue !== 'gs_se_ppc_') && (optionValue !== 'gd_ppc_') && (optionValue !== 'gd_da_') && (optionValue !== 'gg_ppc_') && (optionValue !== 'yt_ppc_') && (optionValue !== 'bg_ppc_') && (optionValue !== 'ws_hero_') && (optionValue !== 'ws_banr_') && (optionValue !== 'ws_modl_') && (optionValue !== 'ws_ftr_') && (optionValue !== 'ws_crisis_page_') && (optionValue !== 'ws_article_') && (optionValue !== 'ws_article_') && (optionValue !== 'ws_article_h2h_') && (optionValue !== 'ws_resq_top_nav_btn_') && (optionValue !== 'ws_resq_stat_ftr_btn_') && (optionValue !== 'ss_irc_voices_mitchell_') && (optionValue !== 'default')) {
            if(msCampaignField.value) {
                UTMCampaignField.value = msCampaignField.value;
                // UTMCampaignField.setAttribute('readonly','yes');
                UTMCampaignField.classList.add('valid');
            }
        } else {
            // UTMCampaignField.removeAttribute('readonly', 'yes');
            // UTMCampaignField.value = '';
            // UTMCampaignField.classList.remove('valid');
            if(getMS_Campaign.options[getMS_Campaign.selectedIndex].text !== 'Custom Input') {
                UTMCampaignField.value = '';
                UTMCampaignField.classList.remove('valid');
            }
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
    });

    //Navigation 
    const navigateMenu = function() {
        const getMenuItems = document.querySelectorAll('.navlink');
        for(let i = 0; i < getMenuItems.length; i++) {
            getMenuItems[i].addEventListener('click', function(e) {
                let currentElement = document.querySelector('.active');
                currentElement.classList.remove('active');
                this.classList.add('active');
                let getURL = this.getAttribute('href');
                let getSection = getURL.slice(1);
                let getCurrentActiveSection = document.querySelector('.tab-content.showContent');
                let getNewActive = document.querySelector('#' + getSection);
                getCurrentActiveSection.classList.remove('showContent');
                getNewActive.classList.add('showContent');

            })
        }
    }
    navigateMenu();
}