// Last Meadow Online — Activity Automation Script
// A Discord-based game automation tool for "Last Meadow Online"
// ⚠️ FOR EDUCATIONAL PURPOSES ONLY — Use at your own risk.
// Author: @dodoflix (https://github.com/dodoflix)
// Repository: https://github.com/dodoflix/last-meadow-online-automation
// License: MIT
(() => {
  const LMO_VERSION = '1.2.0'; // x-release-please-version
  const LMO_REPO = 'dodoflix/last-meadow-online-automation';
  const old = document.getElementById('lmo-wrap');
  if (old) { old.remove(); return console.log('[LMO] Removed.'); }

  const MIN_W = 380, MAX_W = 600, MIN_H = 460, MAX_H = 800;

  const wrap = document.createElement('div');
  wrap.id = 'lmo-wrap';
  Object.assign(wrap.style, {
    position:'fixed',top:'10px',right:'10px',zIndex:'999999',
    width:MAX_W+'px',height:MAX_H+'px',
  });
  document.body.appendChild(wrap);
  const shadow = wrap.attachShadow({ mode: 'open' });

  const style = document.createElement('style');
  style.textContent = `
:host{font-family:'gg sans','Segoe UI',sans-serif;font-size:13px;color:#dcddde}
*{box-sizing:border-box;margin:0;padding:0}
#panel{display:flex;flex-direction:column;width:100%;height:100%;background:#1a1b1e;border-radius:14px;box-shadow:0 8px 32px rgba(0,0,0,.6),0 0 0 1px rgba(255,255,255,.06);overflow:hidden;position:relative}
#panel.min #body,#panel.min #footer,#panel.min #res-bar,#panel.min #loot-bar,#panel.min .rh{display:none!important}
#header{display:flex;align-items:center;padding:0 6px 0 14px;background:linear-gradient(135deg,#1e2024,#25272b);border-bottom:1px solid rgba(255,255,255,.06);height:42px;gap:4px;cursor:move;user-select:none;flex-shrink:0;overflow:hidden}
.title{font-weight:700;font-size:14px;margin-right:auto;color:#fff;letter-spacing:.3px;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}
.title span{color:#5865f2}
.tab-bar{display:flex;gap:2px;background:rgba(0,0,0,.25);border-radius:8px;padding:2px;flex-shrink:0}
.tb{background:none;border:none;color:#8e9297;font-size:11px;font-weight:600;padding:4px 7px;cursor:pointer;border-radius:6px;white-space:nowrap;transition:all .15s}
.tb:hover{color:#dcddde;background:rgba(255,255,255,.06)}
.tb.active{color:#fff;background:#5865f2}
.hb{background:none;border:none;color:#72767d;font-size:14px;cursor:pointer;padding:4px 6px;border-radius:6px;transition:all .15s;flex-shrink:0}
.hb:hover{color:#fff;background:rgba(255,255,255,.08)}
#close-btn:hover{color:#f23f42;background:rgba(242,63,66,.1)}
.dot{display:inline-block;width:6px;height:6px;border-radius:50%;background:transparent;margin-left:3px;vertical-align:middle}
.dot.on{background:#3ba55d;box-shadow:0 0 6px rgba(59,165,93,.5);animation:pulse 1.5s infinite}
@keyframes pulse{0%,100%{opacity:1}50%{opacity:.35}}
#sniff-btn{border:none;color:#fff;font-size:10px;font-weight:700;padding:4px 8px;border-radius:6px;cursor:pointer;transition:all .15s;text-transform:uppercase;letter-spacing:.3px;flex-shrink:0}
#sniff-btn:hover{filter:brightness(1.15)}
#res-bar{display:flex;align-items:center;gap:8px;padding:5px 14px;background:rgba(0,0,0,.2);border-bottom:1px solid rgba(255,255,255,.04);font-size:11px;flex-shrink:0;overflow-x:auto;white-space:nowrap;flex-wrap:wrap}
#res-bar::-webkit-scrollbar{height:0}
.ri{display:inline-flex;align-items:center;gap:2px}
.rv{color:#fff;font-weight:700;font-size:11px}
.rl{color:#72767d;font-size:9px}
.rs{color:#3f4147;margin:0 2px}
.lvl{color:#faa61a;font-weight:800;font-size:12px}
#body{flex:1;padding:10px 14px;overflow:hidden;display:flex;flex-direction:column;min-height:0}
.tc{display:none;flex-direction:column;flex:1;min-height:0;position:relative}
.tc.active{display:flex}
.cfg{margin-bottom:8px;background:rgba(0,0,0,.15);border-radius:10px;padding:8px 10px;flex-shrink:0}
.cr{display:flex;align-items:center;justify-content:space-between;margin-bottom:5px}
.cr:last-child{margin-bottom:0}
.cl{font-size:10px;color:#8e9297;text-transform:uppercase;font-weight:700;letter-spacing:.4px;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;margin-right:6px}
.cc{display:flex;align-items:center;flex-shrink:0}
.cc button{background:#2f3136;border:1px solid rgba(255,255,255,.08);color:#dcddde;font-size:13px;font-weight:700;width:28px;height:24px;cursor:pointer;display:flex;align-items:center;justify-content:center;user-select:none;transition:all .12s}
.cc button:hover{background:#40444b;color:#fff}
.cc button:active{background:#5865f2;color:#fff}
.cc .dec{border-radius:6px 0 0 6px}
.cc .inc{border-radius:0 6px 6px 0}
.cv{background:#202225;border-top:1px solid rgba(255,255,255,.08);border-bottom:1px solid rgba(255,255,255,.08);color:#fff;font-family:'Cascadia Code','Fira Code',monospace;font-size:11px;font-weight:600;min-width:72px;height:24px;display:flex;align-items:center;justify-content:center;user-select:none}
.stats{display:flex;justify-content:space-around;padding:7px 0;border-top:1px solid rgba(255,255,255,.06);border-bottom:1px solid rgba(255,255,255,.06);margin:6px 0;flex-shrink:0}
.stat{text-align:center}
.stat b{display:block;font-size:16px;color:#5865f2;min-width:32px;font-weight:800}
.stat small{font-size:8px;color:#72767d;text-transform:uppercase;font-weight:700;letter-spacing:.4px}
.btns{display:flex;gap:4px;margin-bottom:6px;flex-shrink:0;flex-wrap:wrap}
.btns button{flex:1;padding:5px 0;border:none;border-radius:7px;font-weight:700;font-size:10px;cursor:pointer;color:#fff;transition:all .15s;text-transform:uppercase;letter-spacing:.2px;min-width:0}
.btns button:hover{filter:brightness(1.15);transform:translateY(-1px)}
.btns button:active{transform:translateY(0)}
.btns button:disabled{opacity:.35;cursor:not-allowed;filter:none;transform:none}
.b1{background:linear-gradient(135deg,#5865f2,#4752c4)}
.b2{background:linear-gradient(135deg,#3ba55d,#2d8049)}
.b3{background:linear-gradient(135deg,#ed4245,#c03537)}
.b4{background:#2f3136}.b5{background:#2f3136}
.log{flex:1;min-height:50px;background:#111214;border-radius:8px;padding:6px 8px;overflow-y:auto;font-family:'Cascadia Code','Fira Code','Consolas',monospace;font-size:10px;line-height:1.6;white-space:pre-wrap;word-break:break-all;border:1px solid rgba(255,255,255,.04)}
.log div{min-height:0}
.log::-webkit-scrollbar{width:4px}
.log::-webkit-scrollbar-track{background:transparent}
.log::-webkit-scrollbar-thumb{background:#2f3136;border-radius:4px}
.i{color:#5865f2}.s{color:#3ba55d}.e{color:#ed4245}.w{color:#faa61a}.d{color:#72767d}
.sp{background:rgba(0,0,0,.15);border-radius:10px;padding:10px 12px;margin-bottom:8px;flex-shrink:0}
.sh{font-size:11px;font-weight:700;color:#fff;margin-bottom:6px;display:flex;align-items:center;gap:6px}
.sr{display:flex;justify-content:space-between;padding:2px 0;font-size:11px}
.sk{color:#8e9297}.sv{color:#fff;font-weight:600}.sd{color:#3ba55d;font-size:10px;margin-left:4px}
.sg{display:flex;flex-wrap:wrap;gap:6px 14px}
.sg-item{display:flex;align-items:center;gap:4px;font-size:11px}
.sg-item .sv{font-size:12px}
#stats{overflow-y:auto}
#stats .btns{margin-top:8px}
#footer{display:flex;align-items:center;justify-content:space-between;padding:5px 14px;background:rgba(0,0,0,.2);border-top:1px solid rgba(255,255,255,.04);flex-shrink:0}
#footer a{color:#5865f2;text-decoration:none;font-size:11px;font-weight:600;transition:color .15s}
#footer a:hover{color:#7983f5}
#footer .wn{color:#4f5660;font-size:10px}
#footer .ver{color:#4f5660;font-size:9px;font-weight:600}
#footer .upd{font-size:9px;font-weight:700;padding:2px 6px;border-radius:4px;text-decoration:none;transition:all .15s;display:none}
#footer .upd.avail{display:inline-block;background:rgba(88,101,242,.15);color:#7983f5}
#footer .upd.avail:hover{background:rgba(88,101,242,.25)}
.rh{position:absolute;bottom:0;right:0;width:18px;height:18px;cursor:nwse-resize;opacity:.3;transition:opacity .15s;border-radius:0 0 14px 0}
.rh:hover{opacity:.7}
.rh::after{content:'';position:absolute;bottom:4px;right:4px;width:7px;height:7px;border-right:2px solid #72767d;border-bottom:2px solid #72767d}
.prog-wrap{height:3px;background:rgba(255,255,255,.06);border-radius:2px;margin:2px 0 6px;overflow:hidden}
.prog-bar{height:100%;border-radius:2px;background:linear-gradient(90deg,#5865f2,#7983f5);width:100%;transition:width .15s linear}
@keyframes lootFloat{0%{opacity:1;transform:translate(-50%,0)}60%{opacity:.9}100%{opacity:0;transform:translate(-50%,-50px)}}
.loot-pop{position:absolute;top:50%;left:50%;font-size:13px;font-weight:800;pointer-events:none;animation:lootFloat 1.8s ease-out forwards;z-index:10;white-space:nowrap;text-shadow:0 2px 6px rgba(0,0,0,.6);color:#3ba55d}
.xp-wrap{display:flex;align-items:center;gap:4px;margin-left:2px}
.xp-outer{height:4px;background:rgba(255,255,255,.08);border-radius:2px;width:60px;overflow:hidden}
.xp-inner{height:100%;background:linear-gradient(90deg,#faa61a,#f57731);border-radius:2px;transition:width .5s ease;width:0}
.xp-text{color:#72767d;font-size:8px;font-weight:600;white-space:nowrap}
#loot-bar{display:flex;align-items:center;gap:6px;padding:3px 14px;background:rgba(59,165,93,.05);border-bottom:1px solid rgba(255,255,255,.03);font-size:10px;flex-shrink:0;flex-wrap:wrap;overflow-x:auto;white-space:nowrap}
#loot-bar:empty{display:none}
#loot-bar .lt{color:#4f5660;font-size:9px;font-weight:700;text-transform:uppercase;letter-spacing:.3px}
#loot-bar .li{display:inline-flex;align-items:center;gap:2px;font-weight:700;font-size:10px}
#loot-bar .li.pos{color:#3ba55d}
#loot-bar .li.neg{color:#ed4245}
.snd-on{color:#3ba55d!important}
.badge{display:inline-flex;align-items:center;justify-content:center;min-width:14px;height:14px;border-radius:7px;background:#ed4245;color:#fff;font-size:8px;font-weight:800;margin-left:2px;padding:0 3px;line-height:1}
.badge.hide{display:none}`;
  shadow.appendChild(style);

  function fmtMs(ms) {
    if (ms < 1000) return ms + 'ms';
    if (ms < 60000) return Math.round(ms / 100) / 10 + 's';
    if (ms < 3600000) return Math.round(ms / 6000) / 10 + 'm';
    return Math.round(ms / 360000) / 10 + 'h';
  }

  var ICONS = { wood:'\uD83E\uDEB5', metal:'\u2699\uFE0F', leather:'\uD83E\uDDF6', armor:'\uD83D\uDEE1\uFE0F', weapon:'\u2694\uFE0F', tanks:'\uD83C\uDFF0', enemy_damage:'\uD83D\uDCA5', magic:'\u2728', healers:'\uD83D\uDC9A' };

  function fmtNum(n) {
    if (n >= 1e9) return (n / 1e9).toFixed(1) + 'B';
    if (n >= 1e6) return (n / 1e6).toFixed(1) + 'M';
    if (n >= 1e3) return (n / 1e3).toFixed(1) + 'K';
    return String(n);
  }

  function fmtChanges(ch) {
    if (!ch || !Object.keys(ch).length) return '';
    return Object.keys(ch).map(function(k) {
      var v = ch[k], ic = ICONS[k] || '\uD83D\uDCE6';
      return (v > 0 ? '+' : '') + v + ' ' + ic + ' ' + k;
    }).join(', ');
  }

  var DEFAULTS = { gather: { delay: 10, max: 0 }, craft: { delay: 60000, max: 0 }, combat: { delay: 60000, max: 0 } };

  // Loot popup animation
  function showLootPop(text, container) {
    var pop = document.createElement('div');
    pop.className = 'loot-pop';
    pop.textContent = text;
    container.style.position = 'relative';
    container.appendChild(pop);
    setTimeout(function() { pop.remove(); }, 2000);
  }

  // Session loot tracker
  var _sessionLoot = {};
  function trackLoot(changes) {
    if (!changes) return;
    for (var k in changes) {
      _sessionLoot[k] = (_sessionLoot[k] || 0) + changes[k];
    }
    renderSessionLoot();
  }
  function renderSessionLoot() {
    var el = $('loot-bar');
    if (!el) return;
    var keys = Object.keys(_sessionLoot);
    if (!keys.length) { el.innerHTML = ''; return; }
    var html = '<span class="lt">\uD83D\uDCB0 Session</span>';
    keys.forEach(function(k) {
      var v = _sessionLoot[k];
      var ic = ICONS[k] || '\uD83D\uDCE6';
      var cls = v >= 0 ? 'pos' : 'neg';
      html += '<span class="li ' + cls + '">' + ic + ' ' + (v > 0 ? '+' : '') + fmtNum(v) + '</span>';
    });
    el.innerHTML = html;
  }

  // Sound pings (AudioContext)
  var _soundEnabled = false;
  var _audioCtx = null;
  function playSound(type) {
    if (!_soundEnabled) return;
    if (!_audioCtx) _audioCtx = new (window.AudioContext || window.webkitAudioContext)();
    var osc = _audioCtx.createOscillator();
    var gain = _audioCtx.createGain();
    osc.connect(gain);
    gain.connect(_audioCtx.destination);
    gain.gain.value = 0.08;
    if (type === 'success') {
      osc.frequency.value = 880; osc.type = 'sine';
      gain.gain.setValueAtTime(0.08, _audioCtx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, _audioCtx.currentTime + 0.3);
      osc.start(); osc.stop(_audioCtx.currentTime + 0.3);
    } else if (type === 'error') {
      osc.frequency.value = 220; osc.type = 'square';
      gain.gain.setValueAtTime(0.05, _audioCtx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, _audioCtx.currentTime + 0.2);
      osc.start(); osc.stop(_audioCtx.currentTime + 0.2);
    } else if (type === 'loot') {
      osc.frequency.value = 660; osc.type = 'sine';
      gain.gain.setValueAtTime(0.06, _audioCtx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, _audioCtx.currentTime + 0.15);
      osc.start(); osc.stop(_audioCtx.currentTime + 0.15);
      var osc2 = _audioCtx.createOscillator();
      var gain2 = _audioCtx.createGain();
      osc2.connect(gain2); gain2.connect(_audioCtx.destination);
      osc2.frequency.value = 990; osc2.type = 'sine';
      gain2.gain.setValueAtTime(0.06, _audioCtx.currentTime + 0.12);
      gain2.gain.exponentialRampToValueAtTime(0.001, _audioCtx.currentTime + 0.35);
      osc2.start(_audioCtx.currentTime + 0.12); osc2.stop(_audioCtx.currentTime + 0.35);
    }
  }

  // Tab notification badges
  var _badges = { gather: 0, craft: 0, combat: 0 };
  var _activeTab = 'gather';
  function bumpBadge(prefix) {
    if (prefix === _activeTab) return;
    _badges[prefix]++;
    var el = $(prefix + '-badge');
    if (!el) return;
    el.textContent = _badges[prefix] > 99 ? '99+' : _badges[prefix];
    el.classList.remove('hide');
  }
  function clearBadge(prefix) {
    _badges[prefix] = 0;
    var el = $(prefix + '-badge');
    if (el) el.classList.add('hide');
  }

  function mkTab(id) {
    var dd = DEFAULTS[id].delay;
    return '<div id="' + id + '" class="tc">'
      + '<div class="cfg">'
      + '<div class="cr"><span class="cl">Retry delay</span>'
      + '<div class="cc"><button class="dec" data-t="' + id + '-delay">\u2212</button>'
      + '<div class="cv" id="' + id + '-delay" data-val="' + dd + '">' + fmtMs(dd) + '</div>'
      + '<button class="inc" data-t="' + id + '-delay">+</button></div></div>'
      + '<div class="cr"><span class="cl">Max runs (0 = \u221E)</span>'
      + '<div class="cc"><button class="dec" data-t="' + id + '-max">\u2212</button>'
      + '<div class="cv" id="' + id + '-max" data-val="0">0</div>'
      + '<button class="inc" data-t="' + id + '-max">+</button></div></div>'
      + '</div>'
      + '<div class="stats">'
      + '<div class="stat"><b id="' + id + '-sR">0</b><small>Runs</small></div>'
      + '<div class="stat"><b id="' + id + '-sO">0</b><small>OK</small></div>'
      + '<div class="stat"><b id="' + id + '-sF">0</b><small>Fail</small></div>'
      + '<div class="stat"><b id="' + id + '-sN">-</b><small>Next</small></div>'
      + '</div>'
      + '<div class="prog-wrap"><div class="prog-bar" id="' + id + '-prog" style="width:0"></div></div>'
      + '<div class="btns">'
      + '<button class="b1" id="' + id + '-bOnce">\u25B6 Once</button>'
      + '<button class="b2" id="' + id + '-bStart">\u23E9 Loop</button>'
      + '<button class="b3" id="' + id + '-bStop" disabled>\u23F9 Stop</button>'
      + '<button class="b4" id="' + id + '-bClear">\uD83D\uDDD1</button>'
      + '<button class="b5" id="' + id + '-bReset">\u21BA</button>'
      + '<button class="b5" id="' + id + '-bExport" title="Copy log">\uD83D\uDCCB</button>'
      + '</div>'
      + '<div class="log" id="' + id + '-log"></div></div>';
  }

  const panel = document.createElement('div');
  panel.id = 'panel';
  panel.innerHTML = '<div id="header">'
    + '<span class="title">\uD83C\uDF3F Last <span>Meadow</span></span>'
    + '<div class="tab-bar">'
    + '<button class="tb active" data-tab="gather">\uD83C\uDF3E Adv<span class="dot" id="gather-dot"></span><span class="badge hide" id="gather-badge"></span></button>'
    + '<button class="tb" data-tab="craft">\u2692\uFE0F Craft<span class="dot" id="craft-dot"></span><span class="badge hide" id="craft-badge"></span></button>'
    + '<button class="tb" data-tab="combat">\u2694\uFE0F Battle<span class="dot" id="combat-dot"></span><span class="badge hide" id="combat-badge"></span></button>'
    + '<button class="tb" data-tab="stats">\uD83D\uDCCA Stats</button>'
    + '</div>'
    + '<button id="sniff-btn" style="background:#ed4245">\uD83D\uDD0D Sniff</button>'
    + '<button class="hb" id="snd-btn" title="Toggle Sound">\uD83D\uDD07</button>'
    + '<button class="hb" id="min-btn" title="Minimize">\u2500</button>'
    + '<button class="hb" id="close-btn" title="Close">\u2715</button>'
    + '</div>'
    + '<div id="res-bar">'
    + '<span class="ri"><span class="lvl" id="rb-lvl">--</span><span class="xp-wrap"><span class="xp-outer"><span class="xp-inner" id="rb-xp-bar"></span></span><span class="xp-text" id="rb-xp-text"></span></span></span>'
    + '<span class="rs">\u2502</span>'
    + '<span class="ri">\uD83E\uDEB5 <span class="rv" id="rb-wood">-</span></span>'
    + '<span class="ri">\u2699\uFE0F <span class="rv" id="rb-metal">-</span></span>'
    + '<span class="ri">\uD83E\uDDF6 <span class="rv" id="rb-leather">-</span></span>'
    + '<span class="rs">\u2502</span>'
    + '<span class="ri">\uD83D\uDEE1\uFE0F <span class="rv" id="rb-armor">-</span></span>'
    + '<span class="ri">\uD83D\uDCA5 <span class="rv" id="rb-dmg">-</span></span>'
    + '</div>'
    + '<div id="loot-bar"></div>'
    + '<div id="body">' + mkTab('gather') + mkTab('craft') + mkTab('combat')
    + '<div id="stats" class="tc">'
    + '<div class="sp"><div class="sh">\uD83D\uDC64 Your Profile</div><div id="st-profile"><span class="sk">Sniff credentials to load...</span></div></div>'
    + '<div class="sp"><div class="sh">\uD83C\uDF3E Your Activities</div><div id="st-activity"><span class="sk">--</span></div></div>'
    + '<div class="sp"><div class="sh">\uD83C\uDF0D Global Resources</div><div id="st-global"><span class="sk">--</span></div></div>'
    + '<div class="sp"><div class="sh">\uD83C\uDFAD Global Professions</div><div id="st-profs"><span class="sk">--</span></div></div>'
    + '<div class="btns"><button class="b1" id="stats-refresh">\uD83D\uDD04 Refresh</button></div>'
    + '</div>'
    + '</div>'
    + '<div id="footer">'
    + '<a href="https://github.com/dodoflix" target="_blank">@dodoflix</a>'
    + '<span class="ver">v' + LMO_VERSION + '</span>'
    + '<a id="upd-link" class="upd" href="https://github.com/' + LMO_REPO + '/releases/latest" target="_blank"></a>'
    + '<span class="wn">\u26A0\uFE0F Educational Only</span>'
    + '</div>'
    + '<div class="rh" id="resize-handle"></div>';
  shadow.appendChild(panel);

  const $ = id => shadow.getElementById(id);
  $('gather').classList.add('active');

  // Resource bar update from API response
  function updateResBar(ud) {
    if (!ud) return;
    $('rb-lvl').textContent = 'Lv.' + (ud.level || '?');
    var c = ud.stats && ud.stats.resource_contribution;
    if (c) {
      $('rb-wood').textContent = c.wood || 0;
      $('rb-metal').textContent = c.metal || 0;
      $('rb-leather').textContent = c.leather || 0;
      $('rb-armor').textContent = c.armor || 0;
      $('rb-dmg').textContent = c.enemy_damage || 0;
    }
    if (ud.xp !== undefined) {
      $('rb-xp-text').textContent = fmtNum(ud.xp) + ' XP';
      var lvl = ud.level || 1;
      var needed = lvl * 100;
      var pct = Math.min(100, ((ud.xp % needed) / needed) * 100);
      $('rb-xp-bar').style.width = pct + '%';
    }
  }

  // Stats tab rendering
  var PROF_ICONS = { healer:'\uD83D\uDC9A', magic_crafter:'\u2728', tank:'\uD83D\uDEE1\uFE0F', weapon_crafter:'\u2694\uFE0F', dps:'\uD83D\uDCA5', armor_crafter:'\uD83D\uDEE1\uFE0F', gatherer:'\uD83C\uDF3E' };

  function renderProfile(ud) {
    if (!ud) return;
    var cls = (ud.crafting_class || '?').replace(/_/g, ' ');
    var cbt = (ud.combat_class || '?').toUpperCase();
    $('st-profile').innerHTML =
      '<div class="sr"><span class="sk">Level</span><span class="sv">\u2B50 ' + (ud.level || '?') + '</span></div>'
      + '<div class="sr"><span class="sk">XP</span><span class="sv">' + fmtNum(ud.xp || 0) + '</span></div>'
      + '<div class="sr"><span class="sk">Craft Class</span><span class="sv">\u2692\uFE0F ' + cls + '</span></div>'
      + '<div class="sr"><span class="sk">Combat Class</span><span class="sv">\u2694\uFE0F ' + cbt + '</span></div>';

    var ac = ud.stats && ud.stats.activity_completion;
    var rc = ud.stats && ud.stats.resource_contribution;
    var ru = ud.stats && ud.stats.resource_consumption;
    if (ac) {
      $('st-activity').innerHTML =
        '<div class="sr"><span class="sk">\uD83C\uDF3E Adventure</span><span class="sv">' + fmtNum(ac.gathering || 0) + '</span></div>'
        + '<div class="sr"><span class="sk">\u2692\uFE0F Crafting</span><span class="sv">' + fmtNum(ac.crafting || 0) + '</span></div>'
        + '<div class="sr"><span class="sk">\u2694\uFE0F Battle</span><span class="sv">' + fmtNum(ac.combat || 0) + '</span></div>'
        + (rc ? '<div class="sr" style="margin-top:4px;border-top:1px solid rgba(255,255,255,.04);padding-top:4px"><span class="sk">Produced</span><span class="sv">'
          + '\uD83E\uDEB5' + fmtNum(rc.wood||0) + ' \u2699\uFE0F' + fmtNum(rc.metal||0) + ' \uD83E\uDDF6' + fmtNum(rc.leather||0)
          + ' \uD83D\uDEE1\uFE0F' + fmtNum(rc.armor||0) + ' \uD83D\uDCA5' + fmtNum(rc.enemy_damage||0) + '</span></div>' : '')
        + (ru ? '<div class="sr"><span class="sk">Consumed</span><span class="sv">'
          + '\u2699\uFE0F' + fmtNum(ru.metal||0) + ' \uD83E\uDDF6' + fmtNum(ru.leather||0)
          + ' \u2694\uFE0F' + fmtNum(ru.weapon||0) + ' \uD83C\uDFF0' + fmtNum(ru.tanks||0) + '</span></div>' : '');
    }
  }

  function renderCounters(data) {
    if (!data) return;
    var rc = data.resource_counters || [];
    var html = '<div class="sg">';
    rc.forEach(function(r) {
      var ic = ICONS[r.id] || '\uD83D\uDCE6';
      var delta = r.current_count - (r.previous_count || 0);
      html += '<div class="sg-item">' + ic + ' <span class="sv">' + fmtNum(r.current_count) + '</span>'
        + '<span class="sk">' + r.id.replace(/_/g, ' ') + '</span>'
        + (delta > 0 ? '<span class="sd">+' + fmtNum(delta) + '</span>' : '')
        + '</div>';
    });
    $('st-global').innerHTML = html + '</div>';

    var pc = data.profession_counters || [];
    var html2 = '<div class="sg">';
    pc.forEach(function(p) {
      var ic = PROF_ICONS[p.id] || '\uD83C\uDFAD';
      var delta = p.current_count - (p.previous_count || 0);
      html2 += '<div class="sg-item">' + ic + ' <span class="sv">' + fmtNum(p.current_count) + '</span>'
        + '<span class="sk">' + p.id.replace(/_/g, ' ') + '</span>'
        + (delta > 0 ? '<span class="sd">+' + fmtNum(delta) + '</span>' : '')
        + '</div>';
    });
    $('st-profs').innerHTML = html2 + '</div>';
  }

  async function fetchStats() {
    if (!_sniffed) return;
    try {
      var results = await Promise.all([
        fetch('https://discord.com/api/v9/gorilla/user-data/@me', { headers: hdrs() }),
        fetch('https://discord.com/api/v9/gorilla/counters', { headers: hdrs() })
      ]);
      if (results[0].ok) { var ud = await results[0].json(); updateResBar(ud); renderProfile(ud); }
      if (results[1].ok) { var ct = await results[1].json(); renderCounters(ct); }
    } catch (e) { console.log('[LMO] Stats fetch error:', e); }
  }

  async function fetchCounterMap() {
    if (!_sniffed) return null;
    try {
      var r = await fetch('https://discord.com/api/v9/gorilla/counters', { headers: hdrs() });
      if (!r.ok) return null;
      var data = await r.json();
      var map = {};
      (data.resource_counters || []).forEach(function(c) { map[c.id] = c.current_count; });
      return map;
    } catch (e) { return null; }
  }

  // Hold-to-accelerate buttons
  function getStep(val, isDelay) {
    if (!isDelay) return 1;
    if (val < 100) return 1;
    if (val < 1000) return 10;
    if (val < 10000) return 100;
    if (val < 60000) return 1000;
    if (val < 600000) return 10000;
    return 60000;
  }
  shadow.querySelectorAll('.cc button').forEach(function(btn) {
    var tid, ticks;
    function apply() {
      var target = $(btn.getAttribute('data-t'));
      var val = parseInt(target.getAttribute('data-val')) || 0;
      var isD = btn.getAttribute('data-t').indexOf('-delay') !== -1;
      var step = getStep(val, isD);
      val = btn.classList.contains('inc') ? val + step : val - step;
      if (val < 0) val = 0;
      target.setAttribute('data-val', val);
      target.textContent = isD ? fmtMs(val) : val;
      ticks++;
    }
    function start() {
      ticks = 0; apply();
      var spd = 200;
      function rep() { apply(); spd = Math.max(30, spd * 0.85); tid = setTimeout(rep, spd); }
      tid = setTimeout(rep, 400);
    }
    function stop() { clearTimeout(tid); }
    btn.addEventListener('mousedown', start);
    btn.addEventListener('mouseup', stop);
    btn.addEventListener('mouseleave', stop);
  });

  // Dragging
  var dragging = false, dx = 0, dy = 0;
  $('header').addEventListener('mousedown', function(e) {
    if (e.target.closest('.tb,.hb,#sniff-btn')) return;
    dragging = true;
    dx = e.clientX - wrap.offsetLeft; dy = e.clientY - wrap.offsetTop;
    e.preventDefault();
  });
  document.addEventListener('mousemove', function(e) {
    if (!dragging) return;
    wrap.style.left = (e.clientX - dx) + 'px';
    wrap.style.top = (e.clientY - dy) + 'px';
    wrap.style.right = 'auto';
  }, { passive: true });
  document.addEventListener('mouseup', function() { dragging = false; });

  // Tab switching
  shadow.querySelectorAll('.tb').forEach(function(btn) {
    btn.addEventListener('click', function() {
      shadow.querySelectorAll('.tb').forEach(function(b) { b.classList.remove('active'); });
      shadow.querySelectorAll('.tc').forEach(function(c) { c.classList.remove('active'); });
      btn.classList.add('active');
      var tab = btn.getAttribute('data-tab');
      $(tab).classList.add('active');
      _activeTab = tab;
      if (_badges[tab] !== undefined) clearBadge(tab);
    });
  });

  // Minimize toggle
  var _lastH = MAX_H;
  $('min-btn').addEventListener('click', function() {
    var isMin = !panel.classList.contains('min');
    panel.classList.toggle('min', isMin);
    $('min-btn').textContent = isMin ? '\u25A1' : '\u2500';
    $('min-btn').title = isMin ? 'Expand' : 'Minimize';
    if (isMin) {
      _lastH = wrap.offsetHeight;
      wrap.style.height = 'auto';
    } else {
      wrap.style.height = _lastH + 'px';
    }
  });

  // Resize handle
  (function() {
    var resizing = false, sx, sy, sw, sh;
    $('resize-handle').addEventListener('mousedown', function(e) {
      if (panel.classList.contains('min')) return;
      resizing = true;
      sx = e.clientX; sy = e.clientY;
      sw = wrap.offsetWidth; sh = wrap.offsetHeight;
      e.preventDefault(); e.stopPropagation();
    });
    document.addEventListener('mousemove', function(e) {
      if (!resizing) return;
      var w = Math.max(MIN_W, Math.min(MAX_W, sw + (e.clientX - sx)));
      var h = Math.max(MIN_H, Math.min(MAX_H, sh + (e.clientY - sy)));
      wrap.style.width = w + 'px';
      wrap.style.height = h + 'px';
    });
    document.addEventListener('mouseup', function() { resizing = false; });
  })();

  // Header sniffing
  var _sniffed = null, _sniffing = false;
  var _origFetch = window.fetch;
  var _origOpen = XMLHttpRequest.prototype.open;
  var _origSetH = XMLHttpRequest.prototype.setRequestHeader;
  var _origSend = XMLHttpRequest.prototype.send;
  var _want = ['authorization', 'x-super-properties', 'x-installation-id',
    'x-discord-locale', 'x-discord-timezone', 'x-debug-options'];

  function onCaptured(h) {
    _sniffed = {};
    for (var i = 0; i < _want.length; i++) {
      if (h[_want[i]]) _sniffed[_want[i]] = h[_want[i]];
    }
    _sniffing = false;
    $('sniff-btn').textContent = '\u2705 Ready';
    $('sniff-btn').style.background = '#3ba55d';
    authResume();
    fetchStats();
  }

  function startSniff() {
    _sniffed = null; _sniffing = true;
    $('sniff-btn').textContent = '\u23F3 Listening...';
    $('sniff-btn').style.background = '#faa61a';
  }

  XMLHttpRequest.prototype.open = function(method, url) {
    this._u = url; this._h = {};
    return _origOpen.apply(this, arguments);
  };
  XMLHttpRequest.prototype.setRequestHeader = function(name, value) {
    if (this._h) this._h[name.toLowerCase()] = value;
    return _origSetH.apply(this, arguments);
  };
  XMLHttpRequest.prototype.send = function() {
    if (_sniffing && this._u && this._u.indexOf('/api/') !== -1
        && this._h && this._h['authorization']) {
      onCaptured(this._h);
    }
    return _origSend.apply(this, arguments);
  };

  window.fetch = function(url, opts) {
    if (_sniffing && opts && opts.headers) {
      var u = typeof url === 'string' ? url : (url && url.url ? url.url : '');
      if (u.indexOf('/api/') !== -1) {
        var h = {};
        if (opts.headers instanceof Headers) {
          opts.headers.forEach(function(v, k) { h[k.toLowerCase()] = v; });
        } else if (typeof opts.headers === 'object') {
          for (var k in opts.headers) h[k.toLowerCase()] = opts.headers[k];
        }
        if (h['authorization']) onCaptured(h);
      }
    }
    return _origFetch.apply(this, arguments);
  };

  function hdrs() {
    if (!_sniffed) return {};
    var h = {};
    for (var k in _sniffed) h[k] = _sniffed[k];
    h['pragma'] = 'no-cache';
    h['cache-control'] = 'no-cache';
    return h;
  }

  function getVal(id) { return parseInt($(id).getAttribute('data-val')) || 0; }

  // Gathering pause mechanism
  var _gatherPaused = false, _gatherResumeCbs = [];
  function pauseGather() { _gatherPaused = true; }
  function resumeGather() {
    _gatherPaused = false;
    var cbs = _gatherResumeCbs; _gatherResumeCbs = [];
    cbs.forEach(function(cb) { cb(); });
  }
  function waitGatherResume() {
    return new Promise(function(r) { _gatherResumeCbs.push(r); });
  }

  // 401 re-auth mechanism
  var _authWaiting = false, _authResumeCbs = [];
  function handle401() {
    if (_authWaiting) return;
    _authWaiting = true;
    _sniffed = null; _sniffing = true;
    $('sniff-btn').textContent = '\uD83D\uDD11 Re-auth...';
    $('sniff-btn').style.background = '#ed4245';
  }
  function authResume() {
    if (!_authWaiting) return;
    _authWaiting = false;
    var cbs = _authResumeCbs; _authResumeCbs = [];
    cbs.forEach(function(cb) { cb(); });
  }
  function waitAuthResume() {
    return new Promise(function(r) { _authResumeCbs.push(r); });
  }

  // Worker factory
  function createWorker(prefix, activity, opts) {
    opts = opts || {};
    var successDelay = opts.successDelay || 0;
    var W = { running: false, timer: null, cd: null, nextAt: null, totalWait: 0, runs: 0, ok: 0, fail: 0 };
    var reqMats = null;
    // Cache DOM refs
    var _logEl = $(prefix + '-log'), _progEl = $(prefix + '-prog');
    var _nextEl = $(prefix + '-sN'), _dotEl = $(prefix + '-dot');
    var _runsEl = $(prefix + '-sR'), _okEl = $(prefix + '-sO'), _failEl = $(prefix + '-sF');

    function log(m, c) {
      c = c || 'd';
      var d = document.createElement('div');
      d.innerHTML = '<span class="d">[' + new Date().toLocaleTimeString() + ']</span> <span class="' + c + '">' + m + '</span>';
      _logEl.appendChild(d);
      if (_logEl.childNodes.length > 50) _logEl.removeChild(_logEl.firstChild);
      _logEl.scrollTop = _logEl.scrollHeight;
      if (c !== 'd') bumpBadge(prefix);
    }
    function upStats() {
      _runsEl.textContent = W.runs;
      _okEl.textContent = W.ok;
      _failEl.textContent = W.fail;
    }
    function setSt(on) { _dotEl.classList.toggle('on', on); }

    async function send(ep) {
      var r = await fetch('https://discord.com/api/v9/gorilla/activity/' + activity + '/' + ep, { method: 'POST', headers: hdrs() });
      var d; try { d = await r.json(); } catch (x) { d = null; }
      if (r.status === 401) handle401();
      if (d && d.user_data) updateResBar(d.user_data);
      return { status: r.status, ok: r.ok, data: d };
    }

    async function runOnce() {
      if (!_sniffed || _authWaiting) {
        log('\uD83D\uDD11 Waiting for credentials...', 'w');
        await waitAuthResume();
        log('\uD83D\uDD11 Credentials received', 'i');
      }
      if (prefix !== 'gather') {
        pauseGather();
        log('\u23F8 Paused adventure', 'd');
        await new Promise(function(r) { setTimeout(r, 1000); });
      }
      W.runs++; upStats();
      try {
        log('\u2192 ' + activity + '/start', 'i');
        var s = await send('start');
        if (s.status === 401) { W.fail++; upStats(); return 'fail'; }
        if (!s.ok) {
          log('\u2190 ' + s.status + ' ' + JSON.stringify(s.data), 'e');
          W.fail++; upStats(); return 'fail';
        }
        var sc = s.data && s.data.changes;
        if (sc && Object.keys(sc).length) { log('\uD83D\uDCE6 ' + fmtChanges(sc), 'w'); trackLoot(sc); }
        // Learn required materials from start changes (negative values = consumed)
        if (sc && !reqMats && successDelay > 0) {
          reqMats = {};
          for (var k in sc) { if (sc[k] < 0) reqMats[k] = Math.abs(sc[k]); }
          if (Object.keys(reqMats).length) {
            log('\uD83D\uDCCB Requires: ' + Object.keys(reqMats).map(function(k) {
              return (ICONS[k] || '') + ' ' + k;
            }).join(', '), 'i');
          }
        }

        log('\u2192 ' + activity + '/complete', 'i');
        var c = await send('complete');
        if (c.status === 401) { W.fail++; upStats(); return 'fail'; }
        if (!c.ok) {
          log('\u2190 ' + c.status + ' ' + JSON.stringify(c.data), 'e');
          W.fail++; upStats(); return 'fail';
        }
        var cc = c.data && c.data.changes;
        if (cc && Object.keys(cc).length) {
          log('\u2728 ' + fmtChanges(cc), 's');
          trackLoot(cc);
          showLootPop('\u2728 ' + fmtChanges(cc), $(prefix));
          playSound('loot');
        } else log('\u2705 Done', 's');

        W.ok++; upStats(); return 'ok';
      } catch (e) {
        log('\u2716 ' + e.message, 'e'); playSound('error'); W.fail++; upStats(); return 'fail';
      } finally {
        if (prefix !== 'gather' && _gatherPaused) {
          resumeGather();
          log('\u25B6 Resumed adventure', 'd');
        }
      }
    }

    $(prefix + '-bOnce').addEventListener('click', function() {
      $(prefix + '-bOnce').disabled = true;
      runOnce().then(function() { $(prefix + '-bOnce').disabled = false; });
    });

    $(prefix + '-bStart').addEventListener('click', async function() {
      if (W.running) return;
      W.running = true;
      $(prefix + '-bStart').disabled = true;
      $(prefix + '-bStop').disabled = false;
      setSt(true); log('\uD83D\uDD01 Loop started', 'i');

      W.cd = setInterval(function() {
        if (!W.nextAt) { _progEl.style.width = '0'; _nextEl.textContent = '-'; return; }
        var left = Math.max(0, W.nextAt - Date.now());
        _nextEl.textContent = left > 1000 ? Math.round(left / 1000) + 's' : left + 'ms';
        _progEl.style.width = ((left / (W.totalWait || 1)) * 100) + '%';
      }, 1000);

      async function tick() {
        if (!W.running) return;
        if (prefix === 'gather' && _gatherPaused) {
          log('\u23F8 Paused \u2014 craft/battle active', 'w');
          _nextEl.textContent = '\u23F8';
          await waitGatherResume();
          if (!W.running) return;
          log('\u25B6 Resumed', 'i');
        }
        // Check materials before attempting (craft/combat only)
        if (reqMats && Object.keys(reqMats).length) {
          while (W.running) {
            var cmap = await fetchCounterMap();
            if (!cmap) break; // can't check, just try
            var missing = [];
            for (var mk in reqMats) {
              if ((cmap[mk] || 0) < reqMats[mk]) missing.push((ICONS[mk] || '') + ' ' + mk + ': ' + fmtNum(cmap[mk] || 0));
            }
            if (!missing.length) break;
            log('\u23F3 No materials: ' + missing.join(', '), 'w');
            _nextEl.textContent = '\u23F3';
            await new Promise(function(r) { setTimeout(r, 30000); });
            if (!W.running) return;
          }
          if (!W.running) return;
        }
        var result = await runOnce();
        var mx = getVal(prefix + '-max');
        if (mx > 0 && W.runs >= mx) { log('\uD83C\uDFC1 Max ' + mx + ' reached', 'w'); stopLoop(); return; }
        if (!W.running) return;
        if (result === 'fail') {
          var ms = getVal(prefix + '-delay');
          W.totalWait = ms; W.nextAt = Date.now() + ms;
          log('\u23F0 Retry in ' + fmtMs(ms), 'w');
          W.timer = setTimeout(tick, ms);
        } else if (successDelay > 0) {
          W.totalWait = successDelay; W.nextAt = Date.now() + successDelay;
          log('\u23F0 Cooldown ' + fmtMs(successDelay), 'i');
          W.timer = setTimeout(tick, successDelay);
        } else { W.totalWait = 0; W.nextAt = null; W.timer = setTimeout(tick, 50); }
      }
      await tick();
    });

    function stopLoop() {
      W.running = false;
      clearTimeout(W.timer); clearInterval(W.cd);
      W.totalWait = 0; W.nextAt = null; _nextEl.textContent = '-';
      _progEl.style.width = '0';
      $(prefix + '-bStart').disabled = false;
      $(prefix + '-bStop').disabled = true;
      setSt(false); log('\u23F9 Stopped', 'w');
    }
    $(prefix + '-bStop').addEventListener('click', stopLoop);
    $(prefix + '-bClear').addEventListener('click', function() { _logEl.innerHTML = ''; });
    $(prefix + '-bReset').addEventListener('click', function() {
      var dd = DEFAULTS[prefix];
      $(prefix + '-delay').setAttribute('data-val', dd.delay);
      $(prefix + '-delay').textContent = fmtMs(dd.delay);
      $(prefix + '-max').setAttribute('data-val', dd.max);
      $(prefix + '-max').textContent = dd.max;
      W.runs = 0; W.ok = 0; W.fail = 0; upStats();
      _logEl.innerHTML = '';
      log('\u21BA Reset', 'i');
    });
    $(prefix + '-bExport').addEventListener('click', function() {
      var text = Array.from(_logEl.childNodes).map(function(n) { return n.textContent; }).join('\n');
      if (navigator.clipboard) {
        navigator.clipboard.writeText(text).then(function() { log('\uD83D\uDCCB Log copied!', 'i'); });
      } else {
        log('\uD83D\uDCCB Clipboard not available', 'e');
      }
    });

    log('\u2705 Ready', 's');
    return { stopLoop: stopLoop };
  }

  var gW = createWorker('gather', 'gathering');
  var cW = createWorker('craft', 'crafting', { successDelay: 120000 });
  var bW = createWorker('combat', 'combat', { successDelay: 180000 });

  $('sniff-btn').addEventListener('click', function() { startSniff(); });
  $('snd-btn').addEventListener('click', function() {
    _soundEnabled = !_soundEnabled;
    $('snd-btn').textContent = _soundEnabled ? '\uD83D\uDD14' : '\uD83D\uDD07';
    $('snd-btn').classList.toggle('snd-on', _soundEnabled);
    if (_soundEnabled) playSound('loot');
  });
  document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape' && document.getElementById('lmo-wrap')) {
      $('min-btn').click();
    }
  });
  startSniff();

  // Auto-refresh stats every 60s
  var _statsInterval = setInterval(function() {
    if (_sniffed && !_authWaiting && !document.hidden) fetchStats();
  }, 60000);

  $('stats-refresh').addEventListener('click', function() {
    $('stats-refresh').disabled = true;
    $('stats-refresh').textContent = '\u23F3 Loading...';
    fetchStats().then(function() {
      $('stats-refresh').disabled = false;
      $('stats-refresh').textContent = '\uD83D\uDD04 Refresh';
    });
  });

  // Check for updates
  (function checkUpdate() {
    fetch('https://api.github.com/repos/' + LMO_REPO + '/releases/latest')
      .then(function(r) { return r.ok ? r.json() : null; })
      .then(function(d) {
        if (!d || !d.tag_name) return;
        var remote = d.tag_name.replace(/^[^0-9]*/, '');
        if (remote && remote !== LMO_VERSION) {
          var el = $('upd-link');
          el.textContent = '\uD83C\uDD95 v' + remote;
          el.classList.add('avail');
        }
      }).catch(function() {});
  })();

  $('close-btn').addEventListener('click', function() {
    gW.stopLoop(); cW.stopLoop(); bW.stopLoop();
    clearInterval(_statsInterval);
    window.fetch = _origFetch;
    XMLHttpRequest.prototype.open = _origOpen;
    XMLHttpRequest.prototype.setRequestHeader = _origSetH;
    XMLHttpRequest.prototype.send = _origSend;
    wrap.remove();
  });

  console.log('[LMO] \uD83C\uDF3F Last Meadow Online injected. Paste again to remove.');
})();
