define([
    'modules/manageui/module'
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
                $state.go($('html').attr('data-index'));
                // sessionService
                //     .login(me.Username, me.Password)
                //     .success(function () {
                //         $state.go('main');
                //     });
            };

            this.register = function () {
                $state.go('register');
            };
        }
    ]);
});