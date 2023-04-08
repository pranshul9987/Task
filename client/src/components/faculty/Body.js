import React, { useEffect, useState } from "react";
import HomeIcon from "@mui/icons-material/Home";
import Calendar from "react-calendar";
import EngineeringIcon from "@mui/icons-material/Engineering";
import BoyIcon from "@mui/icons-material/Boy";
import SupervisorAccountIcon from "@mui/icons-material/SupervisorAccount";
import MenuBookIcon from "@mui/icons-material/MenuBook";
import "react-calendar/dist/Calendar.css";
import { useSelector } from "react-redux";
import Notice from "../notices/Notice";
import ReplyIcon from "@mui/icons-material/Reply";
import ShowNotice from "../notices/ShowNotice";
import { getAllStudent, getAttendanceFaculty, getSubjectbyDept, getTestByDept } from "../../redux/api";
const Body = () => {
  const [value, onChange] = useState(new Date());
  const [open, setOpen] = useState(false);
  const [openNotice, setOpenNotice] = useState({});
  const [students, setStudents] = useState([]);
  const notices = useSelector((state) => state.admin.notices.result);
  const user = JSON.parse(localStorage.getItem("user"));
  const [classes,setClasses] = useState(0);
  const [department,setDepartment] = useState(0);
  const [test,setTest] = useState(0);

  console.log(user);

  useEffect(() => {
    const fun = async () => {
      let x = await getAllStudent();
      setStudents(x.data);

      let  y =await getAttendanceFaculty({facultyId:user.result._id});
      setClasses(y.data.result)

      let z = await getSubjectbyDept({department:user.result.department});
      setDepartment(z.data.result.length);

      let w = await getTestByDept({department:user.result.department});
      setTest(w.data.result.length);
    };
    fun();
  }, []);

  return (
    <div className="flex-[0.8] mt-3">
      <div className="space-y-5">
        <div className="flex text-gray-400 items-center space-x-2">
          <HomeIcon />
          <h1>Dashboard</h1>
        </div>
        <div className="flex flex-col mr-5 space-y-4 overflow-y-auto">
          <div className="bg-white h-[8rem] rounded-xl shadow-lg grid grid-cols-4 justify-between px-8 items-center space-x-4">
            <div className="flex items-center space-x-4 border-r-2">
              <EngineeringIcon
                className="rounded-full py-2 bg-orange-300"
                sx={{ fontSize: 40 }}
              />
              <div className="flex flex-col">
                <h1>Class</h1>
                <h2 className="text-2xl font-bold">{classes}</h2>
              </div>
            </div>
            <div className="flex items-center space-x-4 border-r-2">
              <BoyIcon
                className="rounded-full py-2 bg-orange-300"
                sx={{ fontSize: 40 }}
              />
              <div className="flex flex-col">
                <h1>Student</h1>
                <h2 className="text-2xl font-bold">
                  {
                    students?.filter(
                      (item) => item.department === user.result.department
                    )?.length
                  }
                </h2>
              </div>
            </div>
            <div className="flex items-center space-x-4 border-r-2">
              <SupervisorAccountIcon
                className="rounded-full py-2 bg-orange-300"
                sx={{ fontSize: 40 }}
              />
              <div className="flex flex-col">
                <h1>Subject</h1>
                <h2 className="text-2xl font-bold">{department}</h2>
              </div>
            </div>
            <div className="flex items-center space-x-4 ">
              <MenuBookIcon
                className="rounded-full py-2 bg-orange-300"
                sx={{ fontSize: 40 }}
              />
              <div className="flex flex-col">
                <h1>Test</h1>
                <h2 className="text-2xl font-bold">{test}</h2>
              </div>
            </div>
          </div>
          <div className="flex space-x-4">
            <div className="flex flex-col space-y-4 w-2/6">
              <div className="bg-white h-[17rem] rounded-xl shadow-lg">
                <Calendar onChange={onChange} value={value} />
              </div>
            </div>
            <div className="bg-white h-[17rem] w-full rounded-xl shadow-lg flex flex-col  pt-3">
              <div className="flex px-3">
                {open && (
                  <ReplyIcon
                    onClick={() => setOpen(false)}
                    className="cursor-pointer"
                  />
                )}
                <h1 className="font-bold text-xl w-full text-center">
                  Notices
                </h1>
              </div>
              <div className="mx-5 mt-5 space-y-3 overflow-y-auto h-[12rem]">
                {!open ? (
                  notices?.map((notice, idx) => (
                    <div
                      onClick={() => {
                        setOpen(true);
                        setOpenNotice(notice);
                      }}
                      className=""
                    >
                      <Notice idx={idx} notice={notice} notFor="student" />
                    </div>
                  ))
                ) : (
                  <ShowNotice notice={openNotice} />
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Body;
