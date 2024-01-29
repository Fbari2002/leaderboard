import React, { useEffect, useState } from "react";
import {Card, CardImg} from "react-bootstrap";
import AddButton from "./AddButton";

function Dashboard({user}) {
    const [profilePic, setProfilePic] = useState(null);
    const gradient = 'linear-gradient(135deg, #800080, #008080)';

    useEffect(() => {
        const fetchProfilePic = async () => {
            const picUrl = user ? user.photoURL : null;
            setProfilePic(picUrl);
        };

        fetchProfilePic();
    }, [user]);

    return (
        <div className="container-fluid">
            <div className="container-fluid">
                <Card style={{ width: '100%', maxWidth: '2000px', margin: 'auto', marginTop:'1%' , borderRadius: '15px', overflow: 'hidden' }}>
                    <div style={{ background: gradient, padding: '20px', textAlign: 'center', color: 'white' }}>
                        {profilePic && (
                            <CardImg
                                variant="top"
                                src={profilePic}
                                alt="Profile Pic"
                                style={{
                                    width: '100px',
                                    height: '100px',
                                    borderRadius: '50%',
                                    marginBottom: '20px',
                                    boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
                                }}
                            />
                        )}
                        <Card.Title style={{ fontSize: '2rem', fontWeight: 'bold', marginBottom: '10px' }}>
                            Welcome Back, {user.displayName}!
                        </Card.Title>
                    </div>
                    <Card.Body style={{ background: 'white', padding: '20px', textAlign: 'center' }}>
                        <Card.Text style={{ fontSize: '1rem', color: '#757575' }}>
                            Explore the latest features and personalized content waiting for you. We're glad to have you back!
                        </Card.Text>
                    </Card.Body>
                </Card>
            </div>

            <div className={"container-fluid"}>
                <AddButton/>
            </div>
        </div>
    );
}

export default Dashboard;