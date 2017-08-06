define('modules.mobileui.controllers.tv', [
    'modules.mobileui.module'
], function (module) {
    'use strict';

    module.controller('modules.mobileui.controllers.tv', [
        '$scope',
        function ($scope) {
            var me = this;

            $scope.numbers = [
                '1',
                '2',
                '3',
                '4',
                '5',
                '6',
                '7',
                '8',
                '9',
                '*',
                '0',
                '#'
            ];

            this.test = function () {
                alert('aaaa');
            };
        }
    ]);
});