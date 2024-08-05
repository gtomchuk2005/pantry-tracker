"use client";
import { useState, useEffect } from 'react';
import { Box, Button, Modal, Stack, TextField, Typography } from '@mui/material';
import { updatePantry, addItem, removeItem } from './_actions/pantryActions';

export default function Home() {

  const [pantry, setPantry] = useState([]);
  const [open, setOpen] = useState(false);
  const [itemName, setItemName] = useState('');

  const fetchPantry = async () => {
    const pantryList = await updatePantry();
    setPantry(pantryList);
  }

  const addPantryItem = async (item) => {
    await addItem(item);
	  await fetchPantry();
  }

  const removePantryItem = async (item) => {
    await removeItem(item);
	  await fetchPantry();
  }

  useEffect(() => {
    fetchPantry();
  }, [])

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <Box width={'100%'} height={'100vh'} display={'flex'} flexDirection={'column'} justifyContent={'center'} alignItems={'center'} gap={2} bgcolor={'#0D4CAA'} >
      <Modal open={open} onClose={handleClose}>
        <Box position={'absolute'} top={'50%'} left={'50%'} width={400} bgcolor={'white'} border={'2px solid #000'} boxShadow={24} padding={4} display={'flex'} flexDirection={'column'} gap={3} sx={{transform: 'translate(-50%,-50%)'}}>
          <Typography variant='h6'>Add Item</Typography>
          <Stack width={'100%'} direction={'row'} spacing={2}>
            <TextField variant={'outlined'} fullWidth value={itemName} onChange={(e) => {setItemName(e.target.value)}}/>
              <Button variant={'contained'} onClick={() => {
                addPantryItem(itemName);
                setItemName('');
                handleClose();
              }}>Add</Button>
          </Stack>
        </Box>
      </Modal>
      <Box>
        <Box width={'1200px'} height={'100px'} display={'flex'} alignItems={'center'} justifyContent={'center'}>
          <Typography variant='h2' color={'#ffffff'}>Pantry Items</Typography>
        </Box>
        <Stack width={'1200px'} height={'400px'} spacing={2} overflow={'auto'}>
          {
            pantry.map(({name, quantity}) => (
              <Box key={name} width={'100%'} height={'80px'} display={'flex'} alignItems={'center'} justifyContent={'space-between'} bgcolor={'#f0f0f0'} padding={5}>
                <Box display={'flex'} flex={1}>
                  <Typography variant='h4' color={'#333'} textAlign={'center'}>
                    {name.charAt(0).toUpperCase() + name.slice(1)}
                  </Typography>
                </Box>
                <Stack direction={'row'} spacing={2} flex={1} justifyContent={'flex-end'}>
                  <Button variant='contained' color='success' onClick={() => { addPantryItem(name); }}>Add</Button>
                  <Typography variant='h4' color={'#333'} textAlign={'center'}>
                    {quantity}
                  </Typography>
                  <Button variant='contained' color='error' onClick={() => { removePantryItem(name); }}>Remove</Button>
                </Stack>
              </Box>
            ))
          }
        </Stack>
      </Box>
      <Button variant={'contained'} onClick={() => {handleOpen();}}>Add New Item</Button>
    </Box>
  );
}
