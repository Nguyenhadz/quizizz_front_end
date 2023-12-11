import {useDispatch, useSelector} from "react-redux";
import {Link, useNavigate} from "react-router-dom";
import React, {useEffect} from "react";
import {getStudent, getTeacherPending} from "../../service/UserService";
import './ShowListStudent.css';
import {DataGrid} from "@mui/x-data-grid";
import Box from "@mui/material/Box";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faSearch} from "@fortawesome/free-solid-svg-icons";
export default function ShowListTeacherPending() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    useEffect(()=>{
        dispatch(getTeacherPending())
    },[])
    const teacherPending = useSelector(state => {
        return Array.from(state.users.users)
    })

    const columns = [
        {field: 'id', headerName: 'STT', width: 90},
        {
            field: 'name',
            headerName: 'Tên',
            width: 200,
            editable: false,
        },
        {
            field: 'email',
            headerName: 'Email',
            width: 200,
            editable: false,
        },
        {
            field: 'timeCreate',
            headerName: 'Ngày tạo tài khoản',
            width: 200,
            editable: false,
        },
        {
            field: 'lastTime',
            headerName: 'Lần truy cập cuối cùng',
            sortable: false,
            width: 200,
        },
        {
            field: 'details',
            headerName: '',
            width: 150,
            renderCell: (params) => (
                <Link to={`/home/detailTeacherPending/${params.row.hiddenColumn}`}>
                    <button>Chi tiết</button>
                </Link>
            ),
        },
    ];

    const rows = [];
    for (let i = 0; i < teacherPending.length; i++) {
        const timeCreate = new Date(teacherPending[i].timeCreate);
        const dayCreate = timeCreate.getDate();
        const monthCreate = timeCreate.getMonth() + 1;
        const yearCreate = timeCreate.getFullYear();
        const lastTimeVisit = new Date(teacherPending[i].lastTimeVisit);
        const dayLast = lastTimeVisit.getDate();
        const monthLast = lastTimeVisit.getMonth() + 1;
        const yearLast = lastTimeVisit.getFullYear();
        const hoursLast = lastTimeVisit.getHours();
        const minutesLast = lastTimeVisit.getMinutes()
        const millisecondsLast = lastTimeVisit.getMilliseconds()
        rows.push({
                id: i + 1,
                name: teacherPending[i].name,
                email: teacherPending[i].username,
                timeCreate: (dayCreate + '-' + ((monthCreate < 10) ? '0' + monthCreate : monthCreate) + '-' + yearCreate),
                lastTime: (dayLast + '-' + ((monthLast < 10) ? '0' + monthLast : monthLast) + '-' + yearLast + ' ' + ((hoursLast < 10) ? '0' + hoursLast : hoursLast) + ':' + ((minutesLast < 10) ? '0' + minutesLast : minutesLast) + ':' + millisecondsLast),
                hiddenColumn: teacherPending[i].id,
            }
        )
    }

    return(
        <div className="col-span-8 w-full items-center">
            <div className={"flex items-center justify-center mt-5 mb-5"}><h1 className={"text-5xl"}>Danh sách đăng ký giáo viên</h1></div>
            <Box sx={{height: '630px', width: '70%', textAlign: 'center', margin: 'auto'}}>
                <DataGrid
                    rows={rows}
                    columns={columns}
                    initialState={{
                        pagination: {
                            paginationModel: {
                                pageSize: 10,
                            },
                        },
                    }}
                    disableRowSelectionOnClick
                />
            </Box>
        </div>
    )
}