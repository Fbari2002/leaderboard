import React from 'react';
import {
    CDBSidebar,
    CDBSidebarContent,
    CDBSidebarFooter,
    CDBSidebarHeader,
    CDBSidebarMenu,
    CDBSidebarMenuItem,
} from 'cdbreact';
import { NavLink } from 'react-router-dom';

const Sidebar = () => {
    return (
        <div style={{ display: 'flex', height: '100vh', overflow: 'scroll initial' }}>
            <CDBSidebar textColor="#fff" backgroundColor="#008080">
                <CDBSidebarHeader prefix={<i className="fa fa-bars fa-large"></i>}>
                    <img
                        src={process.env.PUBLIC_URL + '/LogoWhite.png'}
                        alt=""
                        style={{ width: '90%' }}
                    />
                </CDBSidebarHeader>

                <CDBSidebarContent className="sidebar-content">
                    <CDBSidebarMenu>
                        <NavLink exact to="/leaderboard/dashboard" activeClassName="activeClicked">
                            <CDBSidebarMenuItem icon="columns" className={"navBarItem"}>Dashboard</CDBSidebarMenuItem>
                        </NavLink>

                        <NavLink exact to="/leaderboard/createLeaderboard" activeClassName="activeClicked">
                            <CDBSidebarMenuItem icon="plus" className={"navBarItem"}>Create Leaderboard</CDBSidebarMenuItem>
                        </NavLink>

                        <NavLink exact to="/" activeClassName="activeClicked">
                            <CDBSidebarMenuItem icon="user" className={"navBarItem"}>Profile page</CDBSidebarMenuItem>
                        </NavLink>

                        <NavLink exact to="/" activeClassName="activeClicked">
                            <CDBSidebarMenuItem icon="chart-line" className={"navBarItem"}>Analytics</CDBSidebarMenuItem>
                        </NavLink>
                    </CDBSidebarMenu>
                </CDBSidebarContent>

                <CDBSidebarFooter style={{ textAlign: 'center' }}>
                    <div
                        style={{
                            padding: '20px 5px',
                        }}
                    >
                        BattleBoards 2023
                    </div>
                </CDBSidebarFooter>
            </CDBSidebar>
        </div>
    );
};

export default Sidebar;