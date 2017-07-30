define('modules.room.controllers.message', [
    'modules.room.module',
    'jquery-ui'
], function (module) {
    'use strict';

    module.controller('modules.room.controllers.message', [
        '$scope',
        '$element',
        'modules.room.services.messageService',
        function ($scope, $element, messageService) {
            $scope.service = messageService;

            $element.find('.messagestore')
                .sortable({
                    connectWith: ".markstore"
                });

            $element.find('.markstore')
                .sortable({
                    connectWith: ".messagestore"
                });
        }
    ]);
});