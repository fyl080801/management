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
                function ($delegate) {
                    var responseFn = $delegate.doResponse;
                    var errorFn = $delegate.doError;

                    $delegate.doResponse = function (response, defer) {
                        // 准备处理会话过期事件
                        responseFn(response, defer);
                    };

                    $delegate.doError = function (response, defer) {
                        // 处理会话过期
                        errorFn(response, defer);
                    };

                    return $delegate;
                }
            ]);

            $httpProvider.interceptors.push('modules.manageui.configs.factories.httpSession');
        }
    ]);
});