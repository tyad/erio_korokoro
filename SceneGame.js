var createSceneGame = function(game, System) {
	var scroll_speed = 10;
	var PizaCounter = 0;
	var HurdleCounter = 0;
	var end_flag = false;

	var SceneGame = new Scene();
	SceneGame.addEventListener('touchstart', function(e){
		console.log('jump');
		if(Erio.jump1_flag == false){
			Erio.vy += -15;
			Erio.jump1_flag = true;
		}
	});

	var Camera = new Group();
	SceneGame.addChild(Camera);

	// スコア表示用ラベル
	var Score = new Label("");
	Score.x = System.Config["SCREEN_SIZE_X"]/2;
	Score.distance = 0;
	Score.color = '#fff';
	SceneGame.addChild(Score);

	// スクロールする背景1
	var Background1 = new Sprite(System.Config["SCREEN_SIZE_X"], System.Config["SCREEN_SIZE_Y"]);
	Background1.image = game.assets['./img/bg.gif'];
	Background1.x = 0;
	Background1.y = 0;
	Camera.addChild(Background1);

	// スクロールする背景2
	var Background2 = new Sprite(System.Config["SCREEN_SIZE_X"], System.Config["SCREEN_SIZE_Y"]);
	Background2.image = game.assets['./img/bg.gif'];
	Background2.x = System.Config["SCREEN_SIZE_X"] - 1;
	Background2.y = 0;
	Camera.addChild(Background2);

	// エリオ
	var Erio = new Sprite(System.Config["ERIO_SIZE"], System.Config["ERIO_SIZE"]);
	Erio.image = game.assets['./img/erio.gif'];
	Erio.x = 80;
	Erio.y = System.Config["GROUND_LINE"] - Erio.height;
	Erio._element.style.zIndex = 5;
	Erio.rotation_value = 0;
	Erio.jump1_flag = false;
	Erio.vy = 0;
	Erio.addEventListener('enterframe', function(){
		Erio.rotation_value += 45;
		if(Erio.rotation_value == 360){
			Erio.rotation_value = 0;
		}
		Erio.rotation = Erio.rotation_value;

		if(this.jump1_flag == true){
			this.y += this.vy;
		}
		//着地
		if(Erio.y >= System.Config["GROUND_LINE"] - Erio.height) {
			game.assets['sound/land.mp3'].stop();
			game.assets['sound/land.mp3'].play();
			game.assets['sound/land.mp3'].volume = 0.4;
			Erio.jump1_flag = false;
			Erio.vy = 0;
		}if(Erio.jump1_flag == true){
			Erio.vy += 1;
		}
	});
	Erio.baunce = function(){
		var bounce = scroll_speed/5;
		scroll_speed = 0;
		var Background0 = new Sprite(System.Config["SCREEN_SIZE_X"], System.Config["SCREEN_SIZE_Y"]);
		Background0.image = game.assets['./img/bg.gif'];
		Background0.x = -640;
		Background0.y = 0;
		Camera.addChild(Background0);

		Erio.addEventListener('enterframe', function(){
			if(Erio.y == System.Config["GROUND_LINE"] - Erio.height){
				Erio.clearEventListener();
				setTimeout(function(){
					end();
				},1000);
			}else{
				Erio.y -= 1;
				Erio.x -= bounce;
				Camera.x += bounce*2;
			}
		});
	}
	Camera.addChild(Erio);

	var ErioHit = new Sprite(1, 1);
	ErioHit.x = Erio.x + Erio.width / 2;
	ErioHit.y = Erio.y + Erio.height / 2;
	Camera.addChild(ErioHit);

	//ハードル
	var createHurdle = function(){
		var TmpHurdle = new Sprite(45, 100);
		TmpHurdle.image = game.assets['./img/Hurdle.png'];
		TmpHurdle.x = -TmpHurdle.width+System.Config["SCREEN_SIZE_X"];
		TmpHurdle.y = System.Config["GROUND_LINE"] - TmpHurdle.height;
		TmpHurdle.counter = 0;
		TmpHurdle.addEventListener('enterframe', function(){
			if(this.x <= -this.width){
				Camera.removeChild(this);
				console.log('remove Hurdle');
			}else{
				TmpHurdle.x -= scroll_speed;
			}
		});
		return TmpHurdle;
	}
	var Hurdle = createHurdle();

	//ピザ
	var createPiza = function(){
		var TmpPiza = new Sprite(50, 30);
		TmpPiza.image = game.assets['./img/Piza.gif'];
		TmpPiza.x = -TmpPiza.width+System.Config["SCREEN_SIZE_X"];
		TmpPiza.y = System.Config["GROUND_LINE"] - TmpPiza.height;
		TmpPiza.addEventListener('enterframe', function(){
			if(this.x <= -this.width){
				Camera.removeChild(this);
				console.log('remove Piza');
			}else{
				TmpPiza.x -= scroll_speed;
			}
		});
		return TmpPiza;
	}
	var Piza = createPiza();

	//
	var end = function() {
		var SceneGameOver = createSceneGameOver(game, System, Score.distance);
		game.assets['sound/bgm.mp3'].stop();
		game.assets['sound/result.mp3'].play();
		game.assets['sound/result.mp3'].volume = 0.4;
		game.pushScene(SceneGameOver);
	}

	SceneGame.addEventListener(Event.ENTER_FRAME, function(){
		//BGM ループ再生
		game.assets['sound/bgm.mp3'].play();
		game.assets['sound/bgm.mp3'].volume = 0.4;

		PizaCounter += scroll_speed;
		HurdleCounter += scroll_speed;
		if(game.frame % (game.fps/10) == 0){
			Score.distance += scroll_speed;
			Score.text = "現在 : "+Score.distance.toString()+'m'; // スコア表示を更新
		}
		if (PizaCounter >= 1380) {
			console.log("Piza!");
			PizaCounter = 0;
			Piza = createPiza();
			Camera.addChild(Piza);
		}

		if (HurdleCounter >= 600) {
			console.log("Hurdle!");
			HurdleCounter = 0;
			Hurdle = createHurdle();
			Camera.addChild(Hurdle);
		}

		if (Piza.x > -Piza.width) {
			if (Piza.intersect(ErioHit)) {

				if(scroll_speed < 20){
					System.playSe('sound/piza.mp3');
					scroll_speed += 2;
				}
				console.log("scroll_speed:"+scroll_speed);
				Camera.removeChild(Piza);
				Piza = createPiza();
			}
		}
		if (Hurdle.x > -Hurdle.width) {
			if (Hurdle.intersect(ErioHit) && end_flag == false) {
				end_flag = true;
				game.assets['sound/hurdle.mp3'].play();
				Erio.baunce();

			}
		}

		// 当たり判定用スプライトを上下中心に置く
		ErioHit.x = Erio.x + Erio.width/2;
		ErioHit.y = Erio.y + Erio.height/2;

		// 背景をスクロールさせる
		Background1.x -= scroll_speed;
		Background2.x -= scroll_speed;
		if (Background1.x <= -System.Config["SCREEN_SIZE_X"]) {
			Background1.x = System.Config["SCREEN_SIZE_X"] + Background2.x - 1;
		}
		if (Background2.x <= -System.Config["SCREEN_SIZE_X"]) {
			Background2.x = System.Config["SCREEN_SIZE_X"] + Background1.x - 1;
		}

	});

	//ゲームシーンを返します
	return SceneGame;
}
