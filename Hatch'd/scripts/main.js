
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
        "TaxableAmount": 100,
        "TaxSubtotalAmount": 10,
        "TaxID": "S",
        "TaxPercent": 10,
        "TaxSchemeID": "GST",
        "LegalLineExtension": 100,
        "TaxExclusiveAmount": 100,
        "TaxInclusiveAmount": 110,
        "PayableRoundingAmount": 0,
        "PayableAmount": 110,
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
    console.log("CASHMONEY " + document.getElementById("cost").value);

    var customerSelect = document.getElementById("customers");
    var selectedCustomer = customerSelect.options[customerSelect.selectedIndex].value;

    console.log(selectedCustomer);
    console.log(document.getElementById("cost").value);
    console.log(generateInvoice(selectedCustomer, document.getElementById("cost").value));

    fetch('https://seng-donut-deployment.herokuapp.com/json/convert', {
        method: 'POST', // *GET, POST, PUT, DELETE, etc.
        mode: 'cors', // no-cors, *cors, same-origin
        cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
        credentials: 'same-origin', // include, *same-origin, omit
        headers: {
          'Content-Type': 'application/json'
        },
        redirect: 'follow', // manual, *follow, error
        referrerPolicy: 'no-referrer', // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
        body: JSON.stringify(generateInvoice(selectedCustomer, document.getElementById("cost").value))
    })
    .then(response => response.text())
        .then(str => new window.DOMParser().parseFromString(str, "text/xml"))
        .then(data => console.log(data))
        .then(triggerPopup);
}

function triggerPopup() {
    document.getElementById("lodged_popup").style.display = "block";
    // setTimeout(() => {document.getElementById("lodged_popup").style.display = "block"}, 200);
    setTimeout(() => {document.getElementById("lodged_popup").style.display = "none"},3000);
    
}

