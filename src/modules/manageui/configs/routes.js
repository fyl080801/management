define('modules.manageui.configs.routes', [
    'modules.manageui.configs'
], function (configs) {
    'use strict';

    configs.config([
        '$urlRouterProvider',
        '$stateProvider',
        function ($urlRouterProvider, $stateProvider) {
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
                .state('forgot', {
                    url: '/forgot',
                    templateUrl: 'views/manageui/Forgot.html',
                    dependencies: ['modules.manageui.requires'],
                    data: {
                        title: '密码找回'
                    }
                });

            $stateProvider
                .state('main', {
                    url: '/main',
                    templateUrl: 'views/manageui/Main.html',
                    dependencies: ['jquery-ui', 'metisMenu', 'modules.manageui.requires'],
                    data: {
                        title: '管理系统'
                    }
                });
        }
    ]);
});