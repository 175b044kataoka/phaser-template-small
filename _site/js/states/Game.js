// インスタンス変数、関数の定義
MyGame.Game = function (game) {
    //dude
    this.dude = null;
    // Starのグループ
    this.stars = null;
    //tekiのグループ
    this.tekis = null;
    // カーソルオブジェクト
    this.cursors = null;
    // スペースキーの取得
    this.spaceKey = null;
    // dudeの移動速度
    this.speed = 500;
    //残りの星の数
    this.starCount = 0;
};

// タイトル処理
MyGame.Game.prototype = {
    // ゲームの作成
    create: function() {
        // 物理エンジンを起動
        this.physics.startSystem(Phaser.Physics.ARCADE);

        this.stars = this.add.group();
        this.tekis = this.add.group();

        // 星を数える
        this.starCount = 0;

        // グループ内のオブジェクトに物理挙動を有効
        this.stars.enableBody = true;
        this.tekis.enableBody = true;

        for(let i=0 ; i<10;i++){
            this.starCount++;
            let star = this.stars.create(this.rnd.integerInRange(80,560), this.rnd.integerInRange(80, 280), 'star');

        star.body.bounce.x = 1;
        star.body.bounce.y = 1;

        star.body.velocity.x = this.rnd.realInRange(-200, 200);
        star.body.velocity.y = this.rnd.realInRange(-200, 200);

        star.body.collideWorldBounds = true;

    }

    this.dude = this.add.sprite(
        this.world.width/2,
        this.world.height/2,
        'dude');

    this.dude.frame = 4;
    this.dude.animations.add('left',[0,1,2,3],10,true);
    this.dude.animations.add('right',[5,6,7,8],10,true);

    // アンカー=いかり=基準点
    // 0=左,　上
    // 0.5=中央
    // 1=右, 下
    this.dude.anchor.setTo(0.5);

    // 物理エンジンをdudeが使う
    // ARCADE物理エンジン=簡易なもの。速度が早い
    this.physics.arcade.enable(this.dude);

    // 物理エンジンを有効にすると、bodyというプロパティーが使えるようになる
    // velocity=速度。秒速？ピクセルで指定


    // dude.body.velocity.x = 200;
    // dude.body.velocity.y = 200;
    this.dude.body.bounce.x = 1;
    this.dude.body.bounce.y = 1;

    this.dude.body.collideWorldBounds = true;

        // カーソルキーの作成
        this.cursors = this.input.keyboard.createCursorKeys();
        // スペースキーの作成
        this.spaceKey = this.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);

        // スコアを初期化
        MyGame.gameParams.score = 0;
    },

pickStar:function(dude,star){
        star.kill();
        MyGame.gameParams.AddScore(100);

        this.starCount--;
        if(this.starCount<=0){
            this.physics.arcade.isPaused = true;
            this.state.start("Clear",false);
        }
},

    // 更新処理
    update: function() {

        this.physics.arcade.overlap(
            this.dude,
            this.stars,
            this.pickStar,
            null, this);
        // 移動
        let newvel = new Phaser.Point(0,0);
        // 上
        if (this.cursors.up.isDown) {
            newvel.y = -1;
        }
        // 下
        if (this.cursors.down.isDown) {
            newvel.y = 1;
        }
        // 左
        if (this.cursors.left.isDown) {
            newvel.x = -1;
        }
        // 右
        if (this.cursors.right.isDown) {
            newvel.x = 1;
        }
        // 速度設定
        if (!newvel.isZero()) {
            // 速度が設定されていたら、速度をthis.speedに設定する
            newvel.setMagnitude(this.speed);
        }
        this.dude.body.velocity = newvel;

        // Oキーでゲームオーバー
        if (this.input.keyboard.isDown(Phaser.KeyCode.O)) {
            this.state.start("GameOver", false);
        }

        // Cキーでクリア
        if (this.input.keyboard.isDown(Phaser.KeyCode.C)) {
            this.state.start("Clear", false);
        }

        // Aキーで点数加算
        if (this.input.keyboard.isDown(Phaser.KeyCode.A)) {
            MyGame.gameParams.AddScore(100);
        }
    },

    // 描画
    render: function() {

    },

    // 終了処理
    shutdown: function() {

    }

}
