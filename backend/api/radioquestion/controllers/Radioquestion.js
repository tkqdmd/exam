'use strict';

/**
 * Radioquestion.js controller
 *
 * @description: A set of functions called "actions" for managing `Radioquestion`.
 */

module.exports = {

  /**
   * Retrieve radioquestion records.
   *
   * @return {Object|Array}
   */

  find: async (ctx, next, { populate } = {}) => {
    if (ctx.query._q) {
      return strapi.services.radioquestion.search(ctx.query);
    } else {
      return strapi.services.radioquestion.fetchAll(ctx.query, populate);
    }
  },

  /**
   * Retrieve a radioquestion record.
   *
   * @return {Object}
   */

  findOne: async (ctx) => {
    return strapi.services.radioquestion.fetch(ctx.params);
  },

  /**
   * Count radioquestion records.
   *
   * @return {Number}
   */

  count: async (ctx, next, { populate } = {}) => {
    return strapi.services.radioquestion.count(ctx.query, populate);
  },

  /**
   * Create a/an radioquestion record.
   *
   * @return {Object}
   */

  create: async (ctx) => {
    return strapi.services.radioquestion.add(ctx.request.body);
  },

  /**
   * Update a/an radioquestion record.
   *
   * @return {Object}
   */

  update: async (ctx, next) => {
    return strapi.services.radioquestion.edit(ctx.params, ctx.request.body) ;
  },

  /**
   * Destroy a/an radioquestion record.
   *
   * @return {Object}
   */

  destroy: async (ctx, next) => {
    return strapi.services.radioquestion.remove(ctx.params);
  }
};
