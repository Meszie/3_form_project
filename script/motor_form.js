var currentTab = 0;
showTab(currentTab);

function generateRandomString(length, isLetters) {
    const characters = isLetters ? 'ABCDEFGHIJKLMNOPQRSTUVWXYZ' : '0123456789';
    let result = '';
    for (let i = 0; i < length; i++) {
      result += characters.charAt(Math.floor(Math.random() * characters.length));
    }
    return result;
  }
  
  function generateFormattedNumber() {
    const randomLetters = generateRandomString(1, true);
    const randomNumbers = generateRandomString(3, false);
    const formattedNumber = `${randomLetters}-${randomNumbers}`;
    return formattedNumber;
  }
  
  const formNumber = generateFormattedNumber();

function showTab(n) {
    var x = document.getElementsByClassName("tab");
    x[currentTab].style.display = "none"; // Hide the current tab
    currentTab = n;
    x[currentTab].style.display = "block"; // Show the new current tab
    moveCar(currentTab);

    var prevBtn = document.getElementById("prevBtn");
    var nextBtn = document.getElementById("nextBtn");
    var isSubmitting = false; 

    if (currentTab === 0) {
        prevBtn.style.display = "none";
    } else {
        prevBtn.style.display = "inline";
    }

    if (currentTab === x.length - 1) {
        nextBtn.innerHTML = "Submit";
      
        nextBtn.onclick = function () {
          if (isSubmitting) {
            return;
          }
          isSubmitting = true;
          if (validateTab()) {
            Swal.fire({
              title: "Are you sure?",
              text: "Once submitted, you won't be able to edit the form.",
              icon: "warning",
              showCancelButton: true,
              confirmButtonText: "Yes, submit it!",
              cancelButtonText: "No, keep it",
            }).then((result) => {
              if (result.isConfirmed) {
                Swal.fire({
                  title: "Form Submitted!",
                  html: `<div class="larger-text">Your number is: <span class="number"> ${formNumber}</span></div>`,
                  icon: "success",
                  didOpen: () => {
                    document.querySelector(".swal2-content").classList.add("custom-dialog");
                  },
                }).then(() => {
                  window.location.href = "home.html";
                });
              }
              isSubmitting = false;
            });
          }
        };
      } else {
        nextBtn.innerHTML = "Next";
      
        nextBtn.onclick = function () {
            if (isSubmitting) {
              return;
            }
            if (!validateTab()) {
              return;
            }
            gatherInputValues();
            showTab(currentTab + 1);
          };
        }
        fixStepIndicator(currentTab);
      }

function moveCar(n) {
    var car = document.getElementById("car");
    var stepWidth = 100 / document.getElementsByClassName("step").length;
    var newPosition = stepWidth * n;
    var newWidth = stepWidth + "%";

    car.style.transition = "left 0.7s, width 0.7s";
    car.style.left = newPosition + "%";
    car.style.width = newWidth;

    setTimeout(function () {
        car.style.transition = "none";
    }, 700);
}

function validateTab() {
  var currentTabElement = document.getElementsByClassName("tab")[currentTab];
  var inputs = currentTabElement.getElementsByTagName("input");
  var selects = currentTabElement.getElementsByTagName("select");
  var radioGroups = {}; 
  for (var i = 0; i < inputs.length; i++) {
    if (inputs[i].hasAttribute("required") && !inputs[i].value.trim()) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Answer all the required fields before proceeding!"
      });
      return false;
    }
    if (inputs[i].type === "checkbox" && inputs[i].hasAttribute("required") && !inputs[i].checked) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Answer all the required fields before proceeding!"
      });
      return false;
    }
    if (inputs[i].type === "radio" && inputs[i].hasAttribute("required")) {
      var groupName = inputs[i].name;
      if (!radioGroups[groupName]) {
        radioGroups[groupName] = false; 
      }

      if (inputs[i].checked) {
        radioGroups[groupName] = true; 
      }
    }
  }
  for (var group in radioGroups) {
    if (!radioGroups[group]) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Answer all the required fields before proceeding!"
      });
      return false;
    }
  }
  for (var j = 0; j < selects.length; j++) {
    if (selects[j].hasAttribute("required") && selects[j].selectedIndex === 0) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Answer all the required fields before proceeding!"
      });
      return false;
    }
  }
  return true;
}

