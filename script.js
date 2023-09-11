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
{"number": 21, "name": "素性法師", "poem": "今来むと,いひしばかりに,長月の,有明の月を,待出でつるかな", "attribute": "b"},
{"number": 22, "name": "文屋康秀", "poem": "吹くからに,秋の草木の,しをるれば,むべ山風を,嵐と云ふらむ", "attribute": "t"},
{"number": 23, "name": "大江千里", "poem": "月見れば,千々に物こそ,悲しけれ,わが身一つの,秋にはあらねど", "attribute": "t"},
{"number": 24, "name": "菅家", "poem": "此の度は,ぬさも取りあへず,手向山,紅葉のにしき,神のまにまに", "attribute": "t"},
{"number": 25, "name": "三条右大臣", "poem": "名にしおはば,逢坂山の,さねかづら,人に知られで,くるよしもがな", "attribute": "t"},
{"number": 26, "name": "貞信公", "poem": "小倉山,峰のもみぢ葉,心あらば,今一度の,みゆきまたなむ", "attribute": "t"},
{"number": 27, "name": "中納言兼輔", "poem": "みかの原,わきてながるる,いづみ川,いつみきとてか,恋しかるらむ", "attribute": "t"},
{"number": 28, "name": "源宗于朝臣", "poem": "山里は,冬ぞ寂しさ,まさりける,人めも草も,かれぬと思へば", "attribute": "t"},
{"number": 29, "name": "凡河内躬恒", "poem": "心あてに,をらばやをらむ,はつしもの,置きまどはせる,白菊のはな", "attribute": "t"},
{"number": 30, "name": "壬生忠岑", "poem": "有明の,つれなく見えし,別れより,暁ばかり,うきものはなし", "attribute": "t"},
{"number": 31, "name": "坂上是則", "poem": "朝ぼらけ,有明の月と,見るまでに,よしのの里に,降れる白雪", "attribute": "t"},
{"number": 32, "name": "春道列樹", "poem": "山川に,風のかけたる,柵は,流れもあへぬ,紅葉なりけり", "attribute": "t"},
{"number": 33, "name": "紀友則", "poem": "久方の,光のどけき,春の日に,しづ心なく,花の散るらむ", "attribute": "t"},
{"number": 34, "name": "藤原興風", "poem": "誰をかも,しる人にせむ,高砂の,松も昔の,友ならなくに", "attribute": "t"},
{"number": 35, "name": "紀貫之", "poem": "人はいさ,心も知らず,ふるさとは,花ぞ昔の,香に匂ひける", "attribute": "t"},
{"number": 36, "name": "清原深養父", "poem": "夏の夜は,まだ宵ながら,明けぬるを,雲のいづこに,月やどるらむ", "attribute": "t"},
{"number": 37, "name": "文屋朝康", "poem": "白露に,風の吹きしく,秋の野は,つらぬきとめぬ,玉ぞ散りける", "attribute": "t"},
{"number": 38, "name": "右近", "poem": "忘らるる,身をば思はず,ちかひてし,人の命の,をしくもあるかな", "attribute": "h"},
{"number": 39, "name": "参議等", "poem": "浅ぢふの,をのの篠原,しのぶれど,あまりてなどか,人の恋しき", "attribute": "t"},
{"number": 40, "name": "平兼盛", "poem": "忍ぶれど,色に出でにけり,わが恋は,物や思ふと,人の問ふまで", "attribute": "t"},
{"number": 41, "name": "壬生忠見", "poem": "恋すてふ,わが名はまだき,たちにけり,人知れずこそ,思ひそめしか", "attribute": "t"},
{"number": 42, "name": "清原元輔", "poem": "契りきな,かたみに袖を,しぼりつつ,すゑの松山,波こさじとは", "attribute": "t"},
{"number": 43, "name": "権中納言敦忠", "poem": "逢見ての,後の心に,くらぶれば,昔は物を,思はざりけり", "attribute": "t"},
{"number": 44, "name": "中納言朝忠", "poem": "逢ふことの,絶えてしなくば,なかなかに,人をも身をも,恨みざらまし", "attribute": "t"},
{"number": 45, "name": "謙徳公", "poem": "哀とも,いふべき人は,思ほえで,身のいたづらに,なりぬべきかな", "attribute": "t"},
{"number": 46, "name": "曽禰好忠", "poem": "由良の門を,わたる舟人,かぢをたえ,ゆくへも知らぬ,恋の道かな", "attribute": "t"},
{"number": 47, "name": "恵慶法師", "poem": "八重葎,しげれる宿の,さびしきに,人こそ見えね,秋は来にけり", "attribute": "b"},
{"number": 48, "name": "源重之", "poem": "風をいたみ,岩うつ波の,おのれのみ,くだけて物を,思ふころかな", "attribute": "t"},
{"number": 49, "name": "大中臣能宣朝臣", "poem": "御垣守,衛士のたく火の,夜はもえて,昼は消えつつ,物をこそ思へ", "attribute": "t"},
{"number": 50, "name": "藤原義孝", "poem": "君がため,惜しからざりし,命さへ,ながくもがなと,思ひけるかな", "attribute": "t"},
{"number": 51, "name": "藤原実方朝臣", "poem": "かくとだに,えやはいぶきの,さしも草,さしも知らじな,もゆるおもひを", "attribute": "t"},
{"number": 52, "name": "藤原道信朝臣", "poem": "明けぬれば,暮るるものとは,知りながら,猶恨めしき,朝ぼらけかな", "attribute": "t"},
{"number": 53, "name": "右大将道綱母", "poem": "なげきつつ,独りぬる夜の,あくるまは,いかに久しき,ものとかはしる", "attribute": "h"},
{"number": 54, "name": "儀同三司母", "poem": "忘れじの,行末までは,かたければ,今日をかぎりの,命ともがな", "attribute": "h"},
{"number": 55, "name": "大納言公任", "poem": "滝の音は,絶えて久しく,なりぬれど,名こそ流れて,猶聞こえけれ", "attribute": "t"},
{"number": 56, "name": "和泉式部", "poem": "あらざらむ,此世の外の,思ひ出に,今ひとたびの,逢ふ事もがな", "attribute": "h"},
{"number": 57, "name": "紫式部", "poem": "巡りあひて,見しや夫とも,わかぬまに,雲がくれにし,夜半の月かな", "attribute": "h"},
{"number": 58, "name": "大弐三位", "poem": "有馬山,ゐなの笹原,風ふけば,いでそよ人を,忘れやはする", "attribute": "h"},
{"number": 59, "name": "赤染衛門", "poem": "安らはで,寝なましものを,小夜更けて,かたぶくまでの,月を見しかな", "attribute": "h"},
{"number": 60, "name": "小式部内侍", "poem": "大江山,いく野の道の,遠ければ,まだ文も見ず,天のはし立", "attribute": "h"},
{"number": 61, "name": "伊勢大輔", "poem": "いにしへの,奈良の都の,八重桜,けふ九重に,匂ひぬるかな", "attribute": "h"},
{"number": 62, "name": "清少納言", "poem": "夜をこめて,鳥の空音は,はかるとも,世に逢坂の,関はゆるさじ", "attribute": "h"},
{"number": 63, "name": "左京大夫道雅", "poem": "今はただ,思ひ絶えなむ,とばかりを,人づてならで,いふよしもがな", "attribute": "t"},
{"number": 64, "name": "権中納言定頼", "poem": "朝ぼらけ,宇治の川ぎり,たえだえに,あらはれ渡る,瀬々のあじろぎ", "attribute": "t"},
{"number": 65, "name": "相模", "poem": "恨みわび,ほさぬ袖だに,あるものを,恋に朽ちなむ,名こそをしけれ", "attribute": "h"},
{"number": 66, "name": "前大僧正行尊", "poem": "もろともに,あはれと思へ,山桜,花より外に,知る人もなし", "attribute": "b"},
{"number": 67, "name": "周防内侍", "poem": "春の夜の,夢ばかりなる,手枕に,かひなく立たむ,名こそをしけれ", "attribute": "h"},
{"number": 68, "name": "三条院", "poem": "心にも,あらでうき世に,長らへば,恋しかるべき,夜半の月かな", "attribute": "td"},
{"number": 69, "name": "能因法師", "poem": "嵐吹く,三室の山の,もみぢ葉は,龍田の川の,にしきなりけり", "attribute": "b"},
{"number": 70, "name": "良暹法師", "poem": "淋しさに,宿を立ち出でて,ながむれば,いづこも同じ,秋のゆふぐれ", "attribute": "b"},
{"number": 71, "name": "大納言経信", "poem": "夕されば,門田のいなば,おとづれて,あしのまろやに,秋風ぞふく", "attribute": "t"},
{"number": 72, "name": "祐子内親王家紀伊", "poem": "音に聞く,たかしの浜の,あだ浪は,かけじや袖の,ぬれもこそすれ", "attribute": "hd"},
{"number": 73, "name": "権中納言匡房", "poem": "高砂の,尾上の桜,咲きにけり,外山の霞,たたずもあらなむ", "attribute": "t"},
{"number": 74, "name": "源俊頼朝臣", "poem": "憂かりける,人をはつせの,山おろしよ,はげしかれとは,祈らぬものを", "attribute": "t"},
{"number": 75, "name": "藤原基俊", "poem": "契りおきし,させもが露を,命にて,あはれ今年の,秋もいぬめり", "attribute": "t"},
{"number": 76, "name": "法性寺入道前関白太政大臣", "poem": "わたの原,こぎ出でて見れば,久方の,雲ゐにまがふ,沖津白なみ", "attribute": "t"},
{"number": 77, "name": "崇徳院", "poem": "瀬をはやみ,岩にせかるる,滝川の,われても末に,あはむとぞ思ふ", "attribute": "td"},
{"number": 78, "name": "源兼昌", "poem": "淡路島,かよふ千鳥の,鳴く声に,いく夜ねざめぬ,須磨の関守", "attribute": "t"},
{"number": 79, "name": "左京大夫顕輔", "poem": "秋風に,棚引く雲の,絶間より,もれ出づる月の,影のさやけさ", "attribute": "t"},
{"number": 80, "name": "待賢門院堀川", "poem": "長からむ,心もしらず,黒髪の,みだれて今朝は,ものをこそ思へ", "attribute": "h"},
{"number": 81, "name": "後徳大寺左大臣", "poem": "ほととぎす,なきつる方を,ながむれば,ただ有明の,月ぞ残れる", "attribute": "t"},
{"number": 82, "name": "道因法師", "poem": "思ひわび,さても命は,ある物を,うきにたへぬは,涙なりけり", "attribute": "b"},
{"number": 83, "name": "皇太后宮大夫俊成", "poem": "世の中よ,道こそなけれ,思ひ入る,山の奥にも,鹿ぞなくなる", "attribute": "t"},
{"number": 84, "name": "藤原清輔朝臣", "poem": "長らへば,また此頃や,しのばれむ,うしと見し世ぞ,今は恋しき", "attribute": "t"},
{"number": 85, "name": "俊恵法師", "poem": "夜もすがら,物思ふころは,明けやらで,閨の隙さへ,つれなかりけり", "attribute": "b"},
{"number": 86, "name": "西行法師", "poem": "嘆けとて,月やはものを,思はする,かこち顔なる,わが涙かな", "attribute": "b"},
{"number": 87, "name": "寂蓮法師", "poem": "村雨の,露もまだひぬ,まきの葉に,霧たちのぼる,秋の夕ぐれ", "attribute": "b"},
{"number": 88, "name": "皇嘉門院別当", "poem": "難波江の,蘆のかり寝の,ひと夜ゆゑ,身をつくしてや,恋わたるべき", "attribute": "h"},
{"number": 89, "name": "式子内親王", "poem": "玉の緒よ,たえなばたえね,長らへば,忍ぶることの,よわりもぞする", "attribute": "hd"},
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
