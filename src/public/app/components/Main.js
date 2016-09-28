import React from 'react'


class Main extends React.Component {
    constructor(props,context) {
        super(props,context)
        console.log('------->',props,context)
    }

    render() {
        return (
            <div className="main-container">
                <nav className="navbar navbar-default" role="navigation">
                    <div className="container-fluid">
                        <div className="navbar-header">
                            <a className="navbar-brand" href="#">lsnbox.co</a>
                        </div>
                        <p className="navbar-text">React+Flux Job Portal</p>
                    </div>
                </nav>
                {this.props.children}
            </div>
        )
    }
}

export default Main