import React from 'react'


class Main extends React.Component {
    constructor(props,context) {
        super(props,context)
    }

    render() {
        return (
            <div>{this.props.children}</div>
        )
    }
}

export default Main