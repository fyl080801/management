define('modules.room.controllers.message', [
    'modules.room.module',
    'jquery-ui'
], function (module) {
    'use strict';

    module.controller('modules.room.controllers.message', [
        '$scope',
        'modules.manageui.factories.tableParameter',
        'modules.setting.services.request',
        'modules.room.services.messageService',
        function ($scope, tableParameter, request, messageService) {
            $scope.service = messageService;

            this.tableParams = new tableParameter({});

            // $element.find('.messagestore')
            //     .sortable({
            //         connectWith: ".markstore"
            //     });

            // $element.find('.markstore')
            //     .sortable({
            //         connectWith: ".messagestore"
            //     });
        }
    ]);
});