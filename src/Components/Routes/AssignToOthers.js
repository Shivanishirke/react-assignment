import React, { useEffect, useState } from 'react'
import * as Yup from "yup";
import { Field, Formik, Form } from "formik";
import axios from 'axios';
import moment from "moment";
import { privateRequest } from "../../Api/ApiConfig/privateRequest";
import {useSelector, useDispatch } from "react-redux"; 
import { LeadAction } from '../../Redux/Actions/LeadActions';
import { toast } from 'react-toastify';

const AssignToOthers = ({onHide, setReload}) => {
    const [date, setDate] = useState(new Date());
    const {lead} = useSelector(state => state.lead)
    const dispatch = useDispatch();

    var today = new Date();
    // var dd = String(today.getDate()).padStart(2, "0");
    // var mm = String(today.getMonth() + 1).padStart(2, "0");
    // var yyyy = today.getFullYear();
    // today = yyyy + "-" + mm + "-" + dd;

    const validationSchema = Yup.object().shape({
        Title: Yup.string().required("Title is required field"),
        Description: Yup.string().required("Description is required field"),
        Priority: Yup.string(),
        attachFile: Yup.string(),
        
        TaskEndDate: Yup.string(),
        
      });

      let payload = {
         AssignedBy: '',
         Description: '',
         TaskEndDate: '',
         TaskEndDateDisplay: '',
         Title: '',
      };
      

      const onAddTask = async values => {
        
       
        let payload = {
          ...values,
          TaskEndDate: moment(values.TaskEndDate).format("DD MMM YYYY"),
          TaskEndDateDisplay: moment(values.TaskEndDate).subtract(1, 'days').format(),
          AssignedDate: "",
          AssignedToUserId: "",
          CompletedDate: "",
          Id: "",
          // Image: "",
          IntercomGroupIds: [],
          IsActive: true,
          Latitude: "",
          LeadId: "",
          Location: "",
          Longitude: "",
          TaskDisplayOwners: "1 User",

       };
      
       await privateRequest.post(`API/Task/AssignTask`, payload);
       setReload(pre  => !pre);
       toast.success("Task Added Successfully");
       onHide()
      };
      const getLeads = async()=>{
        const payload = {
          From: 1,
          Text: "",
          To: -1,
        }
          const leads =await privateRequest.post(`api/CRM/Leads`,payload)
        }
       
      useEffect(() => {
            
            const payload = {
              From: 1,
              Text: "",
              To: -1,
            }
            dispatch(LeadAction(payload))
          
      }, [])
      
  return (
    <>
    <Formik
    validationSchema={validationSchema}
    onSubmit={(values) => onAddTask(values)}
   
    initialValues={{
      Title: "",
      Description: "",
      // Image: "",
      LeadId:null,
      Priority:"",
      AssignedBy: 102,
      UserIds: [102],
      MultimediaData: "",
      MultimediaExtension: "",
      MultimediaFileName: "",
      MultimediaType: "",
      TaskEndDate: "",
      TaskEndDateDisplay: "",

    }}
  >
    {({ values, touched, errors }) => (
      <Form className="form">
     
        <div className="form-group">
          <div style={{ paddingTop: "15px" }}>
            <label style={{ fontWeight: "bold" }}>
              Title<label style={{ color: "red" }}>*</label>
            </label>
          </div>
          <Field
            className="form-control"
            placeholder="Enter Title"
            name="Title"
            type="text"
            autocomplete="off"
          />

          {errors.Title && touched.Title && (
            <div className="text-left">
              <span style={{ color: "red" }}>{errors.Title}</span>
            </div>
          )}
        </div>

        <div className="form-group">
          <div>
            <label style={{ fontWeight: "bold" }}>
              Description<label style={{ color: "red" }}>*</label>
            </label>
          </div>
          <Field
            className="form-control"
            placeholder="Enter Description"
            name="Description"
            as="textarea"
            autocomplete="off"
          />

          {errors.Description && touched.Description && (
            <div className="text-left">
              <span style={{ color: "red" }}>
                {errors.Description}
              </span>
            </div>
          )}
        </div>

        <div className="form-group">
          <div>
            <label style={{ fontWeight: "bold" }}>
              Attach File
            </label>
          </div>
          <div class="custom-file">
            <input
              type="file"
              className="form-control-file custom-file-input"
              name="Image"
              id="inputGroupFile01"
              accept=".png,.jpg,"
            />
            <label
              class="custom-file-label"
              for="inputGroupFile01"
            ></label>
          </div>

          {errors.Image && touched.Image && (
            <div className="text-left">
              <span style={{ color: "red" }}>{errors.Image}</span>
            </div>
          )}
        </div>

        <div className="form-row">
        <div className="form-group col-md-4">
          <div>
            <label style={{ fontWeight: "bold" }}>
              Customer Name
            </label>
          </div>
          <Field as="select" name="LeadId" className="custom-select">
           {
             lead?.Leads?.map(customer=>(<option value={customer.Id}>{customer.UserName}</option>))
           }
            
            
          </Field>

          {errors.LeadId && touched.LeadId && (
            <div className="text-left">
              <span style={{ color: "red" }}>{errors.LeadId}</span>
            </div>
          )}
        </div>

        <div className="form-group col-md-4">
          <div>
            <label style={{ fontWeight: "bold" }}>
              Select due date<label style={{ color: "red" }}>*</label>
            </label>
          </div>
          <Field
            className="form-control"
            name="TaskEndDate"
            id="date"
            type="date"
            min={today}
            
          />

          {errors.TaskEndDate && touched.TaskEndDate && (
            <div className="text-left">
              <span style={{ color: "red" }}>{errors.TaskEndDate}</span>
            </div>
          )}
        </div>

        <div className="form-group col-md-4">
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
        </div>
        </div>

        <div className="form-group">
          <div style={{ padding: "15px 0 10px" }}>
            <label style={{ fontWeight: "bold" }}>
              Add CC Members
            </label>
          </div>
          <Field
            className="form-control"
            placeholder="Add CC Members"
            name="ccMember"
            type="text"
            autocomplete="off"
          
            value={values.ccMember}
          />

          {errors.ccMember && touched.ccMember && (
            <div className="text-left">
              <span style={{ color: "red" }}>{errors.ccMember}</span>
            </div>
          )}
        </div>

        <div className="form-row form-btn-row">
          <div class="btn-group mr-2">
            <button onClick={()=>onHide()} className="btn btn-secondary">Cancel</button>
          </div>
          <div class="btn-group mr-2">
            <button type="submit" className="btn btn-primary"
            >Add</button>
          </div>
        </div>
      </Form>
    )}
  </Formik>
  </>
  )
}

export default AssignToOthers