import  React, { useState, useEffect } from 'react';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import Pagination from '../Routes/Pagination';
import TableRow from '@mui/material/TableRow';
import { useDispatch, useSelector } from "react-redux";
import { makeStyles } from '@mui/styles';
import { taskAction, getTaskAction } from '../../Redux/Actions/TaskActions';
import { ReactComponent as  Delete} from "../../assets/deleteLogo.svg";
import { ReactComponent as Like } from "../../assets/thumbLogo.svg";
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import { privateRequest } from '../../Api/ApiConfig/privateRequest';
import HourglassTopIcon from '@mui/icons-material/HourglassTop';
import ProgressModal from '../../modals/ProgressModal';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import DeleteTask from '../../modals/DeleteTask';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import moment from 'moment';
import { toast } from 'react-toastify';

const columns = [
  { id: 'title', label: 'Title', minWidth: 60 },
  { id: 'customertitle', label: 'Customer Name', minWidth: 20 },
  {
    id: 'assignedBy',
    label: 'Assigned By',
    minWidth: 60,
    align: 'right',
    format: (value) => value.toLocaleString('en-US'),
  },
  {
    id: 'assignedDate',
    label: 'Assigned Date',
    minWidth: 60,
    align: 'right',
    format: (value) => value.toLocaleString('en-US'),
  },
  {
    id: 'dueDate',
    label: 'Due Date',
    minWidth: 60,
    align: 'right',
    format: (value) => value.toFixed(2),
  },
  {
    id: 'priority',
    label: 'Priority',
    minWidth: 60,
    align: 'right',
    format: (value) => value.toFixed(2),
  },
  {
    id: 'status',
    label: 'Status',
    minWidth: 60,
    align: 'right',
    format: (value) => value.toFixed(2),
  },
  {
    id: 'action',
    label: 'Action',
    minWidth: 60,
    align: 'right',
    format: (value) => value.toFixed(2),
  },
];

function createData(title, customertitle, assignedBy, assignedDate, dueDate, priority, status, action) {
  
  return { title, customertitle, assignedBy, assignedDate, dueDate, priority, status, action };
}

 const rows = [
 ];

