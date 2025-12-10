import mongoose from "mongoose";

const tehtavaSchema = new mongoose.Schema({
  otsikko: {
    type: String,
    required: true,
    trim: true,
  },
  kuvaus: {
    type: String,
    trim: true,
  },
  valmis: {
    type: Boolean,
    default: false,
  },
  luotuAika: {
    type: Date,
    default: Date.now,
  },
});

const Tehtava = mongoose.model("Tehtava", tehtavaSchema);

export default Tehtava;