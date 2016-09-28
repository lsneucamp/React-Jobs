import React from 'react'

export default ({name, buckets}) => {
    const checkBoxes = buckets.map((bucket, index) => {
        return <div className="col-sm-12" key={index}>

            <div className="checkbox">
                <label>
                    <input type="checkbox" id="blankCheckbox" value="option1" aria-label="..."
                           /> {bucket.key} ({bucket.doc_count})
                </label>
            </div>
        </div>
    })
    console.log("buckets",name, buckets)

    return (
        <div className="row">
            <div className="col-sm-12">
                <h4>{name}</h4>
            </div>
            {checkBoxes}
        </div>

    )
}
