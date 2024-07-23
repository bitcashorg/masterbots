(function(w,d,c,k,a,b) {
    var cs = d.currentScript;
    if (cs) {
        var uo = cs.getAttribute('data-ueto');
        if (uo && w[uo] && typeof w[uo].setUserSignals === 'function') {
            w[uo].setUserSignals({'co': c, 'kc': k, 'at': a, 'bi': b});
        }
    }
})(window, document, 'ng', true, false, false);
(function(w,d,s,i) {
    var c=d.currentScript;
    if (c) {
        var uo = c.getAttribute('data-ueto');
        if (uo && w[uo] && w[uo].uetConfig && w[uo].uetConfig.deBlock === true)
            return;
    }
    var f,j; f=d.getElementsByTagName(s)[0]; j=d.createElement(s); j.async=true;
    j.src='https://bat.bing.com/p/insights/t/'+i;
    j.onload = function () {
        if (!c) return;
        var co = function(u) { return u && typeof u === 'object' && !(u instanceof Array) && u.beaconParams && u.beaconParams.mid && w.webinsights; };
        var r = 40;
        var cl = function() {
            if (r-- < 1) return;
            var uo = c.getAttribute('data-ueto');
            if (!uo) return;
            var u = w[uo];
            w.insightsuetq = w.mtagq || u;
            if (!co(u)) { setTimeout(function () { cl(); }, 250); return; }
            var m = u.beaconParams.mid;
            w.webinsights('set', '_uetmid', m);
            w.webinsights('metadata', (function () { w.webinsights('set', '_uetmid', m); }), false);
            d.addEventListener('UetEvent', function(e) {
                var nm = u.beaconParams.mid;
                if (m !== nm) { m = nm; w.webinsights('set', '_uetmid', m); }
            });
        };
        cl();
    };
    f.parentNode.insertBefore(j,f);
})(window, document, 'script', '39000145');
