// インスタンス変数、関数の定義
MyGame.Title = function (game) {

};

// タイトル処理
MyGame.Title.prototype = {
    // 作成
    create: function() {
        // 画面の真ん中にタイトルを表示
        let style = {
            font: "bold 32px Arial",
            fill: "#fff",
            boundsAlignH: "center",
            boundsAlignV: "middle"
        };
        let text = this.add.text(0, 0, "Title", style);
        text.setShadow(3, 3, "rgba(0,0,0,0.5)", 2);
        text.setTextBounds(0, 0, this.world.width, this.world.height);

        // クリックしたら、ゲーム開始するように設定
        this.input.onDown.addOnce(this.startGame, this);

        // スコアを描画
        MyGame.gameParams.AddScore(0);
    },

    // ゲームを開始
    startGame: function() {
        this.state.start("Game");
    },

    // 更新処理
    update: function() {

    },

    // 描画
    render: function() {

    },

    // 終了処理
    shutdown: function() {
        this.input.keyboard.reset(true);
    }
}
