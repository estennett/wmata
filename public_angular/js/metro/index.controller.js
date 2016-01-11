(function(){
  angular
  .module("wmata")
  .controller("LineIndexController", [
    "LineService",
    IndexControllerFunction
  ])

  function IndexControllerFunction(LineService){

    var self = this;

    LineService.ApiCall().then(function(data){
      self.lines = data.data.Path;
    })

    LineService.StationApiCall().then(function(data){
      console.log(data.data);
      self.stations = data.data;
    })
  }

})();
