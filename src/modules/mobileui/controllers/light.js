define('modules.mobileui.controllers.light', [
    'modules.mobileui.module'
], function (module) {
    'use strict';

    module.controller('modules.mobileui.controllers.light', [
        '$scope',
        function ($scope) {
            $scope.val1 = 100;

            $scope.opts = {
                hidePointerLabels: true,
                hideLimitLabels: true,
                floor: 0,
                ceil: 100
            };
        }
    ]);
});