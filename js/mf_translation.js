mf_translation = function()
{
	$(document).ready(function()
	{
		var lang = $_GET('lang');

		$('*[t]').each(function(i, e)
		{
			$.ajax({
				url: 'translation/' + lang + '.json',
				success: function (translations) 
				{
					if($(e).attr('t') != '')
					{
						var translation = translations[$(e).attr('t')];

						if(typeof(translation) == "object")
						{
							for(var attribute in translation)
							{
								$(e).attr(attribute, translation[attribute]);
							}

							$(e).text(translations[translation['text']]);
						}
						else
						{
							$(e).text(translation);
						}
					}
					else
					{
						$(e).text(translations[$(e).text()]);
					}
				},
				error : function()
				{
					console.log('No translation for that language. - ' + lang);
				},
				async: false
			});	
		});
	});
}


function $_GET(param) {
	var vars = {};
	window.location.href.replace( location.hash, '' ).replace( 
		/[?&]+([^=&]+)=?([^&]*)?/gi, // regexp
		function( m, key, value ) { // callback
			vars[key] = value !== undefined ? value : '';
		}
	);

	if ( param ) {
		return vars[param] ? vars[param] : null;	
	}
	return vars;
}

