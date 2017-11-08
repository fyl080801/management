define([
    'modules/manageui/module'
], function (module) {
    'use strict';

    module.factory('modules.manageui.factories.tableParameter', [
        'NgTableParams',
        'app.services.httpService',
        function (NgTableParams, httpService) {

            /**
             * 创建table参数
             * @param {*} settings.count 分页大小
             * @param {*} settings.counts 分页数组
             * @param {*} settings.url 请求地址
             * @param {*} settings.data 参数
             */
            function tableParameter(settings) {
                settings = settings ? settings : {};
                return new NgTableParams({
                    count: settings.count ? settings.count : 10
                }, {
                    counts: settings.counts ? settings.counts : [10, 25, 50],
                    getData: function (params) {
                        if (!settings.url) return;
                        return httpService
                            .post(settings.url, $.extend({
                                page: {
                                    page: params.page() - 1,
                                    rows: params.count()
                                }
                            }, settings.data))
                            .then(function (result) {
                                params.total(result.total);
                                params.generatePagesArray();
                                return result.resultlst;
                            }, function () {
                                params.total(0);
                                params.generatePagesArray();
                                return [];
                            });
                    }
                });
            }

            tableParameter.prototype = {
                constructor: tableParameter
            };

            return tableParameter;
        }
    ]);
});