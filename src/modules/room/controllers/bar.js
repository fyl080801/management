define('modules.room.controllers.bar', [
    'modules.room.module'
], function (module) {
    'use strict';

    module.controller('modules.room.controllers.bar', [
        '$scope',
        'modules.manageui.configs.linkManager',
        'modules.manageui.services.tabService',
        'modules.room.services.messageService',
        function ($scope, linkManager, tabService, messageService) {
            $scope.service = messageService;

            this.openMessage = function (type) {
                tabService.open(linkManager.get('roommanage').get('roommanage_infomanage'));
                messageService.activeSingle(type);
            };
        }
    ]);
});