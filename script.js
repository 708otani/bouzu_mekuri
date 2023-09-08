// ???????????
function rotateCard(card) {
  const rotation = Math.floor(Math.random() * 360);
  const transx = Math.floor(Math.random() * 400) + 200;
  const transy = Math.floor(Math.random() * 200) + 75;
  card.style.transform = `translate(${transx}px, ${transy}px) rotate(${rotation}deg)`;
}

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

// ??????????
const cardContainer = document.getElementById('cardContainer');
var num_player = 2;
var current_player = 0;
var remaining_cards = 100;
var playerfields = [];
var playertexts = [];
var playerbox = [];

const discardedfield = document.getElementById('discardedfield');
const discardedtext = document.getElementById('discardedtext');

const cardInfo = [
{"number": 1, "name": "天智天皇", "poem": "秋の田の,かりほの庵の,とまをあらみ,わが衣手は,露にぬれつつ", "attribute": "td"},
{"number": 2, "name": "持統天皇", "poem": "春すぎて,夏きにけらし,白妙の,衣干すてふ,天のかぐ山", "attribute": "hd"},
{"number": 3, "name": "柿本人麻呂", "poem": "足曳の,山鳥の尾の,しだり尾の,長々し夜を,独りかも寝む", "attribute": "t"},
{"number": 4, "name": "山部赤人", "poem": "田子の浦に,うち出でて見れば,白妙の,富士の高嶺に,雪は降りつつ", "attribute": "t"},
{"number": 5, "name": "猿丸太夫", "poem": "奥山に,紅葉踏み分け,鳴く鹿の,声きくときぞ,秋は悲しき", "attribute": "t"},
{"number": 6, "name": "中納言家持", "poem": "かささぎの,渡せる橋に,おく霜の,白きを見れば,夜ぞ更けにける", "attribute": "t"},
{"number": 7, "name": "阿倍仲麻呂", "poem": "天の原,ふりさけ見れば,春日なる,三笠の山に,出でし月かも", "attribute": "t"},
{"number": 8, "name": "喜撰法師", "poem": "わが庵は,都のたつみ,しかぞ住む,世をうぢ山と,人はいふなり", "attribute": "b"},
{"number": 9, "name": "小野小町", "poem": "花の色は,移りにけりな,いたづらに,わが身世にふる,ながめせしまに", "attribute": "h"},
{"number": 10, "name": "蝉丸", "poem": "是れやこの,行くもかへるも,別れては,知るもしらぬも,逢坂の関", "attribute": "b"},
{"number": 11, "name": "参議篁", "poem": "わたのはら,八十島かけて,こぎ出でぬと,人には告げよ,あま釣船", "attribute": "t"},
{"number": 12, "name": "僧正遍照", "poem": "天津風,雲の通ひ路,ふきとぢよ,をとめの姿,しばしとどめむ", "attribute": "b"},
{"number": 13, "name": "陽成院", "poem": "筑波嶺の,みねより落つる,みなの川,恋ぞつもりて,淵となりぬる", "attribute": "td"},
{"number": 14, "name": "河原左大臣", "poem": "陸奥の,しのぶもぢずり,誰故に,乱れそめにし,われならなくに", "attribute": "t"},
{"number": 15, "name": "光孝天皇", "poem": "君がため,はるの野に出でて,若菜つむ,わが衣手に,雪はふりつつ", "attribute": "td"},
{"number": 16, "name": "中納言行平", "poem": "立別れ,いなばの山の,峰に生ふる,まつとしきかば,今かへりこむ", "attribute": "t"},
{"number": 17, "name": "在原業平朝臣", "poem": "千早振る,神代もきかず,竜田川,から紅に,水くくるとは", "attribute": "t"},
{"number": 18, "name": "藤原敏行朝臣", "poem": "住の江の,岸に寄る波,よるさへや,夢の通ひ路,人めよくらむ", "attribute": "t"},
{"number": 19, "name": "伊勢", "poem": "難波がた,短き蘆の,ふしの間も,逢はで此世を,すぐしてよとや", "attribute": "h"},
{"number": 20, "name": "元良親王", "poem": "侘ぬれば,今はたおなじ,なにはなる,みをつくしても,あはむとぞ思ふ", "attribute": "t"},
{"number": 21, "name": "素性法師", "poem": "????,?????,?????,?????,??????", "attribute": "b"},
{"number": 22, "name": "文屋康秀", "poem": "????,?????,?????,?????,??????", "attribute": "t"},
{"number": 23, "name": "大江千里", "poem": "????,?????,?????,?????,??????", "attribute": "t"},
{"number": 24, "name": "菅家", "poem": "????,?????,?????,?????,??????", "attribute": "t"},
{"number": 25, "name": "三条右大臣", "poem": "????,?????,?????,?????,??????", "attribute": "t"},
{"number": 26, "name": "貞信公", "poem": "????,?????,?????,?????,??????", "attribute": "t"},
{"number": 27, "name": "中納言兼輔", "poem": "????,?????,?????,?????,??????", "attribute": "t"},
{"number": 28, "name": "源宗于朝臣", "poem": "????,?????,?????,?????,??????", "attribute": "t"},
{"number": 29, "name": "凡河内躬恒", "poem": "????,?????,?????,?????,??????", "attribute": "t"},
{"number": 30, "name": "壬生忠岑", "poem": "????,?????,?????,?????,??????", "attribute": "t"},
{"number": 31, "name": "坂上是則", "poem": "????,?????,?????,?????,??????", "attribute": "t"},
{"number": 32, "name": "春道列樹", "poem": "????,?????,?????,?????,??????", "attribute": "t"},
{"number": 33, "name": "紀友則", "poem": "????,?????,?????,?????,??????", "attribute": "t"},
{"number": 34, "name": "藤原興風", "poem": "????,?????,?????,?????,??????", "attribute": "t"},
{"number": 35, "name": "紀貫之", "poem": "????,?????,?????,?????,??????", "attribute": "t"},
{"number": 36, "name": "清原深養父", "poem": "????,?????,?????,?????,??????", "attribute": "t"},
{"number": 37, "name": "文屋朝康", "poem": "????,?????,?????,?????,??????", "attribute": "t"},
{"number": 38, "name": "右近", "poem": "????,?????,?????,?????,??????", "attribute": "h"},
{"number": 39, "name": "参議等", "poem": "????,?????,?????,?????,??????", "attribute": "t"},
{"number": 40, "name": "平兼盛", "poem": "????,?????,?????,?????,??????", "attribute": "t"},
{"number": 41, "name": "壬生忠見", "poem": "????,?????,?????,?????,??????", "attribute": "t"},
{"number": 42, "name": "清原元輔", "poem": "????,?????,?????,?????,??????", "attribute": "t"},
{"number": 43, "name": "権中納言敦忠", "poem": "????,?????,?????,?????,??????", "attribute": "t"},
{"number": 44, "name": "中納言朝忠", "poem": "????,?????,?????,?????,??????", "attribute": "t"},
{"number": 45, "name": "謙徳公", "poem": "????,?????,?????,?????,??????", "attribute": "t"},
{"number": 46, "name": "曽禰好忠", "poem": "????,?????,?????,?????,??????", "attribute": "t"},
{"number": 47, "name": "恵慶法師", "poem": "????,?????,?????,?????,??????", "attribute": "b"},
{"number": 48, "name": "源重之", "poem": "????,?????,?????,?????,??????", "attribute": "t"},
{"number": 49, "name": "大中臣能宣朝臣", "poem": "????,?????,?????,?????,??????", "attribute": "t"},
{"number": 50, "name": "藤原義孝", "poem": "????,?????,?????,?????,??????", "attribute": "t"},
{"number": 51, "name": "藤原実方朝臣", "poem": "????,?????,?????,?????,??????", "attribute": "t"},
{"number": 52, "name": "藤原道信朝臣", "poem": "????,?????,?????,?????,??????", "attribute": "t"},
{"number": 53, "name": "右大将道綱母", "poem": "????,?????,?????,?????,??????", "attribute": "h"},
{"number": 54, "name": "儀同三司母", "poem": "????,?????,?????,?????,??????", "attribute": "h"},
{"number": 55, "name": "大納言公任", "poem": "????,?????,?????,?????,??????", "attribute": "t"},
{"number": 56, "name": "和泉式部", "poem": "????,?????,?????,?????,??????", "attribute": "h"},
{"number": 57, "name": "紫式部", "poem": "????,?????,?????,?????,??????", "attribute": "h"},
{"number": 58, "name": "大弐三位", "poem": "????,?????,?????,?????,??????", "attribute": "h"},
{"number": 59, "name": "赤染衛門", "poem": "????,?????,?????,?????,??????", "attribute": "h"},
{"number": 60, "name": "小式部内侍", "poem": "????,?????,?????,?????,??????", "attribute": "h"},
{"number": 61, "name": "伊勢大輔", "poem": "????,?????,?????,?????,??????", "attribute": "h"},
{"number": 62, "name": "清少納言", "poem": "????,?????,?????,?????,??????", "attribute": "h"},
{"number": 63, "name": "左京大夫道雅", "poem": "????,?????,?????,?????,??????", "attribute": "t"},
{"number": 64, "name": "権中納言定頼", "poem": "????,?????,?????,?????,??????", "attribute": "t"},
{"number": 65, "name": "相模", "poem": "????,?????,?????,?????,??????", "attribute": "h"},
{"number": 66, "name": "前大僧正行尊", "poem": "????,?????,?????,?????,??????", "attribute": "b"},
{"number": 67, "name": "周防内侍", "poem": "????,?????,?????,?????,??????", "attribute": "h"},
{"number": 68, "name": "三条院", "poem": "????,?????,?????,?????,??????", "attribute": "td"},
{"number": 69, "name": "能因法師", "poem": "????,?????,?????,?????,??????", "attribute": "b"},
{"number": 70, "name": "良暹法師", "poem": "????,?????,?????,?????,??????", "attribute": "b"},
{"number": 71, "name": "大納言経信", "poem": "????,?????,?????,?????,??????", "attribute": "t"},
{"number": 72, "name": "祐子内親王家紀伊", "poem": "????,?????,?????,?????,??????", "attribute": "hd"},
{"number": 73, "name": "権中納言匡房", "poem": "????,?????,?????,?????,??????", "attribute": "t"},
{"number": 74, "name": "源俊頼朝臣", "poem": "????,?????,?????,?????,??????", "attribute": "t"},
{"number": 75, "name": "藤原基俊", "poem": "????,?????,?????,?????,??????", "attribute": "t"},
{"number": 76, "name": "法性寺入道前関白太政大臣", "poem": "????,?????,?????,?????,??????", "attribute": "t"},
{"number": 77, "name": "崇徳院", "poem": "????,?????,?????,?????,??????", "attribute": "td"},
{"number": 78, "name": "源兼昌", "poem": "????,?????,?????,?????,??????", "attribute": "t"},
{"number": 79, "name": "左京大夫顕輔", "poem": "????,?????,?????,?????,??????", "attribute": "t"},
{"number": 80, "name": "待賢門院堀川", "poem": "????,?????,?????,?????,??????", "attribute": "h"},
{"number": 81, "name": "後徳大寺左大臣", "poem": "????,?????,?????,?????,??????", "attribute": "t"},
{"number": 82, "name": "道因法師", "poem": "????,?????,?????,?????,??????", "attribute": "b"},
{"number": 83, "name": "皇太后宮大夫俊成", "poem": "????,?????,?????,?????,??????", "attribute": "t"},
{"number": 84, "name": "藤原清輔朝臣", "poem": "????,?????,?????,?????,??????", "attribute": "t"},
{"number": 85, "name": "俊恵法師", "poem": "????,?????,?????,?????,??????", "attribute": "b"},
{"number": 86, "name": "西行法師", "poem": "????,?????,?????,?????,??????", "attribute": "b"},
{"number": 87, "name": "寂蓮法師", "poem": "????,?????,?????,?????,??????", "attribute": "b"},
{"number": 88, "name": "皇嘉門院別当", "poem": "????,?????,?????,?????,??????", "attribute": "h"},
{"number": 89, "name": "式子内親王", "poem": "????,?????,?????,?????,??????", "attribute": "hd"},
{"number": 90, "name": "殷富門院大輔", "poem": "見せばやな,雄島のあまの,袖だにも,濡れにぞぬれし,色はかはらず", "attribute": "h"},
{"number": 91, "name": "後京極摂政前太政大臣", "poem": "きりぎりす,なくや霜夜の,さむしろに,衣かたしき,独りかもねむ", "attribute": "t"},
{"number": 92, "name": "二条院讃岐", "poem": "わがそでは,潮干に見えぬ,沖の石の,人こそしらね,かわく間もなし", "attribute": "h"},
{"number": 93, "name": "鎌倉右大臣", "poem": "世の中は,常にもがもな,渚漕ぐ,海士の小舟の,綱でかなしも", "attribute": "t"},
{"number": 94, "name": "参議雅経", "poem": "みよし野の,山の秋風,小夜更けて,ふる郷さむく,衣うつなり", "attribute": "t"},
{"number": 95, "name": "前大僧正慈円", "poem": "おほけなく,浮世の民に,おほふかな,わがたつ杣に,墨染の袖", "attribute": "b"},
{"number": 96, "name": "入道前太政大臣", "poem": "花さそふ,嵐の庭の,雪ならで,ふりゆくものは,わが身なりけり", "attribute": "t"},
{"number": 97, "name": "権中納言定家", "poem": "来ぬ人を,まつほの浦の,夕なぎに,やくや藻塩の,身もこがれつつ", "attribute": "t"},
{"number": 98, "name": "従二位家隆", "poem": "風そよぐ,ならの小川の,夕暮は,みそぎぞ夏の,しるしなりける", "attribute": "t"},
{"number": 99, "name": "後鳥羽院", "poem": "人もをし,人も恨めし,味気なく,世を思ふ故に,物おもふ身は", "attribute": "td"},
{"number": 100, "name": "順徳院", "poem": "百敷や,古き軒端の,しのぶにも,猶あまりある,昔なりけり", "attribute": "td"},
];

