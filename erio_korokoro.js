enchant();
//tett
window.onload = function() {
	var System = new Object();
	System.Config = {
			"SCREEN_SIZE_X" : 640, 
			"SCREEN_SIZE_Y" : 320,
			"ERIO_SIZE" : 50,
			"GROUND_LINE" : 250
	}
	//音ON/OFF用フラグ
	System.SoundFlag = true;
	System.switchingSoundFlag = function(){
		System.SoundFlag = !System.SoundFlag;
	}
	System.playSe = function(file_pass){
		if(System.SoundFlag){
			//console.log('play se :'+file_pass);
			var se = game.assets[file_pass];
			se.stop();
			se.play();
		}
	}

	var game = new Game(System.Config["SCREEN_SIZE_X"], System.Config["SCREEN_SIZE_Y"]);
	game.fps = 30;
	game.preload(
		'./img/erio.gif', 
		'./img/bg.gif', 
		'./img/Hurdle.png', './img/Piza.gif',
		//
		'sound/bgm.mp3', 'sound/hurdle.mp3', 'sound/piza.mp3', 'sound/result.mp3', 'sound/land.mp3'
	);

	game.onload = function() {
		var SceneGame = createSceneGame(game, System);
		var SceneStart = createSceneStart(game, System, SceneGame);
		game.pushScene(SceneStart);
	}

	game.start(); // ゲームをスタートさせます

}
