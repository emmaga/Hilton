'use strict';

angular.module('app.flight', [])
    .controller('FlightController', ['$scope', 'ActivityManager','ResourceManager', 'COMMON_KEYS','MenuService','$http', function ($scope, ActivityManager,ResourceManager, COMMON_KEYS,MenuService,$http) {
        var activity = ActivityManager.getActiveActivity();
        activity.initialize($scope);
        var data = ResourceManager.getService();
        $scope.serviceName = data.name;
        $scope.iconUrl = data.icon;
        activity.loadI18NResource(function (res) {
            var toolvarData = MenuService.getLanguage().toolbar;
            $scope.select = {
                left: toolvarData.left,
                icon: 'assets/images/icon_toolbar_select.png',
                right: toolvarData.selsct
            };
            $scope.ok = {
                left: toolvarData.left,
                icon: 'assets/images/icon_toolbar_menu1.png',
                right: toolvarData.ok
            };
            $scope.menu = {
                // left: toolvarData.left,
                // icon: 'assets/images/icon_toolbar_menu.png',
                // right: toolvarData.menu
            };
        });

        //$scope.$watch('$viewContentLoaded', function() {
        //    ActivityManager.hideLoading();
        //});
        if(document.readyState=="complete"){
            ActivityManager.hideLoading(500);
        }


        var i18nText = ResourceManager.getLocale();
        var lang = i18nText.lang;


        if(lang == "en-US"){
            $scope.name1 = "PVG",$scope.name2 = "PVG",$scope.name3 = "SHA",$scope.name4 = "SHA";
            $scope.head1 = "Flight Number",$scope.head2 = "Destination",$scope.head22 = "Origin",$scope.head3 = "Terminals",$scope.head4 = "Planning Time",$scope.head5 = "Actual Time",$scope.head6 = "Status";
            $scope.city1 = "Harbin",$scope.city2 = "Chengdu",$scope.city3 = "Nanjing",$scope.city4 = "Guiyang",$scope.city5 = "Shenzhen",$scope.city6 = "Changsha";
            $scope.status1 = "On Time",$scope.status2 = "Plan",$scope.status3 = "Delay";
        }else {
            $scope.name1 = "上海浦东机场",$scope.name2 = "上海浦东机场",$scope.name3 = "上海虹桥机场",$scope.name4 = "上海虹桥机场";
            $scope.head1 = "航班号",$scope.head2 = "目的地",$scope.head22 = "始发地",$scope.head3 = "候机楼",$scope.head4 = "计划时间",$scope.head5 = "实际时间",$scope.head6 = "状态";
            $scope.city1 = "哈尔滨",$scope.city2 = "成都",$scope.city3 = "南京",$scope.city4 = "贵阳",$scope.city5 = "深圳",$scope.city6 = "长沙";
            $scope.status1 = "正常",$scope.status2 = "计划",$scope.status3 = "延误";
        }
        $scope.selectIndex = 0;


        activity.onKeyDown(function (keyCode) {
            switch (keyCode) {
                case COMMON_KEYS.KEY_MENU:
                    ActivityManager.startActivity('menu');
                    break;
                case COMMON_KEYS.KEY_BACK:
                    activity.finish();
                    break;
                case COMMON_KEYS.KEY_LEFT:
                        if ($scope.selectIndex > 0) {
                            $scope.selectIndex -= 1;
                        }
                    break;
                case COMMON_KEYS.KEY_RIGHT:
                        if ($scope.selectIndex < 3) {
                            $scope.selectIndex += 1;
                        }
                    break;
                case COMMON_KEYS.KEY_ENTER:
                    break;
                case COMMON_KEYS.KEY_UP:
                    break;
                case COMMON_KEYS.KEY_DOWN:
                    break;
            }
        });
    }]);