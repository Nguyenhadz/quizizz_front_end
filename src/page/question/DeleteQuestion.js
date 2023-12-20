import * as React from 'react';
import Backdrop from '@mui/material/Backdrop';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Fade from '@mui/material/Fade';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import DeleteIcon from "@mui/icons-material/Delete";
import IconButton from "@mui/material/IconButton";
import {useDispatch} from "react-redux";
import {deleteQuestions} from "../../redux/service/QuestionService";

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
};

export default function DeleteQuestion({question}) {
    const dispatch = useDispatch();
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    return (
        <div className={"flex"}>
            <Button className={'justify-center'} onClick={handleOpen}>
                <DeleteIcon/>
            </Button>
            <Modal
                aria-labelledby="transition-modal-title"
                aria-describedby="transition-modal-description"
                open={open}
                onClose={handleClose}
                closeAfterTransition
                slots={{backdrop: Backdrop}}
                slotProps={{
                    backdrop: {
                        timeout: 500,
                    },
                }}
            >
                <Fade in={open}>
                    <Box sx={style}>
                        <Typography id="transition-modal-title" variant="h6" component="h2">
                            Text in a modal
                        </Typography>
                        <Typography id="transition-modal-description" sx={{mt: 2}}>
                            Duis mollis, est non commodo luctus, nisi erat porttitor ligula.
                        </Typography>
                        <Button
                            className={"btn btn-outline-warning bg-amber-100 h-10"}
                            onClick={() => {
                                dispatch(deleteQuestions(question.id));
                            }}
                            aria-label="delete">12312
                        </Button>
                    </Box>
                </Fade>
            </Modal>
        </div>
    );
}