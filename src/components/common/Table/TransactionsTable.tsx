import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { Stack, Typography } from "@mui/material";
import { COLORS } from "../../../constants/insex";
import BasicButton from "../Buttons/Button";
import { useNavigate } from "react-router-dom";
import ModalForDelete from "../Modal";
// import MenuListComposition from "../Buttons/Dropdown";

interface TableProps {
  data: any[];
  Headers: any[];
  actions?: boolean;
  deletebtn?: boolean;
  middleBtn?: boolean;
  link?: string;
  isLoadingDelete?: boolean;
  deleteFun?: any;
  textForEdit?: string;
  user?: any;
}
const TransactionsTable: React.FC<TableProps> = ({
  Headers,
  data,
  deletebtn = false,
  middleBtn = false,
  actions = false,
  link,
  isLoadingDelete,
  deleteFun,
  textForEdit,
  user,
}) => {
  const [open, setOpen] = React.useState(false);
  const [id, setId] = React.useState(null);

  const navigate = useNavigate();
  const TableRowCustom = ({ data, i }: any) => (
    <TableRow
      key={i}
      sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
    >
      <TableCell align="center" component="th" scope="row">
        {data?.id}
      </TableCell>
      <TableCell align="center" component="th" scope="row">
        {data?.name}
      </TableCell>{" "}
      <TableCell align="center" component="th" scope="row">
        {data?.phone}
      </TableCell>{" "}
      <TableCell align="center" component="th" scope="row">
        {data?.email}
      </TableCell>{" "}
      <TableCell align="center" component="th" scope="row">
        {data?.serviceUrl}
      </TableCell>{" "}
      <TableCell align="center" component="th" scope="row">
        {data?.isEnabled ? (
          <Typography sx={{ color: "green" }}>Enabled</Typography>
        ) : (
          <Typography sx={{ color: "red" }}>Not enabled</Typography>
        )}
      </TableCell>{" "}
      <TableCell align="center" component="th" scope="row">
        {data?.isDeactivated ? (
          <Typography sx={{ color: "red" }}>Deactivated</Typography>
        ) : (
          <Typography sx={{ color: "green" }}>Not deactivated</Typography>
        )}
      </TableCell>
      {actions && (
        <TableCell align="center">
          <Stack
            spacing={2}
            direction="row"
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            {user?.role == "Admin" && (
              <BasicButton
                text={textForEdit ? textForEdit : "Edit"}
                onClick={() => {
                  navigate(`${link}/${data.id}`);
                }}
                textColor={COLORS.orange}
                bgColor={COLORS.lightOrange}
              />
            )}

            {middleBtn && user?.role == "Admin" && (
              <BasicButton
                onClick={() => navigate(`/mapping-screen/${data.id}`)}
                textColor={COLORS.orange}
                bgColor={COLORS.lightOrange}
                style={{ minWidth: "150px" }}
                text="Edit Mapping"
              />
            )}

            {deletebtn && user?.role == "Admin" && (
              <BasicButton
                textColor={COLORS.red}
                bgColor={COLORS.lightRed}
                onClick={() => {
                  setId(data.id);
                  setOpen(true);
                }}
                text="Delete "
              />
            )}
          </Stack>
        </TableCell>
      )}
    </TableRow>
  );
  return (
    <TableContainer
      sx={{
        boxShadow: "unset",
        backgroundColor: "unset",
        borderBlock: "1px solid rgba(224, 224, 224, 1)",
        width: "100%",
        overflow: "scroll",
      }}
      component={Paper}
    >
      <Table
        sx={{
          boxShadow: "unset",
          backgroundColor: "unset",
          minWidth: 650,
          borderTop: "1px soild grey",
        }}
        aria-label="simple table"
      >
        <TableHead>
          <TableRow>
            {Headers?.map((item, i) => {
              return (
                <TableCell key={i} align="center">
                  {item.label}
                </TableCell>
              );
            })}
            <TableCell align="center">Actions </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data.map((item, i) => (
            <TableRowCustom key={i} data={item} />
          ))}{" "}
        </TableBody>
      </Table>
      <ModalForDelete
        open={open}
        setOpen={setOpen}
        onSubmit={() => deleteFun(id)}
        isLoading={isLoadingDelete}
      />
    </TableContainer>
  );
};
export default TransactionsTable;
