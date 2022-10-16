import {
  Backdrop,
  Button,
  CircularProgress,
  Divider,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Typography,
} from "@mui/material";
import axios from "axios";
import { useRouter } from "next/router";
import React, { useState } from "react";
import Swal from "sweetalert2";

export default function MealEntryForm({ data }) {
  const [open, setOpen] = useState(false);
  const router = useRouter();
  const [mealUpdate, setMealUpdate] = useState([]);
  const inputHandler = (evt) => {
    setMealUpdate([
      ...mealUpdate,
      { id: evt.target.name, mealCount: evt.target.value },
    ]);
  };
  const pageRload = (e) => {
    if (e.key === "Backspace") {
      router.reload(window.location.pathname);
    }
  };
  async function updateMeal() {
    Swal.fire({
      title: "আপনি কি নিশ্চিত?",
      text: "সকলের মিল সঠিকভাবে উঠিয়েছেন",
      icon: "question",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes",
      reverseButtons: true,
    }).then(async (result) => {
      if (result.isConfirmed) {
        setOpen(true);
        const { data } = await axios.put(`/api/manage/mealUpdate`, mealUpdate);
        setOpen(false);
        if (data == "আপনার মিল সঠিকভাবে যুক্ত করা হয়েছে!") {
          Swal.fire("Success", data, "success").then((result) => {
            if (result.isConfirmed) {
              router.reload(window.location.pathname);
            }
          });
        } else {
          Swal.fire(
            "Oops..!",
            "কিছু একটা সমস্যা হয়েছে,আবার চেষ্টা করুন",
            "error"
          );
        }
      }
    });
  }

  return (
    <div style={{padding:"10px"}}>
      <TableContainer>
        <Typography
          sx={{
            textAlign: "center",
            fontSize: "30px",
            fontWeight: 800,
            mt: "13px",
          }}
        >
          মিল উঠান
        </Typography>

        <Divider sx={{ mt: "10px" }}></Divider>
        <Table size="small">
          <TableHead>
            <TableRow>
              <TableCell>নাম</TableCell>
              <TableCell align="center">মোট মিল</TableCell>
              <TableCell align="center">আজকের মিল</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data.map((row) => (
              <TableRow
                key={row.name}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  {row.name}
                </TableCell>
                <TableCell align="center">{row.mealCount}</TableCell>
                <TableCell align="center">
                  <TextField
                    className="styleTextField"
                    variant="standard"
                    required
                    type="number"
                    size="small"
                    name={row.id}
                    onKeyDown={pageRload}
                    onChange={inputHandler}
                    InputProps={{ disableUnderline: true }}
                  />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <Divider></Divider>
     
      <Button
        sx={{my:"10px",borderRadius:"50px",backgroundColor:"#DE4A6D"}}
          variant="contained"
          color="btnColor"
        fullWidth
        size="small"
          onClick={updateMeal}
        >
          যুক্ত করুন
        </Button>
     

      <Backdrop open={open}>
        <CircularProgress />
      </Backdrop>
    </div>
  );
}
