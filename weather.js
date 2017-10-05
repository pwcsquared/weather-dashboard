$(document).ready(function(){

    var geoOptions = {
      enableHighAccuracy: false, 
      maximumAge        : 30000, 
      timeout           : 27000
    };

    var geoFailure = function(err){
      var output = document.getElementById("loc");
      if(err.code === 1){
        output.innerText = "this app requires geolocation permissions to work";
      } else if (err.code === 2){
        output.innerText = "geolocation failed, couldn't load weather";
      }
    }

    var geoSuccess = function(position){
      var coords = [position.coords.latitude,position.coords.longitude];
        $.ajax({ 
          type: "GET",
          url: "https://api.openweathermap.org/data/2.5/weather?lat=" + coords[0] + "&lon=" + coords[1] + "&APPID=36ad09881afa5effbafe0f538f5b701b",
          cache: false,
          error: function(){
            alert("API call failed, are you viewing this on the https page?");
          },
          dataType: 'jsonp',
          success: function(data){
            document.getElementById("btnF").style.opacity = 1;
            document.getElementById("btnC").style.opacity = 1;
            var tempF = Math.round((1.8 * (data.main.temp - 273)) + 32);
            var tempC = Math.round(data.main.temp - 273);
            var icon = data.weather[0].icon;
            console.log(icon);
            var iconAddr = "http://openweathermap.org/img/w/" + data.weather[0].icon +".png";
            var condition = data.weather[0].description;
            var capitalize = function(word){
              return word.replace(word[0], word[0].toUpperCase());
            }
            var windSpeed = data.wind.speed;
            var windDeg = data.wind.deg;
            var windDir;
            //switch statement to control background image based on icon data
            switch(icon){
              case "01d":
                $("body").css("background-image","url('https://wallpapercave.com/wp/Knj52xR.jpg')");
                break;
              case "02d":
                $("body").css("background-image","url('https://static.pexels.com/photos/3590/nature-sky-sunny-clouds.jpg')");
                break;
              case "03d":
                $("body").css("background-image","url('https://coclouds.com/wp-content/uploads/2014/11/afternoon-various-clouds-2014-07-11.jpg')");
                break;
              case "04d":
                $("body").css("background-image","url('http://bovitz.com/bovitz.com/photo/traditional/jpgphotos/2006/2006-07/Broken-clouds.jpg')");
                break;
              case "09d":
              case "10d":
                $("body").css("background-image","url('https://www.onehdwallpaper.com/wp-content/uploads/2015/06/Rainy-Night-Desktop-Wallpapers.jpg')");
                break;
              case "11d":
                $("body").css("background-image","url('https://i.imgur.com/P1toDJ5.jpg')");
                break;
              case "13d":
                $("body").css("background-image","url('http://miriadna.com/desctopwalls/images/max/Snowy-bridge.jpg')");
                break;
              case "50d":
                $("body").css("background-image","url('https://upload.wikimedia.org/wikipedia/commons/2/24/Southern_California_Coastal_Range_in_Mist.jpg')");
                break;
              case "01n":
                $("body").css("background-image","url('https://cdn.pcwallart.com/images/starry-night-wallpaper-2.jpg')");
                break;
              case "02n":
                $("body").css("background-image","url('https://www.flitemedia.com/wp-content/uploads/2015/06/NLC-Panorama-3rd-July-2014-3-49am.jpg')");
                break;
              case "03n":
                $("body").css("background-image","url('http://p1.pichost.me/i/71/1956452.jpg')");
                break;
              case "04n":
                $("body").css("background-image","url('https://pre15.deviantart.net/3094/th/pre/f/2013/234/3/8/full_moon___cloudy_night__magic_by_radutataru-d6j8z3m.jpg')");
                break;
              case "09n":
              case "10n":
                $("body").css("background-image","url('https://mastersreview.com/files/2014/04/the-rain.jpg')");
                break;
              case "11n":
                $("body").css("background-image","url('http://photo.sf.co.ua/g/29/8.jpg')");
                break;
              case "13n":
                $("body").css("background-image","url('https://mota.ru/upload/wallpapers/source/2011/11/16/09/00/28601/mota_ru_1111622.jpg')");
                break;
              case "50n":
                $("body").css("background-image","url('https://2.bp.blogspot.com/-UHSbJrVpwHg/UMmbntniPtI/AAAAAAAAAaA/Sf2vdyq2r2w/s1600/DSC_4290+copy.jpg')");
                break;
            }
            //logic for wind direction
            if (windDeg <= 11.25){
              windDir = "N";
            } else if (windDeg <= 33.75){
              windDir = "NNE";
            } else if (windDeg <= 56.25){
              windDir = "NE";
            } else if (windDeg <= 78.75){
              windDir = "ENE";
            } else if (windDeg <= 101.25){
              windDir = "E";
            } else if (windDeg <= 123.75){
              windDir = "ESE";
            } else if (windDeg <= 146.25){
              windDir = "SE";
            } else if (windDeg <= 168.75){
              windDir = "SSE";
            } else if (windDeg <= 191.25){
              windDir = "S";
            } else if (windDeg <= 213.75){
              windDir = "SSW";
            } else if (windDeg <= 236.25){
              windDir = "SW";
            } else if (windDeg <= 258.75){
              windDir = "WSW";
            } else if (windDeg <= 281.25){
              windDir = "W";
            } else if (windDeg <= 303.75){
              windDir = "WNW";
            } else if (windDeg <= 326.25){
              windDir = "NW";
            } else if (windDeg <= 348.75){
              windDir = "NNW";
            } else if (windDeg <= 360){
              windDir = "N";
            }
            $("#loc").html("Current Weather in " + data.name + ": " + capitalize(condition));
            $("#windSpeed").html("Wind: " + windDir + " " + (windSpeed * 2.2369).toFixed(2) + " mph");
            $("#temp").html(tempF + "°");
            //buttons to change between metric and imperial
            $("#btnF").click(function(){
              $("#temp").html(tempF + "°");
              $("#btnF").removeClass("btn-info").addClass("btn-primary");
              $("#btnC").removeClass("btn-primary").addClass("btn-info");
              $("#windSpeed").html("Wind: " + windDir + " " + (windSpeed * 2.2369).toFixed(2) + " mph");
            });
            $("#btnC").click(function(){
              $("#temp").html(tempC + "°");
              $("#btnC").removeClass("btn-info").addClass("btn-primary");
              $("#btnF").removeClass("btn-primary").addClass("btn-info");
              $("#windSpeed").html("Wind: " + windDir + " " + (windSpeed) + " m/s");
            });
            $("#icon").attr('src',iconAddr);
            $("#condition").html(data.weather[0].main);
            $("#humidity").html("Humidity: " + data.main.humidity + "%");
          }
        });
    }
    //});
    navigator.geolocation.getCurrentPosition(geoSuccess,geoFailure,geoOptions);
});