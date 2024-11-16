const express = require("express");
const app = express();

app.set('view engine', 'ejs');
app.use("/public", express.static(__dirname + "/public"));

app.get("/hello1", (req, res) => {
  const message1 = "Hello world";
  const message2 = "Bon jour";
  res.render('show', { greet1:message1, greet2:message2});
});

app.get("/hello2", (req, res) => {
  res.render('show', { greet1:"Hello world", greet2:"Bon jour"});
});

app.get("/icon", (req, res) => {
  res.render('icon', { filename:"./public/Apple_logo_black.svg", alt:"Apple Logo"});
});

app.get("/luck", (req, res) => {
  const num = Math.floor( Math.random() * 6 + 1 );
  let luck = '';
  if( num==1 ) luck = '大吉';
  else if( num==2 ) luck = '中吉';
  console.log( 'あなたの運勢は' + luck + 'です' );
  res.render( 'luck', {number:num, luck:luck} );
});

app.get("/janken", (req, res) => {
  let hand = req.query.hand;
  let win = Number( req.query.win );
  let total = Number( req.query.total );
  console.log( {hand, win, total});
  const num = Math.floor( Math.random() * 3 + 1 );
  let cpu = '';
  if( num==1 ) cpu = 'グー';
  else if( num==2 ) cpu = 'チョキ';
  else cpu = 'パー';
  // ここに勝敗の判定を入れる
  // 今はダミーで人間の勝ちにしておく
  if(isNaN(win)) win = 0;
  if(isNaN(total)) total = 0;
  let judgement;
  if((cpu == 'グー' && hand == 'パー') || (cpu == 'チョキ' && hand == 'グー') || (cpu == 'パー' && hand == 'チョキ')){
    judgement = '勝ち';
    win += 1;
  }
  else if((cpu == 'グー' && hand == 'チョキ') || (cpu == 'チョキ' && hand == 'パー') || (cpu == 'パー' && hand == 'グー')){
    judgement = '負け';
  }
  else if(cpu == hand){
    judgement = '引き分け';
  }
  total += 1;
  const display = {
    your: hand,
    cpu: cpu,
    judgement: judgement,
    win: win,
    total: total
  }
  res.render( 'janken', display );
});

app.get("/shindan", (req, res) => {
  let a = req.query.seikaku1;
  let b = req.query.seikaku2;
  let c = req.query.seikaku3;

  if(typeof(a) == "undefined") a = "off";
  if(typeof(b) == "undefined") b = "off";
  if(typeof(c) == "undefined") c = "off";

  console.log({a, b, c});
  
  if(a == "on" && b == "on" && c == "on")        seikaku = "自分に自信があって，食べることが好きで，歌うことが好きです";
  else if(a == "on" && b == "on" && c == "off")  seikaku = "自分に自信があって，食べることが好きです";
  else if(a == "on" && b == "off" && c == "off") seikaku = "自分に自信があります";
  else if(a == "on" && b == "off" && c == "on")  seikaku = "自分に自信があって，歌うことが好きです";
  else if(a == "off" && b == "on" && c == "on")  seikaku = "食べることが好きで，歌うことが好きです";
  else if(a == "off" && b == "on" && c == "off") seikaku = "食べることが好きです";
  else if(a == "off" && b == "off" && c == "on") seikaku = "歌うことが好きです";
  else                                           seikaku = "診断不能です";

  res.render('shindan', {seikaku: seikaku});
});

app.get("/recommend", (req, res) => {
  let ans;
  let a = req.query.radio1;
  let b = req.query.radio2;
  let c = req.query.radio3;
  let d = req.query.radio4;
  let e = req.query.radio5;

  if(typeof(a) == "undefined") a = 0;
  if(typeof(b) == "undefined") b = 0;
  if(typeof(c) == "undefined") c = 0;
  if(typeof(d) == "undefined") d = 0;
  if(typeof(e) == "undefined") e = 0;
  
  if(a == 1){
    if(b == 1){
      if(c == 1){
        if(d == 1){
          ans = "機動戦士ガンダムUC";
        }
        else if(d == 2){
          ans = "機動戦士ガンダムSEED";
        }
      }
      else if(c == 2){
        if(d == 1){
          ans = "機動戦士ガンダムSEED";
        }
        else if(d == 2){
          ans = "機動戦士ガンダム 鉄血のオルフェンズ";
        }
      }
    }
    else if(b == 2){
      if(c == 1){
        if(d == 1){
          ans = "機動戦士ガンダム 水星の魔女";
        }
        else if(d == 2){
          ans = "機動戦士ガンダム 0080 ポケットの中の戦争";
        }
      }
      else if(c == 2){
        if(d == 1){
          ans = "機動戦士ガンダムUC";
        }
        else if(d == 2){
          ans = "機動戦士ガンダム 0083 STARDUST MEMORY";
        }
      }
    }
  }
  else if(a == 2){
    if(b == 1){
      if(c == 1){
        if(d == 1){
          ans = "機動戦士ガンダム 水星の魔女";
        }
        else if(d == 2){
          ans = "機動戦士ガンダム 第08MS小隊";
        }
      }
      else if(c == 2){
        if(d == 1){
          ans = "機動戦士ガンダム 鉄血のオルフェンズ";
        }
        else if(d == 2){
          ans = "機動戦士ガンダム";
        }
      }
    }
    else if(b == 2){
      if(c == 1){
        if(d == 1){
          ans = "機動戦士ガンダム 閃光のハサウェイ";
        }
        else if(d == 2){
          ans = "機動戦士ガンダム THE ORIGIN";
        }
      }
      else if(c == 2){
        if(d == 1){
          ans = "機動戦士ガンダムUC";
        }
        else if(d == 2){
          ans = "劇場版 機動戦士ガンダム";
        }
      }
    }
  }

  if(e == 1) ans = "ガンダムビルドファイターズ";

  if(a == 0 || b == 0 || c == 0 || d == 0 || e == 0) ans = "選択していない項目があります";

  console.log({a, b, c, d, e, ans});
  
  res.render('recommend', {ans: ans});
});
app.listen(8080, () => console.log("Example app listening on port 8080!"));
