define([
    'modules/room/module'
], function (module) {
    'use strict';

    module.factory('modules.room.factories.stateAdapter', [
        '$q',
        '$location',
        '$appConfig',
        function ($q, $location, $appConfig) {

            return {
                _socketClient: null,

                connect: function (url) {
                    if (this._socketClient != null) {
                        this._socketClient.close();
                    }

                    var me = this;
                    var defer = $q.defer();
                    var receiveFn;

                    var wsurl = (function (address) {
                        if ($appConfig.serverUrl && $appConfig.serverUrl !== '')
                            return 'ws://' + $appConfig.serverUrl.replace('http://', '') + address;
                        else
                            return 'ws://' + $location.host() + ':' + $location.port() + address;
                    })(url);

                    defer.receive = function (data) {
                        if (receiveFn && $.isFunction(receiveFn))
                            receiveFn(data);
                    };

                    defer.promise.onopened = function (fn) {
                        if ($.isFunction(fn)) {
                            defer.promise.then(fn);
                        }
                        return defer.promise;
                    };

                    defer.promise.onreceived = function (fn) {
                        if ($.isFunction(fn)) {
                            receiveFn = fn;
                        }
                        return defer.promise;
                    };

                    defer.promise.onerror = function (fn) {
                        if ($.isFunction(fn)) {
                            defer.promise['catch'](fn);
                        }
                        return defer.promise;
                    };

                    this._socketClient = new WebSocket(wsurl);

                    this._socketClient.onopen = function (event) {
                        defer.resolve();
                    };

                    this._socketClient.onmessage = function (event) {
                        defer.receive(event.data);
                    };

                    this._socketClient.onerror = function () {
                        defer.reject();
                    };

                    return defer.promise;
                },

                send: function (params) {
                    this._socketClient.send(JSON.stringify(params));
                },

                close: function () {
                    if (this._socketClient) {
                        this._socketClient.close();
                    }
                }
            };

        }
    ]);
});