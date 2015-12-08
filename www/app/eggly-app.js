angular.module('Eggly', [
    'ngAnimate',
    'ui.router',
    'categories',
    'categories.bookmarks',
    'ionic'
])
    .config(function ($stateProvider, $urlRouterProvider) {
        $stateProvider
            //abstract state serves as a PLACEHOLDER or NAMESPACE for application states
            .state('eggly', {
                url: '',
                abstract: true
            })
        ;

        $urlRouterProvider.otherwise('/');
    })
;
