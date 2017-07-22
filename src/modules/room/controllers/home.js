define('modules.room.controllers.home', [
    'modules.room.module'
], function (module) {
    'use strict';

    module.controller('modules.room.controllers.home', [
        '$scope',
        '$state',
        '$appEnvironment',
        '$element',
        function ($scope, $state, $appEnvironment, $element) {
            var me = this;

            $element.find('.widget-column')
                .sortable({
                    connectWith: '.widget-column',
                    handle: '.panel-heading',
                    cancel: ".widget-toggle",
                    placeholder: 'widget-placeholder ui-corner-all'
                });
            $element.disableSelection();
        }
    ]);
});