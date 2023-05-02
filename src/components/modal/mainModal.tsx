import * as React from 'react';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import {Favorite, Search} from "@mui/icons-material";
import {IconButton, InputBase, Paper} from "@mui/material";
import {useState} from "react";
import { useAppDispatch, useAppSelector, setInfo, addTag, increaseTagCount } from "@/components/store";

const style = {
    position: 'absolute' as 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
};

interface Info {
    id: string,
    password: string,
    nickname: string,
    tag: []
}

export default function MainModal() {
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    const [tag, setTag] = useState('')

    const dispatch = useAppDispatch()
    const info: any | Info = useAppSelector(state => state.userInfo)

    const handleClick = (...rest: any[]) => {
        const index = rest[0]
        dispatch(increaseTagCount(index))

    };

    return (
        <div>
            <Button onClick={handleOpen} variant="outlined"  color="success" startIcon={<Favorite />}>추가하기</Button>
            <Modal
                keepMounted
                open={open}
                onClose={handleClose}
                aria-labelledby="keep-mounted-modal-title"
                aria-describedby="keep-mounted-modal-description"
            >
                <Box sx={style}>
                    <Typography id="keep-mounted-modal-title" variant="h6" component="h2">
                        나는...
                    </Typography>
                    <Paper
                        component="form"
                        sx={{ p: '2px 4px', display: 'flex', alignItems: 'center', width: 4/5 }}
                    >
                        <InputBase
                            sx={{ ml: 1, flex: 1 }}
                            placeholder="add"
                            value={tag}
                            inputProps={{ 'aria-label': 'add' }}
                            onChange={(e) => setTag(e.target.value)}
                        />
                        <IconButton
                            type="button"
                            sx={{ p: '10px' }}
                            aria-label="search"
                            onClick={()=>{
                                dispatch(addTag(tag))
                                setTag('')
                                setOpen(false);
                            }}
                        >
                            <Search

                            />
                        </IconButton>
                    </Paper>
                </Box>
            </Modal>
        </div>
    );
}