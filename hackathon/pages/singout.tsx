import React from "react";
import ThirdParty, {
    Google,
    Github,
    Apple,
    signOut
} from 'supertokens-auth-react/recipe/thirdparty';

const Login: React.FC = () => {
    return (
        <div style={divStyle}>
            <button style={googleButtonStyle} onClick={onClickEvent}>
                <img
                    src="https://developers.google.com/identity/images/g-logo.png"
                    alt="Google logo"
                    style={logoStyle}
                />
                Sign in with Google
            </button>
        </div>
    );
}

async function onClickEvent () {
    await signOut();
    window.location.href = "/auth";
}

const divStyle: React.CSSProperties = {
    display: 'flex',
    justifyContent: 'center'
};

const googleButtonStyle: React.CSSProperties = {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '10px 20px',
    fontSize: '16px',
    color: '#fff',
    backgroundColor: '#4285F4',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
    boxShadow: '0 2px 4px rgba(0, 0, 0, 0.2)'
};

const logoStyle: React.CSSProperties = {
    width: '20px',
    height: '20px',
    marginRight: '10px'
};

export default Login;
