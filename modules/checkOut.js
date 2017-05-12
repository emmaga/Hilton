'use strict';

angular.module('app.checkOut', [])
    .controller('CheckOutController', ['$scope', 'ResourceManager', 'ActivityManager', 'COMMON_KEYS', function ($scope, ResourceManager, ActivityManager, COMMON_KEYS) {
        var activity = ActivityManager.getActiveActivity();
        activity.initialize($scope);
        var data = ResourceManager.getService();
        $scope.serviceName = data.name;
        $scope.iconUrl = data.icon;
        var i18nText = ResourceManager.getLocale();
        var lang = i18nText.lang;
        $scope.sure = false;
        if (lang == "en-US") {
            $scope.tipText = 'Done!';
            $scope.title = 'Check Out';
            $scope.subtitle1 = 'Are you sure to check out?';
            $scope.subtitle2 = 'This operation will be irreversible, please choose carefully!';
            $scope.cancel = 'Cancel';
            $scope.makesure = 'Sure';
        }else {
            $scope.tipText = '退房成功！';
            $scope.title = '快速退房';
            $scope.subtitle1 = '是否确认快速退房？';
            $scope.subtitle2 = '此操作将不可逆转，请谨慎选择！';
            $scope.cancel = '取消';
            $scope.makesure = '确定';
        }
        $scope.logo = ResourceManager.getConfigurations().logoUrl();



        if(document.readyState=="complete"){
            ActivityManager.hideLoading(500);
        };
        activity.onKeyDown(function (keyCode) {
            switch (keyCode) {
                case COMMON_KEYS.KEY_ENTER:
                    if($scope.sure){
                        ResourceManager.resetCart();
                        activity.showTip($scope.tipText);
                    }else {
                        activity.finish();
                    }
                    break;
                case COMMON_KEYS.KEY_DOWN:
                    $scope.sure = true;
                    break;
                case COMMON_KEYS.KEY_UP:
                    $scope.sure = false;
                    break;
                case COMMON_KEYS.KEY_BACK:
                    activity.finish();
                    break;
            }
        });
    }]);
