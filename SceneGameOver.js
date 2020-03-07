var createSceneGameOver = function(game, System, distance) {

	var SceneGameOver = new Scene();

	var Background = new Sprite(System.Config["SCREEN_SIZE_X"], System.Config["SCREEN_SIZE_Y"]);
	Background.backgroundColor = "#222222";
	Background.opacity = 0.3;
	SceneGameOver.addChild(Background);

	// スコア説明ラベル設定
	var ResultScore = new Label();
	ResultScore.text = "<div class='result_score'>移動距離 : "+distance+"m</div>";
	ResultScore.width = 640;
	ResultScore.color = '#ffffff';
	ResultScore.x = 0;
	ResultScore.y = 100;
	SceneGameOver.addChild(ResultScore);

	var RetryButton = new Label();
	RetryButton.text = "<div class='button'>リトライ</div>";
	RetryButton.x = System.Config["SCREEN_SIZE_X"]/2 - RetryButton.width/2;
	RetryButton.y = System.Config["SCREEN_SIZE_Y"]/2;
	RetryButton.addEventListener('touchstart', function(){
		window.location.reload();
	});
	SceneGameOver.addChild(RetryButton);

	// ゲームオーバーシーンを返します。
	return SceneGameOver;

};
