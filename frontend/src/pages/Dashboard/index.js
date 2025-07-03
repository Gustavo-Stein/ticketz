// index.js LIMPO - BANNER TICKETZ PRO REMOVIDO

import React, { useState, useEffect, useContext } from "react";

import Paper from "@material-ui/core/Paper";
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import Select from "@material-ui/core/Select";
import TextField from "@material-ui/core/TextField";
import Typography from "@material-ui/core/Typography";

import GroupAddIcon from "@material-ui/icons/GroupAdd";
import HourglassEmptyIcon from "@material-ui/icons/HourglassEmpty";
import CheckCircleIcon from "@material-ui/icons/CheckCircle";
import TimerIcon from '@material-ui/icons/Timer';

import { makeStyles } from "@material-ui/core/styles";
import { grey, blue } from "@material-ui/core/colors";
import { toast } from "react-toastify";

import TableAttendantsStatus from "../../components/Dashboard/TableAttendantsStatus";
import { isEmpty } from "lodash";
import moment from "moment";
import { i18n } from "../../translate/i18n";
import OnlyForSuperUser from "../../components/OnlyForSuperUser";
import useAuth from "../../hooks/useAuth.js";
import clsx from "clsx";
import { loadJSON } from "../../helpers/loadJSON";

import { SmallPie } from "./SmallPie";
import { TicketCountersChart } from "./TicketCountersChart";
import { getTimezoneOffset } from "../../helpers/getTimezoneOffset.js";

import TicketzRegistry from "../../components/TicketzRegistry";
import api from "../../services/api.js";
import { SocketContext } from "../../context/Socket/SocketContext.js";

const useStyles = makeStyles((theme) => ({
  container: {
    paddingTop: theme.spacing(4),
    paddingBottom: theme.spacing(4),
  },
  fixedHeightPaper: {
    padding: theme.spacing(2),
    display: "flex",
    flexDirection: "column",
    height: 240,
    overflowY: "auto",
    ...theme.scrollbarStyles,
  },
  fullWidth: {
    width: "100%",
  },
  selectContainer: {
    width: "100%",
    textAlign: "left",
  },
}));

const InfoCard = ({ title, value, icon }) => {
  const classes = useStyles();
  return (
    <Grid item xs={12} sm={6} md={3}>
      <Paper elevation={6}>
        <div>
          <Typography component="h3" variant="h6" paragraph>
            {title}
          </Typography>
          <Typography component="h1" variant="h4">
            {value}
          </Typography>
        </div>
        <div>{icon}</div>
      </Paper>
    </Grid>
  );
};

const InfoRingCard = ({ title, value, graph }) => {
  const classes = useStyles();
  return (
    <Grid item xs={12} sm={6} md={4}>
      <Paper elevation={4}>
        <div>
          <Typography component="h3" variant="h6" paragraph>
            {title}
          </Typography>
          <Typography component="h1" variant="h4">
            {value}
          </Typography>
        </div>
        <div>
          <div style={{ width: "100px", height: "100px" }}>{graph}</div>
        </div>
      </Paper>
    </Grid>
  );
};

const Dashboard = () => {
  const classes = useStyles();
  const [period, setPeriod] = useState(0);
  const [currentUser, setCurrentUser] = useState({});
  const [dateFrom, setDateFrom] = useState(moment("1", "D").format("YYYY-MM-DD"));
  const [dateTo, setDateTo] = useState(moment().format("YYYY-MM-DD"));
  const { getCurrentUserInfo } = useAuth();

  const [usersOnlineTotal, setUsersOnlineTotal] = useState(0);
  const [usersOfflineTotal, setUsersOfflineTotal] = useState(0);
  const [usersStatusChartData, setUsersStatusChartData] = useState([]);
  const [pendingTotal, setPendingTotal] = useState(0);
  const [pendingChartData, setPendingChartData] = useState([]);
  const [openedTotal, setOpenedTotal] = useState(0);
  const [openedChartData, setOpenedChartData] = useState([]);
  const [ticketsData, setTicketsData] = useState({});
  const [usersData, setUsersData] = useState([]);
  const [loadingUsers, setLoadingUsers] = useState(false);
  const socketManager = useContext(SocketContext);

  useEffect(() => {
    const socket = socketManager.GetSocket(localStorage.getItem("companyId"));
    socket.on("userOnlineChange", updateStatus);
    socket.on("counter", updateStatus);
    return () => socket.disconnect();
  }, [socketManager]);

  useEffect(() => {
    getCurrentUserInfo().then((user) => {
      if (user?.profile !== "admin") window.location.href = "/tickets";
      setCurrentUser(user);
    });
  }, []);

  useEffect(() => { updateStatus(); }, []);

  async function updateStatus() { /* mesma lógica */ }
  function renderFilters() { /* mesma lógica */ }
  function formatTime(minutes) { /* mesma lógica */ }

  if (currentUser?.profile !== "admin") return <div />;

  return (
  );
};

export default Dashboard;
