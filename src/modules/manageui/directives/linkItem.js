define('modules.manageui.directives.linkItem', [
    'modules.manageui.module'
], function (module) {
    'use strict';

    module.directive('sysLinkItem', [
        function () {
            var _link = function ($scope, $element, $attrs, $ctrl) {

            };

            var _controller = function ($scope, $element, $attrs, $tab, $tabStore) {
                $('.metismenu').metisMenu();
                $scope.openLink = function (link) {
                    if ($tabStore[link.id] !== undefined) {
                        $tabStore[link.id].active();
                    } else {
                        $tabStore[link.id] = $tab.open(link);
                        $tabStore[link.id].result
                            .then(function () {
                                delete $tabStore[link.id];
                            });
                    }
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
                controller: ['$scope', '$element', '$attrs', '$tab', '$tabStore', _controller],
                templateUrl: 'templates/controls/LinkItem.html'
            };
        }
    ]);
});