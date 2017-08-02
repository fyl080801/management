define('modules.mobileui.controllers.index', [
    'modules.mobileui.module'
], function (module) {
    'use strict';

    module.controller('modules.mobileui.controllers.index', [
        '$scope',
        '$state',
        function ($scope, $state) {
            $scope.Title = '客房控制';
        }
    ]);
});