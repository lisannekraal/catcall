const Catcall = require('./models/catcall.model');
const Moderator = require('./models/moderator.model');
const bcrypt = require('bcrypt');
const merge = require('lodash.merge');
const { Error } = require('mongoose');

const catcallResolver = {
  Query: {
    async getCatcalls(_, __, context) {
      if (context.mod._id) {
        if (await Moderator.findOne({ _id: context.mod._id })) {
          const catcalls = await Catcall.find();
          return catcalls;
        }
      }
      let err = new Error;
      err.message = 'You must be logged in as a moderator to see this content';
      return err;
    },

    async getCatcall (_, { id }, context) {
      if (context.mod._id) {
        if (await Moderator.findOne({ _id: context.mod._id })) {
          const catcall = await Catcall.findOne({ _id: id});
          return catcall;
        }
      }
      let err = new Error;
      err.message = 'You must be logged in as a moderator to see this content';
      return err;
    },

    async getVerifiedCatcalls () {
      const result = await Catcall.find({'properties.verified': true});
      return result;
    }
  },

  Mutation: {
    async createCatcall(_, { catcall }) {
      const { type, geometry, properties} = catcall;
      const createdCatcall = await Catcall.create({ type, geometry, properties });
      return createdCatcall;
    },

    async updateCatcall(_, { id, catcall }, context) {
      if (context.mod._id) {

        if (await Moderator.findOne({ _id: context.mod._id })) {

          let entry = await Catcall.findOne({ _id: id });
          const {properties} = catcall;
          let newEntry = Object.assign(entry.properties,properties);
          entry.properties = newEntry;
          await entry.save();
          return entry
        }
      }
      let err = new Error;
      err.message = 'You must be logged in as a moderator to see this content';
      return err;
    },

    async emptyTrash(_, __, context) {

      if (context.mod._id) {
        if (await Moderator.findOne({ _id: context.mod._id })) {
          try {
            await Catcall.deleteMany({'properties.trash': true});
            return true;
          } catch (err) {
            return err;
          }
        }
      }
      let err = new Error;
      err.message = 'You must be logged in as a moderator to see this content';
      return err;
    }
  }
}

const moderatorResolver = {
  Query: {
    
    async getModerators(_, __, context) {
      if (context.mod._id && context.mod.canAdd) {
        if (await Moderator.findOne({ _id: context.mod._id })) {
          const moderators = await Moderator.find();
          return moderators;
        }
      }
      let err = new Error;
      err.message = 'You must be logged in as a moderator to see this content';
      return err;
    },

    async getModeratorById(_, { id }) {
      const mod = await Moderator.findOne({ _id: id });
      return mod;
    },

    async validateModerator(_, { email, password }) {
      const mod = await Moderator.findOne({ email: email });
      const validatedPass = await bcrypt.compare(password, mod.password);
      if (!validatedPass) throw new Error();
      return mod;
    }
  },

  Mutation: {
    async createModerator(_, { moderator }, context) {
      if (context.mod._id) {
        let mod = await Moderator.findOne({ _id: context.mod._id })
        if (mod && mod.canAdd === true) {
          const { email, password } = moderator;
          let hashPassword = await bcrypt.hash(password, 10);
          const mod = await Moderator.create({ email, password: hashPassword, canAdd: false });
          return mod;
        }
      }
      let err = new Error;
      err.message = 'You must be logged in as a moderator with the necessary authorization to perform this action';
      return err;
    },

    async updateModerator(_, { id, moderator }, context) {
      if (context.mod._id) {
        let mod = await Moderator.findOne({ _id: context.mod._id })
        if (mod && mod.canAdd === true) {
          const { email, password, canAdd } = moderator;
          const updatedModerator = await Moderator.findByIdAndUpdate(id, { email, password, canAdd });
          return updatedModerator;
        }
      }
      let err = new Error;
      err.message = 'You must be logged in as a moderator with the necessary authorization to perform this action';
      return err;
    },

    async removeModerator(_, { id }, context) {
      if (context.mod._id) {
        let mod = await Moderator.findOne({ _id: context.mod._id })
        if (mod && mod.canAdd === true) {
          const mod = await Moderator.deleteOne({ _id: id });
          return mod;
        }
      }
      let err = new Error;
      err.message = 'You must be logged in as a moderator with the necessary authorization to perform this action';
      return err;
    }
  }
}

module.exports = merge(catcallResolver, moderatorResolver)