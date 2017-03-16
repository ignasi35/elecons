angular.module('EleconsApp')
.config( function ($httpProvider) {
    $httpProvider.interceptors.push('AuthInterceptor')
  })
.config(function($routeProvider){
  $routeProvider
      .when('/',{
        templateUrl: '/templates/home.html',
      })
      .when('/login',{
        templateUrl: '/templates/login.html',
        controller: 'LoginCtrl'
      })
      .when('/register',{
        templateUrl: '/templates/register.html',
        controller: 'RegisterCtrl'
      })
      .when('/private',{
        templateUrl: '/templates/private.html',
        controller: 'PrivateCtrl',
        resolve : {
          'auth' : AuthFactory =>  AuthFactory.isLoggedIn()
        }
      })
      .when('/dashboard', {
          templateUrl: '/templates/dashboard.html',
          controller: 'DashboardController',
          controllerAs: 'vm'
      })
      .when('/neighbours', {
          templateUrl: '/templates/neighbours.html',
          controller: 'NeighboursController',
          controllerAs: 'vm'
      })
      .when('/charts', {
          templateUrl: '/templates/charts.html',
          controller: 'ChartsController',
          controllerAs: 'vm'
      })
      .when('/power', {
          templateUrl: '/templates/power.html',
          controller: 'getConsumptionController',
          controllerAs: 'vm'
      })
      .when('/prices', {
          templateUrl: '/templates/prices.html',
          controller: 'PricesController'
      })
      // .when('/dashboard', {
      //     templateUrl: '/templates/dashboard.html',
      //     controller: 'getConsumptionController',
      //     controllerAs: 'vm'
      // })
      .when('/user', {
          templateUrl: '/templates/user.html'
      })
      .otherwise('/home')
  })

.run(function($rootScope, $location, StorageFactory, AuthFactory){

      if ( AuthFactory.isLoggedIn() ) {
        const token = StorageFactory.readToken()
        AuthFactory.setCredentials(token)
      }

      $rootScope.$on('$routeChangeError', function(next, current, previous, rejection){
          if(rejection === 'Not Authenticated'){
              $location.path('/login');
          }
      })
    })