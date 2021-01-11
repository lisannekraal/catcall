const resolvers = require('../resolvers');
const Catcall = require('../models/catcall.model');
const Moderator = require('../models/moderator.model');

jest.mock('../models/catcall.model', () => ({Catcall: ()=>{}}));
jest.mock('../models/moderator.model', () => ({Moderator: ()=>{}}));

describe ('Server Resolvers Tests:', function () {
  
  let context = {mod: {_id: '123'}};

  beforeEach(()=>{
    Moderator.findOne = jest.fn().mockResolvedValue(true);
  });

  it('fetches catcalls if user is a moderator', async () => {
    const spy = jest.spyOn(resolvers.Query, 'getCatcalls');
    const catcall = [{catcall: 'test'}];
    Catcall.find = jest.fn().mockResolvedValue(catcall);
    const result = await resolvers.Query.getCatcalls(null, null, context);
    expect(spy).toHaveBeenCalledTimes(1);
    expect(spy).toHaveBeenCalledWith(null, null, context);
    expect(Catcall.find).toHaveBeenCalledTimes(1);
    expect(Catcall.find).toHaveBeenCalledWith();
    expect(result).toEqual(catcall);
  });

  it('fetches catcall by id if user is a moderator', async () => {
    const spy = jest.spyOn(resolvers.Query, 'getCatcall');
    const catcall = {catcall: 'test'};
    Catcall.findOne = jest.fn().mockResolvedValue(catcall);
    const result = await resolvers.Query.getCatcall(null, {id: 2}, context);
    expect(spy).toHaveBeenCalledTimes(1);
    expect(spy).toHaveBeenCalledWith(null, {id: 2}, context);
    expect(Catcall.findOne).toHaveBeenCalledTimes(1);
    expect(Catcall.findOne).toHaveBeenCalledWith({_id: 2});
    expect(result).toEqual(catcall);
  });

  it('fetches verified catcalls', async () => {
    const spy = jest.spyOn(resolvers.Query, 'getVerifiedCatcalls');
    const catcall = [{catcall: 'test'}];
    Catcall.find = jest.fn().mockResolvedValue(catcall);
    const result = await resolvers.Query.getVerifiedCatcalls();
    expect(spy).toHaveBeenCalledTimes(1);
    expect(spy).toHaveBeenCalledWith();
    expect(Catcall.find).toHaveBeenCalledTimes(1);
    expect(result).toEqual(catcall);
  });

  it('creates a new catcall', async () => {
    const spy = jest.spyOn(resolvers.Mutation, 'createCatcall');
    const catcall = {type: 'test', geometry: 'test', properties: 'test'};
    Catcall.create = jest.fn().mockResolvedValue(catcall);
    const result = await resolvers.Mutation.createCatcall(null, {catcall: catcall});
    expect(spy).toHaveBeenCalledTimes(1);
    expect(spy).toHaveBeenCalledWith(null, {catcall: catcall});
    expect(Catcall.create).toHaveBeenCalledTimes(1);
    expect(Catcall.create).toHaveBeenCalledWith(catcall);
    expect(result).toEqual(catcall);
  });

  it('updates a catcall', async () => {
    const spy = jest.spyOn(resolvers.Mutation, 'updateCatcall');
    const catcall = {type: 'test', geometry: 'test', properties: {p:'test'}, save: ()=>{}};
    Catcall.findOne = jest.fn().mockResolvedValue(catcall);
    const result = await resolvers.Mutation.updateCatcall(null, {id: 2, catcall: catcall}, context);
    expect(spy).toHaveBeenCalledTimes(1);
    expect(spy).toHaveBeenCalledWith(null, {id: 2, catcall: catcall}, context);
    expect(Catcall.findOne).toHaveBeenCalledTimes(1);
    expect(Catcall.findOne).toHaveBeenCalledWith({'_id': 2});
    expect(result).toEqual(catcall);
  });

  it('removes all trashed catcalls', async () => {
    const spy = jest.spyOn(resolvers.Mutation, 'emptyTrash');
    Catcall.deleteMany = jest.fn().mockResolvedValue(true);
    const result = await resolvers.Mutation.emptyTrash(null, null, context);
    expect(spy).toHaveBeenCalledTimes(1);
    expect(spy).toHaveBeenCalledWith(null, null, context);
    expect(Catcall.deleteMany).toHaveBeenCalledTimes(1);
    expect(Catcall.deleteMany).toHaveBeenCalledWith({'properties.trash': true});
    expect(result).toEqual(true);
  });

});