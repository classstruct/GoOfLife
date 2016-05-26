/**
 * bh.js
 * Authors: Michael Luo
 * Date: 16/5/25
 * Copyright (c) 2015 Swarma Wiki. All rights reserved.
 * http://wiki.swarma.net/index.php/%E7%94%9F%E5%91%BD%E6%B8%B8%E6%88%8F%E5%9B%B4%E6%A3%8B
 */
// Generated by CoffeeScript 1.9.3
(function() {
  var BH_SIZE, BlackHole, Particle, RAF, animate, bhImage, blackholes, bufferCanvas, bufferCtx, canvas, ctx, execAnimate, particles, stats, target;

  particles = [];
  blackholes = [];
  BH_SIZE = 15;
  var psNum = 1000;

  document.body.appendChild(stats.domElement);

  canvas = document.getElementById('cas');

  ctx = canvas.getContext("2d");

  bufferCanvas = document.createElement("canvas");

  bufferCtx = bufferCanvas.getContext("2d");

  bufferCanvas.width = canvas.width = document.body.offsetWidth;

  bufferCanvas.height = canvas.height = document.body.offsetHeight;

  window.onresize = function() {
    bufferCanvas.width = canvas.width = document.body.offsetWidth;
    return bufferCanvas.height = canvas.height = document.body.offsetHeight;
  };

  RAF = (function() {
    return window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || window.oRequestAnimationFrame || window.msRequestAnimationFrame || function(callback) {
        return window.setTimeout(callback, 1000 / 60);
      };
  })();

  if (mobilecheck()) {
    psNum = 256;
  } {
    stats = new Stats();
    stats.setMode(0);
    stats.domElement.style.position = 'absolute';
    stats.domElement.style.right = '0px';
    stats.domElement.style.top = '0px';
  }

  function mobilecheck() {
    var check = false;
    (function (a) {
      if (/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows (ce|phone)|xda|xiino/i.test(a) || /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(a.substr(0, 4)))check = true
    })(navigator.userAgent || navigator.vendor || window.opera);
    return check;
  }

  Particle = (function() {
    function Particle(options) {
      this.x = options.x, this.y = options.y, this.r = options.r, this.color = options.color;
      this._init();
    }

    Particle.prototype._init = function() {
      this.vx = Math.random() * 4 - 2;
      this.vy = Math.random() * 4 - 2;
      this.ax = 0;
      return this.ay = 0;
    };

    Particle.prototype.move = function() {
      var maxSpeed, ref, ref1;
      this.vx += this.ax;
      this.vy += this.ay;
      maxSpeed = 10;
      this.vx = Math.abs(this.vx) > maxSpeed ? maxSpeed * Math.abs(this.vx) / this.vx : this.vx;
      this.vy = Math.abs(this.vy) > maxSpeed ? maxSpeed * Math.abs(this.vy) / this.vy : this.vy;
      this.oldx = this.x;
      this.oldy = this.y;
      this.x += this.vx;
      this.y += this.vy;
      this.vx = (0 <= (ref = this.x) && ref <= canvas.width + this.r * 2) ? this.vx : -this.vx * 0.98;
      return this.vy = (0 <= (ref1 = this.y) && ref1 <= canvas.height + this.r * 2) ? this.vy : -this.vy * 0.98;
    };

    Particle.prototype.attract = function() {
      var angle, bh, cx, cy, k, lax, lay, len, power, results;
      this.ax = this.ay = 0;
      results = [];
      for (k = 0, len = blackholes.length; k < len; k++) {
        bh = blackholes[k];
        cx = bh.x - this.x;
        cy = bh.y - this.y;
        angle = Math.atan(cx / cy);
        power = bh.power * 0.1;
        lax = Math.abs(power * Math.sin(angle));
        lay = Math.abs(power * Math.cos(angle));
        this.ax += cx > 0 ? lax : -lax;
        results.push(this.ay += cy > 0 ? lay : -lay);
      }
      return results;
    };

    Particle.prototype.draw = function() {
      bufferCtx.save();
      bufferCtx.strokeStyle = this.color;
      bufferCtx.lineCap = bufferCtx.lineJoin = "round";
      bufferCtx.lineWidth = this.r;
      bufferCtx.beginPath();
      bufferCtx.moveTo(this.oldx - this.r, this.oldy - this.r);
      bufferCtx.lineTo(this.x - this.r, this.y - this.r);
      bufferCtx.stroke();
      return bufferCtx.restore();
    };

    return Particle;

  })();

  BlackHole = (function() {
    function BlackHole(options) {
      this.x = options.x, this.y = options.y, this.r = options.r, this.power = options.power;
      this.step = 2;
      this.bigger = 5;
      this.animate(0);
    }

    BlackHole.prototype.drawLight = function(ctx) {
      var imgr;
      if (this.isAdd) {
        if ((this.ir += this.step) > (this.r + this.bigger)) {
          this.isAdd = false;
        }
      } else {
        this.ir = this.ir <= this.r ? this.r : this.ir - this.step;
        if (this.destory && this.ir === this.r) {
          blackholes.splice(blackholes.indexOf(this), 1);
        }
      }
      imgr = this.ir * 1.4;
      return ctx.drawImage(bhImage, this.x - imgr, this.y - imgr, imgr * 2, imgr * 2);
    };

    BlackHole.prototype.draw = function(ctx) {
      var that;
      that = this;
      ctx.beginPath();
      ctx.fillStyle = "#000";
      ctx.arc(that.x, that.y, that.ir, 0, Math.PI * 2);
      return ctx.fill();
    };

    BlackHole.prototype.animate = function(ir) {
      this.ir = ir;
      return this.isAdd = true;
    };

    BlackHole.prototype.attract = function(bh) {
      var cx, cy, jl, lax, lay, power;
      if (bh.r >= this.r) {
        cx = bh.x - this.x;
        cy = bh.y - this.y;
        jl = Math.sqrt(cx * cx + cy * cy);
        power = (bh.r - this.r) * 10 / jl + 0.5;
        lax = Math.abs(power * cx / jl);
        lay = Math.abs(power * cy / jl);
        this.x += cx > 0 ? lax : -lax;
        return this.y += cy > 0 ? lay : -lay;
      }
    };

    BlackHole.prototype.check = function(bh) {
      var cr, cx, cy, lbh, nbh, ref, ref1;
      if (!bh || !(bh instanceof BlackHole) || this.destory || bh.destory) {
        return false;
      }
      cx = bh.x - this.x;
      cy = bh.y - this.y;
      cr = bh.ir + this.ir;
      cx = Math.abs(cx);
      cy = Math.abs(cy);
      if (cx < cr && cy < cr && Math.sqrt(cx * cx + cy * cy) <= Math.abs(bh.r - this.r) + 3) {
        if (bh.r > this.r) {
          ref = [bh, this], nbh = ref[0], lbh = ref[1];
        } else {
          ref1 = [this, bh], nbh = ref1[0], lbh = ref1[1];
        }
        nbh.r = ~~Math.sqrt(bh.r * bh.r + this.r * this.r);
        nbh.power = bh.power + this.power;
        nbh.animate(Math.max(bh.r, this.r));
        if (nbh.r > 50) {
          nbh.destory = true;
        }
        return lbh;
      }
      return false;
    };

    return BlackHole;

  })();

  bhImage = (function() {
    var bhCas, bhCtx, i, k, opacity;
    bhCas = document.createElement("canvas");
    bhCas.width = bhCas.height = 50;
    bhCtx = bhCas.getContext("2d");
    opacity = 0;
    for (i = k = 0; k < 20; i = ++k) {
      opacity += 0.05;
      bhCtx.beginPath();
      bhCtx.fillStyle = "rgba(188,186,187," + opacity + ")";
      bhCtx.arc(bhCas.width / 2, bhCas.height / 2, 25 - i, 0, Math.PI * 2);
      bhCtx.fill();
    }
    return bhCas;
  })();

  target = null;

  canvas.onmousedown = function(e) {
    var bh, cx, cy, i, k, len, x, y;
    x = e.clientX - this.offsetLeft;
    y = e.clientY - this.offsetTop;
    for (i = k = 0, len = blackholes.length; k < len; i = ++k) {
      bh = blackholes[i];
      cx = bh.x - x;
      cy = bh.y - y;
      if (cx * cx + cy * cy <= bh.r * bh.r) {
        target = bh;
        break;
      }
    }
    if (!target && e.button === 0) {
      return blackholes.push(new BlackHole({
        x: x,
        y: y,
        r: BH_SIZE,
        power: 2
      }));
    } else if (e.button === 2) {
      bh.destory = true;
      bh.animate(bh.r);
      return bh.r += 5;
    }
  };

  canvas.onmousemove = function(e) {
    var x, y;
    if (target) {
      x = e.clientX - this.offsetLeft;
      y = e.clientY - this.offsetTop;
      target.x = x;
      return target.y = y;
    }
  };

  canvas.onmouseup = canvas.onmouseout = function(e) {
    return target = null;
  };

  execAnimate = function() {
    var i, k;
    for (i = k = 1; k < psNum; i = ++k) {
      particles.push(new Particle({
        x: canvas.width * Math.random(),
        y: canvas.height * Math.random(),
        r: Math.random() * 2 + 1,
        color: "rgba(255,255,255,.5)"
      }));
    }
    return animate();
  };

  animate = function() {
    var bh, bh2, deleArray, delebh, i, j, k, l, len, len1, len2, len3, len4, m, n, o, p;
    bufferCtx.save();
    bufferCtx.globalCompositeOperation = 'destination-out';
    bufferCtx.globalAlpha = 0.3;
    bufferCtx.fillRect(0, 0, canvas.width, canvas.height);
    bufferCtx.restore();
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    for (i = k = 0, len = blackholes.length; k < len; i = ++k) {
      bh = blackholes[i];
      if (bh) {
        bh.drawLight(ctx);
      }
    }
    deleArray = [];
    for (i = l = 0, len1 = blackholes.length; l < len1; i = ++l) {
      bh = blackholes[i];
      if (bh) {
        bh.draw(ctx);
      }
      for (j = m = 0, len2 = blackholes.length; m < len2; j = ++m) {
        bh2 = blackholes[j];
        if (!bh || !bh2 || bh === bh2) {
          continue;
        }
        bh.attract(bh2);
        if (j > i && (delebh = bh.check(bh2))) {
          deleArray.push(delebh);
        }
      }
    }
    for (n = 0, len3 = deleArray.length; n < len3; n++) {
      delebh = deleArray[n];
      blackholes.splice(blackholes.indexOf(delebh), 1);
    }
    for (o = 0, len4 = particles.length; o < len4; o++) {
      p = particles[o];
      p.attract();
      p.move();
      p.draw();
    }
    ctx.drawImage(bufferCanvas, 0, 0);
    stats.update();
    return RAF(animate);
  };

  execAnimate();

}).call(this);

//# sourceMappingURL=test.js.map