function nextPrev(n) {
    var x = document.getElementsByClassName("tab");

    if (n === 1 && !validateTab()) {
        return;
    }

    gatherInputValues();
    showTab(currentTab + n);
}
document.getElementById("regForm").addEventListener("submit", function (event) {
    event.preventDefault();
    gatherInputValues();
});

function gatherInputValues() {
    const repName = document.getElementById("repname").value.toUpperCase();
    const repContact = document.getElementById("repnum").value.toUpperCase();
    const repAddress = document.getElementById("repadd").value.toUpperCase();

    // Plan Type
    const planType = document.getElementById("ptype").value.toUpperCase();

    //Personal Details
    const title = document.getElementById("title_membership").value.toUpperCase();
    const firstName = document.getElementById("fname").value.toUpperCase();
    const middleName = document.getElementById("mname").value.toUpperCase();
    const lastName = document.getElementById("lname").value.toUpperCase();
    const birthMonth = document.getElementById("birth_month").value.toUpperCase();
    const birthDay = document.getElementById("bday").value.toUpperCase();
    const birthYear = document.getElementById("byear").value;
    const birthPlace = document.getElementById("bplace").value.toUpperCase();
    const gender = document.getElementById("gender_membership").value.toUpperCase();
    const occupation = document.getElementById("occupation").value.toUpperCase();
    const status = document.getElementById("status_membership").value.toUpperCase();
    const citizenship = document.getElementById("ctzen_membership").value.toUpperCase();

    // Additional Information
    const nationality = document.getElementById("nationality").value || "";
    const acrNumber = document.getElementById("acr").value || "";

    // Mailing Address
    const mailingAddress = document.getElementById("mail").value.toUpperCase();

    // Home Address
    const street = document.getElementById("street").value.toUpperCase();
    const town = document.getElementById("town").value.toUpperCase();
    const city = document.getElementById("city").value.toUpperCase();
    const province = document.getElementById("province").value.toUpperCase();
    const zipCode = document.getElementById("zcode").value;
    const mobileNo = document.getElementById("pnum2").value;
    const alternateMobileNo = document.getElementById("pnum3").value;
    const emailAddress = document.getElementById("email1").value;
    const alternateEmailAddress = document.getElementById("email2").value;

  // Office Address
  const street1 = document.getElementById("street1").value.toUpperCase();
  const town1 = document.getElementById("town1").value.toUpperCase();
  const city1 = document.getElementById("city1").value.toUpperCase();
  const province1 = document.getElementById("province1").value.toUpperCase();
  const zipCode1 = document.getElementById("zcode1").value;
  const CompanyName = document.getElementById("comname").value.toUpperCase();
  const OfficeTel = document.getElementById("telnumOffice").value;

    //   Insured or Beneficiaries-----------
    const insuredBenefiaries1 = document.getElementById("insuredBenefiaries1").value.toUpperCase();
    const insuredName1 = document.getElementById("insuredName1").value.toUpperCase();
    const relationship1 = document.getElementById("relationship1").value.toUpperCase();
    const insuredBirthDate1 = document.getElementById("insuredBirthDate1").value;

    const insuredBenefiaries2 = document.getElementById("insuredBenefiaries2").value.toUpperCase();
    const insuredName2 = document.getElementById("insuredName2").value.toUpperCase();
    const relationship2 = document.getElementById("relationship2").value.toUpperCase();
    const insuredBirthDate2 = document.getElementById("insuredBirthDate2").value;

    const insuredBenefiaries3 = document.getElementById("insuredBenefiaries3").value.toUpperCase();
    const insuredName3 = document.getElementById("insuredName3").value.toUpperCase();
    const relationship3 = document.getElementById("relationship3").value.toUpperCase();
    const insuredBirthDate3 = document.getElementById("insuredBirthDate3").value;


    // Vehicle 1
    const cstickerValue = document.getElementById("csticker").value;
    const platenumValue = document.getElementById("platenum").value.toUpperCase();
    const modelValue = document.getElementById("model").value.toUpperCase();
    const makeValue = document.getElementById("make").value.toUpperCase();
    const colorValue = document.getElementById("color").value.toUpperCase();
    const ymodelValue = document.getElementById("ymodel").value;
    const ftypeValue = document.getElementById("ftype").value.toUpperCase();
    const ttypeValue = document.getElementById("ttype").value.toUpperCase();

    // Vehicle 2
    const cstickerValue1 = document.getElementById("csticker1").value;
    const platenumValue1 = document.getElementById("platenum1").value.toUpperCase();
    const modelValue1 = document.getElementById("model1").value.toUpperCase();
    const makeValue1 = document.getElementById("make1").value.toUpperCase();
    const colorValue1 = document.getElementById("color1").value.toUpperCase();
    const ymodelValue1 = document.getElementById("ymodel1").value;
    const ftypeValue1 = document.getElementById("ftype1").value.toUpperCase();
    const ttypeValue1 = document.getElementById("ttype1").value.toUpperCase();


  //PERSONAL
  document.getElementById("echoTitle").innerHTML = "<strong>Title: </strong>" + title;
  document.getElementById("echoFirstName").innerHTML = "<strong>First Name: </strong>" + firstName;
  document.getElementById("echoLastName").innerHTML = "<strong>Last Name: </strong>" + lastName;
  document.getElementById("echoMiddleName").innerHTML = "<strong>Middle Name: </strong>" + middleName;
  document.getElementById("echoBirthdate").innerHTML = "<strong>Birthdate: </strong>" + `${birthMonth} ${birthDay}, ${birthYear}`;
  document.getElementById("echoBirthPlace").innerHTML = "<strong>Birth Place: </strong>" + birthPlace;
  document.getElementById("echoGender").innerHTML = "<strong>Gender: </strong>" + gender;
  document.getElementById("echoCitizenship").innerHTML = "<strong>Citizenship: </strong>" + citizenship;
  document.getElementById("echoStatus").innerHTML = "<strong>Status: </strong>" + status;
  document.getElementById("echoOccupation").innerHTML = "<strong>Occupation: </strong>" + occupation;

  //CONTACT 
  document.getElementById("echoHomeAddress").innerHTML = "Home Address: " + street + " " + town + " " + city + " " + province + " " + zipCode;
  document.getElementById("echocomname").innerHTML = "<strong>Company Name: </strong>" + CompanyName;
  document.getElementById("echoOfficeAddress").innerHTML = "<strong>Company Address: </strong>" + street1 + " " + town1 + " " + city1 + " " + province1 + " " + zipCode1;
  document.getElementById("echoHomeMobileNo").innerHTML = "<strong>Home Phone: </strong>" + mobileNo;
  document.getElementById("echoOfficeMobileNo").innerHTML = "<strong>Company Phone: </strong>" + OfficeTel;
  document.getElementById("echoMailingPreference").innerHTML = "<strong>Mailing Preference: </strong>" + mailingAddress;
  document.getElementById("echomobilenum").innerHTML = "<strong>Mobile No.: </strong>" + mobileNo;
  document.getElementById("echoalternatemobilenum").innerHTML = "<strong>Alternate Mobile No.: </strong>" + alternateMobileNo;
  document.getElementById("echoemailadd").innerHTML = "<strong>Email Address: </strong>" + emailAddress;
  document.getElementById("echoalternateemailadd").innerHTML = "<strong>Alternate Email Address: </strong>" + alternateEmailAddress;

  // REPRESENTATIVE INFO
  document.getElementById("echorepname").innerHTML = "<strong>Name : </strong>" + repName;
  document.getElementById("echorepcontact").innerHTML = "<strong>Contact No.: </strong>" + repContact;
  document.getElementById("echorepaddress").innerHTML = "<strong>Address: </strong>" + repAddress;

  // VEHICLE 1
  document.getElementById("echoconduction").innerHTML = "<strong>Conduction Sticker: </strong>" + cstickerValue;
  document.getElementById("echoplatenum1").innerHTML = "<strong>Conduction Sticker/Plate No.: </strong>" + platenumValue;
  document.getElementById("echomake").innerHTML = "<strong>Make: </strong>" + makeValue;
  document.getElementById("echomodel").innerHTML = "<strong>Model: </strong>" + modelValue;
  document.getElementById("echoymodel").innerHTML = "<strong>Year Model: </strong>" + ymodelValue;
  document.getElementById("echocolor").innerHTML = "<strong>Color: </strong>" + colorValue;
  document.getElementById("echoftype").innerHTML = "<strong>Fuel Type: </strong>" + ftypeValue;
  document.getElementById("echottype").innerHTML = "<strong>Transmission Type: </strong>" + ttypeValue;


  // VEHICLE 2
  document.getElementById("echoconduction1").innerHTML = "<strong>Conduction Sticker: </strong>" + cstickerValue1;
  document.getElementById("echoplatenum1").innerHTML = "<strong>Conduction Sticker/Plate No.: </strong>" + platenumValue1;
  document.getElementById("echomake1").innerHTML = "<strong>Make: </strong>" + makeValue1;
  document.getElementById("echomodel1").innerHTML = "<strong>Model: </strong>" + modelValue1;
  document.getElementById("echoymodel1").innerHTML = "<strong>Year Model: </strong>" + ymodelValue1;
  document.getElementById("echocolor1").innerHTML = "<strong>Color: </strong>" + colorValue1;
  document.getElementById("echoftype1").innerHTML = "<strong>Fuel Type: </strong>" + ftypeValue1;
  document.getElementById("echottype1").innerHTML = "<strong>Transmission Type: </strong>" + ttypeValue1;
}

