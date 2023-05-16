import * as React from 'react';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import {Favorite, GroupAdd, Search} from "@mui/icons-material";
import {Divider, IconButton, InputBase, ListItemAvatar, Paper} from "@mui/material";
import {useState} from "react";
import { useAppDispatch, useAppSelector, setInfo, addTag, increaseTagCount } from "@/components/store";
import ListItemButton from "@mui/material/ListItemButton";
import Avatar from "@mui/material/Avatar";
import ListItemText from "@mui/material/ListItemText";
import List from "@mui/material/List";

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

export default function FriendSearchModal() {
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
        <>
            <Paper
                component="form"
                sx={{ p: '2px 4px', display: 'flex', alignItems: 'center', width: 1 }}
            >
                <InputBase
                    sx={{ ml: 1, flex: 1 }}
                    placeholder="친구 찾기"
                    inputProps={{ 'aria-label': 'search google maps' }}
                />
                <IconButton type="button" sx={{ p: '10px' }} aria-label="search" onClick={handleOpen}>
                    <Search />
                </IconButton>
            </Paper>
            <Modal
                keepMounted
                open={open}
                onClose={handleClose}
                aria-labelledby="keep-mounted-modal-title"
                aria-describedby="keep-mounted-modal-description"
            >
                <Box sx={style}>
                    <Typography id="modal-modal-title" variant="h6" component="h2">
                        {"검색 결과"}
                    </Typography>
                    <List sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper', mt: '10px' }}>
                        <ListItemButton alignItems="flex-start">
                            <ListItemAvatar>
                                <Avatar alt="Remy Sharp" src="/static/images/avatar/1.jpg" />
                            </ListItemAvatar>
                            <ListItemText
                                primary="김감자"
                                secondary={
                                    <React.Fragment>
                                        <Typography
                                            sx={{ display: 'inline' }}
                                            component="span"
                                            variant="body2"
                                            color="text.primary"
                                        >

                                        </Typography>
                                        {"_potato_kim"}
                                    </React.Fragment>
                                }
                            />
                        </ListItemButton>
                        <Divider variant="inset" component="li" />
                        <ListItemButton alignItems="flex-start">
                            <ListItemAvatar>
                                <Avatar alt="Travis Howard" src="/static/images/avatar/2.jpg" />
                            </ListItemAvatar>
                            <ListItemText
                                primary="왕고구마"
                                secondary={
                                    <React.Fragment>
                                        <Typography
                                            sx={{ display: 'inline' }}
                                            component="span"
                                            variant="body2"
                                            color="text.primary"
                                        >

                                        </Typography>
                                        {"_big_sweet_potato"}
                                    </React.Fragment>
                                }
                            />
                        </ListItemButton>
                        <Divider variant="inset" component="li" />
                        <ListItemButton alignItems="flex-start">
                            <ListItemAvatar>
                                <Avatar alt="Cindy Baker" src="/static/images/avatar/3.jpg" />
                            </ListItemAvatar>
                            <ListItemText
                                primary="이햇살"
                                secondary={
                                    <React.Fragment>
                                        <Typography
                                            sx={{ display: 'inline' }}
                                            component="span"
                                            variant="body2"
                                            color="text.primary"
                                        >

                                        </Typography>
                                        {"sLee"}
                                    </React.Fragment>
                                }
                            />
                        </ListItemButton>
                        <Divider variant="inset" component="li" />
                        <ListItemButton alignItems="flex-start">
                            <ListItemAvatar>
                                <GroupAdd/>
                            </ListItemAvatar>
                            <ListItemText
                                primary="가입하지 않은 친구인가요?"
                                secondary={
                                    <React.Fragment>
                                        <Typography
                                            sx={{ display: 'inline' }}
                                            component="span"
                                            variant="body2"
                                            color="text.primary"
                                        >
                                            {"직접 추가해보세요!"}
                                        </Typography>
                                    </React.Fragment>
                                }
                            />
                        </ListItemButton>
                        <Divider variant="inset" component="li" />
                    </List>

                </Box>
            </Modal>
        </>
    );
}