/*  */


function addSourceLink()
{
	
	if( Is_Throwed_Tag(event) )
		return;
		
		
	var body_element = document.getElementsByTagName('body')[0];
	
	var selection = window.getSelection();	
	//var pagelink = "<br><br>Source: " + window.location.href;
	var pagelink = add_source_text + window.location.href;
	var copytext = selection + pagelink;
	
	// переписать без дива, чтоб просто запихивался текст в селекшен
	
	var newdiv = document.createElement('div');
	newdiv.style.position='absolute';
	newdiv.style.left='-9999px';
	
	body_element.appendChild(newdiv);
	newdiv.innerHTML = copytext;
	selection.selectAllChildren(newdiv);
	
	window.setTimeout(function()
	{
		body_element.removeChild(newdiv);
	},0);
}


if ( add_source_active )
	document.oncopy = addSourceLink;

// ЗДесь НЕТ event = МОЖЕТ КРИВО РАБОТАТЬ проверка тега !!!!!!!!!!!
// Но пока все робит норм


/*  */