function validateTab() {
  var currentTabElement = document.getElementsByClassName("tab")[currentTab];
  var inputs = currentTabElement.getElementsByTagName("input");

  for (var i = 0; i < inputs.length; i++) {
    if (inputs[i].hasAttribute("required") && !inputs[i].value.trim()) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Answer all the required fields before proceeding!"
      });
      return false;
    }

    // Check if it's a checkbox and is required
    if (inputs[i].type === "checkbox" && inputs[i].hasAttribute("required") && !inputs[i].checked) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Please check the required checkbox before proceeding!"
      });
      return false;
    }
  }

  return true;
}
function fixStepIndicator(n) {
    var steps = document.getElementsByClassName("step");

    for (var i = 0; i < steps.length; i++) {
        steps[i].classList.remove("active");
    }

    steps[n].classList.add("active");
}

//Start User Type ------------------
function showContent() {
    var representativeRadio = document.getElementById("representative");
    var content1 = document.getElementById("content1");

    if (representativeRadio.checked) {
        content1.style.display = "block";
        setRequired(true); // Set the fields as required
    } else {
        content1.style.display = "none";
        setRequired(false); // Remove the required attribute
    }
}
function showContent1() {
    var personalRadio = document.getElementById("personal");
    var content1 = document.getElementById("content1");
    var repName = document.getElementById("repname");
    var repNum = document.getElementById("repnum");
    var repAdd = document.getElementById("repadd");
    if (personalRadio.checked) {
        content1.style.display = "none";
        setRequired(false); // Remove the required attribute
        repName.value = "";
        repNum.value = "";
        repAdd.value = "";
    } else {
        content1.style.display = "block";
        setRequired(true); // Set the fields as required
    }
}
function setRequired(isRequired) {
    var repName = document.getElementById("repname");
    var repNum = document.getElementById("repnum");
    var repAdd = document.getElementById("repadd");
    repName.required = isRequired;
    repNum.required = isRequired;
    repAdd.required = isRequired;
} // end-------------------------

