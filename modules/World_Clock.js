'use strict';

angular.module('app.worldClock', [])
    .controller('WorldClockController', ['$scope', 'ResourceManager', 'ActivityManager', 'COMMON_KEYS','TIMEZONE','SERVER_URL','$http', function ($scope, ResourceManager, ActivityManager, COMMON_KEYS,TIMEZONE,SERVER_URL,$http) {
        var activity = ActivityManager.getActiveActivity();
        activity.initialize($scope);
        var data = ResourceManager.getService();
        $scope.serviceName = data.name;
        $scope.iconUrl = data.icon;
        var i18nText = ResourceManager.getLocale();
        var lang = i18nText.lang;
        $scope.num = 8;
        $scope.symbol = "+";
        $scope.logo = ResourceManager.getConfigurations().logoUrl();

        var timeToDate = function(time,format){
            var t = new Date(time);
            var tf = function(i){return (i < 10 ? '0' : '') + i};
            return format.replace(/yyyy|MM|dd|HH|mm|ss/g, function(a){
                switch(a){
                    case 'yyyy':
                        return tf(t.getFullYear());
                        break;
                    case 'MM':
                        return tf(t.getMonth() + 1);
                        break;
                    case 'mm':
                        return tf(t.getMinutes());
                        break;
                    case 'dd':
                        return tf(t.getDate());
                        break;
                    case 'HH':
                        return tf(t.getHours());
                        break;
                    case 'ss':
                        return tf(t.getSeconds());
                        break;
                }
            })
        };
        $http.get(SERVER_URL + "/date.json").success(function (data) {
            $scope.timeData = data;
            var _time = new Date(data.date + (TIMEZONE * 3600000));
            $scope.clock = timeToDate(_time,'HH:mm');
            $scope.date = timeToDate(_time,'yyyy-MM-dd');
            changeTime();
        });

        function changeTime() {
            var timeNum = $scope.num-8;
            var _time = new Date($scope.timeData.date + (timeNum * 3600000));
            $scope.clock = timeToDate(_time,'HH:mm');
            $scope.date = timeToDate(_time,'yyyy-MM-dd');
            if (lang == "en-US") {
                switch ($scope.num) {
                    case 0:
                        $scope.cities = ["London", "Dublin", "Lisbon"];
                        break;
                    case 1:
                        $scope.cities = ["Paris", "Berlin", "Madrid", "Rome", "Vienna", "Copenhagen"];
                        break;
                    case 2:
                        $scope.cities = ["Kiev", "Sophia", "Athens", "Damascus", "Jerusalem"];
                        break;
                    case 3:
                        $scope.cities = ["Moscow", "Doha", "Kuwait", "baghdad"];
                        break;
                    case 4:
                        $scope.cities = ["Vitoria", "Abu Dhabi", "Baku"];
                        break;
                    case 5:
                        $scope.cities = ["Islamabad", "Ashkhabad", "Dushanbe"];
                        break;
                    case 6:
                        $scope.cities = ["Dhaka", "Astana"];
                        break;
                    case 7:
                        $scope.cities = ["Bangkok", "Jakarta", "Hanoi", "Vientiane", "Phnom penh"];
                        break;
                    case 8:
                        $scope.cities = ["Beijing", "Ulan Bator", "Singapore", "Kuala Lumpur", "Hongkong", "Taipei"];
                        break;
                    case 9:
                        $scope.cities = ["Pyongyang", "Seoul", "Tokyo", "koror"];
                        break;
                    case 10:
                        $scope.cities = ["Canberra", "agana"];
                        break;
                    case 11:
                        $scope.cities = ["Honiara", "Port Vila"];
                        break;
                    case 12:
                        $scope.cities = ["Wellington", "Aaron", "Tarawa"];
                        break;
                    case -11:
                        $scope.cities = ["Apia", "alofi"];
                        break;
                    case -10:
                        $scope.cities = ["Honolulu", "Hawaii"];
                        break;
                    case -9:
                        $scope.cities = ["Alaska", "Anchorage"];
                        break;
                    case -8:
                        $scope.cities = ["Losangeles", "California", "San Francisco"];
                        break;
                    case -7:
                        $scope.cities = ["Salt Lake City", "Utah"];
                        break;
                    case -6:
                        $scope.cities = ["Mexico City", "San jose"];
                        break;
                    case -5:
                        $scope.cities = ["Washington", "New York", "Panama"];
                        break;
                    case -4:
                        $scope.cities = ["Santiago", "San Juan", "Port Of Spain", "newfoundland"];
                        break;
                    case -3:
                        $scope.cities = ["Buenos Aires", "Brasilia", "Montevideo"];
                        break;
                    case -2:
                        $scope.cities = ["Praia"];
                        break;
                    case -1:
                        $scope.cities = ["Azores"];
                        break;
                }
            }else {
                switch ($scope.num) {
                    case 0:
                        $scope.cities = ["伦敦", "都柏林", "里斯本"];
                        break;
                    case 1:
                        $scope.cities = ["巴黎", "柏林", "马德里", "罗马", "维也纳", "哥本哈根"];
                        break;
                    case 2:
                        $scope.cities = ["基辅", "索菲亚", "雅典", "大马士革", "耶路撒冷"];
                        break;
                    case 3:
                        $scope.cities = ["莫斯科", "多哈", "科威特", "巴格达"];
                        break;
                    case 4:
                        $scope.cities = ["维多利亚", "阿布扎比", "巴库"];
                        break;
                    case 5:
                        $scope.cities = ["伊斯兰堡", "阿什哈巴德", "杜尚别"];
                        break;
                    case 6:
                        $scope.cities = ["达卡", "阿斯塔纳"];
                        break;
                    case 7:
                        $scope.cities = ["曼谷", "雅加达", "河内", "万象", "金边"];
                        break;
                    case 8:
                        $scope.cities = ["北京", "乌兰巴托", "新加坡", "吉隆坡", "香港", "台北"];
                        break;
                    case 9:
                        $scope.cities = ["平壤", "汉城", "东京", "科罗尔"];
                        break;
                    case 10:
                        $scope.cities = ["堪培拉", "阿加尼亚"];
                        break;
                    case 11:
                        $scope.cities = ["霍尼亚拉", "维拉港"];
                        break;
                    case 12:
                        $scope.cities = ["惠灵顿", "亚伦", "塔拉瓦"];
                        break;
                    case -11:
                        $scope.cities = ["阿皮亚", "阿洛菲"];
                        break;
                    case -10:
                        $scope.cities = ["檀香山", "夏威夷"];
                        break;
                    case -9:
                        $scope.cities = ["阿拉斯加", "安克雷奇"];
                        break;
                    case -8:
                        $scope.cities = ["洛杉矶", "加利福尼亚", "旧金山"];
                        break;
                    case -7:
                        $scope.cities = ["盐湖城", "犹他"];
                        break;
                    case -6:
                        $scope.cities = ["墨西哥城", "圣何塞"];
                        break;
                    case -5:
                        $scope.cities = ["华盛顿", "纽约", "巴拿马"];
                        break;
                    case -4:
                        $scope.cities = ["圣地亚哥", "圣胡安", "西班牙港", "纽芬兰"];
                        break;
                    case -3:
                        $scope.cities = ["布宜诺斯艾利斯", "巴西利亚", "蒙得维的亚"];
                        break;
                    case -2:
                        $scope.cities = ["普拉亚"];
                        break;
                    case -1:
                        $scope.cities = ["亚速尔群岛"];
                        break;
                }
            }
        }

        if(document.readyState=="complete"){
            ActivityManager.hideLoading(500);
        };
        activity.onKeyDown(function (keyCode) {
            switch (keyCode) {
                case COMMON_KEYS.KEY_LEFT:
                    if($scope.num>0&&$scope.num<=12){
                        $scope.num--;
                    }else {
                        $scope.symbol="";
                        if($scope.num==-11){
                            $scope.symbol="+";
                            $scope.num=12;
                        }else {
                            $scope.num--;
                        }
                    }
                    changeTime();
                    break;
                case COMMON_KEYS.KEY_RIGHT:
                    if($scope.num>=0&&$scope.num<12){
                        $scope.symbol = "+";
                        $scope.num++;
                    }else {
                        $scope.symbol="";
                        if($scope.num==12){
                            $scope.num=-11;
                        }else {
                            $scope.num++;
                        }
                    }
                    changeTime();
                    break;
                case COMMON_KEYS.KEY_BACK:
                    activity.finish();
                    break;
            }
        });
    }]);
