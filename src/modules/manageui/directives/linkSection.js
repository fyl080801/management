define('modules.manageui.directives.linkSection', [
    'modules.manageui.module'
], function (module) {
    'use strict';

    module.directive('sysLinkSection', [
        function () {
            var _link = function ($scope, $element, $attrs, $ctrl) {

            };

            var _controller = function ($scope, $element, $attrs) {

            };

            return {
                scope: {
                    sysLinkSection: '='
                },
                restrict: 'AE',
                replace: true,
                link: _link,
                controller: ['$scope', '$element', '$attrs', _controller],
                templateUrl: 'templates/controls/LinkSection.html'
            };
        }
    ]);
});