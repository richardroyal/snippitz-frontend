! function(t) {
  function i(i, a) {
    this.settings = t.extend(!0, e, a), this.$context = i, this.domAudio = this.$context.find("audio")[0], this.$domPlaylist = this.$context.find(".jAudio--playlist"), this.$domControls = this.$context.find(".jAudio--controls"), this.$domVolumeBar = this.$context.find(".jAudio--volume"), this.$domDetails = this.$context.find(".jAudio--details"), this.$domStatusBar = this.$context.find(".jAudio--status-bar"), this.$domProgressBar = this.$context.find(".jAudio--progress-bar-wrapper"), this.$domTime = this.$context.find(".jAudio--time"), this.$domElapsedTime = this.$context.find(".jAudio--time-elapsed"), this.$domTotalTime = this.$context.find(".jAudio--time-total"), this.$domThumb = this.$context.find(".jAudio--thumb"), this.currentState = "pause", this.currentTrack = this.settings.defaultTrack, this.currentElapsedTime = void 0, this.timer = void 0, this.init()
  }
  var a = "jAudio",
    e = {
      playlist: [],
      defaultAlbum: void 0,
      defaultArtist: void 0,
      defaultTrack: 0,
      autoPlay: !1,
      debug: !1
    };
  i.prototype = {
    init: function() {
      var t = this;
      t.renderPlaylist(), t.preLoadTrack(), t.highlightTrack(), t.updateTotalTime(), t.events(), t.debug(), t.domAudio.volume = .05
    },
    play: function(t) {
      var i = this;
      i.domAudio.play(), "play" !== i.currentState && (clearInterval(i.timer), i.timer = setInterval(i.run.bind(i), 50), i.currentState = "play", t.data("action", "pause"), t.removeClass("jAudio--control-play"), t.addClass("jAudio--control-pause"), t.toggleClass("active"))
    },
    pause: function(t) {
      var i = this;
      i.domAudio.pause(), clearInterval(i.timer), i.currentState = "pause", t.data("action", "play"), t.removeClass("jAudio--control-pause"), t.addClass("jAudio--control-play"), t.toggleClass("active")
    },
    stop: function() {
      var t = this;
      t.domAudio.pause(), t.domAudio.currentTime = 0, t.animateProgressBarPosition(), clearInterval(t.timer), t.updateElapsedTime(), t.currentState = "stop"
    },
    prev: function() {
      var t, i = this;
      t = 0 === i.currentTrack ? i.settings.playlist.length - 1 : i.currentTrack - 1, i.changeTrack(t)
    },
    next: function() {
      var t, i = this;

      if ( ((i.settings.playlist.length - 1) - i.currentTrack) === 0) {
        window.location.href = "final.html";
      } else {
        t = i.currentTrack === i.settings.playlist.length - 1 ? 0 : i.currentTrack + 1, i.changeTrack(t)
      }
    },
    preLoadTrack: function() {
      var t = this,
        i = t.settings.defaultTrack;
      t.changeTrack(i), t.stop()
    },
    changeTrack: function(t) {
      var i = this;
      i.currentTrack = t, i.domAudio.src = i.settings.playlist[t].file, ("play" === i.currentState || i.settings.autoPlay) && i.play(), i.highlightTrack(), i.updateThumb(), i.renderDetails()
    },
    events: function() {
      var i = this;
      i.$domControls.on("click", ".jAudio--control", function() {
        var a = t(this),
          e = a.data("action");
        switch (e) {
          case "prev":
            i.prev.call(i, a);
            break;
          case "next":
            i.next.call(i, a);
            break;
          case "pause":
            i.pause.call(i, a);
            break;
          case "stop":
            i.stop.call(i, a);
            break;
          case "play":
            i.play.call(i, a)
        }
      }), i.$domPlaylist.on("click", ".jAudio--playlist-item", function() {
        var a = t(this),
          e = (a.data("track"), a.index());
        i.currentTrack !== e && i.changeTrack(e)
      }), i.$domProgressBar.on("click", function(t) {
        i.updateProgressBar(t), i.updateElapsedTime()
      }), t(i.domAudio).on("loadedmetadata", function() {
        i.animateProgressBarPosition.call(i), i.updateElapsedTime.call(i), i.updateTotalTime.call(i)
      })
    },
    getAudioSeconds: function(t) {
      var i = this,
        t = t % 60;
      return t = i.addZero(Math.floor(t), 2), t = 60 > t ? t : "00"
    },
    getAudioMinutes: function(t) {
      var i = this,
        t = t / 60;
      return t = i.addZero(Math.floor(t), 2), t = 60 > t ? t : "00"
    },
    addZero: function(t, i) {
      for (var t = String(t); t.length < i;) t = "0" + t;
      return t
    },
    removeZero: function(t, i) {
      for (var t = String(t), a = 0; i > a && "0" === t[0];) t = t.substr(1, t.length), a++;
      return t
    },
    highlightTrack: function() {
      var t = this,
        i = t.$domPlaylist.children(),
        a = "active";
      i.removeClass(a), i.eq(t.currentTrack).addClass(a)
    },
    renderDetails: function() {
      var t = this,
        i = t.settings.playlist[t.currentTrack],
        a = (i.file, i.thumb, i.trackName),
        e = i.trackArtist,
        r = (i.trackAlbum, "");
      r += "<p>", r += "<span>" + a + "</span>", r += "<span>" + e + "</span>", r += "</p>", t.$domDetails.html(r)
    },
    renderPlaylist: function() {
      var i = this,
        a = "";
      t.each(i.settings.playlist, function(t, i) {
        {
          var e = i.file,
            r = i.category_thumb,
            o = i.trackName,
            s = i.trackArtist;
          i.trackAlbum
        }
        trackDuration = "00:00", a += "<div class='jAudio--playlist-item' data-track='" + e + "'>", a += "<div class='jAudio--playlist-thumb'><object type='image/svg+xml' data='" + r + "'></object></div>", a += "<div class='jAudio--playlist-meta'>", a += "<p class='jAudio--playlist-meta-track-name'>" + o + "</p>", a += "<p class='jAudio--playlist-meta-track-artist'>" + s + "</p>", a += "</div>", a += "</div>"
      }), i.$domPlaylist.html(a)
    },
    run: function() {
      var t = this;
      t.animateProgressBarPosition(), t.updateElapsedTime(), t.domAudio.ended && t.next()
    },
    animateProgressBarPosition: function() {
      var t = this,
        i = 100 * t.domAudio.currentTime / t.domAudio.duration + "%",
        a = {
          width: i
        };
      t.$domProgressBar.children().eq(0).css(a)
    },
    updateProgressBar: function(t) {
      var i, a, e, r = this;
      t.offsetX && (i = t.offsetX), void 0 === i && t.layerX && (i = t.layerX), a = i / r.$domProgressBar.width(), e = r.domAudio.duration * a, r.domAudio.currentTime = e, r.animateProgressBarPosition()
    },
    updateElapsedTime: function() {
      var t = this,
        i = t.domAudio.currentTime,
        a = t.getAudioMinutes(i),
        e = t.getAudioSeconds(i),
        r = a + ":" + e;
      t.$domElapsedTime.text(r)
    },
    updateTotalTime: function() {
      var t = this,
        i = t.domAudio.duration,
        a = t.getAudioMinutes(i),
        e = t.getAudioSeconds(i),
        r = a + ":" + e;
      t.$domTotalTime.text(r)
    },
    updateThumb: function() {
      var t = this,
        i = t.settings.playlist[t.currentTrack].thumb,
        a = {
          "background": "linear-gradient(rgba(0,0,0,.3), rgba(0,0,0,.3)), url(" + i + ")",
          "background-repeat": "no-repeat",
          "background-size": "cover",
          "background-position": "center center"
        };
      t.$domThumb.css(a)
    },
    debug: function() {
      var t = this;
      t.settings.debug && console.log(t.settings)
    }
  }, t.fn[a] = function(a) {
    var e = function() {
      return new i(t(this), a)
    };
    t(this).each(e)
  }
}(jQuery);
