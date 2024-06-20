import { useState } from 'react';
import { Collapse, List, ListItemButton, ListItemIcon, ListItemText, ListSubheader } from '@mui/material';
import clsx from 'clsx';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { functions } from '~/utils';

const NavList = ({ subheader, navigation = [] }) => {
    return (
        <List
            component="nav"
            subheader={
                subheader && (
                    <ListSubheader component="div" id="nested-list-subheader">
                        {subheader}
                    </ListSubheader>
                )
            }
        >
            {navigation.map((nav, index) => (
                <NavItem key={index} data={nav} />
            ))}
        </List>
    );
};

const NavItem = ({ data }) => {
    const [open, setOpen] = useState(true);
    const navigate = useNavigate();
    const location = useLocation();

    const isActive = data.href
        ? functions.checkRouteMatch(data.href, location.pathname)
        : data.subNav?.some((item) => functions.checkRouteMatch(item.href, location.pathname));

    const handleClick = () => {
        if (data.href) {
            navigate(data.href);
        } else {
            setOpen(!open);
        }
    };

    return (
        <>
            <ListItemButton onClick={handleClick} selected={isActive}>
                <ListItemIcon>{data.icon}</ListItemIcon>
                <ListItemText primary={data.text} />
                {!data.href && (open ? <ExpandLess /> : <ExpandMore />)}
            </ListItemButton>
            {data.subNav && (
                <Collapse in={open} timeout="auto">
                    <List component="div">
                        {data.subNav.map((item, index) => {
                            const isRouteMatch = functions.checkRouteMatch(item.href, location.pathname);

                            return (
                                <ListItemButton key={index} component={Link} to={item.href}>
                                    <ListItemIcon>
                                        <span
                                            className={clsx(
                                                'flex items-end justify-center w-6 before:rounded-full before:transition-all',
                                                { 'before:bg-primary before:size-2': isRouteMatch },
                                                { 'before:bg-fade before:size-1': !isRouteMatch },
                                            )}
                                        ></span>
                                    </ListItemIcon>
                                    <ListItemText
                                        primary={
                                            <span
                                                className={clsx({
                                                    'font-semibold': isRouteMatch,
                                                })}
                                            >
                                                {item.text}
                                            </span>
                                        }
                                    />
                                </ListItemButton>
                            );
                        })}
                    </List>
                </Collapse>
            )}
        </>
    );
};

export default NavList;
