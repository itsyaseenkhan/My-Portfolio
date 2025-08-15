import  mongoose from  "mongoose";

const skillSchema = new mongoose.Schema({
   title :String,
   proficiency : String,
   Svg:{
      public_id: {
      type: String,
      required: true,
    },
    url: {
      type: String,
      required: true,
    },
   },

})

export const skill = mongoose.model("skill", skillSchema);