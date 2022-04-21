
var customers = {
  "Alex's Electronics" : {"street" : "53 Tech Lane", "Postcode" : 2444, "city" : "Sydney", "country" : "Australia"},
  "Jenny's Autorepair" : {"street" : "88 Car Street", "Postcode" : 8085, "city" : "London", "country" : "United Kingdom"},
  "Dan Murphy's" : {"street" : "44 Alcohol Road", "Postcode" : 1666, "city" : "Melbourne", "country" : "Australia"}
}


async function getToken() {
  var resp = fetch("https://3snk1mux67.execute-api.ap-southeast-2.amazonaws.com/InvoiceStorage/auth/login?username=Frontend&password=Roo$ter100", {
          method: 'POST', // *GET, POST, PUT, DELETE, etc.
          mode: 'cors', // no-cors, *cors, same-origin
          cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
          credentials: 'same-origin', // include, *same-origin, omit
          headers: {
          'Content-Type': 'application/json'
          },
          redirect: 'follow', // manual, *follow, error
          referrerPolicy: 'no-referrer', // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
          
      })
      .then(response => response.json())
      // .then(data => token = data.token)
      .then(data => token = data.token);
      // return token;

      // .then(data => getInvoices(data.token));

  }


function generateInvoice(customer, price) {
  var today = new Date();
  var dd = String(today.getDate()).padStart(2, '0');
  var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
  var yyyy = today.getFullYear();

  today = yyyy + '-' + mm + '-' + dd;
  data = {
      "UBLID": 2.1,
      "CustomizationID": "urn:cen.eu:en16931:2017#conformant#urn:fdc:peppol.eu:2017:poacc:billing:international:aunz:3.0",
      "ProfileID": "urn:fdc:peppol.eu:2017:poacc:billing:01:1.0",
      "ID": "EBWASP1002",
      "IssueDate": today,
      "InvoiceCode": 380,
      "Currency": "AUD",
      "BuyerReference": "EBWASP1002",
      "AddDocReference": "ebwasp1002",
      "SupplierID": 80647710156,
      "SupplierStreet": customers[customer]["street"],
      "SupplierCity": customers[customer]["city"],
      "SupplierPost": customers[customer]["postcode"],
      "SupplierCountry": customers[customer]["country"],
      "SupplierRegistration": "Ebusiness Software Services Pty Ltd",
      "CustomerStreet": "Gate 2, High Street",
      "CustomerAddStreet": "High Street",
      "CustomerCity": "Kensington",
      "CustomerPost": "2140",
      "CustomerCountry": "AU",
      "CustomerRegistration": "Awolako Enterprises Pty Ltd",
      "PaymentType": 1,
      "PaymentID": "EBWASP1002",
      "PaymentTerms": "As agreed",
      "TaxAmount": 10,
      "TaxableAmount": price,
      "TaxSubtotalAmount": 10,
      "TaxID": "S",
      "TaxPercent": 10,
      "TaxSchemeID": "GST",
      "LegalLineExtension": 100,
      "TaxExclusiveAmount": price,
      "TaxInclusiveAmount": price,
      "PayableRoundingAmount": 0,
      "PayableAmount": price,
      "InvoiceID": 1,
      "InvoiceQuantity": 500,
      "InvoiceLineExtension": 100,
      "InvoiceName": "Pencils",
      "InvoiceTaxID": 5,
      "InvoiceTaxPercent": 10,
      "InvoiceTaxSchemeID": "GST",
      "InvoicePriceAmount": 0.2,
      "InvoiceBaseQuantity": 1
  }
  return data;
}

