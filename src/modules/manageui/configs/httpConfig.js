/**
 * Created by fyl08 on 2017/3/4.
 */
define('modules.manageui.configs.httpConfig', [
    'modules.manageui.configs'
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
                        if (response.data.Message) {
                            scope.$data.text = response.data.Message;
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
                        $appEnvironment.session = response.data.Session ? response.data.Session : {
                            Status: 'NoLogin',
                            Version: null
                        };
                        if (response.data.Success === false) {
                            $delegate.doError(response, defer);
                        } else {
                            defer.resolve(response.data.Data ? response.data.Data : response.data);
                        }
                    };

                    $delegate.doError = function (response, defer) {
                        response.data = response.data ? response.data : {};
                        $appEnvironment.session = response.data.Session ? response.data.Session : {
                            Status: 'NoLogin',
                            Version: null
                        };
                        errorModal(response, $rootScope, $modal);
                        defer.reject(response.data.Message ? response.data.Message : response.data);
                    };

                    return $delegate;
                }
            ]);

            $httpProvider.interceptors.push('modules.manageui.configs.factories.httpSession');
        }
    ]);
});