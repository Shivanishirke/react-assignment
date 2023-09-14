import React, { useEffect, useState } from "react";
import "./css/task.css";
import AddTask from "./Routes/AddTask";
import { Box, Tab, Tabs, Typography } from "@mui/material";
import MyTaskTable from "./Routes/MyTaskTable";
import {privateRequest} from '../Api/ApiConfig/privateRequest'
import axios from 'axios';
import FilterModal from "../modals/FilterModal";
// import { toast } from "react-toastify";


// export const notify = (msg) => toast("Task Added Successfully");


function TabPanel(props) {
  const { children, value, index, ...other } = props;


  // const data = async () =>{
  //   let config = {
  //     headers: {
  //       "Content-Type": "application/json",
  //       "Accept": "application/json, text/plain, */*",
  //       "Authorization": localStorage.getItem("token")
  //     }
  //   }
  
  
  // } 


  
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

const My_Task = () => {
  const [openModal, setOpenModal] = useState(false);
  const [value, setValue] = React.useState(0);
  const [reload, setReload] = React.useState(false);
  const [searchQuery, setSearchQuery] = useState('')
  const [openFilterModal, setOpenFilterModal] = useState(false);
  const [filterValue, setFilterValue] = useState();

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
 

  const addModalOpen = (data) => {
    setOpenModal(true);
   
  };
  const addModalClose = () => {
    setOpenModal(false);
  };

  const openFilter = (data) => {
    setOpenFilterModal(true);
   
  };
  const closeFilter = () => {
    setOpenFilterModal(false);
  };

 

  const handleSearch =(searchValue)=>{
    setSearchQuery(searchValue)
  }

  const setFilter = (values) => {
    setFilterValue(values)
  }

  return (
    <>
      <div style={{ marginTop: "60px" }}>
        {openModal && <AddTask show={openModal} onHide={addModalClose} setReload={setReload} />}
        {openFilter && <FilterModal setFilter={setFilter} openFilterModal={openFilterModal} closeFilter={closeFilter} setFilterValue={setFilterValue} />}
        <div className="searchHeader">
          <div className="title">
            <button className="button" onClick={openFilter} >filter</button>
          </div>
          <div className="searchinput">
            <div className="search1">
              <input onChange={(e)=>handleSearch(e.target.value)} value={searchQuery} className="search" type="search" placeholder="Search"/>
            </div>
            <div className="search2">
              <button className="button" onClick={addModalOpen}>
                Add Task
              </button>
            </div>
          </div>
        </div>
        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
          <Tab label="My Task" {...a11yProps(0)} />    
        </Tabs>
      </Box>
        <MyTaskTable reload={reload} setReload={setReload} searchQuery={searchQuery} filterValue={filterValue} />
      </div>
    </>
  );
};

export default My_Task;
