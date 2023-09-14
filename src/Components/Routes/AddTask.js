import React, { useState } from "react";
import moment from "moment";
import { styled, Box, grid } from "@mui/system";
import ModalUnstyled from "@mui/base/ModalUnstyled";
import * as Yup from "yup";
import { Field, Formik, Form } from "formik";
import { Tab, Tabs, Typography } from "@mui/material";
import AssignToOthers from "./AssignToOthers";

const StyledModal = styled(ModalUnstyled)`
  position: fixed;
  z-index: 1300;
  right: 0;
  bottom: 0;
  top: 0;
  left: 0;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Backdrop = styled("div")`
  z-index: -1;
  position: fixed;
  right: 0;
  bottom: 0;
  top: 0;
  left: 0;
  background-color: rgba(0, 0, 0, 0.5);
  -webkit-tap-highlight-color: transparent;
`;

const style = {
  width: 900,
  bgcolor: "white",
  border: "2px solid #000",
  p: 2,
  px: 4,
  pb: 3,
};

function TabPanel(props) {
  const { children, value, index, ...other } = props;

 

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

export default function AddTask({ show, onHide, setReload }) {
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  const [key, setKey] = useState('AssignToOthers');

  
  

  const [date, setDate] = useState(new Date());

  var today = new Date();
  var dd = String(today.getDate()).padStart(2, "0");
  var mm = String(today.getMonth() + 1).padStart(2, "0");
  var yyyy = today.getFullYear();
  today = yyyy + "-" + mm + "-" + dd;

  const validationSchema = Yup.object().shape({
    title: Yup.string().required("Title is required field"),
    description: Yup.string().required("Description is required field"),
    attachFile: Yup.string().required("AttachFile is required field"),
    customer: Yup.string().required("Customer is required field"),
    ccMember: Yup.string().required("CC Member is required field"),
    user: Yup.string().required("User is required field"),
    // Image: Yup.mixed().test('fileSize', "File is too large", value => {
    //   const sizeInBytes = 2000000;
    //   return value.size <= sizeInBytes;
    // })
  });

  let newDate = moment(date).format("LL");

  


  return (
    <div>
      <StyledModal
        aria-labelledby="unstyled-modal-title"
        aria-describedby="unstyled-modal-description"
        open={show}
      
        BackdropComponent={Backdrop}
      >
        <Box sx={style}>
          <div
            style={{
              padding: "1.5em 3em",
              borderRadius: "1.5em",
              border: "1px solid #63b8ec",
            }}
          >
          <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
          <Tab label="Assign to Others" {...a11yProps(0)} />
          <Tab label="Assign to Me" {...a11yProps(1)} />
          
        </Tabs>
      </Box>
      <TabPanel value={value} index={0}>
       <AssignToOthers onHide={onHide} setReload={setReload} />
      </TabPanel>
      <TabPanel value={value} index={1}>
      <AssignToOthers onHide={onHide} setReload={setReload} />
      </TabPanel>
     
          </div>
        </Box>
      </StyledModal>
    </div>
  );
}
