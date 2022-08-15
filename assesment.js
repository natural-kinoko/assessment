'use strict';
const userNameInput = document.getElementById("user-name");
const assessmentButton = document.getElementById("assessment");
const resultDivided = document.getElementById("result-area");
const tweetDivided = document.getElementById("tweet-area");

assessmentButton.onclick = function () {
    //オブジェクト名.valueで入力された文字列が取得できる。文字列のプロパティがvalue。//無名関数は assessmentButton.onclic = () => {console.log()}と記すこともできる(アロー関数と呼ぶ)
    const userName = userNameInput.value;
    //入力がない場合に処理を実行しない（return:　→戻り値なしにそこで処理を終了する） 
    if (userName.length === 0) {return; }
    console.log(userName);

    //TODO 診断結果表示エリアの作成
    resultDivided.innerText = ' ';
    const header = document.createElement('h3')
    header.innerText = '診断結果'
    resultDivided.appendChild(header);

    const paragraph = document.createElement('p')
    const result = assessment(userName);
    paragraph.innerText = result;
    resultDivided.appendChild(paragraph)

    //TODO ツイートエリアの作成
    tweetDivided.innerText = ' ';
    const anchor = document.createElement('a');
    const hrefValue = 'https://twitter.com/intent/tweet?button_hashtag=' + encodeURIComponent('あなたのいいところ') + '&ref_src=twsrc%5Etfw';
    //aboutURI:https→URIのスキーム, twitter.com→ホスト名, /intent/tweet→リソース名, ?以降→クエリ　基本クエリの中には半角英数字以外含めない（含まる場合はURIエンコードを使う）
    //URIエンコードとは：encodeURIComponent関数で文字列をURIエンコードされたものへと変換できる。（decodeURIComponentでその逆ができる）
    anchor.setAttribute('href', hrefValue);
    anchor.setAttribute('class', 'twitter-hashtag-button');
    anchor.setAttribute('data-text', result);
    anchor.innerText = 'Tweet #あなたのいいところ';

    tweetDivided.appendChild(anchor);

    const script = document.createElement('script');
    script.setAttribute('src', 'https://platform.twitter.com/widgets.js')
    tweetDivided.appendChild(script);
}

userNameInput.onkeydown = event =>{
    if (event.key === 'Enter'){
        assessmentButton.onclick();
    }
}



const answers = [
    '{userName}のいいところは声です。{userName}の特徴的な声は皆を惹きつけ、心に残ります。',
    '{userName}のいいところはまなざしです。{userName}に見つめられた人は、気になって仕方がないでしょう。',
    '{userName}のいいところは情熱です。{userName}の情熱に周りの人は感化されます。',
    '{userName}のいいところは厳しさです。{userName}の厳しさがものごとをいつも成功に導きます。',
    '{userName}のいいところは知識です。博識な{userName}を多くの人が頼りにしています。',
    '{userName}のいいところはユニークさです。{userName}だけのその特徴が皆を楽しくさせます。',
    '{userName}のいいところは用心深さです。{userName}の洞察に、多くの人が助けられます。',
    '{userName}のいいところは見た目です。内側から溢れ出る{userName}の良さに皆が気を惹かれます。',
    '{userName}のいいところは決断力です。{userName}がする決断にいつも助けられる人がいます。',
    '{userName}のいいところは思いやりです。{userName}に気をかけてもらった多くの人が感謝しています。',
    '{userName}のいいところは感受性です。{userName}が感じたことに皆が共感し、わかりあうことができます。',
    '{userName}のいいところは節度です。強引すぎない{userName}の考えに皆が感謝しています。',
    '{userName}のいいところは好奇心です。新しいことに向かっていく{userName}の心構えが多くの人に魅力的に映ります。',
    '{userName}のいいところは気配りです。{userName}の配慮が多くの人を救っています。',
    '{userName}のいいところはその全てです。ありのままの{userName}自身がいいところなのです。',
    '{userName}のいいところは自制心です。やばいと思ったときにしっかりと衝動を抑えられる{userName}が皆から評価されています。'
];

/** 以下、JSDocという形式のコメント
 * 名前の文字列を渡すと診断結果を返す関数（関数の処理内容）
 * @param{string} userName ユーザの名前
 * @return{string}診断結果
 */
function assessment(userName) {
    //全文字のコード番号を取得してそれを足し合わせる
    let sumOfCharCode = 0
    for (let i = 0; i < userName.length; i++) {
        sumOfCharCode = sumOfCharCode + userName.charCodeAt(i);

    }
    //文字コード番号の合計を回答の数で割って添字の数値を求める
    const index = sumOfCharCode % answers.length;
    let result = answers[index];
    result = result.replaceAll('{userName}', userName);
    return result;
}

//テストコード
console.assert(
    assessment('太郎') ===
    '太郎のいいところは決断力です。太郎がする決断にいつも助けられる人がいます。',
    '診断結果の文言の特定部分を名前に置き換える処理が正しくありません'
);
