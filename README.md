# Doubles Match Maker — Netlify 運用ガイド

本リポジトリは Create React App ベースのフロントエンドです。デプロイ先は Netlify を前提とした運用に切り替えています。

重要な変更点:

- `gh-pages` 依存関係と `predeploy`/`deploy` スクリプトを削除しました（`package.json`）。
- デプロイは Netlify で実施します（Git 連携または Netlify CLI）。

## セットアップ

- 推奨 Node: 16 以上（LTS 推奨）
- パッケージインストール:
  - Yarn: `yarn`
  - npm: `npm ci` もしくは `npm install`

## ローカル開発

- 開発サーバー起動: `yarn start`（または `npm start`）
- ブラウザ: `http://localhost:3000`

## ビルド

- 本番ビルド: `yarn build`（または `npm run build`）
- 出力先: `build/`

## デプロイ（Netlify）

Netlify での基本設定:

- Build command: `yarn build`（または `npm run build`）
- Publish directory: `build`
- Base directory: ルート（未指定）

### Git 連携での自動デプロイ

- Netlify ダッシュボードで「New site from Git」から本リポジトリを連携
- 対象ブランチを選択（例: `main`）
- 上記の Build/Publish 設定で保存
- 以降、対象ブランチへ push すると自動でビルド・デプロイされます

### Netlify CLI での手動デプロイ

- インストール: `npm i -g netlify-cli`
- 初回設定: `netlify init`（既存サイトにリンクする場合は `netlify link`）
- 本番デプロイ: `netlify deploy --prod --dir=build`

## 環境変数

CRA の仕様により、フロントエンドで参照する環境変数は `REACT_APP_` プレフィックスが必要です。

- 利用中の変数例（`.env.sample` 参照）:
  - `REACT_APP_GOOGLE_ANALYTICS_TRACKING_ID`

ローカルでは `.env` に設定。Netlify では Site settings → Build & deploy → Environment → Environment variables に登録してください。

## GitHub Pages 記述の整理について

Netlify 運用に移行しましたが、以下のファイルに GitHub Pages 用の URL がハードコードされています。Netlify ドメイン（例: `https://<your-site>.netlify.app/`）や独自ドメインへ適宜置き換えてください。

- `generate-sitemap.js:5`（`baseUrl`）
- `src/App.tsx:47`（リンク先）
- `public/index.html:30`（OG:URL など）
- `public/index.html:76`（リンク先）
- `public/robots.txt:4`（Sitemap の URL）

必要に応じて、サイト URL を環境変数化（例: `REACT_APP_SITE_URL`）し、参照箇所を置き換える運用も検討してください。

## 補足

- 既存の `homepage` は `/` のままで問題ありません（Netlify ではルート配信を想定）。
- `gh-pages` での公開フローは廃止しています。以降は Netlify のビルド・デプロイに一本化してください。
