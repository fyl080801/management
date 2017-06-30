define('modules.manageui.controllers.main', [
    'modules.manageui.module'
], function (module) {
    'use strict';

    module.controller('modules.manageui.controllers.main', [
        '$scope',
        '$state',
        '$appEnvironment',
        '$element',
        'app.services.popupService',
        'modules.manageui.services.sessionService',
        function ($scope, $state, $appEnvironment, $element, popupService, sessionService) {
            var me = this;

            $element.find('.metismenu').metisMenu();

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
        }
    ]);
});