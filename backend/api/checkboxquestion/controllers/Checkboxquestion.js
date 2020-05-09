'use strict';

/**
 * Checkboxquestion.js controller
 *
 * @description: A set of functions called "actions" for managing `Checkboxquestion`.
 */

module.exports = {

  /**
   * Retrieve checkboxquestion records.
   *
   * @return {Object|Array}
   */

  find: async (ctx, next, { populate } = {}) => {
    if (ctx.query._q) {
      return strapi.services.checkboxquestion.search(ctx.query);
    } else {
      return strapi.services.checkboxquestion.fetchAll(ctx.query, populate);
    }
  },

  /**
   * Retrieve a checkboxquestion record.
   *
   * @return {Object}
   */

  findOne: async (ctx) => {
    return strapi.services.checkboxquestion.fetch(ctx.params);
  },

  /**
   * Count checkboxquestion records.
   *
   * @return {Number}
   */

  count: async (ctx, next, { populate } = {}) => {
    return strapi.services.checkboxquestion.count(ctx.query, populate);
  },

  /**
   * Create a/an checkboxquestion record.
   *
   * @return {Object}
   */

  create: async (ctx) => {
    return strapi.services.checkboxquestion.add(ctx.request.body);
  },

  /**
   * Update a/an checkboxquestion record.
   *
   * @return {Object}
   */

  update: async (ctx, next) => {
    return strapi.services.checkboxquestion.edit(ctx.params, ctx.request.body) ;
  },

  /**
   * Destroy a/an checkboxquestion record.
   *
   * @return {Object}
   */

  destroy: async (ctx, next) => {
    return strapi.services.checkboxquestion.remove(ctx.params);
  }
};
