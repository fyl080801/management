define('modules.manageui.factories.tableParameter', [
    'modules.manageui.module'
], function (module) {
    'use strict';

    module.factory('modules.manageui.factories.tableParameter', [
        'NgTableParams',
        'app.services.httpService',
        function (NgTableParams, httpService) {
            function tableParameter(settings) {
                settings = settings ? settings : {};
                return new NgTableParams({
                    count: settings.count ? settings.count : 10
                }, {
                    counts: settings.counts ? settings.counts : [10, 25, 50],
                    getData: function (params) {
                        return httpService
                            .post('', $.extend({
                                PageIndex: params.page(),
                                PageSize: params.count() //,
                                // Order: 'asc',
                                // OrderBy: 'Age'
                            }, settings.data))
                            .then(function (result) {
                                params.total(result.Total);
                                params.generatePagesArray();
                                return result.Data;
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