// Start Title Gender-----------------
var titleSelect = document.getElementById("title_membership");
var genderSelect = document.querySelector("#gender_membership");
var selectGenderOption = document.querySelector("#gender_membership .select_gender");

titleSelect.addEventListener("change", function () {
  var selectedTitle = titleSelect.value;
  var titleToGender = {
    "MR": "MALE",
    "MS": "FEMALE",
    "MRS": "FEMALE",
    "ATTY": "",
    "DR": "",
    "ENGR": ""
  };
  if (titleToGender[selectedTitle] !== undefined) {
    genderSelect.value = titleToGender[selectedTitle];
  } else {
    genderSelect.value = "";
  }
  if (["ATTY", "DR", "ENGR"].includes(selectedTitle)) {
    selectGenderOption.textContent = "Select a gender.";
  } else {
    selectGenderOption.textContent = "Select a gender.";
  }
});// END Title Gender

// Start Citizenship Dropdown-------------------
document.addEventListener('DOMContentLoaded', function () {
    var citizenshipDropdown = document.getElementById('ctzen_membership');
    var addInfoSection = document.getElementById('add_info');

    citizenshipDropdown.addEventListener('change', function () {
        if (citizenshipDropdown.value === 'foreigner') {
            addInfoSection.style.display = 'block';
            setRequiredForeigner(true);

        } else {
            addInfoSection.style.display = 'none';
            setRequiredForeigner(false);
            nationality.value = "";
            acr.value = "";
        }
    });
});
function setRequiredForeigner(isRequired) {
    var nationality = document.getElementById("nationality");
    var acr = document.getElementById("acr");
    nationality.required = isRequired;
    acr.required = isRequired;
} // END Citizenship Dropdown-------------------

