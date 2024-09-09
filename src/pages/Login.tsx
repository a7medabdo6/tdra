import * as React from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import { Box, FormControl, TextField, Typography } from "@mui/material";
import logo from "../assets/images/logo.svg";
import BasicButton from "../components/common/Buttons/Button";
import { COLORS } from "../constants/insex";
import { useLogin } from "../Api/Hooks/Auth";
// import { useNavigate } from "react-router-dom";
export default function Login() {
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const { mutate, isLoading } = useLogin();

  const submit = () => {
    mutate({ email, password });
  };

  // const [isAuthenticated, setIsAuthenticated] = React.useState(true);
  // const user = localStorage.getItem("user");
  // const navigate = useNavigate();
  // React.useEffect(() => {
  //   if (user) {
  //     setIsAuthenticated(true);
  //   } else {
  //     setIsAuthenticated(false);
  //   }
  // }, [user, navigate]);
  // React.useEffect(() => {
  //   if (isAuthenticated) {
  //     navigate("/");
  //   }
  // }, [isAuthenticated, navigate]);
  return (
    <Box
      sx={{
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
      }}
    >
      {" "}
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          flexDirection: "column",
        }}
      >
        <img src={logo} />
        <Card
          sx={{
            minWidth: 370,
            margin: "auto",
            boxShadow: "unset",
            display: "flex",
            justifyContent: "space-around",
            flexDirection: "column",
            borderRadius: "20px",
            height: "400px",
          }}
        >
          <Typography
            sx={{
              color: COLORS.primary,
              marginInline: "auto",
              fontWeight: "bold",
            }}
          >
            Login To Your Account
          </Typography>

          <CardContent
            sx={{
              height: "180px",
              display: "flex",
              justifyContent: "space-around",
              flexDirection: "column",
            }}
          >
            <FormControl
              sx={{
                m: 1,
                minWidth: 120,
                "&.MuiFormControl-root": {
                  height: "40px",
                  width: "100% !important",
                  marginTop: "0px",
                },
              }}
            >
              <Typography sx={{ padding: "10px" }}>Email</Typography>
              <TextField
                sx={{
                  "& .MuiOutlinedInput-root": {
                    height: "40px",
                    backgroundColor: "#bcbbbb1c",
                    borderRadius: "14px",
                    border: "unset !important",
                  },
                  "& .MuiOutlinedInput-notchedOutline": {
                    border: "unset !important",
                  },
                  "& .MuiFormHelperText-root": {
                    color: COLORS.red,
                  },
                }}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                // helperText="Incorrect entry."
                variant="outlined"
                placeholder={"Email"}
                style={{ width: "100%", borderRadius: "20px" }}
                inputProps={{ "aria-label": "Without label" }}
              ></TextField>
            </FormControl>
            <FormControl
              sx={{
                m: 1,
                minWidth: 120,
                "&.MuiFormControl-root": {
                  height: "40px",
                  width: "100% !important",
                  marginTop: "0px",
                },
              }}
            >
              <Typography sx={{ padding: "10px" }}>Password</Typography>

              <TextField
                sx={{
                  "& .MuiOutlinedInput-root": {
                    height: "40px",
                    backgroundColor: "#bcbbbb1c",
                    borderRadius: "14px",
                    border: "unset !important",
                  },
                  "& .MuiOutlinedInput-notchedOutline": {
                    border: "unset !important",
                  },
                }}
                //   value={item?.value}
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                variant="outlined"
                placeholder={"Password"}
                style={{ width: "100%", borderRadius: "20px" }}
                inputProps={{ "aria-label": "Without label" }}
              ></TextField>
            </FormControl>
          </CardContent>
          <CardActions sx={{ display: "flex", justifyContent: "center" }}>
            <BasicButton
              text="Login"
              bgColor={COLORS.primary}
              textColor={COLORS.white}
              style={{
                borderRadius: "10px",
              }}
              isLoading={isLoading}
              onClick={submit}
            />
          </CardActions>
        </Card>
      </Box>
    </Box>
  );
}
