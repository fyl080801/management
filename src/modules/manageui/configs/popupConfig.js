define([
    'modules/manageui/configs'
], function (configs) {
    'use strict';

    configs.config([
        '$provide',
        function ($provide) {
            $provide.decorator('app.services.popupService', [
                '$delegate',
                '$q',
                '$modal',
                function ($delegate, $q, $modal) {
                    $delegate.confirm = function (text, size) {
                        var defered = $q.defer();

                        defered.promise.ok = function (fn) {
                            defered.promise.then(fn);
                            return defered.promise;
                        };

                        defered.promise.cancel = function (fn) {
                            defered.promise['catch'](fn);
                            return defered.promise;
                        };

                        $modal
                            .open({
                                templateUrl: 'templates/modal/Confirm.html',
                                size: size ? size : 'sm',
                                data: {
                                    text: text ? text : '是否确认操作？'
                                }
                            }).result
                            .then(function () {
                                defered.resolve();
                            }, function () {
                                defered.reject();
                            });
                        return defered.promise;
                    };

                    return $delegate;
                }
            ]);
        }
    ]);
});