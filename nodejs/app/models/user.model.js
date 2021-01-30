const dbConfig = require("../config/db.config.js");
module.exports = mongoose => {
  var schema = mongoose.Schema(
    {
      Username: String,
      FullName: String,
	  Birthdate: Date,
	  Email: String,
      Password: String,
      profileImage: String
    
      // expire_at: {type: Date, default: Date.now, expires: dbConfig.time} // to Delete data after certain time
    },
    { timestamps: true }
  );

  schema.method("toJSON", function() {
    const { __v, _id, ...object } = this.toObject();
    object.id = _id;
    delete object.Password; // added to hide password from being seen in the console
    return object;
  });

  const User = mongoose.model("user", schema);
  return User;
};
