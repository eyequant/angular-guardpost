var guardpost = angular.module('guardpost', []);

guardpost.directive('guardpostCheck', ["$http", "mailgunKey", function ($http, mailgunKey) {
  return {
    require: 'ngModel',
    link: function (scope, element, attrs, ngModelCtrl) {
      var original;
      
      ngModelCtrl.didYouMean = null;

      ngModelCtrl.$formatters.unshift(function(modelValue) {
        original = modelValue;
        return modelValue;
      });

      ngModelCtrl.$parsers.push( function (viewValue) {
        if (viewValue && viewValue !== original ) {

          $http.jsonp('https://api:' + mailgunKey + '@api.mailgun.net/v2/address/validate?callback=JSON_CALLBACK', {
            method: 'GET',
            params: { address : viewValue }
          }).success(function(data, status) {
            ngModelCtrl.didYouMean = null;
            if (data.is_valid) {
              ngModelCtrl.$setValidity('guardpostCheck', true);
            } else {
              if (data.did_you_mean) {
                ngModelCtrl.didYouMean = data.did_you_mean
              }
              ngModelCtrl.$setValidity('guardpostCheck', false);
            }
          }).error(function(data, status) {
            console.log(data);
          });

          return viewValue;
        }});
    }};
}]);