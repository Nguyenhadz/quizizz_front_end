import {useDispatch, useSelector} from "react-redux";
import {Link, useNavigate} from "react-router-dom";
import React, {useEffect, useState} from "react";
import {findStudentByMail, findStudentByName} from "../../service/UserService";
import '../user/ShowListStudent.css';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faSearch} from "@fortawesome/free-solid-svg-icons";
import Box from "@mui/material/Box";
import {DataGrid} from "@mui/x-data-grid";
import {toast} from "react-toastify";
import {
    deleteCateQuestion,
    findCateQuestionById,
    findCateQuestionByTeacher,
} from "../../service/CateQuestionService";

export default function ShowListCateQuestionByTeacher() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const parser = new DOMParser();
    useEffect(() => {
        dispatch(findCateQuestionByTeacher(userLogin.id))
    }, [])
    const categories = useSelector(state => {
        console.log(state.cateQuestions.cateQuestions)
        return Array.from(state.cateQuestions.cateQuestions)
    })
    const userLogin = JSON.parse(localStorage.getItem('currentUser'));

    const handleDelete = (id) => {
        dispatch(deleteCateQuestion(id)).then(()=> {
            dispatch(findCateQuestionByTeacher(userLogin.id))
            navigate('/home/LayoutManagerQuestion/showListCateQuestionByTeacher')
        })

    };

    const columns = [
        {field: 'id', headerName: 'STT', width: 90},
        {
            field: 'name',
            headerName: 'Tên',
            width: 200,
            editable: false,
        },
        {
            field: 'description',
            headerName: 'Mô tả',
            width: 200,
            editable: false,
        },
        {
            field: 'useCreate',
            headerName: 'Người tạo',
            width: 200,
            editable: false,
        },
        {
            field: 'update',
            headerName: '',
            width: 150,
            align: 'center',
            renderCell: (params) => (
                ((userLogin.roles[0].name === 'ADMIN') || (userLogin.roles[0].authority === 'ADMIN') || (userLogin.id === params.row.hiddenColumn2)) && (<div>
                    <button onClick={()=>{
                        dispatch(findCateQuestionById(params.row.hiddenColumn)).then((res)=> {
                            navigate(`/home/layoutManagerQuestion/updateCateQuestionByTeacher/${params.row.hiddenColumn}`)
                        })
                    }}>Sửa</button>
                </div>)
            ),
        },
        {
            field: 'delete',
            headerName: '',
            width: 150,
            align: 'center',
            renderCell: (params) => (
                ((userLogin.roles[0].name === 'ADMIN') || (userLogin.roles[0].authority === 'ADMIN') || (userLogin.id === params.row.hiddenColumn2)) && (
                    <button
                        onClick={() => {
                            toast.warning(
                                <>
                                    <div>
                                        <p>Bạn có chắc chắn muốn xóa?</p>
                                        <button className={"w-20 h-10 bg-amber-600 rounded text-white"} type="submit" style={{margin: '20px'}} onClick={() => {handleDelete(params.row.hiddenColumn); toast.dismiss();}}>Xác nhận</button>
                                        <button className={"w-20 h-10 bg-amber-600 rounded text-white"} type="submit" style={{margin: '20px'}} onClick={() => toast.dismiss()}>Hủy bỏ</button>
                                    </div>
                                </>,
                                {
                                    position: 'top-center',
                                    autoClose: false,
                                    hideProgressBar: false,
                                    closeOnClick: false,
                                    pauseOnHover: true,
                                    draggable: true,
                                    progress: undefined,
                                    closeButton: false,
                                }
                            );
                        }}
                    >
                        Xoá
                    </button>
                )


            ),
        },
    ];

    const rows = [];
    for (let i = 0; i < categories.length; i++) {
        rows.push({
                id: i + 1,
                name: (parser.parseFromString(categories[i].name, 'text/html')).body.firstChild.textContent,
                description: (parser.parseFromString(categories[i].description, 'text/html')).body.firstChild.textContent,
                useCreate: (parser.parseFromString(categories[i].user.name, 'text/html')).body.firstChild.textContent,
                hiddenColumn: categories[i].id,
                hiddenColumn2: categories[i].user.id,
            }
        )
    }

    return (
        <div className="col-span-8 w-full h-full items-center"
             style={{backgroundImage: `url('https://cf.quizizz.com/img/q_og_marketing.png')`}}>
            <div className={"flex items-center justify-center mt-5 mb-5"}>
                <div className={"text-5xl font-extrabold font-sans text-orange-500 mt-2 ml-96 flex justify-center"}>Danh sách danh mục câu hỏi
                </div>
                <Link to={"/home/createCateQuestion"}>
                    <button className={"w-44 h-10 rounded-lg ml-56 bg-orange-400 hover:bg-red-500 text-white"}>Thêm mới danh mục
                    </button>
                </Link>
            </div>

            <Box sx={{
                height: '630px',
                width: '65%',
                textAlign: 'center',
                margin: 'auto',
                backgroundColor: 'white',
                borderRadius: '30px',
                "& .MuiDataGrid-root": {
                    border: 'none',
                    color: 'black',
                    fontSize: '16px',
                    padding: '20px',
                },
                boxShadow: '30px 30px 30px 30px rgba(0, 0, 0, 0.2)'
            }}>
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
                    className={"text-7xl"}
                />
            </Box>
        </div>
    )
}