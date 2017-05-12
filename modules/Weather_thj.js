'use strict';

angular.module('app.weather', [])
    .controller('WeatherController', ['$scope', 'ActivityManager','ResourceManager', 'COMMON_KEYS','MenuService','$http', function ($scope, ActivityManager,ResourceManager, COMMON_KEYS,MenuService,$http) {
        var activity = ActivityManager.getActiveActivity();
        activity.initialize($scope);
        var data = ResourceManager.getService();
        $scope.serviceName = data.name;
        $scope.iconUrl = data.icon;
        activity.loadI18NResource(function () {
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
        var i18nText = ResourceManager.getLocale();
        var lang = i18nText.lang;
        $scope.lang = lang;
        $scope.cityIn = i18nText.weather.type_in;
        $scope.cityOut = i18nText.weather.type_out;

        $scope.outside = false;
        $scope.citys = [];
        $scope.selectedIndex = 0;

        $scope.typeIn = [];
        $scope.typeOut = [];
        function choseCity(num){
            var data1 = $scope.citys[num];
            if(lang == "en-US") {
                $scope.city = {
                    name:data1.CityNameEng,
                    date_today: "7th Mar",
                    date_tomorrow: "8th Mar",
                    date_third: "9th Mar",
                    icon_today: data1.WeatherIconURL_Today,
                    icon_tomorrow: data1.WeatherIconURL_tomorrow,
                    icon_third: data1.WeatherIconURL_Thirdday,
                    weather_today: data1.WeatherEng_Today,
                    weather_tomorrow: data1.WeatherEng_tomorrow,
                    weather_third: data1.WeatherEng_Thirdday,
                    temp_today: data1.Temperature_Today,
                    temp_tomorrow: data1.Temperature_Tomorrday,
                    temp_third: data1.Temperature_Thirdday
                };
            }else {
                $scope.city = {
                    name:data1.CityName,
                    date_today: "3月7日",
                    date_tomorrow: "3月8日",
                    date_third: "3月9日",
                    icon_today: data1.WeatherIconURL_Today,
                    icon_tomorrow: data1.WeatherIconURL_tomorrow,
                    icon_third: data1.WeatherIconURL_Thirdday,
                    weather_today: data1.Weather_Today,
                    weather_tomorrow: data1.Weather_tomorrow,
                    weather_third: data1.Weather_Thirdday,
                    temp_today: data1.Temperature_Today,
                    temp_tomorrow: data1.Temperature_Tomorrday,
                    temp_third: data1.Temperature_Thirdday
                };
            };
            if(num>8){
                var height = (num-8)*50+'px';
                $(".city-list").css("bottom",height);
            }else {
                $(".city-list").css("bottom",0);
            }
        };
        getData();
        function getData() {
            $.getJSON("assets/json/city.json",function (data) {
                $scope.typeIn = data.Content[0].Second.Content;
                $scope.typeOut = data.Content[1].Second.Content;
                changeType();
            });
        };


        function changeType(){
            $scope.selectedIndex = 0;
            if($scope.outside == true){
                $scope.citys = $scope.typeOut;
            }else{
                $scope.citys = $scope.typeIn;
            }
            choseCity(0);
        }

        if(document.readyState=="complete"){
            ActivityManager.hideLoading(500);
        };
        activity.onKeyDown(function (keyCode) {
            switch (keyCode) {
                case COMMON_KEYS.KEY_MENU:
                    ActivityManager.startActivity('menu');
                    break;
                case COMMON_KEYS.KEY_BACK:
                    activity.finish();
                    break;
                case COMMON_KEYS.KEY_LEFT:
                    $scope.outside = !$scope.outside;
                    changeType();
                    break;
                case COMMON_KEYS.KEY_RIGHT:
                    $scope.outside = !$scope.outside;
                    changeType();
                    break;
                case COMMON_KEYS.KEY_ENTER:
                    break;
                case COMMON_KEYS.KEY_UP:
                    // if(LEVEL>1){
                    //     LEVEL-=1;
                    // }
                    if($scope.selectedIndex>0){
                        $scope.selectedIndex-=1;
                    }
                    choseCity($scope.selectedIndex);
                    break;
                case COMMON_KEYS.KEY_DOWN:
                    if($scope.selectedIndex<($scope.citys.length-1)){
                        $scope.selectedIndex+=1;
                    }
                    choseCity($scope.selectedIndex);
                    break;
            }
            if ($scope.selectIndex > 3) {
                $scope.listRightStyle = (3 - $scope.selectIndex) * 285;
            } else if ($scope.listRightStyle !== 0) {
                $scope.listRightStyle = 0;
            }
        });
    }]);