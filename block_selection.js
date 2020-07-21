

//запрещает выделение мышкой
function preventSelection()
{
	
	// Убирает выделение
	function removeSelection()
	{
		if (window.getSelection)
			window.getSelection().removeAllRanges();
		else
		if (document.selection && document.selection.clear)
			document.selection.clear();
	}
	
	
	// Сброс выделения = при любом движении мыши
	document.addEventListener( 'mousemove', function(event) { if( ! Is_Throwed_Tag(event) ){ removeSelection(); }   } );
	
	// Сброс выделения = при нажатии ЛКМ	
	document.addEventListener( 'mousedown', function(event) { if( ! Is_Throwed_Tag(event) ){ removeSelection(); }   } );
	
	// TODO: Добавить сброс при нажатии любой кнопки
}


// Включение
if( sel_killer_active ) preventSelection( );





/* End */