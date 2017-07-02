define('modules.manageui.directives.linkSection', [
    'modules.manageui.module'
], function (module) {
    'use strict';

    module.directive('sysLinkSection', [
        function () {
            var _link = function ($scope, $element, $attrs, $ctrl) {

            };

            var _controller = function ($scope, $element, $attrs, $tab, $tabStore) {
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
                    sysLinkSection: '='
                },
                restrict: 'AE',
                replace: true,
                link: _link,
                controller: ['$scope', '$element', '$attrs', '$tab', '$tabStore', _controller],
                templateUrl: 'templates/controls/LinkSection.html'
            };
        }
    ]);
});