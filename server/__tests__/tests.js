const resolvers = require('../resolvers');
const Catcall = require('../models/catcall.model');

jest.mock('../models/catcall.model');

describe ('Server Resolvers Tests:', function () {
  it('fetches catcalls', async () => {
    const spy = jest.spyOn(resolvers.Query, 'getCatcalls');
    const catcall = [{catcall: 'test'}];
    Catcall.find.mockResolvedValue(catcall);
    const result = await resolvers.Query.getCatcalls();
    expect(spy).toHaveBeenCalledTimes(1);
    expect(spy).toHaveBeenCalledWith();
    expect(Catcall.find).toHaveBeenCalledTimes(1);
    expect(Catcall.find).toHaveBeenCalledWith();
    expect(result).toEqual(catcall);
  });

  it('fetches catcall by id', async () => {
    const spy = jest.spyOn(resolvers.Query, 'getCatcall');
    const catcall = {catcall: 'test'};
    Catcall.findOne.mockResolvedValue(catcall);
    const result = await resolvers.Query.getCatcall(null, {id: 2});
    expect(spy).toHaveBeenCalledTimes(1);
    expect(spy).toHaveBeenCalledWith(null, {id: 2});
    expect(Catcall.findOne).toHaveBeenCalledTimes(1);
    expect(Catcall.findOne).toHaveBeenCalledWith({_id: 2});
    expect(result).toEqual(catcall);
  });

  it('fetches filtered catcalls', async () => {
    const spy = jest.spyOn(resolvers.Query, 'getFilteredCatcalls');
    const catcall = [{catcall: 'test'}];
    Catcall.find.mockResolvedValue(catcall);
    const result = await resolvers.Query.getFilteredCatcalls(null, {condition: 'test'});
    expect(spy).toHaveBeenCalledTimes(1);
    expect(spy).toHaveBeenCalledWith(null, {condition: 'test'});
    expect(Catcall.find).toHaveBeenCalledTimes(2);
    expect(Catcall.find).toHaveBeenCalledWith({'properties.test': true});
    expect(result).toEqual(catcall);
  });

  it('fetches unfiltered catcalls', async () => {
    const spy = jest.spyOn(resolvers.Query, 'getUnfilteredCatcalls');
    const catcall = [{catcall: 'test'}];
    Catcall.find.mockResolvedValue(catcall);
    const result = await resolvers.Query.getUnfilteredCatcalls(null, {condition: 'test'});
    expect(spy).toHaveBeenCalledTimes(1);
    expect(spy).toHaveBeenCalledWith(null, {condition: 'test'});
    expect(Catcall.find).toHaveBeenCalledTimes(3);
    expect(Catcall.find).toHaveBeenCalledWith({'properties.test': false});
    expect(result).toEqual(catcall);
  });

  it('creates a new catcall', async () => {
    const spy = jest.spyOn(resolvers.Mutation, 'createCatcall');
    const catcall = {type: 'test', geometry: 'test', properties: 'test'};
    Catcall.create.mockResolvedValue(catcall);
    const result = await resolvers.Mutation.createCatcall(null, {catcall: catcall});
    expect(spy).toHaveBeenCalledTimes(1);
    expect(spy).toHaveBeenCalledWith(null, {catcall: catcall});
    expect(Catcall.create).toHaveBeenCalledTimes(1);
    expect(Catcall.create).toHaveBeenCalledWith(catcall);
    expect(result).toEqual(catcall);
  });

  it('updates a catcall', async () => {
    const spy = jest.spyOn(resolvers.Mutation, 'updateCatcall');
    const catcall = {type: 'test', geometry: 'test', properties: 'test'};
    Catcall.findByIdAndUpdate.mockResolvedValue(catcall);
    const result = await resolvers.Mutation.updateCatcall(null, {id: 2, catcall: catcall});
    expect(spy).toHaveBeenCalledTimes(1);
    expect(spy).toHaveBeenCalledWith(null, {id: 2, catcall: catcall});
    expect(Catcall.findByIdAndUpdate).toHaveBeenCalledTimes(1);
    expect(Catcall.findByIdAndUpdate).toHaveBeenCalledWith(2, catcall);
    expect(result).toEqual(catcall);
  });

  it('removes all trashed catcalls', async () => {
    const spy = jest.spyOn(resolvers.Mutation, 'emptyTrash');
    Catcall.deleteMany.mockResolvedValue(true);
    const result = await resolvers.Mutation.emptyTrash();
    expect(spy).toHaveBeenCalledTimes(1);
    expect(spy).toHaveBeenCalledWith();
    expect(Catcall.deleteMany).toHaveBeenCalledTimes(1);
    expect(Catcall.deleteMany).toHaveBeenCalledWith({'properties.trash': true});
    expect(result).toEqual(true);
  });

});