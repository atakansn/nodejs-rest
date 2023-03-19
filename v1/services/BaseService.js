class BaseService {
    baseModel = null

    constructor(model) {
        this.baseModel = model
    }

    list(where) {
        return this.baseModel?.find(where || {})
    }

    create(data) {
        return new this.baseModel(data).save()
    }

    findOne(where) {
        return this.baseModel.findOne(where)
    }

    update(id, data) {
        return this.baseModel?.findOneAndUpdate(id, data, {
            new: true
        })
    }

    updateWhere(where, data) {
        return this.baseModel?.findOneAndUpdate(where, data, {
            new: true
        })
    }

    delete(id) {
        return this.baseModel?.findByIdAndDelete(id)
    }

}

module.exports = BaseService