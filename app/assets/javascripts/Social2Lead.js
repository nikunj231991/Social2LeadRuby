$(document).ready(function () {
        $("#LogOff").hide();
    var webUrl = $('#WebUrl').val();
    if (window.location.href.indexOf("index?login") == -1)
    {
        function getParameterValues(param) {
            var url = window.location.href.slice(window.location.href.indexOf('?') + 1).split('&');
            for (var i = 0; i < url.length; i++) {
                var urlparam = url[i].split('=');
                if (urlparam[0] == param) {
                    return urlparam[1];
                }
            }
        }

        $("#LogOff").show();
        var email = getParameterValues("email");
        if (email) {
            var authentication = {
                access_token: "",
                expires_in: "",
                bearer_token: "",
                email: "",
                powerbipassword: "",
                userid:""
            };

            authentication.access_token = getParameterValues('accesstoken');
            authentication.expires_in = getParameterValues('expiryin');
            authentication.bearer_token = getParameterValues('bearertoken');
            authentication.email = getParameterValues('email');
            authentication.powerbipassword = getParameterValues('pwd');
            authentication.userid = getParameterValues('userid');
            var t = new Date();
            var expiryTimeSpan = t.getTime() / 1000;
            expiryTimeSpan = expiryTimeSpan + parseInt(authentication.expires_in);
            var model = {
                data: authentication,
                timestamp: expiryTimeSpan,
                expireTimeInMilliseconds: authentication.expires_in
            }
            var jsonModel = JSON.stringify(model);
            localStorage.setItem('authorizationData', jsonModel);            
        } else {
            var authData = localStorage.getItem('authorizationData');
            if (authData) {
                var user = JSON.parse(localStorage.getItem('authorizationData'));
                var expiryTimeSpan = new Date().getTime() / 1000;
                if (expiryTimeSpan > user.timestamp) {
                    localStorage.removeItem("authorizationData");
                    
                }
            } else {
                localStorage.removeItem("authorizationData");
               $("#LogOff").hide();
            }
        }
    }
    $("#LogOff").click(function () {
        var authData = localStorage.getItem('authorizationData');
        debugger;
        if (authData) {
            var user = JSON.parse(localStorage.getItem('authorizationData'));
            localStorage.removeItem("authorizationData");
            var serviceUrl = $('#ServiceUrl').val();
            var redirectUrl =serviceUrl + "Home/Index";
            var url = serviceUrl + "api/Account/LogOff?access_token=" + user.data.access_token + "&provider=Facebook&redirectUrl=" + redirectUrl;
            window.location = url;
        } else {
            localStorage.removeItem("authorizationData");
            var homeUrl = webUrl + "home/index?login";
            window.location = homeUrl;
        }
    });
});