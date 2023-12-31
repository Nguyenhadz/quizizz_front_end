import * as React from 'react';
import {useEffect} from 'react';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import AdbIcon from '@mui/icons-material/Adb';
import {useDispatch, useSelector} from "react-redux";
import {alpha, FormControl, InputBase, InputLabel, Select, styled} from "@mui/material";
import SearchIcon from '@mui/icons-material/Search';
import Link from '@mui/material/Link';
import {
    findStudentByMail,
    findStudentByName,
    findTeacherByMail,
    findTeacherByName,
    logout
} from "../redux/service/UserService";
import {toast} from "react-toastify";
import {useLocation, useNavigate} from "react-router-dom";
import {Button} from "react-bootstrap";


function ResponsiveAppBar() {
    const [anchorElUser, setAnchorElUser] = React.useState(null);
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [selectedField, setSelectedField] = React.useState('0');
    const searchTermRef = React.useState('');
    const {pathname} = useLocation();
    const showSelect = pathname;
    useEffect(() => {
    }, [selectedField]);
    const user = useSelector(state => {
        return state.users.currentUser;
    })
    const settings = [
        {name: 'Cài Đặt', href: '/home/findUserById/' + user.id},
        // {name: 'Bảng Điều Khiển', href: '/home/totalQuestion'},
        {name: 'Đăng Xuất'},
    ];

    const handleChange = (event) => {
        setSelectedField(event.target.value);
    };
    const handleOpenUserMenu = (event) => {
        setAnchorElUser(event.currentTarget);
    };

    const handleLogout = () => {
        dispatch(logout());
        navigate('/')
    };
    const handleCloseUserMenu = () => {
        setAnchorElUser(null);
    };
    const Search = styled('div')(({theme}) => ({
        position: 'relative',
        borderRadius: theme.shape.borderRadius,
        backgroundColor: alpha(theme.palette.common.white, 0.15),
        '&:hover': {
            backgroundColor: alpha(theme.palette.common.white, 0.25),
        },
        marginLeft: 0,
        width: '100%',
        [theme.breakpoints.up('sm')]: {
            marginLeft: theme.spacing(1),
            width: 'auto',
        },
    }));

    const SearchIconWrapper = styled('div')(({theme}) => ({
        padding: theme.spacing(0, 2),
        height: '100%',
        position: 'absolute',
        pointerEvents: 'none',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    }));

    const StyledInputBase = styled(InputBase)(({theme}) => ({
        color: 'inherit',
        width: '100%',
        '& .MuiInputBase-input': {
            padding: theme.spacing(1, 1, 1, 0),
            paddingLeft: `calc(1em + ${theme.spacing(4)})`,
            transition: theme.transitions.create('width'),
            [theme.breakpoints.up('sm')]: {
                width: '30ch'
            },
        },
    }));
    const handleSearch = () => {
        if (selectedField === 3) {
            dispatch(findTeacherByName(searchTermRef.current))
            navigate('/home/showListTeacher')
        } else if (selectedField === 4) {
            dispatch(findTeacherByMail(searchTermRef.current))
            navigate('/home/showListTeacher')
        } else if (selectedField === 1) {
            dispatch(findStudentByName(searchTermRef.current))
            navigate('/home/showListStudent')
        } else if (selectedField === 2) {
            console.log('2' + searchTermRef.current)
            dispatch(findStudentByMail(searchTermRef.current))
            navigate('/home/showListStudent')
        }
    };
    const renderMenuItems = () => {
        switch (showSelect) {
            case '/home/showListStudent':
                return [
                    <MenuItem value={0} valueText="Chọn danh mục muốn tìm">Tìm học sinh theo</MenuItem>,
                    <MenuItem value={1} valueText="Theo tên">Tên</MenuItem>,
                    <MenuItem value={2} valueText="Theo email">Email</MenuItem>,
                ];
            case '/home/showListTeacher':
                return [
                    <MenuItem value={0} valueText="Chọn danh mục muốn tìm">Tìm danh mục theo</MenuItem>,
                    <MenuItem value={3} valueText="Theo tên">Tên</MenuItem>,
                    <MenuItem value={4} valueText="Theo email">Email</MenuItem>,
                ];
            case '/home/showTeacherPending':
                return [
                    <MenuItem value={0} valueText="Chọn danh mục muốn tìm">Tìm giáo viên theo</MenuItem>,
                    <MenuItem value={3} valueText="Theo tên">Tên</MenuItem>,
                    <MenuItem value={4} valueText="Theo email">Email</MenuItem>,
                ];
            case '/home/showListCateQuestion':
                return [
                    <MenuItem value={0} valueText="Chọn danh mục muốn tìm">Tìm danh mục câu hỏi theo</MenuItem>,
                    <MenuItem value={5}>Tên</MenuItem>,
                    <MenuItem value={6}>Nội dung</MenuItem>,
                ];
            case '/home/showListCateQuiz':
                return [
                    <MenuItem value={0} valueText="Chọn danh mục muốn tìm">Tìm danh mục bài thi theo</MenuItem>,
                    <MenuItem value={7}>Tên</MenuItem>,
                    <MenuItem value={8}>Nội dung</MenuItem>,
                ];
            case '/home/totalQuestion':
                return [
                    <MenuItem value={0} valueText="Chọn danh mục muốn tìm">Chọn danh mục muốn tìm</MenuItem>,
                    <MenuItem value={7}>Theo tên</MenuItem>,
                    <MenuItem value={8}>Theo nội dung</MenuItem>,
                ];
            default:
                return [
                    <MenuItem value={0} valueText="Chọn danh mục muốn tìm">Tìm câu hỏi theo</MenuItem>,
                    <MenuItem value={1}>Theo tên</MenuItem>,
                    <MenuItem value={2}>Theo email</MenuItem>,
                    <MenuItem value={3}>Theo tên</MenuItem>,
                    <MenuItem value={4}>Theo email</MenuItem>,
                ];
        }
    };

    return (
        <Container maxWidth="xxl">
            <Toolbar disableGutters className={'justify-end'}>
                {showSelect !== '/home' && (
                    <Box sx={{flexGrow: 1, display: {xs: 'none', md: 'flex'}}}>
                        <Search>
                            <SearchIconWrapper>
                                <SearchIcon/>
                            </SearchIconWrapper>
                            <StyledInputBase
                                placeholder="Nội dung…"
                                onChange={(event) => (searchTermRef.current = event.target.value)}
                            />
                        </Search>
                        <Button onClick={handleSearch}>Tìm kiếm</Button>
                    </Box>
                )}
                {showSelect !== '/home' && (

                    <Box sx={{flexGrow: 6, display: {xs: 'none', md: 'flex'}}}>
                        <div>
                            <FormControl sx={{m: 1, minWidth: 80}}>
                                <InputLabel id="demo-simple-select-autowidth-label"></InputLabel>
                                <Select
                                    labelId="demo-simple-select-autowidth-label"
                                    id="demo-simple-select-autowidth"
                                    value={selectedField}
                                    onChange={handleChange}
                                    autoWidth>
                                    {renderMenuItems()}
                                </Select>
                            </FormControl>
                        </div>
                    </Box>
                )}
                <Box sx={{flexGrow: 0, display: 'flex', alignItems: 'center', justifyContent: "center"}}>
                    <Tooltip title="Open settings">
                        <IconButton onClick={handleOpenUserMenu} sx={{p: 0}}>
                            <Avatar
                                alt="Hình đại diện"
                                src={`${user.image}`}
                                sx={{width: 48, height: 48}}
                            />
                        </IconButton>
                    </Tooltip>
                    <Menu
                        sx={{mt: '45px'}}
                        id="menu-appbar"
                        anchorEl={anchorElUser}
                        anchorOrigin={{
                            vertical: 'top',
                            horizontal: 'right',
                        }}
                        keepMounted
                        transformOrigin={{
                            vertical: 'top',
                            horizontal: 'right',
                        }}
                        open={Boolean(anchorElUser)}
                        onClose={handleCloseUserMenu}
                    >
                        {settings.map((setting, index) => (
                            <MenuItem key={index} onClick={() => {
                                if (setting.name === 'Đăng Xuất') {
                                    handleLogout();
                                } else {
                                    handleCloseUserMenu();
                                }
                            }}>
                                <Link underline="none" textAlign="center" href={setting.href}>{setting.name}</Link>
                            </MenuItem>
                        ))}
                    </Menu>
                    <Typography sx={{ml: '40px'}}>{user.name}</Typography>
                </Box>
            </Toolbar>
        </Container>
    );
}

export default ResponsiveAppBar;