function lodge() {
  var customerSelect = document.getElementById("customersDropDown");
  var selectedCustomer = customerSelect.options[customerSelect.selectedIndex].value;
  var amount = document.getElementById("cost").value;
  var date = document.getElementById("dueDate").value;

  console.log("https://gk6qzzv9s6.execute-api.ap-southeast-2.amazonaws.com/hatchd/invoice?token="+sessionStorage.getItem('hatchdtoken') +"&customerName="+selectedCustomer+"&amount="+amount+"&dueDate=" +date);
  fetch("https://gk6qzzv9s6.execute-api.ap-southeast-2.amazonaws.com/hatchd/invoice?token="+sessionStorage.getItem('hatchdtoken') +"&customerName="+selectedCustomer+"&amount="+amount+"&dueDate=" +date, {
      method: 'POST', // *GET, POST, PUT, DELETE, etc.
      mode: 'cors', // no-cors, *cors, same-origin
      cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
      credentials: 'same-origin', // include, *same-origin, omit
      headers: {
        'Content-Type': 'application/json'
      },
      redirect: 'follow', // manual, *follow, error
      referrerPolicy: 'no-referrer', // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
  })
  .then(response => response.json())
  .then(data => triggerPopup(data.invoice_id));
}

function triggerPopup(id) {
  popup = document.getElementById("lodged_popup");
  popup.style.display = "block";
  popup.innerHTML = "lodged " + id
  // setTimeout(() => {document.getElementById("lodged_popup").style.display = "block"}, 200);
  // setTimeout(() => {document.getElementById("lodged_popup").style.display = "none"},3000);
  
}

// <input type="Email" id="email" name="email" width="150px"><br>
// <label for="password"> Password:</label>
// <input type="password" id="password" name="password"><br>
// <label for="business"> Your business name:</label>
// <input type="text" id="business" name="business"><br>
// <div>
//   <label for="street"> Street:</label>
//   <input type="text" id="street" name="street"><br>
//   <label for="city"> City:</label>
//   <input type="text" id="city" name="city"><br>
//   <label for="address"> Postcode:</label>
//   <input type="text" pattern="[0-9]{4}" id="postcode" name="postcode"><br>
//   <label for="country"> Country:</label>
//   <select id="country

function storeToken(token, user_id, storage_token) {
  if(token == null) {
    return;
  }
console.log("kksasMAP");
sessionStorage.setItem('hatchdtoken', token);
sessionStorage.setItem('user_id', user_id);
sessionStorage.setItem('storage_token', storage_token);
window.location.replace("home.html");

}

// console.log("hhhs")
// console.log(sessionStorage.getItem('storage_token'))

function register() {
console.log("GGGdd")
username = document.getElementById("email").value;
password = document.getElementById("password").value;
business_name = document.getElementById("business").value;
street_address= document.getElementById("street").value;
city = document.getElementById("city").value;
// country = document.getElementById("country").value;
countrySelect = document.getElementById("country");
country = countrySelect.options[countrySelect.selectedIndex].value;

postcode = document.getElementById("postcodeFront").value;

console.log("https://gk6qzzv9s6.execute-api.ap-southeast-2.amazonaws.com/hatchd/auth/register?username="+username+"&password="+password+"&business_name="+business_name+"&street_address="+street_address+"&city="+city+"&country="+country+"&postcode="+postcode)
fetch("https://gk6qzzv9s6.execute-api.ap-southeast-2.amazonaws.com/hatchd/auth/register?username="+username+"&password="+password+"&business_name="+business_name+"&street_address="+street_address+"&city="+city+"&country="+country+"&postcode="+postcode, {
          method: 'POST', // *GET, POST, PUT, DELETE, etc.
          mode: 'cors', // no-cors, *cors, same-origin
          cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
          credentials: 'same-origin', // include, *same-origin, omit
          headers: {
          'Content-Type': 'application/json'
          },
          redirect: 'follow', // manual, *follow, error
          referrerPolicy: 'no-referrer', // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
      })
      .then(response => response.json())
      // .then(data => token = data.token)
      .then(data=>storeToken(data.token, data.user_id, data.storageToken));
}

