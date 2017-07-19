define('modules.mobileui.controllers.login', [
    'modules.mobileui.module'
], function (module) {
    'use strict';

    module.controller('modules.mobileui.controllers.login', [
        '$scope',
        '$state',
        function ($scope, $state) {
            var me = this;
            
            this.login = function () {
                $state.go('mobilemain');
            };
        }
    ]);
});