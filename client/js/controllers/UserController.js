(function () {
  'use strict'
    angular
        
        .module('EleconsApp')
        .controller('UserController', UserController)
        
          function UserController ($scope, $route, ApiFactory, $rootScope) {
            $scope.$route = $route;
            //var vm = this;
            const id = $scope.loggedUser.id
            
              $scope.updateUser = function(e) {
                e.preventDefault()
                let { firstName, lastName, email, contractedPower, energyTariff, updatedAt, urlCurrentPower} = $scope
                $rootScope.firstName =  firstName 
                $rootScope.lastName =  lastName 
                $rootScope.email =  email 
                $rootScope.contractedPower =  contractedPower
                $rootScope.energyTariff =  energyTariff
                $rootScope.updatedAt =  updatedAt
                $rootScope.urlCurrentPower =  urlCurrentPower


                ApiFactory.updateUser(id, firstName, lastName, email, contractedPower, energyTariff, updatedAt, urlCurrentPower)
                  .then(function(user) {
                    $scope.user = user
                  })

                alert("Your data has been updated correctly!!")

              };
        }
})()
