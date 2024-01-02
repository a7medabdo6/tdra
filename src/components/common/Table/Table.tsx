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

interface TableProps {
  data: any[];
  Headers: any[];
  actions?: boolean;
  deletebtn?: boolean;
  middleBtn?: boolean;
  haveButtons?: boolean;
}
const BasicTable: React.FC<TableProps> = ({
  Headers,
  data,
  deletebtn = false,
  middleBtn = false,
  actions = false,
  haveButtons = false,
}) => {
  return (
    <TableContainer
      sx={{
        boxShadow: "unset",
        backgroundColor: "unset",
        borderBlock: "1px solid rgba(224, 224, 224, 1)",
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
                <TableCell key={item} align="center">
                  {item}
                </TableCell>
              );
            })}
          </TableRow>
        </TableHead>
        <TableBody>
          {[...data, ...data, ...data]?.map((row: any) => (
            <TableRow
              key={row.id}
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
            >
              <TableCell align="center" component="th" scope="row">
                {row.id}
              </TableCell>
              <TableCell component="th" align="center" scope="row">
                {row.entityName}
              </TableCell>
              <TableCell align="center">{row.phone}</TableCell>
              <TableCell align="center">
                {haveButtons ? (
                  <BasicButton
                    text="Edit"
                    textColor={COLORS.primary}
                    bgColor={COLORS.lightprimary}
                  />
                ) : (
                  row.email
                )}
              </TableCell>
              <TableCell align="center">
                {haveButtons ? (
                  <BasicButton
                    text="Edit"
                    textColor={COLORS.primary}
                    bgColor={COLORS.lightprimary}
                  />
                ) : (
                  row.email
                )}
              </TableCell>
              <TableCell align="center">
                {row?.isEnabled ? (
                  <Typography color={COLORS.green}>Yes</Typography>
                ) : (
                  <Typography color={COLORS.red}>No</Typography>
                )}
              </TableCell>
              {actions && (
                <TableCell align="center">
                  <Stack spacing={2} direction="row">
                    <BasicButton
                      text="Edit"
                      textColor={COLORS.orange}
                      bgColor={COLORS.lightOrange}
                    />
                    {middleBtn && (
                      <BasicButton
                        textColor={COLORS.orange}
                        bgColor={COLORS.lightOrange}
                        text="Edit Mapping"
                      />
                    )}

                    {deletebtn && (
                      <BasicButton
                        textColor={COLORS.red}
                        bgColor={COLORS.lightRed}
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
    </TableContainer>
  );
};
export default BasicTable;
