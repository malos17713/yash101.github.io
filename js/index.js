;var to = null;
var scrollToBody = null;
(function init() {
    $(document).ready(function() {
        var danger = null;
        $(document).ready(function ready() {
            $.ajax({
                dataType: "json",
                url: "res/danger.json",
                data: null,
                success: function(success) {
                    danger = success;
                    danger.pic = danger.pic.replace(danger.esep, "/");
                    danger.email = danger.email.replace(danger.esep, "@");

                    setTimeout(function setVars() {
                        var pic = document.querySelectorAll("body > #home #details #picture")[0];
                        pic.style.backgroundImage = "url(../" + danger.pic + ")";
                    }, 100);
                }
            });
        });

        var max = function max(a, b) {
            if(a > b) return a;
            return b;
        };

        scrollToBody = function scrollToBody() {
            $("html, body").animate({
                scrollTop: max(0, $("#body").offset().top - 64)
            });
        };

        to = function to(location, skip) {
            if(location == "home")
                history.pushState({}, '', window.location.protocol + '//' + window.location.host + window.location.pathname);
            scrollElement = $("#" + location);
            var update = function() {
                $("#body").html("<h1>Loading Content...</h1>");
                $.ajax({
                    dataType: "html",
                    url: "views/" + location + ".html",
                    data: null,
                    success: function(success) {
                        $("#body").html(success);
                        jQuery.getScript("js/" + location + ".js");
                        if(skip == null || skip) {
                            $("html, body").animate({
                                scrollTop: max(0, $("#body").offset().top - 64)
                            }, 1000);
                            history.pushState({}, '', window.location.protocol + '//' + window.location.host + window.location.pathname + "#" + location);
                        }
                    }
                });
            };


            if($(window).scrollTop() == 0) {
                update();
                return;
            }

            $("html, body").animate({
                scrollTop: 0
            }, 500, function() {
                if(location != "home")
                    update();
            });
        };

        (function() {
            var hash = window.location.hash;
            if(!hash) {
                to("projects", false);
                return;
            }
            if(hash[0] == '#') hash = hash.substring(1, hash.length);
            if(hash != "")
                to(hash, true);
            else
                to("projects", false);
        })();
    });
})();
