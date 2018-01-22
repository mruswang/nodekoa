const ArticleService = require('../service/article')

module.exports = {
  articleList: async(ctx, next) => {
    await ctx.render("admin/article-list")
  },
  articleAdd: async(ctx, next) => {
    await ctx.render("admin/article-add")
  },
  articleCategory: async(ctx, next) => {
    await ctx.render("admin/article-category")
  },
  articleCategoryAdd: async(ctx, next) => {
    await ctx.render("admin/article-category-add")
  }
}