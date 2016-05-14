meteorArray = []

var map1;
function initMap() {
  map1 = new google.maps.Map(document.getElementById('map'), {
    center: {lat: 40.7128, lng: -74.0059},
    zoom: 6
  });

  var Meteor = function(lat, lng, name){
    this.lat = lat;
    this.lng = lng;
    this.name = name;
  }

  var Position = function(usrLat, usrLng, name){
     new google.maps.Marker({
      position:{lat: usrLat, lng: usrLng},
      map: map1,
      title: 'meteor',
      customInfo: name
      // icon: "<img src='/images/rock.png'>"
    });
  }

  var populateMeteors = function(response){
    for(var i = 0; i < response.length; i ++){
      meteorArray.push(new Meteor(parseFloat(response[i].reclat), parseFloat(response[i].reclong), response[i].name))
    }
    return meteorArray;
  }

  $(document).ready(function(){
    $.ajax({
      url: 'https://data.nasa.gov/resource/gh4g-9sfh.json',
      data: {fall: "Fell"}
    }).done(function(response){
      populateMeteors(response);
      // for loop creating all meteor objects
      // for (var i = 0; i < meteorArray.length; i ++){
      //   new Position(meteorArray[i].lat, meteorArray[i].lng, meteorArray[i].name)
      // }
      //var marker = new Position(meteorArray[0].lat, meteorArray[0].lng, meteorArray[0].name)
      var marker = new google.maps.Marker({
      position:{lat: meteorArray[0].lat, lng: meteorArray[0].lng},
      map: map1,
      title: 'meteor',
      customInfo: meteorArray[0].name
      // icon: "<img src='/images/rock.png'>"
    });
      marker.addListener('click', function() {
      alert("jfwiojoi");
      })
    });
  })

  // // search bar
  // var input = document.getElementById('google-search-bar');
  // var searchBox = new google.maps.places.SearchBox(input);
  // map.controls[google.maps.ControlPosition.TOP_LEFT].push(input);
}





