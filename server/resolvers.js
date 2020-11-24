// const { catcalls } = require('./mockdata');
const Catcall = require('./models/catcall.model');
const Moderator = require('./models/moderator.model');
const bcrypt = require('bcrypt');
const merge = require('lodash.merge');

const catcallResolver = {
  Query: {
    async getCatcalls() {
      const catcalls = await Catcall.find();
      return catcalls;
    },

    async getCatcall (_, { id }) {
      const catcall = await Catcall.findOne({ _id: id});
      return catcall;
    },

    async getFilteredCatcalls (_, { condition }) {
      const conditionString = `properties.${condition}`
      const result = await Catcall.find({[conditionString]: true});
      return result;
    },

    async getUnfilteredCatcalls (_, { condition }) {
      const conditionString = `properties.${condition}`
      const result = await Catcall.find({[conditionString]: false});
      return result;
    }
  },

  Mutation: {
    async createCatcall(_, { catcall }) {
      const { type, geometry, properties} = catcall;
      const createdCatcall = await Catcall.create({ type, geometry, properties });
      return createdCatcall;
    },

    async updateCatcall(_, { id, catcall }) {
      const { type, geometry, properties} = catcall;
      const updatedCatcall = await Catcall.findByIdAndUpdate(id, { type, geometry, properties });
      return updatedCatcall;
    },

    async emptyTrash() {
      try {
        await Catcall.deleteMany({'properties.trash': true});
        return true;
      } catch (err) {
        return err;
      }
    }
  }


}

const moderatorResolver = {
  Query: {
    async getModeratorById(_, { id }) {
      const mod = await Moderator.findOne({ _id: id });
      return mod;
    },

    async validateModerator(_, { email, password }) {
      const mod = await Moderator.findOne({ email: email });
      const validatedPass = await bcrypt.compare(password, mod.password);
      if (!validatedPass) throw new Error();
    }
  },

  Mutation: {
    async createModerator(_, { moderator }) {
      const { email, password, canAdd } = moderator;
      let hashPassword = await bcrypt.hash(password, 10);
      const mod = await Moderator.create({ email, hashPassword, canAdd });
      return mod;
    },

    async updateModerator(_, { id, moderator }) {
      const { email, password, canAdd } = moderator;
      const updatedModerator = await Moderator.findByIdAndUpdate(id, { email, password, canAdd });
      return updatedModerator;
    },

    async removeModerator(_, { id }) {
      const mod = await Moderator.deleteOne({ _id: id });
      return mod;
    }
  }
}

module.exports = merge(catcallResolver, moderatorResolver)