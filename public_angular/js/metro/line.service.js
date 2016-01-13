"use strict";

(function(){
  angular
  .module("wmata")
  .service("LineService", [
    "$http",
    ServiceFunction
  ]);

//revealing module pattern

  function ServiceFunction($http) {

    return {
      ApiCall : ApiCall,
      StationApiCall : StationApiCall
    }

    function ApiCall() {
        return $http({
          method: 'GET',
          url: "http://localhost:4000/linedata/silver"
        })
      }//end ApiCall function

    function StationApiCall(){
      return $http({
        method: 'GET',
        url: "http://localhost:4000/stations"
      })
    }

    };// end ServiceFunction
}());
