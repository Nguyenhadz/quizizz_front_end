import {createSlice} from "@reduxjs/toolkit";
import {
    createAnswer,
    findAllAnswer,
    findAnswerByQuestionId
} from "../../service/AnswerService";

const initialState = {
    answers: [],
    currentAnswer: [],
    createdAnswer: {}
}

const answersSlice = createSlice({
    name: 'answerSlice',
    initialState,
    extraReducers: builder => {
        builder.addCase(findAllAnswer.fulfilled, (state, action)=>{
            state.answers = action.payload
        })
        builder.addCase(createAnswer.fulfilled, (state, action)=>{
            state.createdAnswer = action.payload
            console.log(state.createdAnswer)
        })
        builder.addCase(findAnswerByQuestionId.fulfilled, (state, action)=>{
            state.currentAnswer = action.payload
        })
    }
})

export default answersSlice.reducer