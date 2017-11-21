define([
    'modules/room/module'
], function (module) {
    'use strict';

    module.controller('modules.room.controllers.bar', [
        '$scope',
        '$modal',
        'modules.manageui.configs.linkManager',
        'modules.manageui.services.tabService',
        'modules.room.services.messageService',
        function ($scope, $modal, linkManager, tabService, messageService) {
            $scope.service = messageService;

            this.openMessage = function (type) {
                tabService.open(linkManager.get('roommanage').get('roommanage_infomanage'));
                messageService.activeSingle(type);
            };

            this.checkIn = function () {
                $modal
                    .open({
                        templateUrl: 'modules/room/views/CheckIn.html',
                        size: 'sm'
                    });
            };
        }
    ]);
});