import React, { useState } from 'react'
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { Field, Form, Formik } from 'formik';
import { privateRequest } from '../Api/ApiConfig/privateRequest';




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

export default function FilterModal({openFilterModal, closeFilter, setFilterValue, setFilter}) {

  const [date, setDate] = useState(new Date());
    

  var today = new Date();
  
 
  const inFilter  =async(values)=>{
    console.log('values', values)
     setFilter(values);
     closeFilter();
   }
  return ( 
    <div>
      <Modal
        open={openFilterModal}
        onClose={closeFilter}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Formik    
            initialValues={{
              
              FromDueDate: "",
              Priority: "",
              TaskStatus: "", 
              ToDueDate: "",
              }} 
              onSubmit={((values)=>inFilter(values))}
            >
            {({ values, errors, touched }) => (
            <Form>
            <div>
            <div>
            <label style={{ fontWeight: "bold" }}>
              Select Status
            </label>
          </div>

          <Field as="select" name="TaskStatus" className="custom-select">
          
            <option value= {-1}> Not Accepted </option>
            <option value= {0}> Accepted </option>
            <option value= {-2}> Partialy Complete </option>
            <option value= {100}> Completed </option>
          </Field>

          {errors.TaskStatus && touched.TaskStatus && (
            <div className="text-left">
              <span style={{ color: "red" }}>{errors.TaskStatus}</span>
            </div>
          )}
 

            <div>
            <label style={{ fontWeight: "bold" }}>
              Select Priority
            </label>
          </div>

          <Field as="select" name="Priority" className="custom-select">
          
            <option value="High">High Priority</option>
            <option value="Low">Low Priority</option>
          </Field>

          {errors.Priority && touched.Priority && (
            <div className="text-left">
              <span style={{ color: "red" }}>{errors.Priority}</span>
            </div>
          )}

          <div>
          <label style={{ fontWeight: "bold" }}>
           From due date<label style={{ color: "red" }}>*</label>
          </label>
        </div>
        <Field
          className="form-control"
          name="FromDueDate"
          id="date"
          type="date"
          min={today}
          
        />

        {errors.FromDueDate && touched.FromDueDate && (
          <div className="text-left">
            <span style={{ color: "red" }}>{errors.FromDueDate}</span>
          </div>
        )}
          </div>

          <div>
          <label style={{ fontWeight: "bold" }}>
            To due date<label style={{ color: "red" }}>*</label>
          </label>
        </div>
        <Field
          className="form-control"
          name="ToDueDate"
          id="date"
          type="date"
          min={today}
          
        />

        {errors.ToDueDate && touched.ToDueDate && (
          <div className="text-left">
            <span style={{ color: "red" }}>{errors.ToDueDate}</span>
          </div>
        )}

          <button onClick={closeFilter} >Clear</button>
          <button type="submit">Apply</button>
            </Form>
            )}
          </Formik>
        </Box>
      </Modal>
    </div>
  );
}