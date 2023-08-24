const languageSchema = require('../Model/languageSchema');
const userInterestSchema = require('../Model/userInterestSchema');
const { langAddByAdminValidation } = require('../utils/validation');

// Language add by Admin
exports.languageAddByAdmin = async (req, res) => {
  try {
    const { error, value } = langAddByAdminValidation.validate(req.body);
    if (error) {
      return res.status(400).json({
        status: 'Error',
        message: error.details[0].message,
      });
    }
    const data = await languageSchema.create(value);
    return res.status(200).json({
      status: 'Success',
      message: 'Language are add successfully...!',
      data,
    });
  } catch (error) {
    return res.status(500).json({
      status: 'Error',
      message: error.message,
    });
  }
};

// Language View for User
exports.languageLists = async (req, res) => {
  try {
    const languageLists = await languageSchema.find();
    return res.status(200).json({
      status: 'Success',
      data: languageLists,
    });
  } catch (error) {
    return res.status(500).json({
      status: 'Error',
      message: error.message,
    });
  }
};

// Language select by User
exports.languageSelectUser = async (req, res) => {
  try {
    const newObj = {
      userId: req.userId,
      langId: req.body.langId,
    };
    await userInterestSchema.create(newObj);
    return res.status(200).json({
      status: 'Success',
      message: 'Your language are selected',
    });
  } catch (error) {
    return res.status(500).json({
      status: 'Error',
      message: error.message,
    });
  }
};
