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
                    if ($tabStore[link.tabkey] !== undefined) {
                        $tabStore[link.tabkey].active();
                    } else {
                        $tabStore[link.tabkey] = $tab.open(link);
                        $tabStore[link.tabkey].result
                            .then(function () {
                                delete $tabStore[link.tabkey];
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