const { SitemapStream, streamToPromise } = require("sitemap");
const fs = require("fs");

// サイトURLを設定
const baseUrl = "https://km0912.github.io/doubles_match_maker/";

// サイトマップに含めるURLをリストアップ
const links = [{ url: "", changefreq: "daily", priority: 1.0 }];

// サイトマップを生成
(async () => {
  try {
    const sitemap = new SitemapStream({ hostname: baseUrl });

    // サイトマップにリンクを追加
    links.forEach((link) => sitemap.write(link));
    sitemap.end();

    // ストリームをPromiseに変換してデータを取得
    const data = await streamToPromise(sitemap);

    // 出力先ディレクトリを確認
    const outputDir = "./public";
    if (!fs.existsSync(outputDir)) {
      fs.mkdirSync(outputDir);
    }

    // ファイルを書き込む
    fs.writeFileSync(`${outputDir}/sitemap.xml`, data.toString());
    console.log("Sitemap generated successfully.");
  } catch (error) {
    console.error("Error generating sitemap:", error);
  }
})();