//Contact Information Section---------------------------
document.addEventListener('DOMContentLoaded', function () {
  var mailingAddressDropdown = document.getElementById('mail');
  var officeAddressSection = document.getElementById('officeAddress');
  var street1 = document.getElementById('street1');
  var town1 = document.getElementById('town1');
  var city1 = document.getElementById('city1');
  var province1 = document.getElementById('province1');
  var zcode1 = document.getElementById('zcode1');
  var comname = document.getElementById('comname');
  var telnumOffice = document.getElementById('telnumOffice');

  // Function to set or remove the required attribute for the specified fields
  function updateRequiredFields(required) {
      street1.required = required;
      town1.required = required;
      city1.required = required;
      province1.required = required;
      zcode1.required = required;
      comname.required = required;
      telnumOffice.required = required;
  }

  mailingAddressDropdown.addEventListener('change', function () {
      if (mailingAddressDropdown.value === 'office') {
          officeAddressSection.style.display = 'block';
          updateRequiredFields(true);
      } else {
          officeAddressSection.style.display = 'none';
          street1.value = "";
          town1.value = "";
          city1.value = "";
          province1.value = "";
          zcode1.value = "";
          comname.value = "";
          telnumOffice.value = "";1
          updateRequiredFields(false);
      }
  });
});

// Vehicle Details-------------------------------------

// Update the value to 'NO' if not checked, 'YES' if checked
var checkbox = document.getElementById('csticker');
checkbox.addEventListener('change', function () {
  this.value = this.checked ? 'YES' : 'NO';
});

// Update the value to 'NO' if not checked, 'YES' if checked
var checkbox1 = document.getElementById('csticker1');
checkbox1.addEventListener('change', function () {
  this.value = this.checked ? 'YES' : 'NO';
});

