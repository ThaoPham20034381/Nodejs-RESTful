const mongoose = require('mongoose')

const { Schema } = mongoose


const ColorSchema = new mongoose.Schema({
  color: String,
  price: Number
})

const StorageSchema = new mongoose.Schema({
  size: String,
  color: [ColorSchema]
})

const OptionSchema = new mongoose.Schema({
  ram: String,
  storage: [StorageSchema]
})

const processor = new Schema({
  cpuTechnology: String,
  multiplier: String,
  numberOfStreams: String,
  cpuSpeed: String,
  maxSpeed: String,
  caching: String
})

const ramMemory_hardDrive = new Schema({
  ram: String,
  ramType: String,
  ramBusSpeed: String,
  MaximumRamSupport: String,
  HardDrive: String
})

const screen = new Schema({
  screen: String,
  resolution: String,
  scanFrequency: String,
  colorCoverage: String,
  screenTechnology: String
})

const graphicsAndSound = new Schema({
  GraphicCard: String,
  AudioTechnology: String
})

const connectionAndExpansionFeatures = new Schema({
  TheWebOfCommunication: String,
  WirelessConnectivity: String,
  Webcams: String,
  KeyboardLight: String
})

//Bỏ Material xuống otherInformation vì material phù hợp ở otherInformation hơn
const sizeVolume = new Schema({
  Size: String,
  volume: String
})

const otherInformation = new Schema({
  BatteryInformation: String,
  ChargerCapacity: String,
  OperatingSystem: String,
  LaunchTime: String,
  Material: String
})

//Bỏ price vì trong OptionSchema có price riêng rồi
const product = new Schema({
  nameLaptop: String,
  option: [OptionSchema],
  image: [String],
  slug: String,
  productDescription: String,
  Specifications: {
    processor,
    ramMemory_hardDrive,
    screen,
    graphicsAndSound,
    connectionAndExpansionFeatures,
    sizeVolume,
    otherInformation
  }
})

const productModel = mongoose.model("productModel", product);

module.exports = { productModel }
