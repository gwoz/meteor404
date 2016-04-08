$(document).ready(function(){

  $.ajax({
    url: 'https://data.nasa.gov/resource/gh4g-9sfh.json',
    data: {"id": "392"}
  }).done(function(response){
    var test = $(response)
    console.log(test)
  })




})
