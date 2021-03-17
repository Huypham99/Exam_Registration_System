const DataLoader = require('dataloader')
const Hall = require('../models/hall')

const batchHall = async (ids) => {

    const halls = await Hall.find({ _id: { $in: ids } })

    return halls

}

const HallLoader = () => new DataLoader(batchHall);

module.exports = HallLoader;