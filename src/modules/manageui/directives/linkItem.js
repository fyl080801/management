define('modules.manageui.directives.linkItem', [
    'modules.manageui.module'
], function (module) {
    'use strict';

    module.directive('sysLinkItem', [
        function () {
            var _link = function ($scope, $element, $attrs, $ctrl) {

            };

            var _controller = function ($scope, $element, $attrs) {
                $('.metismenu').metisMenu();
            };

            return {
                scope: {
                    sysLinkItem: '='
                },
                restrict: 'AE',
                replace: true,
                transclude: true,
                link: _link,
                controller: ['$scope', '$element', '$attrs', _controller],
                templateUrl: 'templates/controls/LinkItem.html'
            };
        }
    ]);
});