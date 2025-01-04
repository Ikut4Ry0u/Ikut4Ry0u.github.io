document.addEventListener("DOMContentLoaded", function () {
    const categorySelect = document.getElementById("category-select");
    const portfolioSection = document.getElementById("portfolio-section");
    const portfolioArticles = portfolioSection.querySelectorAll(".article");
    const uniqueCategories = new Set();
  
    // ポートフォリオのカテゴリーを抽出
    portfolioArticles.forEach(article => {
      const categories = article.dataset.categories?.split(",") || [];
      categories.forEach(category => uniqueCategories.add(category.trim()));
    });
  
    // 抽出したカテゴリーを <select> に追加
    uniqueCategories.forEach(category => {
      if (category) {
        const option = document.createElement("option");
        option.value = category;
        option.textContent = category;
        categorySelect.appendChild(option);
      }
    });
  
    // フィルター機能を追加
    categorySelect.addEventListener("change", function () {
      const selectedCategory = categorySelect.value;
  
      portfolioArticles.forEach(article => {
        const categories = article.dataset.categories?.split(",") || [];
        if (selectedCategory === "all" || categories.includes(selectedCategory)) {
          // 表示アニメーション
          article.classList.remove("hidden", "removed");
          article.classList.add("visible");
        } else {
          // 非表示アニメーション開始
          article.classList.remove("visible");
          article.classList.add("hidden");
  
          // アニメーション終了後に完全に削除
          article.addEventListener(
            "transitionend",
            function handleTransitionEnd() {
              article.classList.add("removed");
              article.removeEventListener("transitionend", handleTransitionEnd);
            }
          );
        }
      });
    });
  });
  