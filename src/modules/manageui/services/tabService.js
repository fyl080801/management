define('modules.manageui.services.tabService', [
    'modules.manageui.module'
], function (module) {
    'use strict';

    module.service('modules.manageui.services.tabService', [
        '$tab',
        '$tabStore',
        function ($tab, $tabStore) {
            this.open = function (tabOptions) {
                if ($tabStore[tabOptions.id] !== undefined) {
                    $tabStore[tabOptions.id].active();
                } else {
                    $tabStore[tabOptions.id] = $tab.open(tabOptions);
                    $tabStore[tabOptions.id].result
                        .then(function () {
                            delete $tabStore[tabOptions.id];
                        });
                }
                return $tabStore[tabOptions.id];
            };
        }
    ]);
});