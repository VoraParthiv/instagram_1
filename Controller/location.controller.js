const locationSchema = require('../Model/locationSchema');
const { locationAddByAdminValidation } = require('../utils/validation');

// Location of user add by Admin
exports.userLocationPoint = async (req, res) => {
  try {
    const { error, value } = locationAddByAdminValidation.validate(req.body);
    if (error) {
      return res.status(400).json({
        status: 'Error',
        message: error.details[0].message,
      });
    }
    const newObj = {
      type: 'Point',
      coordinates: [],
    };
    newObj.coordinates[0] = value.longitude;
    newObj.coordinates[1] = value.latitude;
    const newData = {
      userId: value.userId,
      location: newObj,
    };
    const data = await locationSchema.create(newData);
    return res.status(200).json({
      status: 'Success',
      message: 'Location are add successfully...!',
      data,
    });
  } catch (error) {
    return res.status(500).json({
      status: 'Error',
      message: error.message,
    });
  }
};
