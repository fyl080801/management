define([
    'modules/manageui/module'
], function (module) {
    'use strict';

    module.filter('integer', [
        function () {
            return function (val) {
                return parseInt(val);
            };
        }
    ]);
});