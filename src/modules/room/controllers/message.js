define('modules.room.controllers.message', [
    'modules.room.module'
], function (module) {
    'use strict';

    module.controller('modules.room.controllers.message', [
        '$scope',
        'modules.room.services.messageService',
        function ($scope, messageService) {
            $scope.service = messageService;
        }
    ]);
});