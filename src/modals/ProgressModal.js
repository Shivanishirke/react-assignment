import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { Field, Form, Formik } from 'formik';
import { privateRequest } from '../Api/ApiConfig/privateRequest';
import { toast } from 'react-toastify';




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

export default function ProgressModal({openProgress,setOpenProgress,taskID,setReload}) {
  const handleCloseProgress = () => setOpenProgress(false);
 
  const inProgress =async(values)=>{
      console.log('values', values)
    const payload ={
        "TaskId": taskID,
        ...values,  
       }
      await privateRequest.post(`/api/task/updatetaskstatus`,payload)
      setReload(pre=>!pre)
      toast.success("Task Partially Completed")
      handleCloseProgress()
  }
  return ( 
    <div>
      <Modal
        open={openProgress}
        onClose={handleCloseProgress}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Formik    
            initialValues={{
                TaskStatusValue: 10,
              }} 
              onSubmit={((values)=>inProgress(values))}
            >
            {({ values, errors, touched }) => (
            <Form>
            <div>
            <Field
              name="TaskStatusValue"
              type="text"
              autoComplete="off"
              disabled
            />
            {touched.TaskStatusValue && errors.TaskStatusValue ? (
              <small className="text-danger" style={{ color: "red" }}>
                {errors.TaskStatusValue}
              </small>
            ) : null}
          </div>
          <button type="submit">update</button>
            </Form>
            )}
          </Formik>
        </Box>
      </Modal>
    </div>
  );
}
