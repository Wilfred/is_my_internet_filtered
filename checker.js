(function() {
    "use strict";

    var URLS = {
        alcohol: [],
        dating: [{
            url: "https://www.pof.com/",
            name: "Plenty Of Fish"
        }, {
            url: "http://www.match.com/",
            name: "match.com"
        }, {
            url: "https://www.zoosk.com/",
            name: "Zoosk"
        }, {
            url: "http://www.meetic.co.uk/",
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

    function tryRobotsTxt(category, url, name) {
        var robotsUrl = url + "robots.txt"; 
        
        $.get(robotsUrl, function() {
                console.log('success!');
        }, "text")
            .fail(function() {
                console.log('failed :(');
            });
    }

    tryRobotsTxt("dating", "https://www.pof.com/", "POF");
})();
