define(['core/game', 'roomRenderer', 'gameclient', 'core/playermanager', 'core/chatmanager', 'jquery'],
  function (Game, Renderer, GameClient, PlayerManager, ChatManager, $) {
  var fps = 0, maxFps = 25,
    lastCalledTime = Date.now();

  var App = function (config) {
    this.config = config;
  };

  App.prototype.init = function () {
    var token,
      _this = this;

    if (this.setTokenFromURL()) {
      window.location.href = '/';
    }

    //this.fps = 0;
    //this.lastCalledTime = Date.now();

    var pgnEl = $('#pgn');
    var roomId = $("#room").data('id');
    var side = $("#room").data('side');
    var opponentSide = side === "black" ? "white" : "black";
    console.log("id:  " + roomId);

    this.inRoom = true;
    this.roomId = roomId;

    this.playing = false;

    this.playerManager = new PlayerManager(this);

    this.chatManager = new ChatManager(this);

    this.game = new Game(this);
    this.game.initGame(this.config.gridWidth, this.config.gridHeight);

    this.gameClient = new GameClient(this, this.game, this.playerManager);

    this.renderer = new Renderer(this);
    this.renderer.init();

    this.gameClient.init(function () {
      // this callback is executed once the gameClient receives the state

      token = _this.getToken()

      if (token) {
        _this.gameClient.requestPlayer(token);
      }

      _this.renderer.handleConnect();
      _this.game.updatePlayerStats();
      _this.gameClient.joinRoom(roomId, '1');
      _this.renderer.updateControls();
      //_this.renderer.updateLeaderboard();
      //_this.renderer.updatePlayersOnline();
      _this.run();

    });
  };

  App.prototype.run = function () {
    var _this = this, delta;

    // "the loop"
    requestAnimationFrame(function () {
      // calculate fps
      delta = (new Date().getTime() - lastCalledTime) / 1000;
      lastCalledTime = Date.now();
      fps = 1 / delta;
      //console.log("FPS:" + fps);

      // go to next generation
      if (_this.game.isTimeToTick()) {
        _this.game.tick();

        if (_this.game.isTimeToGiveNewCells()) {
          _this.game.giveNewCells();
        }

        _this.playerManager.updateOnlinePlayers();
        _this.game.updatePlayerStats();
        _this.renderer.updateControls();
        //_this.renderer.updateLeaderboard();
        //_this.renderer.updatePlayersOnline();
        _this.renderer.flashNews();
      }

      if (!_this.game.isBehindOnTicks()) {
        _this.renderer.renderChanges();
      }

      setTimeout(function(){
        _this.run();

      }, 1000/maxFps)
    });

  };

  App.prototype.getState = function () {
    var livingCells = this.game.grid.getLivingCells().map(function (cell) {
        return {
          x: cell.x,
          y: cell.y,
          alive: cell.alive,
          playerId: cell.playerId
        };
      }),
      players = this.playerManager.getPlayers().map(function (player) {
        return player.transmission();
      }),
      generation = this.game.generation,
      timeBeforeTick = (this.game.nextTick - Date.now());

    return {
      livingCells: livingCells,
      players: players,
      generation: generation,
      timeBeforeTick: timeBeforeTick
    };
  };

  App.prototype.isPlaying = function () {
    return this.playing;
  };

  App.prototype.setPlaying = function (playing) {
    this.playing = playing;

    if (playing) {
      //this.renderer.showSelectModel();
      this.renderer.hideOverlay();
      this.renderer.showControls();
      this.renderer.showLeaveGameContainer();
      this.renderer.showLoginLinkWithToken();
      this.renderer.showStats();
      this.renderer.showNewChatBox();
    }

    this.renderer.updateControls();
    this.renderer.updateStats();
    this.renderer.setAccentColor(this.playerManager.getLocalPlayer().color);
    this.renderer.setFaviconColor(this.playerManager.getLocalPlayer().color);
  };

  App.prototype.setToken = function (token) {
    localStorage.setItem('token', token);
    return token;
  };

  App.prototype.setTokenFromURL = function () {
    var urlArgs = window.location.href.split('?token=');
    if (urlArgs.length === 2) {
      this.setToken(urlArgs[1]);
      return true;
    } else {
      return false;
    }
  };

  App.prototype.getToken = function () {
    var token = localStorage.getItem('token');
    return (token) ? token : false;
  };

  App.prototype.deleteToken = function () {
    delete localStorage.token;
  };

  App.prototype.updateState = function (state) {
    this.game.generation = state.generation;
    this.game.nextTick = Date.now() + state.timeBeforeTick;
    this.game.grid.setLivingCells(state.livingCells);
    this.playerManager.updatePlayers(state.players);
    //this.chatManager.updateMessages(state.messages);
  };

  return App;
});