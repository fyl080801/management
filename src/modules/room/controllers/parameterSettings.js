define([
    'modules/room/module'
], function (module) {
    'use strict';

    module.controller('modules.room.controllers.parameterSettings', [
        '$scope',
        'app.services.httpService',
        function ($scope, httpService) {
            var me = this;

            this.list = [];

            this.add = function () {

            };

            this.remove = function () {

            };

            this.edit = function () {

            };

            this.load = function () {
                httpService
                    .post('/setval/findEquipmentSetval')
                    .then(function (result) {
                        var categories = [];
                        //var groups = [];
                        $.each(result, function (idx, item) {
                            if (categories.indexOf(item.topparamtype) < 0) {
                                categories.push(item.topparamtype);
                            }
                        });

                        var categoryList = [];
                        $.each(categories, function (idx, item) {
                            var current = {
                                topparamtype: item,
                                result: []
                            };
                            $.each(result, function (i, par) {
                                if (par.topparamtype === item) {
                                    current.result.push(par);
                                }
                            });
                            categoryList.push(current);
                        });

                        $.each(categoryList, function (idx, item) {
                            var groups = [];
                            $.each(item.result, function (i, g) {
                                if (groups.indexOf(g.parambelongtype) < 0) {
                                    groups.push(g.parambelongtype);
                                }
                            });
                            item.groups = [];
                            $.each(groups, function (i, g) {
                                var current = {
                                    parambelongtype: g,
                                    parameters: []
                                };
                                $.each(item.result, function (j, h) {
                                    if (h.parambelongtype === g) {
                                        current.parameters.push(h);
                                    }
                                });
                                item.groups.push(current);
                            });
                            delete item.result;
                        });

                        me.list = categoryList;
                    });
            };
        }
    ]);
});