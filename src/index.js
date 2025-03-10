function query() {
    let y = $('#year').val();
    let e = $('#eventSelect').val();
    let comp = event.find((x) => x[0] == e)[1];
    document.getElementById('toggle').innerHTML =
        '<h2>' + y + ' ' + comp + '</h2>\n';
    let team_res = tres.find((x) => x[0] == y + ' ' + e);
    if (team_res != undefined) {
        let counter = 0;
        team_res = team_res[1].split(',');
        team_res.forEach(function box(s) {
            var txt = '<div class="box';
            if (s.length == 0) return;
            s = formatPlace(s);
            s += ' Team';
            if (counter == 0) s += ' Districts';
            if (counter == 1) s += ' Regionals';
            if (counter == 2) s += ' State';
            counter++;
            if (s.includes('1')) txt += ' gold';
            if (s.includes('2')) txt += ' silver';
            if (s.includes('3')) txt += ' bronze';
            txt += '">' + s;
            txt += '</div>\n';

            document.getElementById('toggle').innerHTML += txt;
        });
    }
    document.getElementById('toggle').innerHTML += '<br\n';

    let ind_res = res.find((x) => x[0] == y + ' ' + e)[1].split('|');
    document.getElementById('toggle').innerHTML +=
        '<h4>Team Members:</h4>\n<ul>\n';
    ind_res.forEach(function mem(s) {
        let txt = '<li>';
        let idx = s.indexOf(':');
        let name = s.substring(0, idx);
        let link = name.toLowerCase().split(' ').join('-') + '.html';
        txt +=
            '<b><u><a href="profiles/' + link + '">' + name + '</a></u></b>: ';
        let res = s.substring(idx + 1).split(',');
        let place = '';
        let counter = 0;
        for (let i = 0; i < res.length; i++) {
            if (res[i] == '0') {
                counter++;
                continue;
            } else if (res[i].length <= 2) {
                place += formatPlace(res[i]) + ' ';
            } else {
                place += res[i] + ' ';
                counter--;
            }
            if (counter == 0) place += 'Districts';
            if (counter == 1) place += 'Regionals';
            if (counter == 2) place += 'State';
            counter++;
            if (i < res.length - 1) place += ', ';
        }
        txt += place;
        document.getElementById('toggle').innerHTML += txt + '</li>\n';
    });
    document.getElementById('toggle').innerHTML += '</ul>\n<br>';
}
function formatPlace(s) {
    s = parseInt(s);
    if (s.toString().charAt(0) == '1' && s != 1) {
        s += 'th';
    } else if (s % 10 == 1) {
        s += 'st';
    } else if (s % 10 == 2) {
        s += 'nd';
    } else if (s % 10 == 3) {
        s += 'rd';
    } else {
        s += 'th';
    }
    return s;
}
