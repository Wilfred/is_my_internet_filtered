(function() {
    "use strict";

    var URLS = {
        alcohol: [],
        dating: [{
            url: "http://www.match.com/favicon.ico",
            name: "match.com"
        }, {
            url: "https://www.zoosk.com/favicon.ico",
            name: "Zoosk"
        }, {
            url: "http://www.meetic.co.uk/favicon.ico",
            name: "meetic"
        }],
        drugs: [],
        fileSharing: [],
        gambling: [],
        gaming: [],
        hacking: [],
        politicallyControversial: [],
        pornography: [],
        sexuality: [],
        socialNetworks: [],
        weaponsAndViolence: [],
        tobacco: [],
    }

    var results = {};

    function checkImage(url) {
        var img = new Image();
        img.onload = function() {
            console.log('all good for ' + url)
        };
        img.onerror = function() {
            console.log('failed for ' + url);
        };

        img.src = url;
    }


    $.each(URLS.dating, function(i, site) {
        checkImage(site.url);
    });

})();
