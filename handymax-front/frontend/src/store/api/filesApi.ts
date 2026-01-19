import { api } from "../api";

export interface UploadResponse {
    url: string;
}

export const filesApi = api.injectEndpoints({
    endpoints: (builder) => ({
        
        uploadFile: builder.mutation<UploadResponse, File>({
            query: (file) => {
                const formData = new FormData();

                formData.append('file', file)

                return {
                    url: '/files/upload',
                    method: 'POST',
                    body: formData,
                }
            }
        })
    })
});

export const { useUploadFileMutation } = filesApi;