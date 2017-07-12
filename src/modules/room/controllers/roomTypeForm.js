define('modules.room.controllers.roomTypeForm', [
    'modules.room.module'
], function (module) {
    'use strict';

    module.controller('modules.room.controllers.roomTypeForm', [
        '$scope',
        'NgTableParams',
        function ($scope, NgTableParams) {
            $scope.table = new NgTableParams();

            $scope.data = $.extend({}, $scope.$data);
        }
    ]);
});