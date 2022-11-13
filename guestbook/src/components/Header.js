import React from 'react'

export const Header = () => {

    const headerStyle = {

        width: '100%',
        padding: '2%',
        backgroundColor: "#000",
        color: 'white',
        textAlign: 'center'
    }

    return(
        <div style={headerStyle}>
            <h1 className='primary-header'>PASS Summit Guestbook</h1>
            <h4>Powered by Azure SQL bindings for Azure Functions</h4>
        </div>
    )
}