// Update Conduction Label and Placeholder
function updateLabel() {
  var cstickerCheckbox = document.getElementById("csticker");
  var platenumLabel = document.querySelector('label[for="platenum"]');
  var platenumInput = document.getElementById("platenum");

  if (cstickerCheckbox.checked) {
    platenumLabel.textContent = "Conduction Sticker";
    platenumInput.placeholder = "Enter conduction sticker.";
  } else {
    platenumLabel.textContent = "Plate No.";
    platenumInput.placeholder = "Enter plate no.";
  }
}
// Update Conduction Label and Placeholder
function updateLabel1() {
  var cstickerCheckbox1 = document.getElementById("csticker1");
  var platenumLabel1 = document.querySelector('label[for="platenum1"]');
  var platenumInput1 = document.getElementById("platenum1");

  if (cstickerCheckbox1.checked) {
    platenumLabel1.textContent = "Conduction Sticker";
    platenumInput1.placeholder = "Enter conduction sticker.";
  } else {
    platenumLabel1.textContent = "Plate No.";
    platenumInput1.placeholder = "Enter plate no.";
  }
}

// Add Vehicle-------------------------------------
var checkbox = document.getElementById('csticker');

// Add an event listener for the change event
checkbox.addEventListener('change', function() {
    // Update the value to 'NO' if not checked, 'YES' if checked
    this.value = this.checked ? 'YES' : 'NO';
});

function showVehicle2() {
  var vehicle2 = document.getElementById('vehicle2');
  var addVehicle = document.getElementById('addVehicle');
  var csticker1 = document.getElementById('csticker1');
  var platenum1 = document.getElementById('platenum1');
  var model1 = document.getElementById('model1');
  var make1 = document.getElementById('make1');
  var color1 = document.getElementById('color1');
  var ymodel1 = document.getElementById('ymodel1');
  var ftype1 = document.getElementById('ftype1');
  var ttype1 = document.getElementById('ttype1');

  if (vehicle2.style.display === 'none') {
    vehicle2.style.display = 'block';
    addVehicle.style.display = 'none';

    // Set required attribute for all inputs in vehicle2
    csticker1.required = true;
    platenum1.required = true;
    model1.required = true;
    make1.required = true;
    color1.required = true;
    ymodel1.required = true;
    ftype1.setAttribute('required', 'required');
    ttype1.setAttribute('required', 'required');
  }
}


  function hideVehicle2() {
      var vehicle2 = document.getElementById('vehicle2');
      var addVehicle = document.getElementById('addVehicle');
      var csticker1 = document.getElementById('csticker1');
      var platenum1 = document.getElementById('platenum1');
      var model1 = document.getElementById('model1');
      var make1 = document.getElementById('make1');
      var color1 = document.getElementById('color1');
      var ymodel1 = document.getElementById('ymodel1');
      var ftype1 = document.getElementById('ftype1');
      var ttype1 = document.getElementById('ttype1');
    
      if (vehicle2.style.display === 'block') {
        vehicle2.style.display = 'none';
        addVehicle.style.display = 'block';
    
        // Reset input values
        csticker1.checked = false;
        platenum1.value = '';
        model1.value = '';
        make1.value = '';
        color1.value = '';
        ymodel1.value = '';
        ftype1.value = ''; 
        ttype1.value = ''; 
    
        // Remove required attribute for all inputs in vehicle2
        csticker1.required = false;
        platenum1.required = false;
        model1.required = false;
        make1.required = false;
        color1.required = false;
        ymodel1.required = false;
        ftype1.required = false;
        ttype1.required = false;
      }
    }

function confirmAction() {
    Swal.fire({
        title: 'Are you sure?',
        text: 'This action cannot be undone!',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Yes, go to home',
        cancelButtonText: 'Cancel'
    }).then((result) => {
        if (result.isConfirmed) {
            window.location.href = 'home.html';
        }
    });
}

