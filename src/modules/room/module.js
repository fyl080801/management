define('modules.room.module', [
    'app.application',
    'modules.room.configs.menus',
    'modules.room.configs.provide',
    'ui-switch',
    'ng-table'
], function (application) {
    'use strict';

    application.requires.push('modules.room');

    return angular
        .module('modules.room', [
            'ui.router',
            'uiSwitch',
            'ngTable',
            'modules.manageui',
            'modules.room.configs'
        ])
        .config([
            '$urlRouterProvider',
            '$stateProvider',
            function ($urlRouterProvider, $stateProvider) {
                $urlRouterProvider.otherwise('/login');

                $stateProvider
                    .state('main.roomhome', {
                        url: '/roomhome',
                        dependencies: ['modules.room.requires'],
                        views: {
                            'home': {
                                templateUrl: 'views/room/Home.html'
                            },
                            'bar': {
                                templateUrl: 'views/room/Bar.html'
                            }
                        }
                    });
            }
        ])
        .run([
            '$globalStore',
            function ($appEnvironment) {
                $appEnvironment.user = {
                    Username: '未知用户',
                    Rolename: '未知类别'
                };
            }
        ]);
});