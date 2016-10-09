import css from './search-form.scss'
import React from 'react'

export default class TextInput extends React.Component {

    constructor(props) {
        super(props);
        console.log(css)
    }

    render() {
        return (
            <form className="search-form" >
                <input className="search-form__input" type="text"/>
                <span  className="search-form__span">
                    <button  className="search-form__button fa fa-search" type="submit">

                    </button>
                </span>
            </form>
        );
    }
}