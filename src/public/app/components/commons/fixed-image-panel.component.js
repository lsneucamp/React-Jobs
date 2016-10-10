import css from './fixed-image-panel.scss'
import React from 'react'

class FixedImagePanel extends React.Component {

    constructor(props, context) {
        super(props, context);
    }

    render() {
        const children = this.props.children.map((child,key)=> {
            return (
                <div className="row" key={key}>
                    <div className="col-sm-12">{child}</div>
                </div>
            )
        });

        return (
            <div className="container-fluid fixed-image-panel">
                <div className="container">
                    {children}
                </div>
            </div>
        );
    }
}

export default FixedImagePanel;