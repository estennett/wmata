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
      console.log(data.data.Path);
      self.lines = data.data.Path
    })
  }

})();
