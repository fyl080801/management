define('modules.manageui.controllers.login', [
    'modules.manageui.module'
], function (module) {
    'use strict';

    module.controller('modules.manageui.controllers.login', [
        '$scope',
        '$state',
        '$appEnvironment',
        '$element',
        'modules.manageui.services.sessionService',
        function ($scope, $state, $appEnvironment, $element, sessionService) {
            var me = this;

            this.login = function () {
                sessionService.login(me.Username, me.Password);
            }

            this.register = function () {
                $state.go('register');
            };

            // this.login = function () {
            //     sessionService
            //         .login(me.username, me.password)
            //         .success(function () {
            //             $state.go('main');
            //         });
            // };
        }
    ]);
});