define('modules.room.module', [
    'app.application',
    'modules.room.configs.menus',
    'modules.room.configs.provide',
    'ng-table'
], function (application) {
    'use strict';

    application.requires.push('modules.room');

    return angular
        .module('modules.room', [
            'ui.router',
            'ngTable',
            'modules.manageui',
            'modules.room.configs'
        ])
        .config([
            '$urlRouterProvider',
            function ($urlRouterProvider) {
                $urlRouterProvider.otherwise('/login');
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