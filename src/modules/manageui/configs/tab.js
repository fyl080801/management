define('modules.manageui.configs.tab', [
    'modules.manageui.configs'
], function (configs) {
    'use strict';

    configs.provider('$tab', [
        function () {
            var $tabProvider = {
                $get: [
                    '$injector', '$rootScope', '$q', '$http', '$templateCache', '$controller', '$tabStack',
                    function ($injector, $rootScope, $q, $http, $templateCache, $controller, $tabStack) {
                        var $tab = {};

                        function getTemplatePromise(options) {
                            if (!options.template && !options.templateUrl)
                                return '';
                            return options.template ? $q.when(options.template) :
                                $http.get(angular.isFunction(options.templateUrl) ? (options.templateUrl)() : options.templateUrl, {
                                    cache: $templateCache
                                }).then(function (result) {
                                    return result.data;
                                });
                        }

                        function getResolvePromises(resolves) {
                            var promisesArr = [];
                            angular.forEach(resolves, function (value) {
                                if (angular.isFunction(value) || angular.isArray(value)) {
                                    promisesArr.push($q.when($injector.invoke(value)));
                                }
                            });
                            return promisesArr;
                        }

                        function resolveDependencies(dependencies) {
                            if (typeof (dependencies) === 'string') {
                                dependencies = [dependencies];
                            }
                            return ['$q', function ($q) {
                                var defer = $q.defer();
                                require(dependencies, function () {
                                    defer.resolve(arguments);
                                });
                                return defer.promise;
                            }];
                        }

                        $tab.open = function (tabOptions) {
                            var tabResultDeferred = $q.defer();
                            var tabOpenedDeferred = $q.defer();

                            var tabInstance = {
                                result: tabResultDeferred.promise,
                                opened: tabOpenedDeferred.promise,
                                close: function (result) {
                                    $tabStack.close(tabInstance, result);
                                },
                                dismiss: function (reason) {
                                    $tabStack.dismiss(tabInstance, reason);
                                },
                                active: function () {
                                    $tabStack.active(tabInstance);
                                }
                            };

                            tabOptions = angular.extend({}, $tabProvider.options, tabOptions);
                            tabOptions.resolve = tabOptions.resolve || {};
                            tabOptions.resolve['$deps'] = resolveDependencies(tabOptions.dependencies);

                            var templateAndResolvePromise =
                                $q.all([getTemplatePromise(tabOptions)].concat(getResolvePromises(tabOptions.resolve)));

                            templateAndResolvePromise.then(function resolveSuccess(tplAndVars) {

                                var tabScope = (tabOptions.scope || $rootScope).$new();
                                tabScope.$close = tabInstance.close;
                                tabScope.$dismiss = tabInstance.dismiss;

                                var ctrlInstance, ctrlLocals = {};
                                var resolveIter = 1;

                                // controllers
                                if (tabOptions.controller) {
                                    ctrlLocals.$scope = tabScope;
                                    ctrlLocals.$tabInstance = tabInstance;
                                    angular.forEach(tabOptions.resolve, function (value, key) {
                                        ctrlLocals[key] = tplAndVars[resolveIter++];
                                    });

                                    ctrlInstance = $controller(tabOptions.controller, ctrlLocals);
                                    if (tabOptions.controllerAs) {
                                        tabScope[tabOptions.controllerAs] = ctrlInstance;
                                    }
                                }

                                $tabStack.open(tabInstance, {
                                    scope: tabScope,
                                    deferred: tabResultDeferred,
                                    content: tplAndVars[0],
                                    tabTemplateUrl: tabOptions.tabTemplateUrl,
                                    tabkey: tabOptions.tabkey ? tabOptions.tabkey : '',
                                    text: tabOptions.text,
                                    icon: tabOptions.icon,
                                    src: tabOptions.src
                                });

                            }, function resolveError(reason) {
                                tabResultDeferred.reject(reason);
                            });

                            templateAndResolvePromise.then(function () {
                                tabOpenedDeferred.resolve(true);
                            }, function () {
                                tabOpenedDeferred.reject(false);
                            });

                            return tabInstance;
                        };

                        return $tab;
                    }
                ]
            };
            return $tabProvider;
        }
    ]);
});