
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
        "SupplierPartyName": "Bob",
        "CustomerPartyName" : "Patrick",
        "CustomerStreet": "Gate 2, High Street",
        "CustomerAddStreet": "High Street",
        "CustomerCity": "Kensington",
        "CustomerPost": "2140",
        "CustomerCountry": "AU",
        "CustomerRegistration": "Awolako Enterprises Pty Ltd",
        "DueDate": document.getElementById("duedate"),
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

    // console.log("888");
    // console.log(document.getElementById("duedate").value);

    var customerSelect = document.getElementById("customers");
    var selectedCustomer = customerSelect.options[customerSelect.selectedIndex].value;


    console.log("lodging");
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
    .then(getToken(data));
        // .then(str => new window.DOMParser().parseFromString(str, "text/xml"))
        // .then(data => console.log("kkkl = " + data))
        // .then(data => getToken(data));
        // .then(triggerPopup());
}

function getToken(data) {
    // console.log("hh " + data);
    fetch("https://3snk1mux67.execute-api.ap-southeast-2.amazonaws.com/InvoiceStorage/auth/login?username=Frontend&password=Roo$ter100", {
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
        .then(data => data.token)
        .then(triggerPopup())
        // .then(token => storeInvoice(token, data));
}


// xml2 = `<?xml version="1.0" encoding="UTF-8"?>
// <Invoice xmlns="urn:oasis:names:specification:ubl:schema:xsd:Invoice-2" xmlns:cac="urn:oasis:names:specification:ubl:schema:xsd:CommonAggregateComponents-2" xmlns:cbc="urn:oasis:names:specification:ubl:schema:xsd:CommonBasicComponents-2" xmlns:cec="urn:oasis:names:specification:ubl:schema:xsd:CommonExtensionComponents-2">
//   <cac:AccountingCustomerParty>
//     <cac:Party>
//       <cac:PartyLegalEntity>
//         <cbc:RegistrationName>Awolako Enterprises Pty Ltd</cbc:RegistrationName>
//       </cac:PartyLegalEntity>
//       <cac:PartyName>
//         <cbc:Name>Patrick</cbc:Name>
//       </cac:PartyName>
//       <cac:PostalAddress>
//         <cac:Country>
//           <cbc:IdentificationCode>AU</cbc:IdentificationCode>
//         </cac:Country>
//         <cbc:AdditionalStreetName>High Street</cbc:AdditionalStreetName>
//         <cbc:CityName>Kensington</cbc:CityName>
//         <cbc:PostalZone>2140</cbc:PostalZone>
//         <cbc:StreetName>Gate 2, High Street</cbc:StreetName>
//       </cac:PostalAddress>
//     </cac:Party>
//   </cac:AccountingCustomerParty>
//   <cac:AccountingSupplierParty>
//     <cac:Party>
//       <cac:PartyIdentification>
//         <cbc:ID schemeID="0151">80647710156</cbc:ID>
//       </cac:PartyIdentification>
//       <cac:PartyLegalEntity>
//         <cbc:RegistrationName>Ebusiness Software Services Pty Ltd</cbc:RegistrationName>
//       </cac:PartyLegalEntity>
//       <cac:PartyName>
//         <cbc:Name>Bob   </cbc:Name>
//       </cac:PartyName>
//       <cac:PostalAddress>
//         <cac:Country>
//           <cbc:IdentificationCode>Australia</cbc:IdentificationCode>
//         </cac:Country>
//         <cbc:CityName>Sydney</cbc:CityName>
//         <cbc:StreetName>53 Tech Lane</cbc:StreetName>
//       </cac:PostalAddress>
//     </cac:Party>
//   </cac:AccountingSupplierParty>
//   <cac:AdditionalDocumentReference>
//     <cbc:ID>ebwasp1002</cbc:ID>
//   </cac:AdditionalDocumentReference>
//   <cac:InvoiceLine>
//     <cac:Item>
//       <cac:ClassifiedTaxCategory>
//         <cac:TaxScheme>
//           <cbc:ID>GST</cbc:ID>
//         </cac:TaxScheme>
//         <cbc:ID>5</cbc:ID>
//         <cbc:Percent>10</cbc:Percent>
//       </cac:ClassifiedTaxCategory>
//       <cbc:Name>Pencils</cbc:Name>
//     </cac:Item>
//     <cac:Price>
//       <cbc:BaseQuantity>1</cbc:BaseQuantity>
//       <cbc:PriceAmount currencyID="AUD">0.2</cbc:PriceAmount>
//     </cac:Price>
//     <cbc:ID>1</cbc:ID>
//     <cbc:InvoicedQuantity>500</cbc:InvoicedQuantity>
//     <cbc:LineExtensionAmount currencyID="AUD">100</cbc:LineExtensionAmount>
//   </cac:InvoiceLine>
//   <cac:LegalMonetaryTotal>
//     <cbc:LineExtensionAmount currencyID="AUD">100</cbc:LineExtensionAmount>
//     <cbc:PayableAmount currencyID="AUD">110</cbc:PayableAmount>
//     <cbc:PayableRoundingAmount currencyID="AUD">0</cbc:PayableRoundingAmount>
//     <cbc:TaxExclusiveAmount currencyID="AUD">100</cbc:TaxExclusiveAmount>
//     <cbc:TaxInclusiveAmount currencyID="AUD">110</cbc:TaxInclusiveAmount>
//   </cac:LegalMonetaryTotal>
//   <cac:PaymentMeans>
//     <cbc:PaymentID>EBWASP1002</cbc:PaymentID>
//     <cbc:PaymentMeansCode>1</cbc:PaymentMeansCode>
//   </cac:PaymentMeans>
//   <cac:PaymentTerms>
//     <cbc:Note>As agreed</cbc:Note>
//   </cac:PaymentTerms>
//   <cac:TaxTotal>
//     <cac:TaxSubtotal>
//       <cac:TaxCategory>
//         <cac:TaxScheme>
//           <cbc:ID>GST</cbc:ID>
//         </cac:TaxScheme>
//         <cbc:ID>S</cbc:ID>
//         <cbc:Percent>10</cbc:Percent>
//       </cac:TaxCategory>
//       <cbc:TaxAmount currencyID="AUD">10</cbc:TaxAmount>
//       <cbc:TaxableAmount currencyID="AUD">100</cbc:TaxableAmount>
//     </cac:TaxSubtotal>
//     <cbc:TaxAmount currencyID="AUD">10</cbc:TaxAmount>
//   </cac:TaxTotal>
//   <cbc:BuyerReference>EBWASP1002</cbc:BuyerReference>
//   <cbc:CustomizationID>urn:cen.eu:en16931:2017#conformant#urn:fdc:peppol.eu:2017:poacc:billing:international:aunz:3.0</cbc:CustomizationID>
//   <cbc:DocumentCurrencyCode>AUD</cbc:DocumentCurrencyCode>
//   <cbc:DueDate>2022-04-06</cbc:DueDate>
//   <cbc:ID>EBWASP1002</cbc:ID>
//   <cbc:InvoiceTypeCode>380</cbc:InvoiceTypeCode>
//   <cbc:IssueDate>2022-04-06</cbc:IssueDate>
//   <cbc:ProfileID>urn:fdc:peppol.eu:2017:poacc:billing:01:1.0</cbc:ProfileID>
//   <cbc:UBLVersionID>2.1</cbc:UBLVersionID>
// </Invoice>`

// token = "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1c2VyX2lkIjo4MTYyNjc1LCJzZXNzaW9uX2lkIjo3OTQ3MzZ9.IxB0I-IXIy5CUZ0bqe7Ghq4tt-SHyK5KSrwfY2nRljM";

// fer = "https://3snk1mux67.execute-api.ap-southeast-2.amazonaws.com/InvoiceStorage/invoice?token=" + token + "&xml_string=" + xml2;

// fer = fer.replace(/[\n\r]/g, '');

// console.log(fer);

// fetch(fer, {
//             method: 'POST', // *GET, POST, PUT, DELETE, etc.
//             mode: 'cors', // no-cors, *cors, same-origin
//             cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
//             credentials: 'same-origin', // include, *same-origin, omit
//             headers: {
//             'Content-Type': 'application/json'
//             },
//             redirect: 'follow', // manual, *follow, error
//             referrerPolicy: 'no-referrer', // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
//         });
//         // .then(response => response.json())
//         // .then(p => console.log("bbbbaaa   " + p));

function storeInvoice(token,xml) {
    console.log("NASDKNAS")
    
    fetch("https://3snk1mux67.execute-api.ap-southeast-2.amazonaws.com/InvoiceStorage/invoice?token=" + token + "&xml_string=" + xml, {
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
        .then(p => console.log("bbbbaaa   " + p));

}

function triggerPopup() {
    document.getElementById("lodged_popup").style.display = "block";
    // setTimeout(() => {document.getElementById("lodged_popup").style.display = "block"}, 200);
    setTimeout(() => {document.getElementById("lodged_popup").style.display = "none"},3000);
    
}

