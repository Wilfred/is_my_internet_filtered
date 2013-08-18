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
        // based on http://www.bombsecurity.com/extremists.html and
        // http://hatemonitor.csusb.edu/extremist_websites.htm
        extremist: [{
            url: "http://www.godhatesfags.com/favicon.ico",
            name: "Westboro Baptist Church"
        }, {
            url: "http://www.animalliberationfront.com/favicon.ico",
            name: "Animal Liberation Front"
        }],
        fileSharing: [{
            url: "https://www.4shared.com/favicon.ico",
            name: "4shared"
        }, {
            url: "http://static.filestube.com/files/images/favicon.ico",
            name: "FilesTube"
        }, {
            url: "https://torrentz.eu/favicon.ico",
            name: "Torrentz"
        }, {
            url: "http://thepiratebay.sx/favicon.ico",
            name: "The Pirate Bay"
        }],
        gambling: [{
            url: "http://www.pch.com/favicon.ico",
            name: "Publishers Clearing House"
        }, {
            url: "https://www.williamhill.com/favicon.ico",
            name: "William Hill"
        }, {
            url: "https://www.calottery.com/favicon.ico",
            name: "California Lottery"
        }],
        gaming: [{
            url: "https://www.miniclip.com/favicon.ico",
            name: "Miniclip"
        }, {
            url: "https://www.kongregate.com/favicon.ico",
            name: "Kongregate"
        }, {
            url: "http://www.neopets.com/favicon.ico",
            name: "Neopets"
        }],
        hacking: [{
            url: "https://www.hackthissite.org/favicon.ico",
            name: "Hack This Site!"
        }, {
            url: "https://www.defcon.org/favicon.ico",
            name: "DEF CON Hacking Conference"
        }, {
            url: "https://www.hackthis.co.uk/favicon.ico",
            name: "HackThis!"
        }],
        pornography: [{
            url: "https://www.youporn.com/favicon.ico",
            name: "YouPorn"
        }, {
            url: "http://www.literotica.com/favicon.ico",
            name: "Literotica"
        }, {
            url: "http://new.livejasmin.com/favicon.ico",
            name: "LiveJasmin"
        }],
        proxies: [{
            url: "https://www.hidemyass.com/favicon.ico",
            name: "Hide My Ass!"
        }, {
            url: "https://www.kproxy.com/favicon.ico",
            name: "KPROXY"
        }, {
            url: "https://www.webproxy.net/favicon.ico",
            name: "webproxy"
        }],
        sexuality: [{
            url: "https://egale.ca/favicon.ico",
            name: "Egale"
        }, {
            url: "https://fetlife.com/favicon.ico",
            name: "FetLife"
        }, {
            url: "http://www.samesame.com.au/favicon.ico",
            name: "SameSame"
        }],
        socialNetworks: [],
        weaponsAndViolence: [],
        tobacco: []
    }

    var results = {};

    function capitalize(string) {
        return string.charAt(0).toUpperCase() + string.slice(1);
    }

    function redrawResults() {
        $.each(results, function(category, logs) {
            var summarySelector = "#" + category + "-summary",
                detailsSelector = "#" + category + "-details",
                successCount = logs.success.length,
                failCount = logs.failed.length,
                total = successCount + failCount,
                summary = failCount ? failCount + "/" + total + " failed" : "Not filtered";

            $(summarySelector).text(capitalize(category) + ": " + summary);
            $(detailsSelector).text(JSON.stringify(logs.failures));
        });
    }

    function checkImage(category, site) {
        var img = new Image();
        img.onload = function() {
            results[category] = results[category] || {failed: [], success: []};
            results[category].success.push(site);

            redrawResults();
        };
        img.onerror = function() {
            results[category] = results[category] || {failed: [], success: []};
            results[category].failed.push(site);
            
            redrawResults();
        };

        img.src = site.url;
    }

    $.each(URLS, function(category, sites) {
        $.each(sites, function(i, site) {
            checkImage(category, site);
        });
    });

})();
