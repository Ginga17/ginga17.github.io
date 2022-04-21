function getPostalAddress() {
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
    .then(data => initMap(data));
  }
  


  function initMap(data) {
    //extract postal address from returned dictionary;
  const list_add = [];
  const list_cust = [];
  const list_amt = [];
  const list_date = [];
  for (var index = 0; index < data.length; index++) 
  {
    list_add.push(data[index].address);
    list_cust.push(data[index].customer);
    list_amt.push(data[index].amount);
    list_date.push(data[index].date);
  }
  console.log(list_add);
    const geocoder = new google.maps.Geocoder();
    const map = new google.maps.Map(document.getElementById("map"), {
      zoom: 8,
      center: { lat: -33.865, lng: 151.209 },
    });
  
      geocodeAddress(list_add,list_cust,list_amt,list_date,geocoder, map);
  }
  
  function geocodeAddress(paddress,customer,amount,date,geocoder, map) {
    //add = ["UNSW Sydney, AU","133A Derby St,Sydney,AU"];
    for(let i = 0; i < paddress.length ;i++){
      const infowindow = new google.maps.InfoWindow({
        content:'<style>p {font-family:Roboto;font-size: 15px;text-align:left;}</style>'+ '<p><b>Customer: </b>'  + customer[i] + '<br><b>Address: </b>'+ paddress[i] + '<br><b>Amount: </b>'+ amount[i] + '<br><b>Due-date: </b>' + date[i].split("-").reverse().join("/") + '<br><a href="home.html">Click to view upcoming jobs</a></p>',
        //cust[i] + "hello" + add[i],
      });
      geocoder
        .geocode({
          address: paddress[i],
        })
        .then(({ results }) => {
          map.setCenter(results[0].geometry.location);
          const marker = new google.maps.Marker({
            map,
            position: results[0].geometry.location,
          });
    
          marker.addListener("click", () => {
            infowindow.open({
              anchor: marker,
              map,
              shouldFocus: false,
            });
          });
        })
        .catch((e) =>
          window.alert("Geocode was not successful for the following reason: " + e)
        );
    }
  }

  function logout() {
    sessionStorage.clear();
    window.location.replace("login.html");
  
  }

  
