import { httpAxios } from "../helper/httpHelper";

export function addTask(task){
    const result = httpAxios.post('/api/tasks', task).then(response => response.data);
    return result;
}

export function getUserTasks(userId){
    const result = httpAxios.get(`/api/users/${userId}/tasks`).then(response => response.data);
    return result;
}

export function deleteTask(taskId){
    const result = httpAxios.delete(`/api/tasks/${taskId}`).then(response => response.data);
    return result;
}