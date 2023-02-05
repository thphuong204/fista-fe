import React from 'react';
import { useDispatch } from "react-redux";
import { styled } from '@mui/material/styles';
import { 
  Box, 
  Grid, 
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  Typography, 
  IconButton, 
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { AddWalletAccordion } from "./AddWallet";
import { WalletModal } from "./WalletModal";
import { deleteWallet } from './walletSlice';

const BackgroundList = styled('div')(({ theme }) => ({
  backgroundColor: theme.palette.background.paper,
}));

let typeArray =[
  {
      _id: "1", 
      name: "asset"
  }, {
      _id: "2", 
      name: "cash/bank"
  }, {
      _id: "3", 
      name: "receivable/liability"
  },
]

function WalletsList({ currentPageWallets, walletById, page, limit }) {

  const dispatch = useDispatch();
  const handleDeleteWallet = async (_id) => {
      dispatch(deleteWallet(_id));
  }
  const [openUpdate, setOpenUpdate] = React.useState(false);
  const handleOpenModal = () => setOpenUpdate(true);
  const handleCloseModal = () => setOpenUpdate(false);
  const [chosedId, setChosedId]= React.useState("");
    return (
      <div style={{ width: "100%", display: "flex", justifyContent: "center" }}>
        <Box sx={{ flexGrow: 1, maxWidth: 752 }}>
          <Grid item xs={12} md={6}>
            <Grid container item xs={12} md={12} style={{ justifyContent: "center" , alignContent: "center" }}>
              <AddWalletAccordion typeArray={typeArray} />
            </Grid>
            {openUpdate ? 
              <WalletModal 
                open ={openUpdate} 
                setOpen={setOpenUpdate} 
                item={chosedId} 
                handleCloseModal={handleCloseModal} 
                typeArray={typeArray} 
                nameValue={walletById[chosedId].name}
                typeValue={walletById[chosedId].classification}
              /> 
              : <></>
            }
            <Typography sx={{ mt: 4, mb: 2 }} variant="h6" component="div" style={{ fontWeight: "600" }}>
              Wallets
            </Typography>
            <BackgroundList>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell style={{fontWeight:"bold"}}>Edit</TableCell>
                    <TableCell style={{fontWeight:"bold"}}>Name</TableCell>
                    <TableCell style={{fontWeight:"bold"}}>Type</TableCell>
                    <TableCell style={{fontWeight:"bold"}}>Currency</TableCell>
                    <TableCell style={{fontWeight:"bold"}}>Delete</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                {currentPageWallets?.map((item, index) => {
                  return (
                    <TableRow
                        key={index}
                        sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                        
                    >
                      <TableCell>
                        <IconButton edge="end" aria-label="delete" 
                          onClick={()=> {
                          handleOpenModal();
                          setChosedId(item)
                        }}>
                          <EditIcon />
                        </IconButton>
                      </TableCell>
                      <TableCell scope="row" style={{textTransform: "capitalize"}}>
                        {walletById[item]?.name}
                      </TableCell>
                      <TableCell style={{textTransform: "capitalize"}}>
                        {walletById[item]?.classification}
                      </TableCell>
                      <TableCell style={{textTransform: "uppercase"}}>
                        {walletById[item]?.currency}
                      </TableCell>
                      <TableCell>
                        <IconButton edge="end" aria-label="delete" 
                          onClick={() => 
                            handleDeleteWallet(item)
                          }
                        >
                          <DeleteIcon/>
                        </IconButton>
                      </TableCell>
                    </TableRow>
                )})}
                </TableBody>
              </Table>
            </BackgroundList>
          </Grid>
        </Box>
      </div>
    );
}

export default WalletsList