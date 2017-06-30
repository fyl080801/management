define('modules.manageui.module', [
    'app.application',
    'modules.manageui.configs.appStates',
    'modules.manageui.configs.state',
    'modules.manageui.configs.linkManager',
    'modules.manageui.configs.httpConfig'
], function (application) {
    'use strict';

    application.requires.push('modules.manageui');

    return angular
        .module('modules.manageui', [
            'ui.router',
            'modules.manageui.configs'
        ])
        .config([
            '$urlRouterProvider',
            '$stateProvider',
            function ($urlRouterProvider, $stateProvider) {
                $urlRouterProvider.otherwise('/login');

                $stateProvider
                    .state('session', {
                        url: '/session',
                        templateUrl: 'views/manageui/Session.html',
                        dependencies: ['modules.manageui.requires']
                    });

                $stateProvider
                    .state('login', {
                        url: '/login',
                        templateUrl: 'views/manageui/Login.html',
                        dependencies: ['modules.manageui.requires'],
                        data: {
                            title: '登录'
                        }
                    });

                $stateProvider
                    .state('lock', {
                        url: '/lock',
                        templateUrl: 'views/manageui/Lock.html',
                        dependencies: ['modules.manageui.requires'],
                        data: {
                            title: '锁定'
                        }
                    });

                $stateProvider
                    .state('register', {
                        url: '/register',
                        templateUrl: 'views/manageui/Register.html',
                        dependencies: ['modules.manageui.requires'],
                        data: {
                            title: '注册'
                        }
                    });

                $stateProvider
                    .state('main', {
                        url: '/main',
                        templateUrl: 'views/manageui/Main.html',
                        dependencies: ['metisMenu', 'modules.manageui.requires'],
                        data: {
                            title: '管理系统'
                        }
                    });
            }
        ])
        .run([
            '$rootScope',
            '$appStates',
            function ($rootScope, $appStates) {
                $rootScope.$on('$stateChangeSuccess', function (event, toState, toParams, fromState, fromParams) {
                    $rootScope.navigation = [];
                    findState($appStates, toState.url, $rootScope.navigation);
                    $rootScope.navigation.push({
                        text: toState.text
                    });
                });

                function findState(states, find, result) {
                    $.each(states, function (index, item) {
                        if (find.indexOf(item.url) === 0 && find !== item.url) {
                            result.push({
                                url: item.url,
                                text: item.text
                            });
                            findState(states, item.url, result);
                        }
                    })
                }
            }
        ]);
});