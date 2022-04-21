
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
        .then(data => data.token)
        .then(data => getInvoices(data));
        // return token;

        // .then(data => getInvoices(data.token));
}

// getToken()
// .then(getInvoices());

function getInvoice (invoice) {
    console.log("JASDKASDK " + invoice);
}

// var xmltext = "<sometag><someothertag></someothertag></sometag>";

function downloadXML(xmltext, invoiceName) {
    var filename = invoiceName + ".xml";
    var pom = document.createElement('a');
    var bb = new Blob([xmltext], {type: 'text/plain'});
    
    pom.setAttribute('href', window.URL.createObjectURL(bb));
    pom.setAttribute('download', filename);
    
    pom.dataset.downloadurl = ['text/plain', pom.download, pom.href].join(':');
    pom.draggable = true; 
    pom.classList.add('dragout');
    
    pom.click()
}

function downloadInit(token, id) {
  console.log("POG")
  fetch("https://3snk1mux67.execute-api.ap-southeast-2.amazonaws.com/InvoiceStorage/invoice?token=" + token + "&invoice_id=" + id, {
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
  .then(xml => downloadXML(xml, "Invoice" +id));
}

function deleteEntry(button) {
  button.parentElement.parentElement.remove()
}

function displayPastJobs(jobs) {
  console.log(jobs.length)
  for (var i = 0; i < jobs.length; i++) 
  {
    console.log(jobs[i]);
    invoice_id = jobs[i].id;
    console.log(invoice_id);
    newEntry = document.createElement("div");
    newEntry.classList.add('jobEntry');
  
    date = document.createElement("div");
    date.innerHTML = jobs[i].date.split("-").reverse().join("/");
    date.classList.add('jobNode');
    date.id = "dateNode";
  
    custName = document.createElement("div");
    custName.innerHTML = jobs[i].customer;
    custName.classList.add('jobNode');
    custName.id = "customer_name_history";
  
    amount = document.createElement("div");
    amount.innerHTML = jobs[i].amount;
    amount.classList.add('jobNode');
    amount.id = "amount";
    
    downloadNode = document.createElement("div");
    downloadNode.classList.add('jobNode');
    downloadNode.id = "downloadNodeHistory";
    downloadBut = document.createElement('button');
    downloadBut.id = "deleteButton";
    downloadBut.innerHTML = "Download";
    downloadBut.onclick = function downloadInit() {
      console.log("POG")
      console.log("https://3snk1mux67.execute-api.ap-southeast-2.amazonaws.com/InvoiceStorage/invoice?token=" + sessionStorage.getItem("storage_token") + "&invoice_id=" + invoice_id)
      fetch("https://3snk1mux67.execute-api.ap-southeast-2.amazonaws.com/InvoiceStorage/invoice?token=" + sessionStorage.getItem("storage_token") + "&invoice_id=" + invoice_id, {
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
      .then(xml => downloadXML(xml, "Invoice" +invoice_id));
    }
    downloadNode.appendChild(downloadBut);
  

    deleteNode = document.createElement("div");
    deleteNode.classList.add('jobNode');
    deleteNode.id = "deleteNode2";
    delBut = document.createElement('button');
    delBut.id = "deleteButton";
    delBut.innerHTML = "Remove";
    delBut.setAttribute( "onClick", "javascript: deleteEntry(this)" );
    deleteNode.appendChild(delBut);
  
    newEntry.appendChild(date);
    newEntry.appendChild(custName);
    newEntry.appendChild(amount);
    newEntry.appendChild(downloadNode);
    newEntry.appendChild(deleteNode);


    
    document.getElementById('jobEntries').appendChild(newEntry);
  }
  }

function getPastJobs() {
  storageToken = sessionStorage.getItem('storage_token')
  console.log('https://gk6qzzv9s6.execute-api.ap-southeast-2.amazonaws.com/hatchd/past_jobs?token=' + storageToken)
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
    .then(data => displayPastJobs(data));
  }

async function getInvoices(token) {
    // await getToken();
    console.log("JNASKNA " + token);
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
  
  function deleteHistoryEntry(elem) {
    $(elem).parent('div').remove();
  }

  function logout() {
    sessionStorage.clear();
    window.location.replace("login.html");
  
  }