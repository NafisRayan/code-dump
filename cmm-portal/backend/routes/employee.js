const router = require("express").Router();
const employeeController = require("../controllers/employeeController.js");

router.get("/employees", employeeController.getEmployees);
// router.get("/mathTutors", employeeController.getMathTutors);
// router.get("/englishTutors", employeeController.getEnglishTutors);
router.post("/createEmployee", employeeController.createEmployee);
router.get("/getEmployeesClients/:id", employeeController.getEmployeesWithClients);
// router.patch("/updateTutor/:id", employeeController.updateTutors);
// router.delete("/deleteTutor", employeeController.deleteTutors);

module.exports = router;
// {
//     firstName: "bushra",
//     lastName: "bushra",
//     email : "bushra@gmail.com",
//     password: "bushra1234!",
//     role: "english_tutor",
//     location: "https://app.sessions.us/room/bushra-room"
// }
// {
//     firstName: "umaira",
//     lastName: "umaira",
//     email : "umaira@gmail.com",
//     password: "umaira1234!",
//     role: "english_tutor",
//     location: "https://app.sessions.us/room/umaira-room"
// }
// {
//     firstName: "reem",
//     lastName: "reem",
//     email : "reem@gmail.com",
//     password: "reem1234!",
//     role: "english_tutor",
//     location: "https://app.sessions.us/room/college-mastermind-dab28/reems-room"
// }
// {
//     firstName: "samiha",
//     lastName: "samiha",
//     email : "samiha@gmail.com",
//     password: "samiha1234!",
//     role: "english_tutor",
//     location: "https://app.sessions.us/room/samiha-room"
// }
// {
//     firstName: "hilda",
//     lastName: "hilda",
//     email : "hilda@gmail.com",
//     password: "hilda1234!",
//     role: "family_support_manager",
//     location: "https://app.sessions.us/room/hilda-room"
// }




//         {
//             "firstName": "bushra",
//             "lastName": "abdul khaliq",
//         },
//         {
//             "firstName": "shahriar",
//             "lastName": "Ahmed",
//         },
//         {
//             "firstName": "Samiha",
//             "lastName": "Akter",
//         },
//         {
//             "firstName": "Reem",
//             "lastName": "Ahmed",
//         },
//         {
//             "firstName": "Umaira",
//             "lastName": "Abdul Kaleque",
//         }
//     ]
// }