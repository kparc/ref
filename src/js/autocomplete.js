$(document).ready(setTimeout.bind(window, function() {
    var data = $('h2,h3')
        .toArray()
        .map(v => ({ code: $(v).find('code').text() , label: v.innerText, id: '#' + v.id }))
    $('#autocomplete').easyAutocomplete({
        data: data,
        getValue: function(el) {
            return el.code + ' ' + el.label.replace(el.code, '').trim()
        },
        template: {
            type: "links",
            fields: {
                link: "id"
            }
        },
        list: {
		    match: {
			    enabled: true,
                caseSensitive: false,
                method: function (el, ph) {
                    return el.indexOf(ph) > -1
                }
		    }
	    }
    });
}, 500));