function removeAllChildNodes(parent) {
    while (parent.firstChild) {
        parent.removeChild(parent.firstChild);
    }
}

function changeTurn() {
	playerbox[current_player].style.background = "#ffffff";
	current_player = (current_player + 1) % num_player;
	playerbox[current_player].style.background = "#ffffcc";
}

function do_action(card, num) {
  
  if ((cardInfo[num]["attribute"] == "h") || (cardInfo[num]["attribute"] == "hd")) {
    for (var child=discardedfield.firstChild; child!==null; child=child.nextSibling) {
      clone_card = child.cloneNode(true);
      clone_card.style.transform = `translate(0px, 0px) rotate(0deg)`;
      clone_card.style.zIndex = playerfields[current_player].childElementCount;
      playerfields[current_player].appendChild(clone_card);
    }
    removeAllChildNodes(discardedfield);
	refresh_discarded();
  }
  
  clone_card = card.cloneNode(true);
  clone_card.style.transform = `translate(0px, 0px) rotate(0deg)`;
  clone_card.style.zIndex = playerfields[current_player].childElementCount;
  card.parentNode.removeChild(card);
  playerfields[current_player].appendChild(clone_card);
  
  if (cardInfo[num]["attribute"] == "b") {
    for (var child=playerfields[current_player].firstChild; child!==null; child=child.nextSibling) {
      clone_card = child.cloneNode(true);
      clone_card.style.transform = `translate(0px, 0px) rotate(0deg)`;
      clone_card.style.zIndex = discardedfield.childElementCount;
      discardedfield.appendChild(clone_card);
    }
    removeAllChildNodes(playerfields[current_player]);
    refresh_discarded();
  }
  refresh_player_fields();
  if ((cardInfo[num]["attribute"] != "td") && (cardInfo[num]["attribute"] != "hd")) {
    changeTurn();
  }
  remaining_cards = cardContainer.childElementCount;
  if (remaining_cards == 0) {
	do_gameset();
  }
}

