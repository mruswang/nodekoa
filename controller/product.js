const ProductService = require('../service/product')

module.exports = {
  productList: async(ctx, next) => {
    await ctx.render("admin/product-list")
  },
  productAdd: async(ctx, next) => {
    await ctx.render("admin/product-add")
  },
  productCategory: async(ctx, next) => {
    await ctx.render("admin/product-category")
  },
  productCategoryAdd: async(ctx, next) => {
    await ctx.render("admin/product-category-add")
  }
}