const Student = require("../../models/Student");
const Parent = require("../../models/Parent");
const Education = require("../../models/Education");
const createPasswordEmailService = require("../../services/createPasswordEmailService");

module.exports = async (req, res) => {
    try {
        const { student, parent, education, schoolID } = req.body;

        if (!schoolID) {
            throw new Error("School not found!");
        }

        const existingStudent = await Student.findOne({ email: student.email });
        if (existingStudent) {
            throw new Error("Student already exists");
        }

        const existingParent = await Parent.findOne({ "contactInfo.email": parent.contactInfo.email });
        if (existingParent) {
            throw new Error("Parent already exists");
        }

        const newStudent = await Student.create(student);
        const newParent = await Parent.create(parent);
        const newEducation = await Education.create({ ...education, studentId: newStudent._id });

        newStudent.education = newEducation._id;
        newStudent.parent = newParent._id;
        newStudent.school = schoolID;
        newParent.children.push(newStudent._id);

        await newParent.save();
        await newStudent.save();

        await createPasswordEmailService(newStudent, newParent, false);
        await createPasswordEmailService(newParent, newStudent, true);

        res.status(200).json({ message: "Student and Parent registered successfully", newStudent, newParent, newEducation });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};