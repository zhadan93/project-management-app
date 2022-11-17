import axiosApiInstance from './axiosApiInstance';
import endpoints from '../constants/endpoints';
import { AxiosResponse } from 'axios';
import { RequestCreateTask, RequestGetAllTasks, RequestGetTask, Task } from 'types/types';

export const taskService = {
  getAllTasks(request: RequestGetAllTasks): Promise<AxiosResponse<Task[]>> {
    return axiosApiInstance.get(
      `${endpoints.BOARDS}/${request.boardId}${endpoints.COLUMNS}/${request.columnId}${endpoints.TASKS}`
    );
  },
  createTask(request: RequestCreateTask) {
    return axiosApiInstance.post(
      `${endpoints.BOARDS}/${request.boardId}${endpoints.COLUMNS}/${request.columnId}${endpoints.TASKS}`,
      {
        ...request.body,
      }
    );
  },
  getTask(request: RequestGetTask) {
    return axiosApiInstance.get(
      `${endpoints.BOARDS}/${request.boardId}${endpoints.COLUMNS}/${request.columnId}${endpoints.TASKS}/${request.taskId}`
    );
  },
};
