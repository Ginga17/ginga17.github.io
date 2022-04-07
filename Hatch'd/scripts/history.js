
async function getToken() {
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
        .then(data => getInvoices(data));
        // return token;

        // .then(data => getInvoices(data.token));
}

getToken()
// getToken()
// .then(getInvoices());

function getInvoice (invoice) {
    console.log("JASDKASDK " + invoice);
}

// var xmltext = "<sometag><someothertag></someothertag></sometag>";

function downloadXML(xmltext, invoiceName) {
    var filename = invoiceName + ".xml";
    var pom = document.createElement('a');
    ppp = `<?xml version="1.0" encoding="UTF-8" standalone="no"?>
    <Invoice xmlns="urn:oasis:names:specification:ubl:schema:xsd:Invoice-2" xmlns:cac="urn:oasis:names:specification:ubl:schema:xsd:CommonAggregateComponents-2" xmlns:cbc="urn:oasis:names:specification:ubl:schema:xsd:CommonBasicComponents-2" xmlns:cec="urn:oasis:names:specification:ubl:schema:xsd:CommonExtensionComponents-2">
       <cbc:UBLVersionID>2.1</cbc:UBLVersionID>
       <cbc:IssueDate>2022-02-07</cbc:IssueDate>
       <cac:AccountingSupplierParty>
             <cac:PartyName>
                <cbc:Name>Ebusiness Software Services Pty Ltd</cbc:Name>
             </cac:PartyName>
             <cac:PostalAddress>
                <cbc:StreetName>100 Business St</cbc:StreetName>
                <cbc:CityName>Dulwich Hill</cbc:CityName>
                <cbc:PostalZone>2203</cbc:PostalZone>
                <cac:Country>
                   <cbc:IdentificationCode listAgencyID="6" listID="ISO3166-1:Alpha2">AU</cbc:IdentificationCode>
                </cac:Country>
             </cac:PostalAddress>
       </cac:AccountingSupplierParty>
       <cac:AccountingCustomerParty>
          <cac:Party>
             <cac:PartyName>
                <cbc:Name>Jenny's Autorepair</cbc:Name>
             </cac:PartyName>
             <cac:PostalAddress>
                <cbc:StreetName>12 High Street</cbc:StreetName>
                <cbc:CityName>Kensington</cbc:CityName>
                <cbc:PostalZone>2033</cbc:PostalZone>
                <cac:Country>
                   <cbc:IdentificationCode listAgencyID="6" listID="ISO3166-1:Alpha2">AU</cbc:IdentificationCode>
                </cac:Country>
             </cac:PostalAddress>
          </cac:Party>
       </cac:AccountingCustomerParty>
       <cac:LegalMonetaryTotal>
          <cbc:LineExtensionAmount currencyID="AUD">100.00</cbc:LineExtensionAmount>
          <cbc:TaxExclusiveAmount currencyID="AUD">100.00</cbc:TaxExclusiveAmount>
          <cbc:TaxInclusiveAmount currencyID="AUD">100.00</cbc:TaxInclusiveAmount>
          <cbc:PayableRoundingAmount currencyID="AUD">0.00</cbc:PayableRoundingAmount>
          <cbc:PayableAmount currencyID="AUD">100.00</cbc:PayableAmount>
       </cac:LegalMonetaryTotal>
    </Invoice>`
    var bb = new Blob([ppp], {type: 'text/plain'});
    
    pom.setAttribute('href', window.URL.createObjectURL(bb));
    pom.setAttribute('download', filename);
    
    pom.dataset.downloadurl = ['text/plain', pom.download, pom.href].join(':');
    pom.draggable = true; 
    pom.classList.add('dragout');
    
    pom.click()
}

function displayInvoices(invoices, token) {
    console.log("nnnnA");
    for (i in invoices) {
        console.log("ttt");

        btn = document.createElement("button");
        btn.innerHTML = "Download invoice " + invoices[i];
        btn.classList.add('download_button');
        btn.onclick = function( ) {
            fetch("https://3snk1mux67.execute-api.ap-southeast-2.amazonaws.com/InvoiceStorage/invoice?token=" + token + "&invoice_id=" + invoices[i], {
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
            .then(response => response.text())
            .then(xml => downloadXML(xml, "Invoice" +invoices[i]));
            // .then(str => new window.DOMParser().parseFromString(str, "text/xml"))
            // .then(data => console.log(data));
            console.log("PSADNOJKANSJDNJKN");
        }//getInvoice(invoices[i]);
        document.getElementById("invoices").appendChild(btn)
    }
}

async function getInvoices(token) {
    // await getToken();
    fetch("https://3snk1mux67.execute-api.ap-southeast-2.amazonaws.com/InvoiceStorage/invoices?token=" + token, {
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
    // .then(data => console.log(data))
    .then(data => displayInvoices(data, token));
}
