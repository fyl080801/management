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

                removeAfter(tab.tabDomEl, tab.tabContentDomEl, tab.scriptDomEl, tab.tabScope, function () {
                    tab.tabScope.$destroy();
                    var top = $tabStack.getTop();
                    if (top) {
                        $tabStack.active(top.key);
                    } else {
                        $('[role="tablist"] li[head="true"] a').tab('show');
                    }
                });
            }

            function removeAfter(tabEl, contentEl, scriptEl, scope, done) {
                tabEl.remove();
                contentEl.remove();
                if (scriptEl)
                    scriptEl.remove();
                if (done) {
                    done();
                }
            }

            $tabStack.open = function (tabInstance, tab) {
                openedTabs.add(tabInstance, {
                    deferred: tab.deferred,
                    tabScope: tab.scope
                });

                var tabTailElement = $('[role="tablist"] [head="true"]');
                var tabHostElement = $('.manage-content .manage-tab .tab-content').eq(0);

                var tabElement = angular.element('<li role="presentation">' +
                    '<a href="" data-target="#' + tab.tabkey + '" data-toggle="tab" style="padding-right: 40px"><i class="' + tab.icon + '"></i> <span>' + tab.text +
                    '</span><button type="button" class="close pull-right" aria-label="Close" style="position: absolute; right:15px" ng-click="$close()"><span aria-hidden="true">&times;</span></button></a>' +
                    '</li>');
                tabElement.attr({
                    'index': openedTabs.length() - 1
                });
                var tabDomEl = $compile(tabElement)(tab.scope);

                tabTailElement.after(tabDomEl);

                var tabContentElement = angular.element('<div role="tabpanel" class="tab-pane" id="' + tab.tabkey + '"></div>');
                var tabContentDomEl;
                var scriptDomEl;
                if (tab.src) {
                    tabContentElement.html('<iframe src="' + tab.src + '" frameborder="0" width="100%" height="100%" scrolling="auto"></iframe>');
                    tabContentDomEl = tabContentElement;
                    tabHostElement.append(tabContentDomEl);
                } else {
                    tabContentElement.html(tab.content);
                    scriptDomEl = tabContentElement.find('script');
                    tabHostElement.append(scriptDomEl);
                    tabContentDomEl = $compile(tabContentElement)(tab.scope)
                    tabHostElement.append(tabContentDomEl);
                }

                openedTabs.top().value.tabDomEl = tabDomEl;
                openedTabs.top().value.tabContentDomEl = tabContentDomEl;
                if (scriptDomEl)
                    openedTabs.top().value.scriptDomEl = scriptDomEl;

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