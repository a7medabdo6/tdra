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

interface TableProps {
  data: any[];
  Headers: any[];
  actions?: boolean;
  deletebtn?: boolean;
  middleBtn?: boolean;
  haveButtons?: boolean;
  link?: string;
  isLoadingDelete?: boolean;
  deleteFun?: any;
}
const TableRole: React.FC<TableProps> = ({
  Headers,
  data,
  deletebtn = false,
  middleBtn = false,
  actions = false,
  haveButtons = false,
  link,
  isLoadingDelete,
  deleteFun,
}) => {
  const [open, setOpen] = React.useState(false);
  const [id, setId] = React.useState(null);

  const navigate = useNavigate();
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
            {Headers?.map((item) => {
              return (
                <TableCell
                  key={item}
                  sx={{ width: item.key != "modules" ? "150px" : "unset" }}
                  align="left"
                >
                  {item.label}
                </TableCell>
              );
            })}
            <TableCell align="center">Actions </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data?.map((row: any) => (
            <TableRow
              key={row.id}
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
            >
              {Headers?.[0]?.key && (
                <TableCell align="center" component="th" scope="row">
                  {row?.[`${Headers[0].key}`]}
                </TableCell>
              )}

              {Headers?.[1]?.key && (
                <TableCell component="th" align="center" scope="row">
                  {row?.[`${Headers[1].key}`]}
                </TableCell>
              )}

              {Headers?.[2]?.key == "modules" && Headers?.[2]?.key && (
                <TableCell align="left">
                  {row?.[`${Headers[2].key}`].map((item: any) => (
                    <BasicButton
                      style={{ marginBlock: "5px" }}
                      key={item?.id}
                      text={item?.name}
                      textColor={COLORS.primary}
                      bgColor={COLORS.lightprimary}
                    />
                  ))}
                </TableCell>
              )}
              {Headers?.[3]?.key && (
                <TableCell align="center">
                  {haveButtons ? (
                    <BasicButton
                      onClick={() => {
                        navigate(`${link}/${row.id}`);
                      }}
                      text="Edit"
                      textColor={COLORS.primary}
                      bgColor={COLORS.lightprimary}
                    />
                  ) : (
                    row?.[`${Headers[3].key}`]
                  )}
                </TableCell>
              )}
              {Headers?.[4]?.key && (
                <TableCell align="center">
                  {haveButtons ? (
                    <BasicButton
                      onClick={() => {
                        navigate(`${link}/${row.id}`);
                      }}
                      text="Edit"
                      textColor={COLORS.primary}
                      bgColor={COLORS.lightprimary}
                    />
                  ) : (
                    row?.[`${Headers[4].key}`]
                  )}
                </TableCell>
              )}
              {Headers?.[5]?.key && (
                <TableCell align="center">
                  {row?.[`${Headers[5].key}`] ? (
                    <Typography color={COLORS.green}>Yes</Typography>
                  ) : (
                    <Typography color={COLORS.red}>No</Typography>
                  )}
                </TableCell>
              )}

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
                    <BasicButton
                      text="Edit"
                      onClick={() => {
                        navigate(`${link}/${row.id}`);
                      }}
                      textColor={COLORS.orange}
                      bgColor={COLORS.lightOrange}
                    />
                    {middleBtn && (
                      <BasicButton
                        onClick={() => navigate(`/mapping-screen/${row.id}`)}
                        textColor={COLORS.orange}
                        bgColor={COLORS.lightOrange}
                        text="Edit Mapping"
                      />
                    )}

                    {deletebtn && (
                      <BasicButton
                        textColor={COLORS.red}
                        bgColor={COLORS.lightRed}
                        onClick={() => {
                          setId(row.id);
                          setOpen(true);
                        }}
                        text="Delete "
                      />
                    )}
                  </Stack>
                </TableCell>
              )}
            </TableRow>
          ))}
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
export default TableRole;
