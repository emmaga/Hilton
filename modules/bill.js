'use strict';

angular.module('app.bill', [])
    .controller('billController', ['$scope', 'ResourceManager', 'ActivityManager', 'COMMON_KEYS', function ($scope, ResourceManager, ActivityManager, COMMON_KEYS) {
        var activity = ActivityManager.getActiveActivity();
        activity.initialize($scope);
        var data = ResourceManager.getService();
        $scope.serviceName = data.name;
        $scope.iconUrl = data.icon;
        var i18nText = ResourceManager.getLocale();
        var lang = i18nText.lang;
        if (lang == "en-US") {
            $scope.head1 = 'Index';
            $scope.head2 = 'Name';
            $scope.head3 = 'Price';
            $scope.head4 = "Time";
            $scope.priceText = 'Total price:';
            $scope.cost = '$'
        }else {
            $scope.head1 = '序号';
            $scope.head2 = '名称';
            $scope.head3 = '价格';
            $scope.head4 = "时间";
            $scope.priceText = '总计:';
            $scope.cost = '￥'
        }
        $scope.logo = ResourceManager.getConfigurations().logoUrl();
        $scope.bills = ResourceManager.getCart();
        $scope.total = 0;
        console.log($scope.bills);
        $scope.bills.forEach(function (val,idx,arr) {
            $scope.total+=parseInt(val.price);
        })
        $scope.pages = Math.ceil($scope.bills.length/7);
        if($scope.pages == 0){
            $scope.pages = 1;
        }
        console.log($scope.pages);
        $scope.page = 1;
        $scope.judge = function (index) {
            return Math.ceil((index+1)/7)==$scope.page;
        }
        if(document.readyState=="complete"){
            ActivityManager.hideLoading(500);
        };
        activity.onKeyDown(function (keyCode) {
            switch (keyCode) {
                case COMMON_KEYS.KEY_LEFT:
                    if($scope.page>1){
                        $scope.page--;
                    }
                    break;
                case COMMON_KEYS.KEY_RIGHT:
                    if($scope.page<$scope.pages-1){
                        $scope.page++;
                    }
                    break;
                case COMMON_KEYS.KEY_MENU:
                    break;
                case COMMON_KEYS.KEY_ENTER:
                    break;
                case COMMON_KEYS.KEY_DOWN:
                    break;
                case COMMON_KEYS.KEY_BACK:
                    activity.finish();
                    break;
            }
        });
    }]);
