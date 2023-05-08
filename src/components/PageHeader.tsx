import React, {ReactNode, useState} from 'react';
import {Breadcrumb, Button, Layout, Menu, Space, theme} from "antd";
import {Content, Footer, Header} from "antd/lib/layout/layout";
import {useNavigate} from "react-router-dom";

interface Props {
    children: ReactNode;
}

export const PageHeader = ({ children }: Props) => {
    const tokenAuth = localStorage.getItem('token');
    const navigate = useNavigate();

    const STANDARD_COLOR = 'Indigo';
    const SCROLL_COLOR = 'Blue';
    const STANDARD_HEADER_HEIGHT = '70px';
    const SCROLL_HEADER_HEIGHT = '50px';
    const [headerColor, setHeaderColor] = useState(STANDARD_COLOR);
    const [headerHeight, setHeaderHeight] = useState(STANDARD_HEADER_HEIGHT);

    const changeColor = () => {
        if (window.scrollY >= 60) {
            setHeaderColor(SCROLL_COLOR);
            setHeaderHeight(SCROLL_HEADER_HEIGHT);
        }
        if (window.scrollY < 40) {
            setHeaderColor(STANDARD_COLOR);
            setHeaderHeight(STANDARD_HEADER_HEIGHT);
        }
    }

    window.addEventListener('scroll', changeColor)

    return (
        <Layout className="layout">
            <Header style={{ position: 'sticky', display: 'flex', justifyContent: 'end', top: 0, zIndex: 1, width: '100%', height: headerHeight, backgroundColor: headerColor}}>
                {tokenAuth ? (
                    <Button
                        ghost
                        onClick={() => {
                            navigate('/main');
                        }}
                    >
                        Go to Main Page
                    </Button>
                ) : (
                    <Space>
                        <Button
                            ghost
                            onClick={() => {
                                navigate('/sign');
                            }}
                        >
                            Sign In
                        </Button>
                        <Button
                            ghost
                            onClick={() => {
                                navigate('/sign');
                            }}
                        >
                            Sign Up
                        </Button>
                    </Space>
                )}
            </Header>
            <Content style={{ background: 'white', padding: '0 50px' }}>
                <div className="site-layout-content" style={{ background: "white" }}>
                    {children}
                </div>
            </Content>
        </Layout>
    );
}
