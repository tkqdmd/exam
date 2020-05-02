'use strict';

/**
 * Result.js controller
 *
 * @description: A set of functions called "actions" for managing `Result`.
 */

module.exports = {

  /**
   * Retrieve result records.
   *
   * @return {Object|Array}
   */

  find: async (ctx, next, {populate} = {}) => {
    if (ctx.query._q) {
      return strapi.services.result.search(ctx.query);
    } else {
      return strapi.services.result.fetchAll(ctx.query, populate);
    }
  },

  /**
   * Retrieve a result record.
   *
   * @return {Object}
   */

  findOne: async (ctx) => {
    return strapi.services.result.fetch(ctx.params);
  },

  /**
   * Count result records.
   *
   * @return {Number}
   */

  count: async (ctx, next, {populate} = {}) => {
    return strapi.services.result.count(ctx.query, populate);
  },

  /**
   * Create a/an result record.
   *
   * @return {Object}
   */

  create: async (ctx) => {
    return strapi.services.result.add(ctx.request.body);
  },

  /**
   * Update a/an result record.
   *
   * @return {Object}
   */

  update: async (ctx, next) => {
    return strapi.services.result.edit(ctx.params, ctx.request.body);
  },

  /**
   * Destroy a/an result record.
   *
   * @return {Object}
   */

  destroy: async (ctx, next) => {
    return strapi.services.result.remove(ctx.params);
  }
};
