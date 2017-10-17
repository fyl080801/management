define([
    'modules/manageui/configs'
], function (configs) {
    'use strict';

    configs.config([
        '$provide',
        '$httpProvider',
        function ($provide, $httpProvider) {
            $provide.decorator('app.factories.httpDataHandler', [
                '$delegate',
                '$rootScope',
                '$modal',
                '$appEnvironment',
                function ($delegate, $rootScope, $modal, $appEnvironment) {
                    function errorModal(response, $rootScope, $modal) {
                        var scope = $rootScope.$new();
                        scope.$data = {};
                        if (response.data.message) {
                            scope.$data.text = response.data.message;
                        } else {
                            scope.$data.text = '发生错误！';
                        }
                        $modal.open({
                            templateUrl: 'templates/modal/Error.html',
                            scope: scope
                        });
                    }

                    $delegate.doResponse = function (response, defer) {
                        response.data = response.data ? response.data : {};
                        $appEnvironment.session = response.data.session ? response.data.session : {
                            Status: 'NoLogin',
                            Version: null
                        };
                        if (response.data.success === false || response.data.success === 'false') {
                            $delegate.doError(response, defer);
                        } else {
                            defer.resolve(response.data.data ? response.data.data : response.data);
                        }
                    };

                    $delegate.doError = function (response, defer) {
                        response.data = response.data ? response.data : {};
                        $appEnvironment.session = response.data.session ? response.data.session : {
                            Status: 'NoLogin',
                            Version: null
                        };
                        errorModal(response, $rootScope, $modal);
                        defer.reject(response.data.message ? response.data.message : response.data);
                    };

                    return $delegate;
                }
            ]);

            $httpProvider.interceptors.push('modules.manageui.configs.factories.httpSession');
        }
    ]);
});