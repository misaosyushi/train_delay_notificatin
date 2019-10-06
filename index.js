exports.handler = (event) => {
    const line = require('@line/bot-sdk');
    const client = new line.Client({
        channelAccessToken: process.env.ACCESSTOKEN
    });
    const request = require('request');

    var options = {
        url: 'https://tetsudo.rti-giken.jp/free/delay.json',
        method: 'GET',
        json: true
    };

    request(options, function (error, response, body) {
        if (error) {
            console.log('Error: ' + error.message);
            return;
        }

        const targetCompany = 'JR東日本'; // 検索したい運営会社を定義
        const targetNames = ['埼京線', '湘南新宿ライン', '京浜東北線', '高崎線', '宇都宮線']; // 検索したい路線名を定義
        let notifyNames = [];

        for(var i = 0; i < body.length; i++) {
            var company = body[i].company; //会社
            var name = body[i].name; //路線


            targetNames.forEach((targetName) => {
                if (company == targetCompany && name == targetName) {
                    notifyNames.push(name);
                }
            })
        }

        if(notifyNames.length === 0) {
            var text = '遅延情報はありませんでした！\n良い一日を〜♪';
        } else {
            var text = notifyNames.join(',') + 'が遅延しています。詳細をご確認ください。\nhttps://transit.yahoo.co.jp/traininfo/area/4/';
        }

        const message = {
            type: 'text',
            text: text
        };

        client.pushMessage(process.env.USERID, message)
            .then((res) => {
                console.log(res);
            })
            .catch((err) => {
                console.log(err);
            });
    });

}