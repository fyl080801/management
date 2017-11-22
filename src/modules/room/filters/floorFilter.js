define([
    'modules/room/module'
], function (module) {
    'use strict';

    module.filter('floorFilter', [
        function () {
            return function (inputArray, state) {
                var newArray = [];
                $.each(inputArray, function (idx, item) {
                    if (item.floorbelong === state && item.floorstatus === '0') {
                        newArray.push(item);
                    }
                });
                return newArray;
            }
        }
    ]);
});