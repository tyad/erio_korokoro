var createSceneStart = function(game, System, SceneGame) {
	var SceneStart = new Scene();
	SceneStart.backgroundColor = '#77ddff';

	// タイトル
	var TitleLogo = new Label();
	TitleLogo.width = 640;
	TitleLogo.color = '#ffffff';
	TitleLogo.x = 0;
	TitleLogo.y = 96;
	TitleLogo.text = "<div>ころころエリオ</div>";
	SceneStart.addChild(TitleLogo);

	// 説明
	var Info = new Label();
	Info.width = 640;
	Info.color = '#ffffff';
	Info.x = 0;
	Info.y = 222;
	Info.text = "<div>クリックでスタート : クリックでジャンプ<br>ピザを取るとスピードUP</div>";
	SceneStart.addChild(Info);

	SceneStart.addEventListener('touchstart', function(e) {
		game.popScene(this);
		game.pushScene(SceneGame);
	});

	// タイトルシーンを返します。
	return SceneStart;
};
