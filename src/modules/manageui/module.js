define('modules.manageui.module', [
    'app.application',
    'modules.manageui.configs.provide',
    'modules.manageui.configs.state',
    'modules.manageui.configs.routes',
    'modules.manageui.configs.linkManager',
    'modules.manageui.configs.tab',
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
            '$sceDelegateProvider',
            function ($sceDelegateProvider) {
                $sceDelegateProvider
                    .resourceUrlWhitelist([
                        'self',
                        'http://www.baidu.com/**'
                    ]);
            }
        ]);
    // .run([
    //     '$rootScope',
    //     '$appStates',
    //     function ($rootScope, $appStates, tabManager) {
    //         $rootScope.$on('$stateChangeStart', function (event, toState, toParams, fromState, fromParams) {
    //             if (toState.target) {
    //                 tabManager.open(toState.tab, toState);
    //             }
    //         });

    //         $rootScope.$on('$stateChangeSuccess', function (event, toState, toParams, fromState, fromParams) {
    //             $rootScope.navigation = [];
    //             findState($appStates, toState.url, $rootScope.navigation);
    //             $rootScope.navigation.push({
    //                 text: toState.text
    //             });

    //             if (toState.target) {
    //                 tabManager.active(toState.tab);
    //             }
    //         });

    //         function findState(states, find, result) {
    //             $.each(states, function (index, item) {
    //                 if (find.indexOf(item.url) === 0 && find !== item.url) {
    //                     result.push({
    //                         url: item.url,
    //                         text: item.text
    //                     });
    //                     findState(states, item.url, result);
    //                 }
    //             })
    //         }
    //     }
    // ]);
});