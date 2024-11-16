# webpro_06
## プログラムについて

## ファイル一覧
ファイル名 | 説明 
-|-
app5.js | プログラム本体
public/janken.html | じゃんけんの開始画面 
views/janken.ejs | じゃんけんのテンプレートファイル
public/shindan.html | 性格診断の開始画面
views/shindan.ejs | 性格診断のテンプレートファイル
public/recommend | おすすめガンダム作品診断の開始画面
views/recommend.ejs | おすすめガンダム作品診断のテンプレートファイル
 
##　じゃんけん
### 起動の手順
1. ターミナルで```node app5.js```を打ちapp5.jsを起動する．
1. Webブラウザでhttp://localhost:8080/public/janken.html にアクセスする．
1. 自分でじゃんけんの手を入力する．

### 機能
・cpuとじゃんけんをする．
・試合数と勝利数を記録する．
```mermaid
flowchart TD;

start["開始"];
te["あなたの手を判断"]
cpute["ランダムにcpuの手を決定"]
handan["試合数と勝ち数をカウント"]
end1["終了"]
if{"勝敗を判断"}
win["勝ち"]
loose["負け"]

start --> te
te --> cpute
cpute --> if
if -->|yes| win
win --> handan
if -->|no| loose
loose-->handan
handan --> end1
```

## 性格診断

### 起動の手順
1. ターミナルで```node app5.js```を打ちapp5.jsを起動する．
1. Webブラウザでhttp://localhost:8080/public/shindan.html にアクセスする．
1. 自分に当てはまるものにチェックを入れる．

###　機能
・選択したものによって性格を表示する．

### ドキュメント
```mermaid
flowchart TD;

start["開始"]
end1["終了"]
if1{"一つ目の項目"}
if2{"二つ目の項目"}
if2-1{"二つ目の項目"}
if3{"三つ目の項目"}
if3-1{"三つ目の項目"}
if3-2{"三つ目の項目"}
if3-3{"三つ目の項目"}
seikaku1["性格1"]
seikaku2["性格2"]
seikaku3["性格3"]
seikaku4["性格4"]
seikaku5["性格5"]
seikaku6["性格6"]
seikaku7["性格7"]
seikaku8["性格8"]
get["データの取得"]
hyouji["表示"]

start --> get
get --> if1
if1 --> |チェック| if2
if1 --> |チェックなし| if2-1
if2 --> |チェック| if3
if2 --> |チェックなし| if3-1
if2-1 --> |チェック| if3-2
if2-1 --> |チェックなし| if3-3
if3 --> |チェック| seikaku1
if3 --> |チェックなし| seikaku2
if3-1 --> |チェック| seikaku3
if3-1 --> |チェックなし| seikaku4
if3-2 --> |チェック| seikaku5
if3-2 --> |チェックなし| seikaku6
if3-3 --> |チェック| seikaku7
if3-3 --> |チェックなし| seikaku8
seikaku1 --> hyouji
seikaku2 --> hyouji
seikaku3 --> hyouji
seikaku4 --> hyouji
seikaku5 --> hyouji
seikaku6 --> hyouji
seikaku7 --> hyouji
seikaku8 --> hyouji
hyouji --> end1
```

## おすすめガンダム作品診断
###　起動の手順
1. ターミナルで```node app5.js```を打ちapp5.jsを起動する．
1. Webブラウザでhttp://localhost:8080/public/recommend.html にアクセスする．
1. 質問に答える．

### 機能
・五つの質問に答えると，それに合ったガンダム作品が表示される．

###　フローチャート
```mermaid
flowchart TD;

start["開始"]
end1["終了"]
if1{"答えを選択してない質問がないか"}
success["各質問の答えによって作品を判断"]
error["選択していない項目があると判断"]
send["テンプレートファイルに送信"]
get["質問の答えの取得"]
hyouji["表示"]

start --> get
get --> if1
if1 --> |ない| success
if1 --> |ある| error
success --> send
error --> send
send --> hyouji
hyouji --> end1
```


