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
    }

    function ApiCall() {
        return $http({
          method: 'GET',
          url: "http://localhost:4000/linedata"
        })
      }//end ApiCall function

    };// end ServiceFunction
}());