function saveCustomer() {
console.log("JJJJSSS")
email = document.getElementById("email").value;
business_name = document.getElementById("new_customer_name").value;
street= document.getElementById("street").value;
city = document.getElementById("city").value;
// country = document.getElementById("country").value;
countrySelect = document.getElementById("country");
country = countrySelect.options[countrySelect.selectedIndex].value;
postcode = document.getElementById("postcode").value;

token = sessionStorage.getItem('hatchdtoken');

console.log("https://gk6qzzv9s6.execute-api.ap-southeast-2.amazonaws.com/hatchd/customer?token=" +token+"&business_name="+business_name+"&email="+email+"&street="+street+"&city="+city+"&postcode="+postcode+"&country="+country)
fetch("https://gk6qzzv9s6.execute-api.ap-southeast-2.amazonaws.com/hatchd/customer?token=" +token+"&business_name="+business_name+"&email="+email+"&street="+street+"&city="+city+"&postcode="+postcode+"&country="+country, {
  method: 'POST', // *GET, POST, PUT, DELETE, etc.
  mode: 'cors', // no-cors, *cors, same-origin
  cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
  credentials: 'same-origin', // include, *same-origin, omit
  headers: {
  'Content-Type': 'application/json'
  },
  redirect: 'follow', // manual, *follow, error
  referrerPolicy: 'no-referrer', // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
});

// var opt = '<option value="' + business_name + '">' +business_name + '</option>  ';
var newCustomer = document.createElement('option');
newCustomer.text = business_name;
newCustomer.value = business_name;
// newCustomer.innerHTML = opt;

console.log("bbbmmm  " + sessionStorage.getItem('storage_token'))

document.getElementById("customersDropDown").add(newCustomer);
showCustomerCreation();

// <select name="customers" id="customers">
//         <option value="Alex's Electronics">Alex's Electronics</option>



}

function login() {
  username = document.getElementById("email").value;
  password = document.getElementById("password").value;
  console.log("https://gk6qzzv9s6.execute-api.ap-southeast-2.amazonaws.com/hatchd/auth/login?username="+username+"&password="+password)
  fetch("https://gk6qzzv9s6.execute-api.ap-southeast-2.amazonaws.com/hatchd/auth/login?username="+username+"&password="+password, {
          method: 'POST', // *GET, POST, PUT, DELETE, etc.
          mode: 'cors', // no-cors, *cors, same-origin
          cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
          credentials: 'same-origin', // include, *same-origin, omit
          headers: {
          'Content-Type': 'application/json'
          },
          redirect: 'follow', // manual, *follow, error
          referrerPolicy: 'no-referrer', // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
      })
      .then(response => response.json())
      // .then(data => token = data.token)
      .then(data=>storeToken(data.token, data.user_id, data.storageToken));

}

function displayFutureJobs(jobs) {
console.log(jobs.length)
for (var i = 0; i < jobs.length; i++) 
{
  console.log(jobs[i]);
  newEntry = document.createElement("div");
  newEntry.classList.add('jobEntry');

  date = document.createElement("div");
  date.innerHTML = jobs[i].date.split("-").reverse().join("/");
  date.classList.add('jobNode');
  date.id = "dateNode";

  custName = document.createElement("div");
  custName.innerHTML = jobs[i].customer;
  custName.classList.add('jobNode');
  custName.id = "customer_name";

  amount = document.createElement("div");
  amount.innerHTML = jobs[i].amount;
  amount.classList.add('jobNode');
  amount.id = "amount";
  
  deleteNode = document.createElement("div");
  deleteNode.classList.add('jobNode');
  deleteNode.id = "deleteNode";
  delBut = document.createElement('button');
  delBut.id = "deleteButton";
  delBut.innerHTML = "Remove";
  delBut.setAttribute( "onClick", "javascript: deleteEntry(this)" );
  deleteNode.appendChild(delBut);

  newEntry.appendChild(date);
  newEntry.appendChild(custName);
  newEntry.appendChild(amount);
  newEntry.appendChild(deleteNode);
  
  document.getElementById('jobEntries').appendChild(newEntry);
}
}

function getFutureJobs() {
  console.log("asdasd")
storageToken = sessionStorage.getItem('storage_token')
fetch('https://gk6qzzv9s6.execute-api.ap-southeast-2.amazonaws.com/hatchd/future_jobs?token=' + storageToken, {
      method: 'GET', // *GET, POST, PUT, DELETE, etc.
      mode: 'cors', // no-cors, *cors, same-origin
      cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
      credentials: 'same-origin', // include, *same-origin, omit
      headers: {
        'Content-Type': 'application/json'
      },
      redirect: 'follow', // manual, *follow, error
      referrerPolicy: 'no-referrer', // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
  })
  .then(response => response.json())
  .then(data => displayFutureJobs(data));
}

