import css from './search-form.scss'
import React from 'react'

class SearchForm extends React.Component {

    constructor(props, context) {
        super(props);
    }

    submitHandler(e) {
        e.preventDefault()
        const newValue = e.target._input.value
        if(!!newValue && newValue.length>0)
            this.props.onSubmit(e.target._input.value)
    }

    render() {
        const {isLoading, inputValue, placeholder} = this.props

        let classes = ``
        if (isLoading)
            classes += " fa fa-refresh fa-spin"
        else
            classes += " fa fa-search"

        return (
            <form className="search-form" onSubmit={this.submitHandler.bind(this)}>
                <input defaultValue={inputValue} id="_input" placeholder={placeholder}
                       className="search-form__input" type="text"/>
                <span className="search-form__span">
                    <button className="search-form__button" type="submit">
                        <i className={classes}></i>
                    </button>
                </span>
            </form>
        );
    }
}

SearchForm.contextTypes = {
    router: React.PropTypes.object
};

SearchForm.propTypes = {
    onSubmit: React.PropTypes.func.isRequired,
    placeholder: React.PropTypes.string,
    inputValue: React.PropTypes.string,
    isLoading: React.PropTypes.bool.isRequired
};


export default SearchForm;