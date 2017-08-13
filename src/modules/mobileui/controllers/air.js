define('modules.mobileui.controllers.air', [
    'modules.mobileui.module',
    'mobiscroll'
], function (module) {
    'use strict';

    module.controller('modules.mobileui.controllers.air', [
        '$scope',
        '$element',
        function ($scope, $element) {
            var opt = {
                select: {
                    preset: 'select'
                }
            };
            var myopt = $.extend(opt.select, {
                theme: 'android-ics light',
                mode: 'scroller',
                display: 'inline',
                rows: 5
            });
            $element.find('.air-number-bg select').val('').scroller('destroy').scroller(myopt);
        }
    ]);
});