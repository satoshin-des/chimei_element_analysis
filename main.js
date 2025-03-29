const ELEMENT_DATA = {
    "あ": [
        "畔"
    ],
    "い": [
        "猪",
        "五",
        "井戸",
        "湧き水"
    ],
    "う": [
        "兎",
        "鵜",
        "ウノキ"
    ],
    "え": [
        "江",
        "榎"
    ],
    "お": [
        "峰",
        "御",
        "尾"
    ],
    "か": [
        "場所",
        "川",
        "鹿"
    ],
    "き": [
        "木",
        "際",
        "城"
    ],
    "く": [
        "場所"
    ],
    "け": [
        "場所"
    ],
    "こ": [
        "場所",
        "木"
    ],
    "が": [
        "の"
    ],
    "さ": [
        "小さい",
        "瀬",
        "沢"
    ],
    "し": [
        "岸",
        "風",
        "鳥"
    ],
    "す": [
        "洲",
        "鳥"
    ],
    "せ": [
        "瀬"
    ],
    "た": [
        "田"
    ],
    "ち": [
        "道"
    ],
    "つ": [
        "の",
        "湧き水"
    ],
    "と": [
        "場所"
    ],
    "な": [
        "の"
    ],
    "に": [
        "二",
        "沼"
    ],
    "ぬ": [
        "沼"
    ],
    "ね": [
        "の",
        "峰",
        "根",
        "麓"
    ],
    "の": [
        "の",
        "野"
    ],
    "は": [
        "場所",
        "端"
    ],
    "ひ": [
        "日",
        "一",
        "檜",
        "樋"
    ],
    "へ": [
        "辺"
    ],
    "ほ": [
        "女陰",
        "火"
    ],
    "ま": [
        "場所",
        "女陰"
    ],
    "み": [
        "水",
        "御",
        "神",
        "三"
    ],
    "む": [
        "六"
    ],
    "や": [
        "谷",
        "家"
    ],
    "よ": [
        "四"
    ],
    "わ": [
        "場所"
    ]
}

function isZero(vec) {
    for (let i = 0; i < vec.length; i++) {
        if (vec[i] !== 0) {
            return false;
        }
    }
    return true;
}

/**
 * strの地名要素を探索する関数
 * @param {String} str 地名
 * @returns 
 */
function searchPlaceNameElements(str) {
    outputString = `<b style="color: aliceblue;">`;

    c = Array(str.length).fill(0);
    flags = Array(str.length).fill(false);

    for (; ;) {
        // 出力する文字列の設定
        temp = "";
        for (let j = 0; j < str.length; j++) {
            if (str[j] in ELEMENT_DATA) {
                temp += ELEMENT_DATA[str[j]][c[j]];
            } else {
                temp += "？";
            }

            if (j !== str.length - 1) {
                temp += "-";
            }
        }
        outputString += `${temp}<br>`;

        c[0] += 1;
        if (c[0] >= ELEMENT_DATA[str[0]].length) {
            flags[0] = true;
            c[0] = 0;
        }

        for (let j = 1; j < str.length; j++) {
            if (flags[j - 1]) {
                c[j] += 1;
                if (c[j] >= ELEMENT_DATA[str[j]].length) {
                    flags[j] = true;
                    c[j] = 0;
                }
                flags[j - 1] = false;
            }
        }

        if (isZero(c)) {
            break;
        }
    }

    outputString += `</b>`;

    return outputString;
}

function clicked() {
    const input = document.getElementById("input");
    const output = document.getElementById("output");

    output.innerHTML = searchPlaceNameElements(input.value);
}
