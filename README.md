# 電車遅延通知Line bot

## 対象の路線の遅延情報を取得し、Lineにpush通知するサービス

### How to use

- 通知したい運営会社、路線名（`targetCompany`/`targetName`）を設定
- `index.js`と`node_modules`をzipに固めてAWS Lambdaにデプロイ
- Messaging APIのアクセストークン、通知したいユーザーIDを環境変数にセット
- CloudWatch Eventsなどでcronを仕込めば定期実行が可能です