import {createAsyncThunk} from "@reduxjs/toolkit";
import customAxios from "./Api";

const user = JSON.parse(localStorage.getItem('currentUser'));

const TOKEN = user?.accessToken;
let axiosConfig = {
    headers: {
        Authorization: `Bearer ` + TOKEN
    }
};
export const createCateQuiz = createAsyncThunk(
    'cateQuiz/create',
    async (data) => {
        const res = await customAxios.post('categoryQuizzes', data, axiosConfig);
        return res.data
    }
)
export const showAllCategoryQuiz = createAsyncThunk(
    'cateQuiz/findAll',
    async () => {
        const res = await customAxios.get('categoryQuizzes', axiosConfig);
        return res.data;
    }
)
export const deleteCateQuiz = createAsyncThunk(
    'cateQuiz/delete',
    async (id) => {
        await customAxios.delete('categoryQuizzes/' + id, axiosConfig);
        const res = await customAxios.get('categoryQuizzes', axiosConfig);
        return res.data;
    }
)
export const findCateQuizById = createAsyncThunk(
    'cateQuiz/findCateQuizById',
    async (id) => {
        const res = await customAxios.get('categoryQuizzes/' + id, axiosConfig);
        return res.data;
    }
)
export const updateCateQuiz = createAsyncThunk(
    'cateQuiz/updateQuiz',
    async (value) => {
        const res = await customAxios.put('categoryQuizzes/' + value.id, value, axiosConfig);
        return res.data;
    }
)
export const findCateByName = createAsyncThunk(
    'cateQuiz/findCateByName',
    async (name) => {
        const res = await customAxios.get('categoryQuizzes/name/' + name, axiosConfig)
        return res.data
    }
)