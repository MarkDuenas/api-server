'use strict';

class DataCollection {
  constructor(models) {
    this.model = models;
  }

  get(_id) {
    if(_id) {
     return this.model.findOne({ _id: _id })
    } else {
      return this.model.find({});
    }
  }

  create(obj) {
    let newEntry = new this.model(obj);
    return newEntry.save();
  }

  update(_id, obj) {
    return this.model.findByIdAndUpdate(_id, obj, { new: true })
  }

  delete(_id) {
    return this.model.findByIdAndDelete(_id);
  }
}

module.exports = DataCollection;