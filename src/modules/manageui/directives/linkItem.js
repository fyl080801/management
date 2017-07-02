define('modules.manageui.directives.linkItem', [
    'modules.manageui.module'
], function (module) {
    'use strict';

    module.directive('sysLinkItem', [
        function () {
            var _link = function ($scope, $element, $attrs, $ctrl) {

            };

            var _controller = function ($scope, $element, $attrs, $tab) {
                $('.metismenu').metisMenu();
                $scope.openLink = function (link) {
                    $tab.open(link);
                };
            };

            return {
                scope: {
                    sysLinkItem: '='
                },
                restrict: 'AE',
                replace: true,
                transclude: true,
                link: _link,
                controller: ['$scope', '$element', '$attrs', '$tab', _controller],
                templateUrl: 'templates/controls/LinkItem.html'
            };
        }
    ]);
});