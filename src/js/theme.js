$(document).ready(function() {
    var themes = [
        '',
        '/css/solarized.css',
        '/css/monokai.css',
    ];

    try {
        var all = JSON.parse(localStorage.getItem('kref-theme'));
        if (!all.length || all.length < themes.length)
            throw "¯\\_(ツ)_/¯";
    } catch (e) {
        console.log(e)
        all = themes;
    }

    $('#theme').attr('href', all[all.length - 1]);

    $('.avatar').click(function() {
        var t = all.shift();
        all.push(t);
        $('#theme').attr('href', t);
        localStorage.setItem('kref-theme', JSON.stringify(all));
    });
    
    var p = 0;
    $(window).on('scroll', function(e) {
            $('h1').css('position', window.scrollY < p ? 'fixed' : 'absolute');
        p = window.scrollY;
    });
});
