/**
 * Created by hao.cheng on 2017/4/16.
 */
import React from 'react';

class Views extends React.Component {
    render() {
        return (
            <div style={{height: '100%'}}>
                {this.props.children}
            </div>
        )

    }
}

export default Views;