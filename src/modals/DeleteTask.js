import React from 'react';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';

import { privateRequest } from '../Api/ApiConfig/privateRequest';
import { toast } from 'react-toastify';


const DeleteTask = ({openDelete,setOpenDelete,taskID,setReload}) => {

  
    const handleCloseDelete = () => setOpenDelete(false);
    const deleteTask =async()=>{
      await privateRequest.get(`/api/Task/DeleteTask?taskId=${taskID}`)
      setReload(pre=>!pre)
      toast.success("Deleted Successfully")
      handleCloseDelete()
     }
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
    
 
  return (
    <React.Fragment>
      <Modal centered 
         open={openDelete} 
         onClose={handleCloseDelete} 
         aria-labelledby="modal-modal-title"
         aria-describedby="modal-modal-description"
         >
         <Box sx={style}>
          <h3
            style={{
              textAlign: 'center',
              fontSize: 20,
              fontWeight: 'bold',
              marginTop: '1.5rem',
            }}
          >
             DELETE TASK
          </h3>
          <p style={{ textAlign: 'center', fontSize: 20 }}>
              Do you want to delete this Task?
          </p>
          <div className="Del-btn">
            <button
              onClick={() => deleteTask()}
              className="btn"
              style={{
                color: 'white',
                backgroundColor: '#65AC12',
                width: '6em',
                borderRadius: '7px',
              }}
            >
              Delete
            </button>
            <button
              onClick={() => handleCloseDelete()}
              className="btn"
              style={{
                color: 'white',
                backgroundColor: '#AFAFAF',
                width: '6em',
                borderRadius: '7px',
              }}
            >
              Cancel
            </button>
          </div>
          </Box>
      </Modal>
    </React.Fragment>
  );
};

export default DeleteTask;