export default function MyTaskTable({reload,setReload,searchQuery, filterValue}) {
  
  const useStyles = makeStyles({
    cell: {
       minWidth: "170px", 
       textAlign: "right", 
    },
    cell2: {
      minWidth: "170px",  
          
   },
  });
  const classes = useStyles();
  
  const dispatch = useDispatch();
  const {loading, taskAssignedToMe } = useSelector((state) => state.taskAssignedToMe)
  const [page, setPage] = React.useState(0);
  const [perpage, setPerpage] = React.useState(5);
  const [pageNumber, setPageNumber] = React.useState(0);
  const [openProgress, setOpenProgress] = React.useState(false);
  const [openDelete, setOpenDelete]= React.useState(false);
  const [taskID, settaskID] = useState()
  const [sortBy, setSortBy] = useState("")
  const [sortOrder, setSortOrder] = useState("")
  const [from, setFrom] = useState(1)
  const [to, setTo] = useState(5)
  const [search, setSearch]= useState("");
  const [arrowId, setArrowId] = useState("");
  const pageVisited = pageNumber * perpage;
  const pageCount = Math.ceil(
    taskAssignedToMe && taskAssignedToMe.TotalCount / perpage
  );

 
  useEffect(() => {
    dispatch(
      getTaskAction(
        search,
        pageNumber === 0 ? 1 : pageVisited + 1,
        search.length === 0
          ? pageVisited + JSON.parse(perpage)
           : taskAssignedToMe && taskAssignedToMe.TotalCount
      )
    );
  }, [search, pageVisited, perpage]);
  
  
 
  const handleOpenDelete = (taskId) => {
    console.log("deklere")
    settaskID(taskId)
    setOpenDelete(true)
  };
  
 

  const handleOpenProgress = (taskId) => {
    settaskID(taskId)
    setOpenProgress(true)
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  // const handleChangeRowsPerPage = (event) => {
  //   setRowsPerPage(event.target.value);
  //   setPage(0);
  // };
   const acceptTask =async(taskId)=>{
     const payload ={
      "TaskId": taskId,
      "TaskStatusValue": 0    
     }
    await privateRequest.post(`/api/task/updatetaskstatus`,payload)
    setReload(pre=>!pre)
    toast.success("Task Accepted Successfully")
   }
   
   const completeTask =async(taskId)=>{
     const payload ={
      "TaskId": taskId,
      "TaskStatusValue": 100    
     }
    await privateRequest.post(`/api/task/updatetaskstatus`,payload)
    setReload(pre=>!pre)
    toast.success("Task Completed Successfully")
   }
   const deleteTask =async(taskId)=>{
    await privateRequest.get(`/api/Task/DeleteTask?taskId=${taskId}`)
    setReload(pre=>!pre)
   }

  const  handleSort =(id)=>{
      setArrowId(id)
      if(id === "assignedDate"){
        setSortBy("CreateDate")
        if(sortOrder===""|| sortOrder==="desc"){
          setSortOrder("asc")
        }else if( sortOrder==="asc"){
          setSortOrder("desc")
        }
      }
      else if(id == "dueDate"){
        setSortBy("dueDate")
        if(sortOrder===""|| sortOrder==="desc"){
          setSortOrder("asc")
        }else if( sortOrder==="asc"){
          setSortOrder("desc")
        }
      }
  }

 

  console.log('filterValue', filterValue);
  useEffect(() => {
    let payload = {
      From: from,
      FromDueDate:filterValue === undefined ? "" : filterValue.FromDueDate,
      IsArchive: false,
      Priority: filterValue === undefined ? "" : filterValue.Priority,
      SortByDueDate: "",
      TaskStatus: filterValue === undefined ? "" : filterValue.TaskStatus,
      Title: searchQuery,
      To: to,
      ToDueDate: filterValue === undefined ? "" : filterValue.ToDueDate,
      UserId: "",
      SortByDueDate: "",
      SortColumn: sortBy,
      SortOrder: sortOrder,
      TaskStatus: "",
      UserIds: []
    }
    dispatch(taskAction(payload))
  }, [reload,searchQuery, filterValue,sortBy,sortOrder, from, to])
    

  return (   
    <div className='section'>
         {openDelete && <DeleteTask openDelete={openDelete} setOpenDelete={setOpenDelete} taskID={taskID} setReload={setReload} />}
          {openProgress && <ProgressModal openProgress={openProgress} setOpenProgress={setOpenProgress} taskID={taskID} setReload={setReload} />}
        <table className='table'>
          <thead className='table__head'>
            <tr>
              {columns.map((column) => (
                <th
                  key={column.id}
                  align={column.align}
                  style={{ minWidth: column.minWidth, fontWeight: '600' }}
                >
                  {column.label}
                  {(column.id == "assignedDate" || column.id == "dueDate" )  && <span className={sortOrder=="asc"|| sortOrder==""? "bi bi-arrow-down" : 
                    arrowId==column.id? "bi bi-arrow-up" : "bi bi-arrow-down"} onClick={()=>handleSort(column.id)}></span>}
                  
                </th>
              ))}
            </tr>
          </thead>
          <tbody className='table__body'> 
            {
              !loading?
              taskAssignedToMe.TaskList
              //  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((row) => {
                return (
                  <tr key={row.id}>
                     <td  >{row.Title}</td>
                     <td >-</td>
                     <td >{row.AssignedByUserName}</td>
                     <td >{moment(row.CreateDate).format("DD MMM YYYY")}</td>
                     <td >{moment(row.TaskEndDate).format("DD MMM YYYY")}</td>
                     <td >{row.Priority}</td>
                     <td >{row.TaskStatus === -1 ? <span style={{ color: 'red'}}>Not Accepted</span> : row.TaskStatus === 0 ? <span style={{ color: 'orange'}}>Accepted</span> : row.TaskStatus === 10 ? <span style={{ color: 'blue'}}>Partial Complete (10%)</span> : row.TaskStatus === 100 ? <span style={{ color: 'green'}}>Completed</span> : ''}</td>
                     <td > 
                     <button title='Accept' style={{display:row.TaskStatus === -1?"":"none"}} className='actionbtn' onClick={()=>acceptTask(row.TaskId)}>
                      <ThumbUpIcon />
                     </button>        
                     <button title='Complete' style={{display:row.TaskStatus !== 100  && row.TaskStatus !== -1?"":"none"}} className='actionbtn' onClick={()=>completeTask(row.TaskId)}>
                      <CheckCircleIcon />
                     </button>        
                     <button title='Partial Complete'style={{display:row.TaskStatus !== 100 && row.TaskStatus !== -1 ?"":"none"}} className='actionbtn' onClick={()=>handleOpenProgress(row.TaskId)}>   
                     <HourglassTopIcon />
                     </button>
                     <button title='Delete' className='actionbtn'  onClick={()=> handleOpenDelete(row.TaskId)}>   
                       <DeleteForeverIcon/>
                     </button>
                     </td>
                  </tr>
                );
              }) 
             :<tr>Loading</tr>

            }
          </tbody>
        </table>
      <Pagination
        count={pageCount}
        setPerpage={setPerpage}
        perpage={perpage}
        setPageNumber={setPageNumber}
        setFrom={setFrom}
        setTo={setTo}
        from={from}
        to={to}
      /> 
    </div>
  );
}
