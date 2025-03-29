let jsonData;

fetch('data.json')
    .then(response => {
        return response.json();
    })
    .then(data => {
        jsonData = data;
    });

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
            if (str[j] in jsonData) {
                temp += jsonData[str[j]][c[j]];
            } else {
                temp += "？";
            }

            if (j !== str.length - 1) {
                temp += "-";
            }
        }
        outputString += `${temp}<br>`;

        c[0] += 1;
        if (c[0] >= jsonData[str[0]].length) {
            flags[0] = true;
            c[0] = 0;
        }

        for (let j = 1; j < str.length; j++) {
            if (flags[j - 1]) {
                c[j] += 1;
                if (c[j] >= jsonData[str[j]].length) {
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
