define('modules.manageui.factories.tabStack', [
    'modules.manageui.module'
], function (module) {
    'use strict';

    module.factory('$tabStack', [
        '$compile', '$rootScope', '$$stackedMap',
        function ($compile, $rootScope, $$stackedMap) {
            var openedTabs = $$stackedMap.createNew();
            var $tabStack = {};

            function removeTab(tabInstance) {
                var tab = openedTabs.get(tabInstance).value;

                openedTabs.remove(tabInstance);

                removeAfter(tab.tabDomEl, tab.tabContentDomEl, tab.tabScope, function () {
                    tab.tabScope.$destroy();
                    var top = $tabStack.getTop();
                    if (top) {
                        $tabStack.active(top.key);
                    } else {
                        $('[role="tablist"] li[head="true"] a').tab('show');
                    }
                });
            }

            function removeAfter(tabEl, contentEl, scope, done) {
                tabEl.remove();
                contentEl.remove();
                if (done) {
                    done();
                }
            }

            $tabStack.open = function (tabInstance, tab) {
                openedTabs.add(tabInstance, {
                    deferred: tab.deferred,
                    tabScope: tab.scope
                });

                var tabTailElement = $('[role="tablist"] .tail');
                var tabHostElement = $('.tab-content');

                var tabElement = angular.element('<li role="presentation">' +
                    '<a href="" data-target="#' + tab.tabkey + '" data-toggle="tab"><i class="' + tab.icon + '"></i> <span>' + tab.text +
                    '</span>&nbsp;<button type="button" class="close pull-right" aria-label="Close" ng-click="$close()"><span aria-hidden="true">&times;</span></button></a>' +
                    '</li>');
                tabElement.attr({
                    'index': openedTabs.length() - 1
                });
                var tabDomEl = $compile(tabElement)(tab.scope);

                tabTailElement.before(tabDomEl);

                var tabContentElement = angular.element('<div role="tabpanel" class="tab-pane" id="' + tab.tabkey + '"></div>');
                var tabContentDomEl;
                if (tab.src) {
                    tabContentElement.html('<iframe src="' + tab.src + '" frameborder="0" width="100%" height="100%" scrolling="auto"></iframe>');
                    tabContentDomEl = tabContentElement;
                    tabHostElement.append(tabContentDomEl);
                } else {
                    tabContentElement.html(tab.content);
                    tabContentDomEl = $compile(tabContentElement)(tab.scope)
                    tabHostElement.append(tabContentDomEl);
                }

                openedTabs.top().value.tabDomEl = tabDomEl;
                openedTabs.top().value.tabContentDomEl = tabContentDomEl;

                $tabStack.active(tabInstance);
            };

            $tabStack.active = function (tabInstance) {
                var tab = openedTabs.get(tabInstance);
                if (tab) {
                    tab.value.tabDomEl.find('a').eq(0).tab('show');
                }
            };

            $tabStack.close = function (tabInstance, result) {
                var tab = openedTabs.get(tabInstance);
                if (tab) {
                    tab.value.deferred.resolve(result);
                    removeTab(tabInstance);
                }
            };

            $tabStack.dismiss = function (tabInstance, reason) {
                var tab = openedTabs.get(tabInstance);
                if (tab) {
                    tab.value.deferred.reject(reason);
                    removeTab(tabInstance);
                }
            };

            $tabStack.dismissAll = function (reason) {
                var topTab = this.getTop();
                while (topTab) {
                    this.dismiss(topTab.key, reason);
                    topTab = this.getTop();
                }
            };

            $tabStack.getTop = function () {
                return openedTabs.top();
            };

            return $tabStack;
        }
    ]);

});