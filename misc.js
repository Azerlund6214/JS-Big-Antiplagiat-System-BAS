

// #####################################################
// ############################


if( pkm_killer_active ) document.oncontextmenu = cmenu; function cmenu() { return false; }
//запрещает нажатие правой кнопки мыши на сайте


// РОБИТ
// Унив функция проверки тега на разрешенность
function Is_Throwed_Tag(event)
{
	//console.log( "Masc = " + key_throw_tags );

	var event  = event || window.event;
	
	var sender = event.target || event.srcElement;
	var sender_tag = sender.tagName;
	//console.log( "Sender tag = " + sender_tag );
	
	
	var res = sender_tag.match(key_throw_tags) ;
	//console.log( "Res = " + res );
	
	
	if ( res === null ) // Лучше переписать через массив(оч много событий мышки)
	{	
		//console.log( sender_tag + " = Тег НЕ допустим: " + res );
		return false; //none
	}
	
	//console.log( sender_tag + " = Тег допустим: " + res );
	return true;
		
}






/* End */