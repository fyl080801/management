define('modules.manageui.directives.linkSection', [
    'modules.manageui.module'
], function (module) {
    'use strict';

    module.directive('sysLinkSection', [
        function () {
            var _link = function ($scope, $element, $attrs, $ctrl) {

            };

            var _controller = function ($scope, $element, $attrs, $tab) {
                $scope.openLink = function (link) {
                    $tab.open(link);
                };
            };

            return {
                scope: {
                    sysLinkSection: '='
                },
                restrict: 'AE',
                replace: true,
                link: _link,
                controller: ['$scope', '$element', '$attrs', '$tab', _controller],
                templateUrl: 'templates/controls/LinkSection.html'
            };
        }
    ]);
});