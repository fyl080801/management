define('modules.manageui.controllers.session', [
    'modules.manageui.module'
], function (module) {
    'use strict';

    module
        .controller('modules.manageui.controllers.session', [
            '$scope',
            '$state',
            'modules.manageui.services.sessionService',
            function ($scope, $state, sessionService) {
                sessionService
                    .checkSession()
                    .authenticated(function (session) {
                        $state.go('main');
                    })
                    .unAuthenticated(function () {
                        $state.go('login');
                    });
            }
        ]);
});