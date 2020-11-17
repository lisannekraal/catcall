// const { catcalls } = require('./mockdata');
const Catcall = require('./models/catcall.model')

const catcallResolver = {
  Query: {
    async getCatcalls() {
      console.log("in getcatcalls")
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
      await Catcall.deleteMany({'properties.trash': true});
    }
  }


}

const moderatorResolver = {
  //create new moderator
  //get moderator by id
  //update settings moderator
  //destroy mod
}

module.exports = catcallResolver