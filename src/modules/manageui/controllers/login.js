define([
    'modules/manageui/module'
], function (module) {
    'use strict';

    module.controller('modules.manageui.controllers.login', [
        '$scope',
        '$state',
        '$appConfig',
        '$appEnvironment',
        '$element',
        'modules.manageui.services.sessionService',
        function ($scope, $state, $appConfig, $appEnvironment, $element, sessionService) {
            var me = this;

            this.login = function () {
                if ($appConfig.session) {
                    $state.go($('html').attr('data-index'));
                } else {
                    sessionService
                        .login(me.Username, me.Password)
                        .success(function () {
                            $state.go($('html').attr('data-index'));
                        });
                }
            };

            this.register = function () {
                $state.go('register');
            };
        }
    ]);
});