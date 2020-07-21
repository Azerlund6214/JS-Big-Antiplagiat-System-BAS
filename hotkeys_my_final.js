


	var arr_keys_pressed = new Array(); //[]  new Array();
	
	var key_combo_count_pressed = 1; //Какое сейчас нажатие комбы
	

	
	
	// ########################
	// ### Вывод массива на экран
	// /*
		
		var antiplag_debug_active = false;
		
		// Создает тег(робит)
		function antiplag_debug_start( )
		{
			let div1 = document.createElement('div');
			div1.id = "antiplag_debug";
			div1.style = "position: fixed; z-index: 100; bottom: 10px; left: 30px; color: red; font-size:32px;";
			document.body.append(div1);
		
			antiplag_debug_active = true;
		}
		
		// Удаляет тег(робит)
		function antiplag_debug_end( )
		{
			document.getElementById("antiplag_debug").remove();
			antiplag_debug_active = false;
		}
		
		
		// */
		
		function debug_refresh_antiplag_div( )
		{
			// Вызывается в обработчиках нажатия и отпуска
			if ( antiplag_debug_active === true )
				document.getElementById('antiplag_debug').innerHTML = "Keys = " + arr_keys_pressed;
		}
		
	// ########################
	
	
	
	
	function check_combinations(event)
	{
		
		//console.clear();
		
		//console.log( "################################# check_combinations" );
		//console.log( "Проверка сочетаний = Нажаты 2+ кнопки: " + arr_keys_pressed );
		
		var keys_has_combo = false; // Есть ли для этих клавиш комбинация
		var keys_has_combo_i = -1; // Номер элемента с совпадением
		
		for (let i = 0; i < arr_keys_comb.length; i++)
		{
			//console.log( "##### FOR => i="+ i +" => arr_keys_comb[i][0] = " + arr_keys_comb[i][0] );
			
			
			if ( arr_keys_comb[i][0].length != arr_keys_pressed.length )
			{
				//console.log("i="+ i +" => Размеры НЕ одинаковы - continue = ");
				continue;
			}
			
			//console.log("Размеры одинаковы.");
			
			/*
			console.log("Массив комб  => " + arr_keys_comb[i][0] );
			console.log("Массив press => " + arr_keys_pressed );
			console.log("Сортировка.");
			*/
			
			arr_keys_comb[i][0].sort();
			arr_keys_pressed.sort();
			
			
			/*
			console.log("Массив комб  => " + arr_keys_comb[i][0] );  console.info( arr_keys_comb[i][0] );
			console.log("Массив press => " + arr_keys_pressed    );  console.info( arr_keys_pressed );
			console.info( arr_keys_comb[i][0] );   console.info( arr_keys_pressed );
			*/
			
			
			
			for (let k = 0; k < arr_keys_comb[i][0].length; k++)
			{
				var key1 = arr_keys_comb[i][0][k] ;
				var key2 = arr_keys_pressed[k] ;
				
				/* console.log("k = " + k +"\nKey1 = " + key1 + "\nKey2 = " + key2);  */
				
				if( key1 != key2 )
					break; // эта строка не подходит
				
				// Прошли все циклы по каждой клавише и все норм
				if( k === arr_keys_comb[i][0].length - 1 )
				{
					//console.log("!! Клавиши одинаковы - break = do action");
					keys_has_combo = true;
					keys_has_combo_i = i;
					break;
				}
				
			}
			
			
			if ( keys_has_combo )
				break; // Нашли, идем дальше
			
		}//End for
		
		// Если промотали все циклы и не нашли комбо
		if ( ! keys_has_combo )
			return;
		
		
		if ( echo_combo_in_log )
			console.log("HotKeys = Вызвано комбо с i = " + keys_has_combo_i + " ==> " + arr_keys_comb[keys_has_combo_i][0] );
		
		
		
		// Действия
		arr_keys_comb[keys_has_combo_i][1](event); // Вызываем функцию
		
		// При событии удалять все клавиши из массива
		arr_keys_pressed = [];
		
		// #############
		
		if ( joke_alert_active )
		{
			switch(key_combo_count_pressed)
			{
				case  5: alert("Ээммм, привет... (5 раз)"); break;
				case 10: alert("Хватит тыкать! (10 раз)"); break;
				case 15: alert("Не надоело? (15)(20 25 30 35 40 60 75 99 999)"); break;
				case 20: alert("Может хватит? (20)"); break;
				case 25: alert("Прекрати! (25)"); break;
				case 30: alert("ЗАЧЕМ? Просто скажи мне ЗАЧЕМ???? (30)"); break;
				case 35: alert("О привет, а я тебя знаю.mp3 (35)"); break;
				case 40: alert("Это последнее сообщение, дальше ничего не будет. Я предупредил... (40)"); break;
				case 60: alert("Еще чуть-чуть... (60)"); break;
				case 75: alert("Мне было лень придумывать фразу, поэтому сайчас она здесь. (75)"); break;
				case 99: alert("Либо ты все-таки открыл инспектор и подправил переменную, либо ты читаешь это в коде, либо тебе совсем нечего делать. (99)"); break;
				case 999: alert("Ты 100% открыл исходный код скрипта, привет коллегам-айтишникам))) (999)"); break;
				default:  break;
			}
				key_combo_count_pressed++;
		}
		
		// #############
		
		
	}// End check_combinations(event)
	
	

	function on_keydown_event(event)
	{
		//console.log("=============begin on_keydown_event");
		//console.log(event);
		
		var key_downed = event.code;
		//console.log( "Нажата кнопка = " + key_downed );
		
		
		
		// Добавляю в массив
		
		var index = arr_keys_pressed.indexOf( key_downed );
		
		if (index <= -1) // Если не найдена
		{
			//console.log( "Кнопка = " + key_downed + " = Добавлена в массив" );
			arr_keys_pressed.push( key_downed );
			//arr_keys_pressed.splice(0, 0, key_downed );
			//console.log( "###########" );
			//console.info( arr_keys_pressed );
		}
		else
		{
			//console.log( "Кнопка = " + key_downed + " = Уже была в массиве - не добавляю" );
		}
		
		debug_refresh_antiplag_div();
		
		
		if( Is_Throwed_Tag(event) === false )
			check_combinations();
		
		//debug_refresh_antiplag_div(); // специально не ставлю - иначе сбрасывает посл клавишу комбы

	}//End event
	
	
	function on_keyup_event(event)
	{
		
		var key_upped = event.code;
		//console.log( "ОТжата кнопка = " + key_upped );
		
		
		
		// Удаляю из массива
		
		var index = arr_keys_pressed.indexOf( key_upped );

		if (index >= 0) // Если найдена
		{
			//console.log( "Кнопка = " + key_upped + " = Удалена из массива" );
			arr_keys_pressed.splice(index, 1);	
		}
		else
		{
			//console.log( "Кнопка = " + key_upped + " = Отжата, но не найдена в массиве" );
		}
		
		debug_refresh_antiplag_div();
		
	}//End event

	
	// /*
	// Что происходит после нажатия запрещенной клавиши
	function KeyKiller(event)
	{
		if (event.preventDefault)
			event.preventDefault();
		else
			event.returnValue = false;
	}
	// */
	
	
	if ( key_killer_active )
	{
		document.addEventListener( 'keyup',   function(event) { on_keyup_event(event);  } );
		
		document.addEventListener( 'keydown', function(event) { on_keydown_event(event);} );
	}




	
/* end */