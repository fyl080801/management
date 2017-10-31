define([
    'modules/manageui/module',
    'smalot-bootstrap-datetimepicker-zhcn'
], function (module) {
    'use strict';

    module.directive('datetimepicker', [
        '$timeout',
        function ($timeout) {
            var _link = function ($scope, $element, $attrs, $ctrl) {
                $($element).datetimepicker({
                    language: 'zh-CN',
                    format: 'yyyy-mm-dd hh:ii',
                    autoclose: true,
                    todayBtn: true,
                    startDate: '2013-02-14 10:00',
                    minuteStep: 10
                });
            };

            return {
                scope: {
                    ngModel: '='
                },
                restrict: 'AE',
                replace: true,
                link: _link,
                templateUrl: 'templates/controls/datetimepicker.html'
            };
        }
    ]);
});