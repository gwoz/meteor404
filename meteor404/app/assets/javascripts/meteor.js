meteorArray = []

var Meteor = function(lat, long){
  this.lat = lat;
  this.long = long;
}

$(document).ready(function(){
  $.ajax({
    url: 'https://data.nasa.gov/resource/gh4g-9sfh.json'
  }).done(function(response){


  for (var i = 0; i < response.length; i ++){

    var meteor = new Meteor(response[i].reclat, response[i].reclong)
    meteorArray.push(meteor)
    } //closes for loop
    debugger;
    console.log(meteorArray)
  }) //closes done
}) //closes document.ready

var map;
function initMap() {
  map = new google.maps.Map(document.getElementById('map'), {
    center: {lat: 40.7128, lng: -74.0059},
    zoom: 6
  });

var Postion = function(usrLat, usrLng){
   new google.maps.Marker({
    position:{lat: usrLat, lng: usrLng},
    map: map,
    title: 'meteor'
  });
}
  console.log(meteorArray[0])
  // new Postion(40.46579843567, -75);
  // new Postion(40.5, -75.23);
  // new Postion(40.8, -75.49);
  // new Postion(40.9, -75.1241);
  // new Postion(40.1, -75.6);
}
