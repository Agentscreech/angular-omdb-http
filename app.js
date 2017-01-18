var app = angular.module("MovieApp", []);
app.controller("MovieCtrl", ["$scope", "$http",
    function($scope, $http) {
  $scope.searchTerm = '';
  $scope.results = undefined;

  $scope.$watch('searchTerm', function(newVal, oldVal) {
    $scope.search();
  });

  $scope.search = function() {
    var req = {
      url: 'http://api.giphy.com/v1/gifs/search?q='+$scope.searchTerm+'&api_key=dc6zaTOxFJmzC',
      method: "GET",
      params: {
        s: $scope.searchTerm
      }
    };

    $http(req).then(function success(res) {
      console.log("HTTP success:", res);
      if (res.data.Error === "Image not found!") {
        $scope.results = [];
      } else {
        $scope.results = res.data.data;
      }
    }, function failure(res) {
      $scope.results = [];
      console.log("HTTP failed:", res);
    });
    };
}]);
