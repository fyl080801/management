define('modules.room.controllers.home', [
    'modules.room.module'
], function (module) {
    'use strict';

    module.controller('modules.room.controllers.home', [
        '$scope',
        '$state',
        '$appEnvironment',
        '$element',
        'modules.room.services.sessionService',
        function ($scope, $state, $appEnvironment, $element, sessionService) {
            var me = this;
        }
    ]);
});