function getPastJobs() {
  storageToken = sessionStorage.getItem('storage_token')
  fetch('https://gk6qzzv9s6.execute-api.ap-southeast-2.amazonaws.com/hatchd/past_jobs?token=' + storageToken, {
        method: 'GET', // *GET, POST, PUT, DELETE, etc.
        mode: 'cors', // no-cors, *cors, same-origin
        cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
        credentials: 'same-origin', // include, *same-origin, omit
        headers: {
          'Content-Type': 'application/json'
        },
        redirect: 'follow', // manual, *follow, error
        referrerPolicy: 'no-referrer', // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
    })
    .then(response => response.json())
    .then(data => displayFutureJobs(data));
  }


function displayData(data) {
document.getElementById("totInc").innerHTML="Total Income: $" + data.total_income;
document.getElementById("avgInc").innerHTML="Average montly income: $" + data.avg_monthly_income;
document.getElementById("estYrlyInc").innerHTML="Estimate yearly income: $" + data.estimated_yearly_income;
document.getElementById("estPAYGTax").innerHTML="Estimate PAYG tax: $" + data.estimated_PAYG_tax;
document.getElementById("estYrlyTaxPayable").innerHTML="Estimate yearly tax payable: $" + data.estimated_yearly_tax_payable;

}

function getData() {
storageToken = sessionStorage.getItem('storage_token')
fetch('https://eip7oa46q6.execute-api.ap-southeast-2.amazonaws.com/data/get?token=' + storageToken, {
      method: 'GET', // *GET, POST, PUT, DELETE, etc.
      mode: 'cors', // no-cors, *cors, same-origin
      cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
      credentials: 'same-origin', // include, *same-origin, omit
      headers: {
        'Content-Type': 'application/json'
      },
      redirect: 'follow', // manual, *follow, error
      referrerPolicy: 'no-referrer', // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
  })
  .then(response => response.json())
  .then(data => displayData(data));
}

if(sessionStorage.getItem("darkmode") == "dark") {
  if(document.getElementById("bird")){
      document.getElementById("bird").src = "owl2.png";
  }
  if(document.getElementById("back")){
    document.getElementById("back").src = "backDark.png";
  }
  document.getElementById("logo").src="logoDark.png"
  document.getElementById("darkModeButt").src="sun.png"
  darkMode=true;
  document.body.classList.toggle("dark-mode");
  document.documentElement.className = 'dark';
}
else {
  if(document.getElementById("bird")){
    document.getElementById("bird").src = "roostertrans.png";
  }
  if(document.getElementById("back")){
    document.getElementById("back").src = "back.png";
  }
  document.getElementById("logo").src="logo.png"
  document.getElementById("darkModeButt").src="moon.png"
  document.documentElement.className = 'light';
  darkMode = false;
}


function toggleDarkMode() {
  if(darkMode == false) {
    sessionStorage.setItem('darkmode', 'dark')
    if(document.getElementById("bird")){
      document.getElementById("bird").src = "owl2.png";
    }
    if(document.getElementById("back")){
      document.getElementById("back").src = "backDark.png";
    }
    document.getElementById("logo").src="logoDark.png"
    document.getElementById("darkModeButt").src="sun.png"

    document.documentElement.className = 'dark';
    darkMode=true;
  }
  else {
    sessionStorage.setItem('darkmode', 'light')
    darkMode=false;
    if(document.getElementById("bird")){
      document.getElementById("bird").src = "roostertrans.png";
    }
    if(document.getElementById("back")){
      document.getElementById("back").src = "back.png";
    }
    document.getElementById("logo").src="logo.png"
    document.getElementById("darkModeButt").src="moon.png"
    document.documentElement.className = 'light';
  }
  document.body.classList.toggle("dark-mode");

}

