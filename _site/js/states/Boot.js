/**
 * 起動処理
 * Phaserを簡易な構成で実行開始する
 *
 * @license MIT
 * @copyright 2017 YuTanaka@AmuseOne
 */

// ゲーム全体をまとめるためのオブジェクト
 var MyGame = {};

// ゲーム全体のパラメーター
MyGame.Boot = function (game) {

}

// 起動処理
MyGame.Boot.prototype = {
    // 読み込み段階を作成(Interphase1より)
    init: function() {
        let box = this.make.graphics(0, 0);
        box.lineStyle(0, 0xff0000, 0.8);
        box.beginFill(0xff700b, 1);
        box.drawRect(-50, -50, 100, 100);
        box.endFill();

        this.spinner = this.add.sprite(
            this.world.centerX,
            this.world.centerY,
            box.generateTexture()
        );

        this.spinner.anchor.set(0.5);

        let style = {
            font: "32px Arial",
            fill: "#ffffff",
            align: "center"
        };

        this.text = this.add.text(400, 300, "Loading: 0%", style);
        this.text.anchor.x = 0.5;
    },

    // キャッシュに読み込み
    preload: function() {
        // 読み込みURLを設定
        this.load.baseURL = "../../assets";
        this.load.crossOrigin = "anonymous";

        // 星を読み込み
        this.load.image("star", "/images/star.png");

        // ファイルの読み込みが完了した時のコールバックを設定
        this.load.onFileComplete.add(this.fileLoaded, this);
    },

    // ファイルの読み込み完了時の処理
    fileLoaded: function(progress) {
        this.text.text = "Loading: "+progress+"%";
    },

    // 読み込み中の効果
    loadUpdate: function() {
        this.spinner.rotation += 0.05;
    },

    // 起動処理
    create: function() {
        // 読み込み効果を消す
        let tw = this.add.tween(this.spinner.scale).to(
            {x:0, y:0}, 500, "Elastic.easeIn", true, 250
        );
        tw.onComplete.add(this.nextState, this);
        this.add.tween(this.text).to(
            {alpha: 0}, 500, "Linear", true
        );

        // ゲームパラメーターを設定
        MyGame.gameParams = new MyGame.GameParams(this.game);

    },

    // 次の状態へ
    nextState: function() {
        // タイトルへ
        this.state.start("Title");
    }

}

// 起動処理
window.onload = function() {
    // Phaserオブジェクトを生成
	let game = new Phaser.Game(640, 360, Phaser.AUTO, "gameContainer");

    // 状態を追加する
    game.state.add("Boot", MyGame.Boot);
    game.state.add("Title", MyGame.Title);
    game.state.add("Game", MyGame.Game);
    game.state.add("GameOver", MyGame.GameOver);
    game.state.add("Clear", MyGame.Clear);

    // 起動開始
    game.state.start("Boot");
};
