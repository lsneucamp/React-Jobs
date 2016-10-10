import React from 'react'

export default ({q}) => {
    return (
        <div className="row" >
            <div className="col-sm-12">
                <br/><br/><br/><br/><br/>
                <h4>Sorry, :a <br/>
                    <small>
                        your search <b>"{q}"</b> didn't match with any job!
                    </small>
                </h4>
                <p>Suggestions:</p>
                <ul>
                    <li>Make sure that all words are spelled correctly.</li>
                    <li>Try different keywords.</li>
                    <li>Try common search terms like: <b>software engineer full stack developer programmer test</b></li>
                    <li>Try fewer keywords.</li>
                </ul>
            </div>
        </div>
    )
}