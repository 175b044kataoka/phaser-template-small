// インスタンス変数、関数の定義
MyGame.Clear = function (game) {

};

// タイトル処理
MyGame.Clear.prototype = {
    // 作成
    create: function() {
        // 画面の真ん中にタイトルを表示
        let style = {
            font: "bold 32px Arial",
            fill: "#fff",
            boundsAlignH: "center",
            boundsAlignV: "middle"
        };
        let text = this.add.text(0, 0, "Clear", style);
        text.setShadow(3, 3, "rgba(0,0,0,0.5)", 2);
        text.setTextBounds(0, 0, this.world.width, this.world.height);

        // クリックしたら、タイトルに移動するように設定
        this.input.onDown.addOnce(this.startTitle, this);
    },

    // タイトルへ移動
    startTitle: function() {
        this.state.start("Title");
    },

    // 更新処理
    update: function() {

    },

    // 描画
    render: function() {

    },

    // 終了処理
    shutdown: function() {

    }
}
