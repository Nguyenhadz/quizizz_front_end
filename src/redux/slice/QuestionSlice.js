import {createSlice} from "@reduxjs/toolkit";

import {
    createQuestion,
    deleteQuestions,
    editQuestions,
    findAll, findAllQuestionByQuiz,
    findAllQuestionByUser,
    findByContent,
    findById,
    findQuestionsByCategory
} from "../service/QuestionService";
import {toast} from "react-toastify";


const initialState = {
    questions: [],
    currentQuestion: {},
    createdQuestion: {},
}

const questionSlice = createSlice({
    name: 'questionSlide',
    initialState,
    extraReducers: builder => {
        builder.addCase(findAll.fulfilled, (state, action) => {
            state.questions = action.payload
        })
        builder.addCase(findById.fulfilled, (state, action) => {
            state.currentQuestion = action.payload
        })
        builder.addCase(createQuestion.fulfilled, (state, action) => {
            state.createdQuestion = action.payload
        })
        builder.addCase(findByContent.fulfilled, (state, action) => {
            state.questions = action.payload
        })
        builder.addCase(findQuestionsByCategory.fulfilled, (state, action) => {
            state.questions = action.payload
        })
        builder.addCase(editQuestions.fulfilled, (state, action) => {
            state.currentQuestion = action.payload
        })
        builder.addCase(deleteQuestions.fulfilled, (state, action) => {
            state.questions = action.payload
        })
        builder.addCase(deleteQuestions.rejected, (state, action) => {
        })
        builder.addCase(findAllQuestionByUser.fulfilled, (state, action) => {
            state.questions = action.payload
        })
        builder.addCase(findAllQuestionByQuiz.fulfilled, (state, action) => {
            state.questions = action.payload
        })
    }
})

export default questionSlice.reducer