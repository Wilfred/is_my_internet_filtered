(function() {
    "use strict";

    var URLS = {
        alcohol: [{
            url: "http://www.carling.com/favicon.ico",
            name: "Carling Lager"
        }, {
            url: "http://hardyswines.com/uk/wp-content/themes/hardys2013/icons/Hardys.ico",
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
        }, {
            url: "http://www.stormfront.org/favicon.ico",
            name: "Stormfront"
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
            url: "https://www.ladbrokes.com/favicon.ico",
            name: "Ladbrokes"
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
        socialNetworks: [{
            url: "https://www.facebook.com/favicon.ico",
            name: "Facebook"
        }, {
            url: "https://www.twitter.com/favicon.ico",
            name: "Twitter"
        }, {
            url: "https://plus.google.com/favicon.ico",
            name: "Google+"
        }],
        weapons: [{
            url: "http://home.nra.org/favicon.ico",
            name: "NRA"
        }, {
            url: "http://thefiringline.com/favicon.ico",
            name: "The firing line"
        }, {
            url: "http://www.knifecenter.com/favicon.ico",
            name: "Knife Center"
        }]
    }

    var results = {};

    function redrawResults() {
        $.each(results, function(category, logs) {
            var summarySelector = "#" + category + "-summary",
                detailsSelector = "#" + category + "-details",
                $detailsTemplate = $('#details-template').html(),
                successCount = logs.success.length,
                failCount = logs.failed.length,
                summary;

            if (failCount > 0) {
                summary = failCount + " failed";
            } else if (successCount === URLS[category].length) {
                summary = "Not filtered";
            } else {
                summary = "Checking";
            }
            $(summarySelector).text(summary);

            if (failCount > 0) {
                // $(detailsSelector).text(JSON.stringify(logs.failed));
                $(detailsSelector).html(_.template($detailsTemplate, {failed: logs.failed}));
            }
        });
    }

    function tryFetchImage(url, successCallback, failureCallback) {
        // Try to fetch image at URL, and call failureCallback if the
        // image is invalid, we get a bad HTTP response, or it times out.
        var img = new Image(),
            completed = false;

        img.onload = function() {
            completed = true;
            successCallback();
        };
        img.onerror = function() {
            completed = true;
            failureCallback();
        };

        // start the fetching
        img.src = url;

        // Cancel the image fetch if nothing's happened after 10
        // seconds.  The browser would eventually call onerror, but
        // the timeout (particularly DNS) can take over 30 seconds.
        setTimeout(function() {
            if (!completed) {
                // stop the fetch
                img.src = "";

                failureCallback();
            }
        }, 10000);
    }

    function checkImage(category, site) {
        // check for an image load. Record an error if we can't load it.
        var success = function() {
            results[category] = results[category] || {failed: [], success: []};
            results[category].success.push(site);

            redrawResults();
        };
        var failed = function() {
            results[category] = results[category] || {failed: [], success: []};
            results[category].failed.push(site);
            
            redrawResults();
        };

        tryFetchImage(site.url, success, failed);
    }

    $.each(URLS, function(category, sites) {
        $.each(sites, function(i, site) {
            checkImage(category, site);
        });
    });

})();
