import React, {ReactNode, useState} from 'react';
import {Button, Card, Form, Input, Layout, Space} from "antd";
import {Content, Header} from "antd/lib/layout/layout";
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
    const SCROLL_HEADER_HEIGHT = '51px';
    const [headerColor, setHeaderColor] = useState(STANDARD_COLOR);
    const [headerHeight, setHeaderHeight] = useState(STANDARD_HEADER_HEIGHT);
    const [signInIsOpen, setSignInIsOpen] = useState(false);
    const [signUpIsOpen, setSignUpIsOpen] = useState(false);

    const signInElement = () => {
        return (
            <div style={{ position: 'fixed', top: '5.5%', right: '0%' }}>
                <Card style={{ backgroundColor: headerColor, borderColor: headerColor, borderRadius: '0% 0% 0% 10%'}}>
                    <Space direction="vertical">
                        <h1>Authorization</h1>
                        <Input status='' placeholder="Email" />
                        <Input status='' placeholder="Password" />
                    </Space>
                </Card>
            </div>

        )
    }

    const signUpElement = () => {
        return (
            <div style={{ position: 'fixed', top: '5.5%', right: '0%' }}>
                <Card style={{ backgroundColor: headerColor, borderColor: headerColor, borderRadius: '0% 0% 0% 10%'}}>
                    <Space direction="vertical">
                        <h1>Registration</h1>
                        <Input status='' placeholder="Email" />
                        <Input status='' placeholder="Password" />
                    </Space>
                </Card>
            </div>
        )
    }

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
                                if (signUpIsOpen) setSignUpIsOpen(false)
                                if (signInIsOpen) setSignInIsOpen(false);
                                if (!signInIsOpen) setSignInIsOpen(true);
                            }}
                        >
                            Sign In
                        </Button>
                        <Button
                            ghost
                            onClick={() => {
                                if (signInIsOpen) setSignInIsOpen(false)
                                if (signUpIsOpen) setSignUpIsOpen(false);
                                if (!signUpIsOpen) setSignUpIsOpen(true);
                            }}
                        >
                            Sign Up
                        </Button>
                    </Space>
                )}
                {signInIsOpen ? signInElement() : ''}
                {signUpIsOpen ? signUpElement() : ''}
            </Header>
            <Content style={{ background: 'white', padding: '0 50px' }}>
                <div className="site-layout-content" style={{ background: "white" }}>
                    {children}
                </div>
            </Content>
        </Layout>
    );
}
