"use client";
import { Box, Link } from '@mui/material';

export default function Navbar() {
	return (
		<Box width={'100%'} height={'100px'} bgcolor={'#16074f'} display={'flex'} alignItems={'center'} paddingLeft={'20px'}  position={'fixed'}>
			<Link href="/dashboard" variant='h3' color={'#ffffff'}>Pantry Tracker</Link>
		</Box>
	)
}