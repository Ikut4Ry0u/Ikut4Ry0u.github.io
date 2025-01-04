document.addEventListener("DOMContentLoaded", function () {
    const portfolioSection = document.getElementById("portfolio-section");
    const categoryButtonsContainer = document.getElementById("category-buttons");
    const portfolioArticles = portfolioSection.querySelectorAll(".article");
    const uniqueCategories = new Set();
  
    // ポートフォリオのカテゴリーを抽出
    portfolioArticles.forEach(article => {
      const categories = article.dataset.categories?.split(",") || [];
      categories.forEach(category => uniqueCategories.add(category.trim()));
    });
  
    // 抽出したカテゴリーをボタンとして追加
    uniqueCategories.forEach(category => {
      if (category) {
        const button = document.createElement("button");
        button.textContent = category;
        button.classList.add("category-button");
        button.dataset.category = category;
        categoryButtonsContainer.appendChild(button);
      }
    });
  
    // 選択されたカテゴリーを追跡
    let selectedCategories = new Set();
  
    // カテゴリーボタンのクリックイベント
    categoryButtonsContainer.addEventListener("click", function (e) {
      if (!e.target.classList.contains("category-button")) return;
  
      const selectedCategory = e.target.dataset.category;
  
      // ボタンの選択/解除
      if (selectedCategories.has(selectedCategory)) {
        selectedCategories.delete(selectedCategory);
        e.target.classList.remove("active");
      } else {
        selectedCategories.add(selectedCategory);
        e.target.classList.add("active");
      }
  
      // 記事のフィルタリング（AND 条件）
      portfolioArticles.forEach(article => {
        const articleCategories = article.dataset.categories?.split(",").map(c => c.trim()) || [];
        const matchesAll = Array.from(selectedCategories).every(category => articleCategories.includes(category));
  
        if (
          selectedCategories.size === 0 || // 何も選択されていない場合はすべて表示
          matchesAll
        ) {
          article.classList.remove("hidden");
          requestAnimationFrame(() => {
            article.classList.remove("removed"); // 非表示解除時に詰める動作を即座に反映
          });
        } else {
          article.classList.add("hidden");
  
          // トランジション終了時に完全に非表示
          article.addEventListener(
            "transitionend",
            function handleTransitionEnd() {
              if (article.classList.contains("hidden")) {
                article.classList.add("removed");
              }
              article.removeEventListener("transitionend", handleTransitionEnd);
            },
            { once: true }
          );
        }
      });
    });
  });