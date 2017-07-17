define('modules.manageui.module', [
    'app.application',
    'modules.manageui.configs.factories',
    'modules.manageui.configs.provide',
    'modules.manageui.configs.state',
    'modules.manageui.configs.routes',
    'modules.manageui.configs.linkManager',
    'modules.manageui.configs.tab',
    'modules.manageui.configs.httpConfig',
    'ng-table'
], function (application) {
    'use strict';

    application.requires.push('modules.manageui');

    return angular
        .module('modules.manageui', [
            'ui.router',
            'ngTable',
            'modules.manageui.configs'
        ])
        .config([
            '$sceDelegateProvider',
            function ($sceDelegateProvider) {
                $sceDelegateProvider
                    .resourceUrlWhitelist([
                        'self',
                        'http://www.baidu.com/**'
                    ]);
            }
        ])
        .run([
            '$appEnvironment',
            function ($appEnvironment) {
                $appEnvironment.user = {
                    Username: '未知用户',
                    Rolename: '未知类别'
                };
            }
        ]);
});