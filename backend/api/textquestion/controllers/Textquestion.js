'use strict';

/**
 * Textquestion.js controller
 *
 * @description: A set of functions called "actions" for managing `Textquestion`.
 */

module.exports = {

  /**
   * Retrieve textquestion records.
   *
   * @return {Object|Array}
   */

  find: async (ctx, next, { populate } = {}) => {
    if (ctx.query._q) {
      return strapi.services.textquestion.search(ctx.query);
    } else {
      return strapi.services.textquestion.fetchAll(ctx.query, populate);
    }
  },

  /**
   * Retrieve a textquestion record.
   *
   * @return {Object}
   */

  findOne: async (ctx) => {
    return strapi.services.textquestion.fetch(ctx.params);
  },

  /**
   * Count textquestion records.
   *
   * @return {Number}
   */

  count: async (ctx, next, { populate } = {}) => {
    return strapi.services.textquestion.count(ctx.query, populate);
  },

  /**
   * Create a/an textquestion record.
   *
   * @return {Object}
   */

  create: async (ctx) => {
    return strapi.services.textquestion.add(ctx.request.body);
  },

  /**
   * Update a/an textquestion record.
   *
   * @return {Object}
   */

  update: async (ctx, next) => {
    return strapi.services.textquestion.edit(ctx.params, ctx.request.body) ;
  },

  /**
   * Destroy a/an textquestion record.
   *
   * @return {Object}
   */

  destroy: async (ctx, next) => {
    return strapi.services.textquestion.remove(ctx.params);
  }
};
