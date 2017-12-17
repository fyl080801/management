define([
    'modules/room/module'
], function (module) {
    'use strict';

    module.controller('modules/room/components/system/home', [
        '$scope',
        '$state',
        '$appEnvironment',
        '$element',
        'modules.manageui.configs.linkManager',
        'modules.manageui.services.tabService',
        'modules.room.services.messageService',
        function ($scope, $state, $appEnvironment, $element, linkManager, tabService, messageService) {
            var me = this;

            $element.find('.widget-column')
                .sortable({
                    connectWith: '.widget-column',
                    handle: '.panel-heading',
                    cancel: ".widget-toggle",
                    placeholder: 'widget-placeholder ui-corner-all'
                });

            $element.disableSelection();

            $scope.service = messageService;

            this.openMessage = function (type) {
                tabService.open(linkManager.get('roommanage').get('roommanage_infomanage'));
                messageService.activeSingle(type);
            };
        }
    ]);
});