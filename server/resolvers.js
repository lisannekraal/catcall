const { catcalls } = require('./mockdata');

const catcallResolver = {
  Query: {
    getCatcalls: () => catcalls,

    getCatcall (_, { id }) {
      return catcalls.find((catcall) => catcall.id === id)
    },

    //mod-view:
    //getcatcalls list with a condition with :parameter
    getFilteredCatcalls (_, { condition }) {
      return catcalls.find((catcall) => {catcall.properties[condition] === false})
    }
  },

  Mutation: {
    createCatcall(_, { catcall }) {
      catcalls.push(catcall);
      return catcall;
    },

    updateCatcall(_, { newCatcall }) {

    //validate catcall
    //edit quote/context/link
    //to trash
    //chalk catcall
    //unlist catcall
    //list catcall
    //give star
    }

    //mutations to group
    //destroy ones in trash
  }


}

const moderatorResolver = {
  //create new moderator
  //get moderator by id
  //update settings moderator
  //destroy mod
}

module.exports = catcallResolver