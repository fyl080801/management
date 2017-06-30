define('modules.manageui.controllers.main', [
    'modules.manageui.module'
], function (module) {
    'use strict';

    module.controller('modules.manageui.controllers.main', [
        '$scope',
        '$state',
        '$appEnvironment',
        '$element',
        'modules.manageui.services.sessionService',
        function ($scope, $state, $appEnvironment, $element, sessionService) {
            var me = this;

            $element.find('.metismenu').metisMenu();
        }
    ]);
});