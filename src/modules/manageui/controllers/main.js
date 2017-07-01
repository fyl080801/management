define('modules.manageui.controllers.main', [
    'modules.manageui.module'
], function (module) {
    'use strict';

    module.controller('modules.manageui.controllers.main', [
        '$scope',
        '$state',
        '$appEnvironment',
        '$element',
        'modules.manageui.configs.linkManager',
        'app.services.popupService',
        'modules.manageui.services.sessionService',
        function ($scope, $state, $appEnvironment, $element, linkManager, popupService, sessionService) {
            var me = this;

            this.tabs = [{
                Title: 'aaa',
                Link: 'sssss'
            }, {
                Title: 'aaa',
                Link: 'ssdsds'
            }, {
                Title: 'aaa',
                Link: 'dsdsdsd'
            }];

            this.links = linkManager.tree();

            this.close = function (idx) {
                me.tabs.splice(idx, 1);
            };

            this.logout = function () {
                popupService
                    .confirm('是否退出？')
                    .ok(function () {
                        $state.go('login');
                    });
            };


            // if (!$appEnvironment.session) {
            //     sessionService
            //         .checkSession()
            //         .authenticated(function () {
            //             me.links = linkManager.tree();
            //         })
            //         .unAuthenticated(function () {
            //             $state.go('login');
            //         });
            // } else {
            //     me.links = linkManager.tree();
            // }
        }
    ]);
});