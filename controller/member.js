const MemberService = require('../service/member')

module.exports = {
  memberList: async(ctx, next) => {
    await ctx.render("admin/member-list")
  },
  memberAdd: async(ctx, next) => {
    await ctx.render("admin/member-add")
  }
}