function do_gameset() {
  for (var i=0; i<num_player; i++) {
	pos = 1;
	my_card = playerfields[i].childElementCount;
	for (var j=0; j<num_player; j++) {
      if (playerfields[j].childElementCount > my_card) {
		pos = pos + 1;
	  }
	}
	if (pos == 1) {playertexts[i].className = 'numtext first'}
	else if (pos == 2) {playertexts[i].className = 'numtext second'}
	else if (pos == 3) {playertexts[i].className = 'numtext third'}
	else {playertexts[i].className = 'numtext'}
  }
}

function refresh_player_fields() {
  n_card = playerfields[current_player].childElementCount;
  space = (playerfields[current_player].clientWidth - 150) / (n_card - 0.99999);
  if (space > 10) { space = 10; }
  var cnt = 0;
  for (var child=playerfields[current_player].firstChild; child!==null; child=child.nextSibling) {
    child.style.transform = `translate(${space*cnt}px, 0px)`;
    cnt = cnt + 1;
  }
  playertexts[current_player].innerHTML = n_card;
}

function refresh_discarded() {
  n_card = discardedfield.childElementCount;
  space = (discardedfield.clientWidth - 150) / (n_card - 0.99999);
  if (space > 10) { space = 10; }
  var cnt = 0;
  for (var child=discardedfield.firstChild; child!==null; child=child.nextSibling) {
    child.style.transform = `translate(${space*cnt}px, 0px)`;
    cnt = cnt + 1;
  }
  discardedtext.innerHTML = n_card;
}

