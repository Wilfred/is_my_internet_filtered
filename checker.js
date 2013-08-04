(function() {
    "use strict";

    var URLS = {
        alcohol: [{
            url: "http://www.carling.com/favicon.ico",
            name: "Carling Lager"
        }, {
            url: "http://www.hardys.com.au/sites/hardys.com.au/files/hardys_favicon.ico",
            name: "Hardys"
        }],
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
        drugs: [{
            url: "http://legalizationofmarijuana.com/favicon.ico",
            name: "Legalization Of Marijuana"
        }, {
            url: "http://justsaynow.firedoglake.com/favicon.ico",
            name: "Just Say Now: Legalize marijuana"
        }, {
            url: "https://www.erowid.org/favicon.ico",
            name: "Erowid"
        }],
        fileSharing: [],
        gambling: [],
        gaming: [],
        hacking: [],
        politicallyControversial: [],
        pornography: [],
        proxies: [],
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

    $.each(URLS, function(category, sites) {
        $.each(sites, function(i, site) {
            checkImage(site.url);
        });
    });

})();