// Step 3 - Insured or Beneficiaries Section Details -------------------------------------
//Motor Insured------------------------------------------------------------------------------------
 function requiredInsured2(isRequired) {
    var insuredBirthDate2 = document.getElementById("insuredBirthDate2");
    var insuredBenefiaries2 = document.getElementById("insuredBenefiaries2");
    var insuredName2 = document.getElementById("insuredName2");
    var relationship2 = document.getElementById("relationship2");

    insuredBenefiaries2.required = isRequired;
    insuredName2.required = isRequired;
    relationship2.required = isRequired;
    insuredBirthDate2.required = isRequired;
  }

  function show7() {
    let add_insured1 = document.getElementById("add_insured1");
    let table = add_insured1.querySelector(".insured2");
    let add1 = document.getElementById("add1");
    let add2 = document.getElementById("add2");
    let hide1 = document.getElementById("hide1");

    if (table.style.display === "none" || table.style.display === "") {
      table.style.display = "table";
      add1.style.display = "none";
      add2.style.display = "block";
      hide1.style.display = "block";
      requiredInsured2(true);
    }
  }

  function hidex() {
    let add_insured1 = document.getElementById("add_insured1");
    let table = add_insured1.querySelector(".insured2");
    let add1 = document.getElementById("add1");
    let add2 = document.getElementById("add2");
    let hide1 = document.getElementById("hide1");

    if (table.style.display === "table") {
      table.style.display = "none";
      add1.style.display = "block";
      add2.style.display = "none";
      hide1.style.display = "none";

      var insuredBenefiaries2 = document.getElementById("insuredBenefiaries2");
      var insuredName2 = document.getElementById("insuredName2");
      var relationship2 = document.getElementById("relationship2");
      var insuredBirthDate2 = document.getElementById("insuredBirthDate2");

      insuredBenefiaries2.value = "";
      insuredName2.value = "";
      relationship2.value = "";
      insuredBirthDate2.value = "";
      requiredInsured2(false);
    }
  }
//insured333333333--------------------------------------------------------------------
function requiredInsured3(isRequired) {
    var insuredBenefiaries3 = document.getElementById("insuredBenefiaries3");
    var insuredName3 = document.getElementById("insuredName3");
    var relationship3 = document.getElementById("relationship3");
    var insuredBirthDate3 = document.getElementById("insuredBirthDate3");

    insuredBenefiaries3.required = isRequired;
    insuredName3.required = isRequired;
    relationship3.required = isRequired;
    insuredBirthDate3.required = isRequired;
  }

  function show8() {
    let add_insured2 = document.getElementById("add_insured2");
    let table = add_insured2.querySelector(".insured3");
    let add2 = document.getElementById("add2");
    let hide2 = document.getElementById("hide2");

    if (table.style.display === "none" || table.style.display === "") {
      table.style.display = "table";
      add2.style.display = "none";
      hide2.style.display = "block";
      requiredInsured3(true);
    }
  }

  function hidey() {
    let add_insured2 = document.getElementById("add_insured2");
    let table = add_insured2.querySelector(".insured3");
    let add2 = document.getElementById("add2");
    let hide2 = document.getElementById("hide2");

    if (table.style.display === "table") {
      table.style.display = "none";
      add2.style.display = "block";
      hide2.style.display = "none";

      var insuredBenefiaries3 = document.getElementById("insuredBenefiaries3");
      var insuredName3 = document.getElementById("insuredName3");
      var relationship3 = document.getElementById("relationship3");
      var insuredBirthDate3 = document.getElementById("insuredBirthDate3");

      insuredBenefiaries3.value = "";
      insuredName3.value = "";
      relationship3.value = "";
      insuredBirthDate3.value = "";
      requiredInsured3(false);
    }
  }

(function() {
    'use strict';
    window.addEventListener('load', function() {
      // Fetch all the forms we want to apply custom Bootstrap validation styles to
      var forms = document.getElementsByClassName('needs-validation');
      // Loop over them and prevent submission
      var validation = Array.prototype.filter.call(forms, function(form) {
        form.addEventListener('submit', function(event) {
          if (form.checkValidity() === false) {
            event.preventDefault();
            event.stopPropagation();
          }
          form.classList.add('was-validated');
        }, false);
      });
    }, false);
  })();