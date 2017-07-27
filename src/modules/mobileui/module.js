define('modules.mobileui.module', [
    'app.application'
], function (application) {
    'use strict';

    application.requires.push('modules.mobileui');

    return angular
        .module('modules.mobileui', [
            'ui.router'
        ])
        .config([
            '$urlRouterProvider',
            '$stateProvider',
            function ($urlRouterProvider, $stateProvider) {
                $urlRouterProvider.otherwise('/mobilelogin');

                $stateProvider.state('mobilelogin', {
                    url: '/mobilelogin',
                    templateUrl: 'views/mobileui/Login.html',
                    dependencies: ['modules.mobileui.requires']
                });

                $stateProvider.state('mobilemain', {
                    url: '/mobilemain',
                    templateUrl: 'views/mobileui/Main.html',
                    dependencies: ['modules.mobileui.requires']
                });

                $stateProvider.state('mobilemain.door', {
                    url: '/door',
                    templateUrl: 'views/mobileui/Door.html',
                    dependencies: ['modules.mobileui.requires']
                });
            }
        ]);
});