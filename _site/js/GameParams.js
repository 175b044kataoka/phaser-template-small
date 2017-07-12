MyGame.GameParams = function (game) {

    // ゲームオブジェクト
    this.game = game;
    // スコア
    this.score = 0;
    // スコアテキスト
    this.scoreText = null;

    // スコアを追加
    let style = {
        font: "bold 24px Arial",
        fill: "#f00",
        boundsAlignH: "left",
        boundsAlignV: "top"
    };
    this.scoreText = this.add.text(5, 5, "", style);
    this.scoreText.setShadow(1, 1, "rgba(255, 255, 255, 0.8)", 1);

    // 常に表示するために、Stageに追加
    game.stage.addChild(this.scoreText);

}

// ゲームパラメーター関連
MyGame.GameParams.prototype = {

    // スコアを加算
    AddScore: function(add) {
        this.score += add;
        if (this.score > 999999) {
            this.score = 999999;
        }
        this.scoreText.text = "Score "+("00000"+this.score).slice(-6);
    }

}
