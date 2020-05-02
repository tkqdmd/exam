'use strict';

/**
 * Examuser.js controller
 *
 * @description: A set of functions called "actions" for managing `Examuser`.
 */

module.exports = {

  /**
   * Retrieve examuser records.
   *
   * @return {Object|Array}
   */

  find: async (ctx, next, {populate} = {}) => {
    if (ctx.query._q) {
      return strapi.services.examuser.search(ctx.query);
    } else {
      return strapi.services.examuser.fetchAll(ctx.query, populate);
    }
  },

  /**
   * Retrieve a examuser record.
   *
   * @return {Object}
   */

  findOne: async (ctx) => {
    return strapi.services.examuser.fetch(ctx.params);
  },

  /**
   * Count examuser records.
   *
   * @return {Number}
   */

  count: async (ctx, next, {populate} = {}) => {
    return strapi.services.examuser.count(ctx.query, populate);
  },

  /**
   * Create a/an examuser record.
   *
   * @return {Object}
   */

  create: async (ctx) => {
    return strapi.services.examuser.add(ctx.request.body);
  },

  /**
   * Update a/an examuser record.
   *
   * @return {Object}
   */

  update: async (ctx, next) => {
    return strapi.services.examuser.edit(ctx.params, ctx.request.body);
  },

  /**
   * Destroy a/an examuser record.
   *
   * @return {Object}
   */

  destroy: async (ctx, next) => {
    return strapi.services.examuser.remove(ctx.params);
  }
};