function reset_game() {
  num_player = document.getElementById('num_players').value;
  removeAllChildNodes(document.getElementById('players'));
  removeAllChildNodes(document.getElementById('discardedfield'));
  removeAllChildNodes(document.getElementById('cardContainer'));
  playerfields.length = 0;
  playerbox.length = 0;
  discardedtext.innerHTML = 0;
  discardedtext.className = 'numtext';
  for (let i = 0; i < num_player; i++) {
	playerbox.push(document.createElement('div'));
	playerbox[i].className = 'playerbox';
	playertexts.push(document.createElement('div'));
	playertexts[i].className = 'numtext';
	playertexts[i].innerHTML = 0;
    playerfields.push(document.createElement('div'));
    playerfields[i].className = 'playerfield';
    document.getElementById('players').appendChild(playerbox[i]);
	playerbox[i].appendChild(playertexts[i]);
	playerbox[i].appendChild(playerfields[i]);
  }
  current_player = Math.floor(Math.random() * num_player);
  changeTurn();

  for (let i = 0; i < 100; i++) {
    const card = document.createElement('div');
    card.className = 'card '+cardInfo[i]["attribute"];
    card.style.zIndex = Math.floor(Math.random() * 1000000);

  // ??????????????
    const content = document.createElement('div');
    content.className = 'card-content';
  
    const author = document.createElement('div');
    author.style.cssFloat = 'right';
    author.className = 'author';
    author.innerHTML = cardInfo[i]["name"];

  // ?????????
    const poem = document.createElement('div');
    poem.style.cssFloat = 'right';
    poem.className = 'poem';
    poem.innerHTML = cardInfo[i]["poem"].replaceAll(",","<br>");
  
  // ???????(????????URL?????????)
    const illustration = document.createElement('img');
    illustration.className = 'illustration';
    //illustration.src = 'illustration.jpg'; // ?????URL???
  
  // ???????????????
    const smallNumber = document.createElement('div');
    smallNumber.className = 'small-number';
    smallNumber.textContent = i+1;
  
  // content??????
    content.appendChild(author);
    content.appendChild(poem);
    //content.appendChild(illustration);
    content.appendChild(smallNumber);

  // hide contents
    content.style.display = 'none';
    card.className = 'card z';

  // set action
    card.addEventListener("click", async function() {
      this.className = 'card ' + cardInfo[i]["attribute"];
      content.style.display = 'block';
	  this.addEventListener("click", function() {});
	  this.style.zIndex = 1000000;
      await new Promise(r => setTimeout(r, 500));
	  do_action(card, i);
    });

  // ????content???
    card.appendChild(content);

    cardContainer.appendChild(card);
    rotateCard(card); // ?????????
  }
  remaining_cards = cardContainer.childElementCount;
}
