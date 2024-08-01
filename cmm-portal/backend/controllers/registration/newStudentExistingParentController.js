const Student = require("../../models/Student");
const Parent = require("../../models/Parent");
const Education = require("../../models/Education");
const createPasswordEmailService = require("../../services/createPasswordEmailService");

// router.post("/register/new-student-existing-parent", newStudentExistingParentController);

module.exports = async (req, res) => {
    try {
        const { student, parent, education, schoolID } = req.body;

        if (!schoolID) {
            throw new Error("School not found!");
        }

        const existingStudent = await Student.findOne({ "contactInfo.email": student.contactInfo.email });
        if (existingStudent) {
            throw new Error("Student already registered!");
        }

        const existingParent = await Parent.findOne({ "contactInfo.email": parent.contactInfo.email });
        
        if (!existingParent) {
            throw new Error("Parent not found!");
        }

        const newStudent = await Student.create(student);

        existingParent.children.push(newStudent._id);
        await existingParent.save();

        const newEducation = await Education.create({ ...education, studentId: newStudent._id });

        newStudent.parent = existingParent._id;
        newStudent.education = newEducation._id;
        newStudent.school = schoolID;
        await newStudent.save();

        await createPasswordEmailService(newStudent, existingParent, false);

        res.status(200).json({ message: "Student registered successfully", newStudent, existingParent, newEducation });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};