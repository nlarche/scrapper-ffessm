var Xray = require('x-ray');
var x = Xray();

var fs = require('fs');

fs.readFile('./recherche_club_liste.html', function (err, html) {
    if (err) {
        throw err;
    }

    x(html, ['a@href'])(function (err, obj) {

        if (!obj) {
            console.log('no link')
            return;
        }

        var list = [];

        obj.forEach(function (element) {

            var center = {};

            x("http://www.ffessm.fr/" + element, ['a@href'])(function (err, _obj) {

                _obj.forEach(function (element) {
                    if (element.indexOf("mailto:") !== -1) {
                        console.log(element);
                        center.mail = element;
                    }
                })

                x("http://www.ffessm.fr/" + element, '.titre18_bleu')(function (err, element) {

                    console.log(element);
                    center.name = element;

                    list.push(center);
                })
            })
        });
    })
});



