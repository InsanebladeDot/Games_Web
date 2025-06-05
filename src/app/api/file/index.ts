import instance from '../index';

export const uploadFile = (file: File) => {
  const formData = new FormData();
  formData.append('file', file);
  return instance.post('/upload', formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
};