# プロジェクトオンボーディング — doubles_match_maker

## プロジェクト概要
- 種別: Create React App ベースの TypeScript/React SPA
- 用途: ダブルスの組み合わせ作成・試合管理支援（日本語 UI）
- デプロイ先: GitHub Pages（`gh-pages` で `build/` を公開）

## 使用技術
- 言語: TypeScript（`tsconfig.json`/厳密モード）
- フレームワーク: React 18（CRA: `react-scripts@5`）
- UI/スタイル: Tailwind CSS, MUI (`@mui/material`, Emotion)
- ビルド/テスト: CRA（`start`/`build`/`test`/`eject`）
- サイトマップ: `generate-sitemap.js`（`sitemap` パッケージ）

## 主要ディレクトリ
- `src/` アプリ本体
  - `components/`, `contexts/`, `hooks/`, `types/`, `utils/`, `styles/`
- `public/` 静的アセット（`index.html`, `manifest.json`, `robots.txt`, `sitemap.xml` など）
- `build/` ビルド成果物（出力先）

## 必要な環境
- Node.js: 16 以上を推奨（`@types/node@16` 参照）
- パッケージマネージャ: Yarn（`yarn.lock` あり）
- 環境変数: `.env` or `.env.sample`
  - `REACT_APP_GOOGLE_ANALYTICS_TRACKING_ID`

## セットアップ
1) 依存関係のインストール
- `yarn install`

2) 環境変数の設定
- `.env.sample` をコピーして `.env` を作成
- `REACT_APP_GOOGLE_ANALYTICS_TRACKING_ID` を設定

## コマンド
- 開発サーバ起動: `yarn start`
  - http://localhost:3000 で確認
- テスト実行: `yarn test`
- 本番ビルド: `yarn build`
- デプロイ: `yarn deploy`（`gh-pages -d build`）
- サイトマップ生成: `node generate-sitemap.js`（`public/sitemap.xml` を更新）

## 補足
- `public/index.html` に OGP/Twitter/構造化データなどのメタタグを定義
- `tailwind.config.js` と `postcss.config.js` により Tailwind を有効化
- ESLint 設定は CRA 付属（`eslintConfig` in `package.json`）
- GitHub Pages の公開 URL は `https://km0912.github.io/doubles_match_maker/` を想定（`public/index.html` の canonical/OGP 参照）

## よくある作業の手順
- 開発: `yarn start`
- 機能追加/修正 → テスト: `yarn test` → 本番ビルド: `yarn build`
- サイトマップ更新（必要に応じて）: `node generate-sitemap.js`
- 公開: `yarn deploy`

## トラブルシュート
- 依存衝突/ビルド失敗: `node -v`（16 以上推奨）、`yarn install` を再実行
- ルーティング/アセットパス: GitHub Pages 配下公開のためパスに注意（CRA の `homepage` 設定は必要に応じて調整）

