import {createAsyncThunk} from "@reduxjs/toolkit";
import customAxios from "./Api";

const user = JSON.parse(localStorage.getItem('currentUser'));

const TOKEN = user?.accessToken;
let axiosConfig = {
    headers: {
        Authorization: `Bearer ` + TOKEN
    }
};
export const findAll = createAsyncThunk(
    'questions/findAll',
    async () => {
        const res = await customAxios.get('questions', axiosConfig);
        return res.data
    }
)
export const findById = createAsyncThunk(
    'questions/findById',
    async ({id}) => {
        const res = await customAxios.get('questions/' + id, axiosConfig);
        return res.data
    }
)
export const createQuestion = createAsyncThunk(
    'questions/createQuestion',
    async (question) => {
        const res = await customAxios.post('questions', question, axiosConfig);
        return res.data
    }
)
export const findByContent = createAsyncThunk(
    'questions/findByContent',
    async (content) => {
        const res = await customAxios.get('questions/content/' + content, axiosConfig);
        return res.data
    }
)
export const findQuestionsByCategory = createAsyncThunk(
    'questions/findQuestionsByCategory',
    async ({id}) => {
        const res = await customAxios.get('questions/category/' + id, axiosConfig);
        return res.data
    }
)
export const editQuestions = createAsyncThunk(
    'questions/editQuestions',
    async (data) => {
        const res = await customAxios.put('questions/' + data.question.id, data, axiosConfig);
        return res.data
    }
)
export const deleteQuestions = createAsyncThunk(
    'questions/deleteQuestions',
    async (id) => {
        await customAxios.delete('questions/' + id, axiosConfig);
        const res = await customAxios.get('questions', axiosConfig);
        return res.data
    }
)
export const findAllQuestionByUser = createAsyncThunk(
    'questions/findAllQuestionByUser',
    async (id) => {
        const res = await customAxios.get('questions/user/' + id, axiosConfig);
        return res.data
    }
)
export const findAllQuestionByQuiz = createAsyncThunk(
    'questions/findAllQuestionByQuiz',
    async (id) => {
        const res = await customAxios.get('questions/quiz/' + id, axiosConfig);
        return res.data
    }
)