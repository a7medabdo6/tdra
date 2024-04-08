import React, { useEffect, useState } from "react";
import {
  Box,
  Card,
  Container,
  Grid,
  Pagination,
  Typography,
  debounce,
} from "@mui/material";
// import { CSVLink } from "react-csv";

import StaticsCard from "../components/common/Cards/StaticsCard";
import { COLORS } from "../constants/insex";
import { AreaChartSimple } from "../components/Charts/AreaChart";
import { BarChart } from "../components/Charts/BarChart";
import ReactSimplyCarouselExample from "../components/Slider";
import {
  useFetchAPICommunicationgetapicommunicationsreceive,
  useFetchAPICommunicationgetapicommunicationssend,
  useFetchCommunicationgetcommunicationsperstatusmonth,
  useFetchTransactionsData,
  useGetCommunicationsCount,
} from "../Api/Hooks/Dashboard";
import SkeletonCom from "../components/Skeleton";
import DateInput from "../components/common/Buttons/DateInput";
import moment from "moment";
import FilterMonth from "../components/Filters";
import BasicButton from "../components/common/Buttons/Button";
import TransactionsTable from "../components/common/Table/TransactionsTable";
import { CSVLink } from "react-csv";
const Headers = [
  { label: "Id ", key: "id" },
  { label: "Entity Name ", key: "name" },
  { label: "phone ", key: "phone" },
  { label: "Email ", key: "email" },
  { label: "Services URL ", key: "serviceUrl" },
  { label: "Is Enabled ", key: "isEnabled" },
  { label: "Is Deactivated ", key: "isDeactivated" },
];

