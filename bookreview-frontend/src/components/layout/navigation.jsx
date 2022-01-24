import React from 'react';
import { useNavigate } from 'react-router-dom';
import { NavDropdown } from 'react-bootstrap'

export const Nav = () => {
    const navigate = useNavigate();
    const Signup = () => {
        navigate('/sign-up', { replace: true })
    }
    const Login = () => {
        navigate('/login', { replace: true })
    }
    const logOut = () => {
        localStorage.setItem('user', null);
        console.log('wuahaha ', localStorage.getItem('user'));
    }
    console.log('wuahaha 2', localStorage.getItem('user'));
    return (<>
        <div className='flex flex-row justify-between navpad' style={{ height: 80 }}>
            <div className='flex flex-row'>
                <div className='flex flex-col justify-center' style={{ marginRight: 5 }}>
                    <svg width="42" height="33" viewBox="0 0 42 33" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M39.0037 9.90427C38.8339 8.62752 38.81 6.4285 39.9958 5.6901C40.017 5.67656 40.0328 5.65701 40.0514 5.64021C41.0209 5.33011 41.6919 4.89492 41.1652 4.30931L26.8633 0L3.70522 3.2197C3.70522 3.2197 1.05333 3.59874 1.29023 7.71878C1.41883 9.96118 2.12213 11.0624 2.73719 11.6044L0.836863 12.1771C0.309419 12.7627 0.980256 13.1981 1.94991 13.5076C1.96834 13.5249 1.98388 13.5444 2.00544 13.5579C3.19056 14.2969 3.16775 16.4957 2.99728 17.7727C-1.26025 18.9817 0.268056 19.3756 0.268056 19.3756L1.20199 19.6016C0.545064 20.1952 -0.107347 21.3209 0.0148627 23.4559C0.251887 27.5752 2.4301 27.8595 2.4301 27.8595L17.5846 32.7852L40.4585 27.2448C40.4585 27.2448 41.9873 26.8502 37.7286 25.6412C37.5574 24.3662 37.5336 22.1676 38.7215 21.4267C38.7433 21.4136 38.7592 21.3936 38.7769 21.3771C39.7465 21.067 40.4169 20.6322 39.89 20.0466L38.8958 19.7464C39.5589 19.3465 40.5549 18.3015 40.7109 15.5871C40.8186 13.72 40.3315 12.6265 39.7677 11.9827L41.7328 11.5072C41.733 11.5079 43.2618 11.1133 39.0037 9.90427ZM19.8711 9.8515L23.7176 9.06096L36.7167 6.38964L38.6534 5.9913C38.0346 7.1239 38.0605 8.6739 38.1629 9.67013C38.1854 9.8955 38.2112 10.1013 38.2363 10.2577L36.1165 10.7848L19.7094 14.8664L19.8711 9.8515ZM3.34799 13.8604L5.28442 14.2587L17.7682 16.825L18.8588 17.0484L22.1294 17.7206L22.2907 22.7356L5.42781 18.5402L3.76538 18.1271C3.78982 17.9704 3.81565 17.7648 3.83908 17.5388C3.94086 16.5433 3.96731 14.993 3.34799 13.8604ZM2.59568 7.52049C2.57224 6.42461 2.76753 5.63206 3.16223 5.22921C3.41342 4.972 3.70986 4.91848 3.91316 4.91848C4.02058 4.91848 4.09792 4.9334 4.10318 4.9334L14.0814 8.18644L19.0596 9.80951L18.8963 14.8595L4.93032 10.944L4.1933 10.7376C4.16623 10.7299 4.1295 10.7246 4.10118 10.7234C4.04364 10.7193 2.66286 10.5922 2.59568 7.52049ZM17.6207 30.5974L2.91806 26.4753C2.89086 26.4674 2.85451 26.4622 2.82619 26.4608C2.76765 26.4569 1.38624 26.3299 1.31943 23.259C1.29562 22.1617 1.49191 21.3699 1.88586 20.9667C2.13768 20.7095 2.43424 20.656 2.63717 20.656C2.74484 20.656 2.82192 20.6704 2.82756 20.6704C2.82756 20.6704 2.82819 20.6704 2.82756 20.6704L17.783 25.5473L17.6207 30.5974ZM36.8866 25.4073C36.9098 25.6334 36.9356 25.8388 36.9607 25.9955L18.4334 30.6045L18.5954 25.5895L22.5563 24.7752L23.1413 24.9167L25.3338 24.2041L35.4404 22.1273L37.3778 21.7287C36.7584 22.8612 36.784 24.4118 36.8866 25.4073ZM37.9071 18.5917C37.8734 18.5925 37.8397 18.597 37.808 18.607L36.4106 18.9982L23.1057 22.7289L22.943 17.679L27.3082 16.2552L37.878 12.8081C37.8794 12.8075 38.4341 12.6843 38.8412 13.0983C39.2353 13.5011 39.4308 14.2937 39.4077 15.3896C39.3388 18.4602 37.9574 18.5878 37.9071 18.5917Z" fill="#4D2900" />
                    </svg>
                </div>
                <div className='flex flex-col justify-center'>
                    <div className='flex c-text' style={{ color: '#4D2900' }} >Books</div>
                    <svg width="70" height="1" viewBox="0 0 127 1" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <line y1="0.5" x2="127" y2="0.5" stroke="black" strokeOpacity="0.31" />
                    </svg>
                    <div className='flex c-text' style={{ color: '#4D2900' }}>Magazine</div>
                </div>
            </div>
            <div className='flex flex-row justify-between'>
                <div className='flex flex-row justify-between' >
                    <div className='flex flex-col justify-center info' style={{ fontSize: 12, marginRight: 10 }}>Stock</div>
                    <div className='flex flex-col justify-center' style={{ fontSize: 12, marginRight: 10 }}>Catalogy</div>
                    <div className='flex flex-col justify-center' style={{ fontSize: 12 }}>About</div>
                    {
                        localStorage.getItem('user') != 'null' ?
                            <div className='flex flex-col justify-center'>
                                <NavDropdown
                                    className='dropdown'
                                    style={{ fontSize: 12, paddingLeft: 0, paddingRight: 0 }}
                                    id="nav-dropdown-dark-example"
                                    title="Profile"
                                >
                                    <NavDropdown.Item href="#action/3.1">Name</NavDropdown.Item>
                                    <NavDropdown.Item href="#action/3.2">Email</NavDropdown.Item>
                                    <NavDropdown.Divider />
                                    <div className='log-out' onClick={logOut}>
                                        <NavDropdown.Item onClick={logOut} href="#action/3.4"><div style={{ color: 'red' }}>Log out</div></NavDropdown.Item>
                                    </div>
                                </NavDropdown>
                            </div>
                            :
                            <div className='flex flex-row'>
                                <div className='flex flex-col justify-center info' style={{ fontSize: 12, marginLeft: 10, marginRight: 10 }} onClick={() => Signup()}>sign up</div>
                                <div className='flex flex-col justify-center info' style={{ fontSize: 12, marginLeft: 10, marginRight: 10 }} onClick={() => Login()}>login</div>
                            </div>
                    }

                    <div className='flex flex-col justify-center info' style={{ fontSize: 12, marginRight: 10 }}>Vlog</div>
                </div>
            </div>
        </div>
    </>)
}