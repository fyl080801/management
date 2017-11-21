define([
    'modules/manageui/configs'
], function (configs) {
    'use strict';

    configs.config([
        '$urlRouterProvider',
        '$stateProvider',
        function ($urlRouterProvider, $stateProvider) {
            $stateProvider.state('session', {
                url: '/session',
                templateUrl: 'modules/manageui/views/Session.html',
                requires: ['modules/manageui/requires']
            });

            $stateProvider.state('login', {
                url: '/login',
                templateUrl: 'modules/manageui/views/Login.html',
                requires: ['modules/manageui/requires'],
                data: {
                    title: '登录'
                }
            });

            $stateProvider.state('lock', {
                url: '/lock',
                templateUrl: 'modules/manageui/views/Lock.html',
                requires: ['modules/manageui/requires'],
                data: {
                    title: '锁定'
                }
            });

            $stateProvider.state('register', {
                url: '/register',
                templateUrl: 'modules/manageui/views/Register.html',
                requires: ['modules/manageui/requires'],
                data: {
                    title: '注册'
                }
            });

            $stateProvider.state('forgot', {
                url: '/forgot',
                templateUrl: 'modules/manageui/views/Forgot.html',
                requires: ['modules/manageui/requires'],
                data: {
                    title: '密码找回'
                }
            });

            $stateProvider.state('main', {
                url: '/main',
                templateUrl: 'modules/manageui/views/Main.html',
                requires: ['jquery-ui', 'metisMenu', 'modules/manageui/requires'],
                data: {
                    title: '管理系统'
                }
            });
        }
    ]);
});