function Dashboard() {
  const [text, setText] = useState("");
  const [destination, setDestination] = useState(false);
  const [source, setSource] = useState(false);

  const [filters, setFilters] = useState({
    fromDate: moment("10/1/2023").format("YYYY-MM-DDTHH:mm:ss.SSS[Z]"),
    toDate: moment(new Date()).format("YYYY-MM-DDTHH:mm:ss.SSS[Z]"),
  });
  const [filtersForTransctions, setFiltersForTransctions] = useState({
    fromDate: moment("10/1/2023").format("YYYY-MM-DDTHH:mm:ss.SSS[Z]"),
    toDate: moment(new Date()).format("YYYY-MM-DDTHH:mm:ss.SSS[Z]"),
  });
  const [filtersForCommunications, setfiltersForCommunications] = useState({
    fromDate: moment("10/1/2023").format("YYYY-MM-DDTHH:mm:ss.SSS[Z]"),
    toDate: moment(new Date()).format("YYYY-MM-DDTHH:mm:ss.SSS[Z]"),
  });
  const [filtersForBarChart, setFiltersForBarChart] = useState({
    fromDate: moment("10/1/2023").format("YYYY-MM-DDTHH:mm:ss.SSS[Z]"),
    toDate: moment(new Date()).format("YYYY-MM-DDTHH:mm:ss.SSS[Z]"),
  });
  const [filtersForReceivedChart, setFiltersForReceivedChart] = useState({
    fromDate: moment("10/1/2023").format("YYYY-MM-DDTHH:mm:ss.SSS[Z]"),
    toDate: moment(new Date()).format("YYYY-MM-DDTHH:mm:ss.SSS[Z]"),
  });
  const [filtersForSendChart, setFiltersForSendChart] = useState({
    fromDate: moment("10/1/2023").format("YYYY-MM-DDTHH:mm:ss.SSS[Z]"),
    toDate: moment(new Date()).format("YYYY-MM-DDTHH:mm:ss.SSS[Z]"),
  });
  const { data, isLoading } = useGetCommunicationsCount(filters);
  const { data: communicationgetcommunicationsperstatusmonth } =
    useFetchCommunicationgetcommunicationsperstatusmonth({
      ...filtersForCommunications,
      name: text,
    });
  const { data: aPICommunicationgetapicommunicationssend } =
    useFetchAPICommunicationgetapicommunicationssend({
      ...filtersForSendChart,
    });
  const { mutate: GettransactionsData, data: transactionsData } =
    useFetchTransactionsData();
  const { mutate: GettransactionsDataCSV, data: transactionsExcel } =
    useFetchTransactionsData();
  const [page, setPage] = React.useState(1);
  const handleChange = (event: React.ChangeEvent<unknown>, value: number) => {
    setPage(value);
  };
  useEffect(() => {
    GettransactionsData({
      ...filtersForTransctions,

      source,
      destination,
      pageSize: 10,
      pageNumber: page,
    });
    GettransactionsDataCSV({
      ...filtersForTransctions,
      source,
      destination,
      showAll: true,
    });
  }, [page, source, destination, filtersForTransctions]);
  // const { data: transactionsExcel } = useFetchTransactionsData({
  //   ...filtersForTransctions,
  //   source,
  //   destination,
  // });

  // useEffect(() => {
  //   if (transactionsExcel) {
  //     console.log(transactionsExcel, "transactionsExcel");
  //   }
  // }, [transactionsExcel]);

  const { data: aPICommunicationgetapicommunicationsrecieve } =
    useFetchAPICommunicationgetapicommunicationsreceive({
      ...filtersForReceivedChart,
    });
  const [firstChart, setFirstChart] = useState<any>({});
  const [secondChart, setSecondChart] = useState<any>({});
  const [thirdChart, setThirdChart] = useState<any>({});
  const labels = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  useEffect(() => {
    const months =
      communicationgetcommunicationsperstatusmonth?.communicationPerStatuMonthDTO?.map(
        (item: any) => item.month
      );

    const counts = communicationgetcommunicationsperstatusmonth?.counts;
    const datasucceed = labels.map((month) => {
      const monthData =
        communicationgetcommunicationsperstatusmonth?.communicationPerStatuMonthDTO?.find(
          (item: any) => item.month === month
        );
      return monthData ? monthData.succeedCount : 0;
    });
    const datafailed = labels.map((month) => {
      const monthData =
        communicationgetcommunicationsperstatusmonth?.communicationPerStatuMonthDTO?.find(
          (item: any) => item.month === month
        );
      return monthData ? monthData.failedCount : 0;
    });

    setFirstChart({
      months,
      succeedCounts: datasucceed,
      failedCounts: datafailed,
      counts,
    });
  }, [communicationgetcommunicationsperstatusmonth]);

  useEffect(() => {
    const months =
      aPICommunicationgetapicommunicationssend?.apiCommunicationStatusDayDTOs?.map(
        (item: any) => item.month
      );

    const datasucceed = labels.map((month) => {
      const monthData =
        aPICommunicationgetapicommunicationssend?.apiCommunicationStatusDayDTOs?.find(
          (item: any) => item.month === month
        );
      return monthData ? monthData.succeedCount : 0;
    });
    const datafailed = labels.map((month) => {
      const monthData =
        aPICommunicationgetapicommunicationssend?.apiCommunicationStatusDayDTOs?.find(
          (item: any) => item.month === month
        );
      return monthData ? monthData.failedCount : 0;
    });
    const counts = aPICommunicationgetapicommunicationssend?.counts;
    setSecondChart({
      months,
      succeedCounts: datasucceed,
      failedCounts: datafailed,
      counts,
    });
  }, [aPICommunicationgetapicommunicationssend]);

  useEffect(() => {
    const months =
      aPICommunicationgetapicommunicationsrecieve?.apiCommunicationStatusDayDTOs?.map(
        (item: any) => item.month
      );

    const datasucceed = labels.map((month) => {
      const monthData =
        aPICommunicationgetapicommunicationsrecieve?.apiCommunicationStatusDayDTOs?.find(
          (item: any) => item.month === month
        );
      return monthData ? monthData.succeedCount : null;
    });
    const datafailed = labels.map((month) => {
      const monthData =
        aPICommunicationgetapicommunicationsrecieve?.apiCommunicationStatusDayDTOs?.find(
          (item: any) => item.month === month
        );
      return monthData ? monthData.failedCount : null;
    });
    const counts = aPICommunicationgetapicommunicationsrecieve?.counts;
    setThirdChart({
      months,
      succeedCounts: datasucceed,
      failedCounts: datafailed,
      counts,
    });
  }, [aPICommunicationgetapicommunicationsrecieve]);

  const onChangeSearch = (value: string) => {
    setText(value);
  };
  const debouncedOnChange = debounce(onChangeSearch, 500);

  return (
    <Container>
      <Grid container spacing={3}>
        <Grid item xs={12} sm={12} md={12}>
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              marginTop: "10px",
            }}
          >
            <Typography component="h5" sx={{ color: "#666666" }} variant="h6">
              Dashboard
            </Typography>
            <Box
              sx={{
                display: "flex",
                justifyContent: "flex-start",
                alignItems: "center",
              }}
            >
              <DateInput
                initValue={filters.fromDate}
                text="From: "
                onChange={setFilters}
                name={"fromDate"}
                bgColor={COLORS.secondary}
                textColor={COLORS.white}
                style={{ padding: "5px 7px" }}
              />

              <DateInput
                text="To: "
                onChange={setFilters}
                name={"toDate"}
                bgColor={COLORS.secondary}
                textColor={COLORS.white}
                style={{ padding: "5px 7px" }}
              />
            </Box>
          </Box>
        </Grid>
        {isLoading ? (
          <SkeletonCom />
        ) : (
          <>
            <Grid
              sx={{ paddingTop: "10px !important" }}
              item
              xs={12}
              sm={6}
              md={4}
            >
              <StaticsCard
                text="Commnuication count"
                count={data?.communicationCount}
                bgcolor={COLORS.white}
                valueColor={COLORS.primary}
              />
            </Grid>
            <Grid
              sx={{ paddingTop: "10px !important" }}
              item
              xs={12}
              sm={6}
              md={4}
            >
              <StaticsCard
                text="Succeed"
                count={data?.communicationSucceedCount}
                bgcolor={COLORS.white}
                valueColor={COLORS.primary}
              />
            </Grid>
            <Grid
              sx={{ paddingTop: "10px !important" }}
              item
              xs={12}
              sm={6}
              md={4}
            >
              <StaticsCard
                text="Failed"
                count={data?.communicationFailedCount}
                bgcolor={COLORS.white}
                valueColor={COLORS.primary}
              />
            </Grid>
          </>
        )}
      </Grid>
      <div className="first_chart" style={{ marginTop: "10px" }}>
        <FilterMonth
          title={"Communication Line Chart"}
          showFilterBtn={false}
          filters={filtersForCommunications}
          setFilters={setfiltersForCommunications}
        />
        <AreaChartSimple
          data={firstChart}
          type="normal"
          //
        />
      </div>
      <Grid container spacing={3} sx={{ marginBlock: "20px" }}>
        <Grid item xs={12} sm={9} md={9}>
          <Card
            sx={{
              paddingBlock: "20px",
              boxShadow: "unset",
              border: " 1px solid #80808045",
              backgroundColor: "transparent !important",
            }}
          >
            <FilterMonth
              title={"Api Send Line Chart"}
              debouncedOnChange={debouncedOnChange}
              filters={filtersForSendChart}
              showSearchInput={false}
              setFilters={setFiltersForSendChart}
            />
            <AreaChartSimple data={secondChart} />
          </Card>
        </Grid>
        <Grid
          item
          xs={12}
          sm={3}
          md={3}
          sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
          }}
        >
          <StaticsCard
            text="Response Time"
            count={
              aPICommunicationgetapicommunicationssend?.averageResponseTime
            }
            alignText="center"
            valueColor={COLORS.black}
          />
          <StaticsCard
            alignText="center"
            text="Integration Status"
            count={aPICommunicationgetapicommunicationssend?.integrationStatus}
            valueColor={COLORS.green}
          />
          <StaticsCard
            text="Total Calls"
            alignText="center"
            bgcolor={COLORS.primary}
            textColor={COLORS.white}
            valueColor={COLORS.white}
            border={false}
            count={aPICommunicationgetapicommunicationssend?.totalCallsCount}
          />
        </Grid>
      </Grid>
      <Grid container spacing={3} sx={{ marginBlock: "20px" }}>
        {/* {aPICommunicationgetapicommunicationsrecieveLoading ? (
          <SkeletonCom></SkeletonCom>
        ) : ( */}
        <Grid item xs={12} sm={9} md={9}>
          <Card
            sx={{
              paddingBlock: "20px",
              boxShadow: "unset",
              border: " 1px solid #80808045",
              backgroundColor: "transparent !important",
            }}
          >
            <FilterMonth
              title={"Api Receive Line Chart"}
              debouncedOnChange={debouncedOnChange}
              showSearchInput={false}
              filters={filtersForReceivedChart}
              setFilters={setFiltersForReceivedChart}
            />
            <AreaChartSimple data={thirdChart} />
          </Card>
        </Grid>
        {/* )} */}

        <Grid
          item
          xs={12}
          sm={3}
          md={3}
          sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
          }}
        >
          <StaticsCard
            text="Response Time"
            alignText="center"
            count={
              aPICommunicationgetapicommunicationsrecieve?.averageResponseTime
            }
            valueColor={COLORS.black}
          />
          <StaticsCard
            text="Integration Status"
            alignText="center"
            count={
              aPICommunicationgetapicommunicationsrecieve?.integrationStatus
            }
            valueColor={COLORS.green}
          />
          <StaticsCard
            text="Total Calls"
            alignText="center"
            bgcolor={COLORS.primary}
            textColor={COLORS.white}
            valueColor={COLORS.white}
            border={false}
            count={aPICommunicationgetapicommunicationsrecieve?.totalCallsCount}
          />
        </Grid>
      </Grid>
      <Grid container spacing={3} sx={{ marginBlock: "20px" }}>
        <Grid item xs={12} sm={12} md={12}>
          <Card
            sx={{
              backgroundColor: COLORS.grey,
              position: "relative",
              paddingBlock: "20px",
            }}
          >
            <FilterMonth
              title="Communication ( send / recieved )"
              showMonths={false}
              showSearchInput={false}
              debouncedOnChange={debouncedOnChange}
              filters={filtersForBarChart}
              setFilters={setFiltersForBarChart}
            />
            <Box>
              <BarChart filters={filtersForBarChart} />
            </Box>
          </Card>
        </Grid>
        <Grid item xs={12} sm={12} md={12}>
          <Card
            sx={{
              backgroundColor: COLORS.grey,
              width: "100%",
              position: "relative",
              boxShadow: "unset",
              height: "300px",
            }}
          >
            <Typography component="h5" variant="h5" sx={{ margin: "20px" }}>
              Top Entities
            </Typography>
            <ReactSimplyCarouselExample />
          </Card>
        </Grid>
        <Grid item xs={12} sm={12} md={12}>
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <Typography component="h5" variant="h5" sx={{ margin: "10px" }}>
              Transaction Table
            </Typography>

            <div className="export-excel">
              <CSVLink
                data={
                  transactionsExcel?.transactions
                    ? transactionsExcel?.transactions
                    : []
                }
              >
                Export Excel
              </CSVLink>
            </div>
          </Box>
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              marginBlock: "10px",
            }}
          >
            <Box
              sx={{
                display: "flex",
                justifyContent: "flex-start",
                alignItems: "center",
              }}
            >
              <DateInput
                initValue={filtersForTransctions.fromDate}
                text="From: "
                onChange={setFiltersForTransctions}
                name={"fromDate"}
                bgColor={COLORS.secondary}
                textColor={COLORS.white}
                style={{ padding: "5px 7px" }}
              />

              <DateInput
                text="To: "
                initValue={filtersForTransctions.toDate}
                onChange={setFiltersForTransctions}
                name={"toDate"}
                bgColor={COLORS.secondary}
                textColor={COLORS.white}
                style={{ padding: "5px 7px" }}
              />
            </Box>
            <Box
              sx={{
                display: "flex",
                justifyContent: "flex-start",
                alignItems: "center",
              }}
            >
              <BasicButton
                text="Source Entity"
                onClick={() => setSource(!source)}
                bgColor={source ? COLORS?.primary : COLORS.secondary}
                textColor={COLORS.white}
                style={{ padding: "5px 7px" }}
              />
              <BasicButton
                text="Destination Entity"
                onClick={() => setDestination(!destination)}
                bgColor={destination ? COLORS?.primary : COLORS.secondary}
                textColor={COLORS.white}
                style={{ padding: "5px 7px" }}
              />
            </Box>
          </Box>

          <TransactionsTable
            Headers={Headers}
            data={transactionsData?.transactions || []}
          />
          <div className="pagination">
            <Pagination count={10} page={page} onChange={handleChange} />
          </div>
        </Grid>
      </Grid>
    </Container>
  );
}

export default Dashboard;
