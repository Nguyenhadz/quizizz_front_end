import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {findQuizById} from "../../redux/service/QuizService";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import {styled} from "@mui/system";
import Paper from "@mui/material/Paper";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import Typography from "@mui/material/Typography";
import AccordionDetails from "@mui/material/AccordionDetails";
import {findResultByQuiz} from "../../redux/service/ResultService";
import {toast} from "react-toastify";
import {store} from "../../redux/store/Store";
import Modal from "@mui/material/Modal";
import {InfoTwoTone} from "@mui/icons-material";
import Button from "@mui/material/Button";
import MyQuestionDetail from "../question/MyQuestionDetail";
import EditQuiz from "./EditQuiz";

const DetailQuiz = ({quizId}) => {
    const dispatch = useDispatch();
    const [results, setResults] = useState(null);
    useEffect(() => {
        const fetchData = async () => {
            await dispatch(findQuizById(quizId));
            await dispatch(findResultByQuiz(quizId));
            setResults(store.getState().resultStore.results);
        };
        fetchData();
    }, [quizId])
    const quiz = useSelector((store) => {
        return store.quizzes.quiz
    });
    const Item = styled(Paper)(({theme}) => ({
        backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
        ...theme.typography.body2,
        padding: theme.spacing(1),
        textAlign: 'center',
        color: theme.palette.text.secondary,
    }));
    const second = quiz.time % 60;
    const minute = Math.floor(quiz.time / 60);

    const handleEdit = () => {

        if (results?.length !== 0) {
            console.log(results)
            toast.success("Không thể sửa bài thi đã có người thi", {})
        } else {
            handleOpen()
        }
    };
    const [open, setOpen] = useState(false);
    const handleOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    }
    const style = {
        position: 'absolute',
        top: '0',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 1200,
        height: 800,
        bgcolor: 'background.paper',
        border: '2px solid #000',
        boxShadow: 24,
        p: 0,
    };

    return (
        <div className={"ml-8"}>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box id="modal-container" sx={{
                    width: '1200px',
                    height: '800px',
                    position: 'absolute',
                    top: '0',
                    left: '20%',
                    backgroundColor: 'background.paper',
                    display: 'flex',
                    flexDirection: 'column'
                }}>
                    <Typography id="modal-modal-title" variant="h6" component="h2">
                        <EditQuiz quizId={quizId}/>
                    </Typography>
                </Box>
            </Modal>
            <div className="flex items-center justify-between mb-3">
                <div>
                    <b>Tên bài thi: &nbsp;
                        <span dangerouslySetInnerHTML={{__html: quiz.title}}></span>
                    </b>
                </div>
                <div className="flex items-center">
                    <div className="ml-auto">
                        <button type="submit"
                                className={"h-6 w-32 bg-gray-50 mt-2 border-2 rounded-full hover:hover:bg-blue-50"}>
                            Lịch sử
                        </button>
                    </div>
                    <div className="ml-4">
                        <button type="submit" onClick={handleEdit}
                                className={"h-6 w-32 bg-gray-50 mt-2 border-2 rounded-full hover:hover:bg-blue-50"}>
                            Sửa bài thi
                        </button>
                    </div>
                </div>
            </div>
            <div className={"mb-3"}>Mô tả: &nbsp;<span dangerouslySetInnerHTML={{__html: quiz.description}}></span>
            </div>
            <div className={"mb-3"}>Người tạo: &nbsp; {quiz.user?.name}</div>
            <div className={"mb-3"}>Số lượng câu hỏi: &nbsp; {quiz.questions?.length}</div>
            <div className={"flex mb-3"}>Thể loại: &nbsp; <span
                dangerouslySetInnerHTML={{__html: quiz.categoryQuiz?.name}}></span></div>
            <div className={"mb-3"}>Mức độ: &nbsp; {quiz.levelQuiz?.name}</div>
            <div className={"mb-3"}>Điểm đạt: &nbsp; {quiz.passScore}</div>
            <div className={"mb-3"}>Thời gian thi: &nbsp; {minute} &nbsp;phút, {second} &nbsp;giây</div>
            <div className={"mb-3"}>Câu hỏi:</div>
            {quiz.questions?.map((question, index) => (
                <Accordion key={index}>
                    <AccordionSummary
                        expandIcon={<ExpandMoreIcon/>}
                        aria-controls={`panel${index + 1}-content`}
                        id={`panel${index + 1}-header`}
                    >
                        <Typography>Câu hỏi {index + 1}: &nbsp;<span
                            dangerouslySetInnerHTML={{__html: question.content}}></span></Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                        <Typography>
                            <Box sx={{width: "100%"}}>
                                <Grid container rowSpacing={1} columnSpacing={{xs: 1, sm: 2, md: 3}}>
                                    {question.answers.map((answer, answerIndex) => (
                                        <Grid item xs={6} key={answerIndex}>
                                            <Item><span dangerouslySetInnerHTML={{__html: answer.content}}
                                                        style={{color: answer.status === 1 ? 'blue' : 'black'}}></span></Item>
                                        </Grid>
                                    ))}
                                </Grid>
                            </Box>
                        </Typography>
                    </AccordionDetails>
                </Accordion>
            ))}

        </div>
    );
};
export default DetailQuiz;
