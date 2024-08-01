const Student = require("../../models/Student");
const Parent = require("../../models/Parent");
const Education = require("../../models/Education");
const createPasswordEmailService = require("../../services/createPasswordEmailService");

// router.post("/register/new-parent-existing-student", newParentExistingStudentController);

module.exports = async (req, res) => {
  try {
    const { student, parent } = req.body;

    const existingStudents = await Student.find({ "contactInfo.email": student.contactInfo.email });

    if (existingStudents.length === 0) {
      throw new Error("Student not found");
    }

    const existingParent = await Parent.findOne({ "contactInfo.email": parent.contactInfo.email });

    if (existingParent) {
      throw new Error("Parent already registered");
    }

    const newParent = await Parent.create(parent);

    existingStudents.forEach(async (existingStudent) => {
      newParent.children.push(existingStudent._id);
      await newParent.save();

      existingStudent.parent = newParent._id;
      await existingStudent.save();
    });

    await createPasswordEmailService(newParent, student, true);

    res.status(200).json({ message: "Parent registered successfully", newParent, existingStudents });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
